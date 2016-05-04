using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Xml.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using APIApplication.Models;

namespace APIApplication.Controllers
{
    public class WeixinController : Controller
    {
        //
        // GET: /Weixin/
        public ActionResult Validate(string code)
        {
            //验证signature
            //return Content("成功，获取的授权码code为" + code);
            try
            {
                TokenInfo tokenInfo = WeixinClassHelper.getAccess_tokenForOAuth(code);
                string jsonString = "";
                UserInfo userInfo = WeixinClassHelper.getUserInfo(tokenInfo.access_token, tokenInfo.openid, out jsonString);
                //WriteLog(true, jsonString);
                return Content("code:" + code + "<br/>access_token:" + tokenInfo.access_token + "<br/>openid:" + tokenInfo.openid + "<br/>获取的用户信息为<br/>唯一标识:" + userInfo.openid + "<br/>用户昵称:" + userInfo.nickname + "<br/>用户性别:" + userInfo.gender + "<br/>省份:" + userInfo.province + "<br/>城市:" + userInfo.city + "<br/>国家:" + userInfo.country + "<br/>用户头像链接:" + userInfo.headimgurl + "<br/>用户特权信息:" + userInfo.privilege);
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }
        public ActionResult accessToken() {
            string access_token= WeixinClassHelper.getAccess_token();
            return Content(access_token);
        }
        public ActionResult createMenu() {
            //string menuJson = "{\"button\":[{\"type\":\"click\",\"name\":\"主菜单0\",\"key\":\"1\"},{\"type\":\"click\",\"name\":\"主菜单1\",\"key\":\"2\"},{\"name\":\"主菜单2\",\"sub_button\":[{\"type\":\"click\",\"name\":\"授权用户信息\",\"key\":\"3-1\"},{\"type\":\"view\",\"name\":\"生成二维码\",\"url\":\"http://www.wandone.com/weixin/weixin/getQRCode\"},{\"type\":\"click\",\"name\":\"子菜单3-3\",\"key\":\"3-3\"},{\"type\":\"click\",\"name\":\"子菜单3-4\",\"key\":\"3-4\"},{\"type\":\"click\",\"name\":\"子菜单3-5\",\"key\":\"3-5\"}]}]}";
            string menuJson = "{\"button\":[{\"type\":\"view\",\"name\":\"Demo\",\"url\":\"http://chugui.ljy365.com/USO_web/USO.html\"},{\"type\":\"click\",\"name\":\"主菜单1\",\"key\":\"2\"},{\"name\":\"主菜单2\",\"sub_button\":[{\"type\":\"click\",\"name\":\"授权用户信息\",\"key\":\"3-1\"},{\"type\":\"view\",\"name\":\"生成二维码\",\"url\":\"http://www.wandone.com/weixin/weixin/getQRCode\"},{\"type\":\"view\",\"name\":\"分享测试\",\"url\":\"http://125.65.77.17:83/weixin-api/demo.html\"},{\"type\":\"click\",\"name\":\"子菜单3-4\",\"key\":\"3-4\"},{\"type\":\"click\",\"name\":\"子菜单3-5\",\"key\":\"3-5\"}]}]}";
            string result = WeixinClassHelper.createMenu(menuJson);
            return Content(result);
        }
        public ActionResult getQRCode()
        {
            string ticket = HttpUtility.UrlEncode(WeixinClassHelper.getTicket("123"));
            Uri urlGet = new Uri("https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket);
            HttpWebRequest Req = (HttpWebRequest)WebRequest.Create(urlGet);
            HttpWebResponse Res = (HttpWebResponse)Req.GetResponse();
            Req.Method = "POST";
            Req.KeepAlive = false;
            return File(Res.GetResponseStream(), "image/jpeg");
        }
        public ActionResult Index()
        {
            /*
            //测试，伪造的messageEntity
            MessageEntity test_messageEntity = new MessageEntity();
            test_messageEntity.FromUserName = "FromUserName";
            test_messageEntity.ToUserName = "ToUserName";
            test_messageEntity.MsgType = "text";
            test_messageEntity.Content = "0";

            XmlDocument text_doc = WeixinClassHelper.SendRequestXml(test_messageEntity);
            //发送回执XML
            Request.RequestType = "POST";
            Request.ContentEncoding = Encoding.UTF8;
            Response.ContentType = "text/xml";
            Response.ContentEncoding = Encoding.UTF8;
            Response.Write(text_doc.InnerXml);
            Response.End();
            WriteLog(true, DateTime.Now.ToLongDateString() + DateTime.Now.ToLongTimeString() + "产生一个请求（" + test_messageEntity.FromUserName + "/" + test_messageEntity.Event + "）");
            return Content(text_doc.InnerXml);
            */

            if ((Request.HttpMethod.ToUpper() == "GET"))
            {
                //验证函数
                string echostr = Request["echostr"];
                bool validateResult = WeixinClassHelper.Check(Request["signature"], Request["timestamp"], Request["nonce"], "HongXinWeiXin");
                if (validateResult)
                {
                    Request.RequestType = "GET";
                    Response.Write(echostr);
                    Response.End();
                    return Content(echostr);
                }
                else
                {
                    return Content("false");
                }
            }
            else if (Request.HttpMethod.ToUpper() == "POST")
            {
                XmlElement root;
                MessageEntity messageEntity = WeixinClassHelper.getXmlInfo(Request.InputStream, out root);
                //Console.WriteLine("获取值:" + value);
                //return Content("成功获取值:" + value);

                //XDocument doc = WeixinClassHelper.SendRequestXml(messageEntity);
                XmlDocument doc = WeixinClassHelper.SendRequestXml(messageEntity);
                //发送回执XML
                Request.RequestType = "POST";
                Request.ContentEncoding = Encoding.UTF8;
                Response.ContentType = "text/xml";
                Response.ContentEncoding = Encoding.UTF8;
                Response.Write(doc.InnerXml);
                Response.End();
                WriteLog(true, DateTime.Now.ToLongDateString() + DateTime.Now.ToLongTimeString() + "产生一个请求（" + messageEntity.FromUserName + "/" + messageEntity.Event + "/" + messageEntity.EventKey + "）");
                return null;
                //return Content(doc.ToString());
            }
            else {
                return Content("Request Error");
            }
        }
        #region 暂时不用
        /*
        public void processRequest(String xml)
        {
            try
            {
                // xml请求解析    
                Hashtable requestHT = WeixinServer.ParseXml(xml);
                // 发送方帐号（open_id）    
                string fromUserName = (string)requestHT["FromUserName"];
                // 公众帐号    
                string toUserName = (string)requestHT["ToUserName"];
                // 消息类型    
                string msgType = (string)requestHT["MsgType"];
                //文字消息  
                if (msgType == ReqMsgType.Text)
                {
                    // Response.Write(str);  
                    string content = (string)requestHT["Content"];
                    if (content == "1")
                    {
                        // Response.Write(str);  
                        Response.Write(GetNewsMessage(toUserName, fromUserName));
                        return;
                    }
                    if (content == "2")
                    {
                        Response.Write(GetUserBlogMessage(toUserName, fromUserName));
                        return;
                    }
                    if (content == "3")
                    {
                        Response.Write(GetGroupMessage(toUserName, fromUserName));
                        return;
                    }
                    if (content == "4")
                    {
                        Response.Write(GetWinePartyMessage(toUserName, fromUserName));
                        return;
                    }
                    Response.Write(GetMainMenuMessage(toUserName, fromUserName, "你好，我是vinehoo,"));

                }
                else if (msgType == ReqMsgType.Event)
                {
                    // 事件类型    
                    String eventType = (string)requestHT["Event"];
                    // 订阅    
                    if (eventType == ReqEventType.Subscribe)
                    {
                        Response.Write(GetMainMenuMessage(toUserName, fromUserName, "谢谢您的关注！,"));
                    }
                    // 取消订阅    
                    else if (eventType == ReqEventType.Unsubscribe)
                    {
                        // TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息    
                    }
                    // 自定义菜单点击事件    
                    else if (eventType == ReqEventType.CLICK)
                    {
                        // TODO 自定义菜单权没有开放，暂不处理该类消息    
                    }
                }
                else if (msgType == ReqMsgType.Location)
                {
                }


            }
            catch (Exception e)
            {

            }
        }
        */
        #endregion
        public ActionResult Receive()
        {
            return View();
        }
        /// <summary>
        /// 写日志(用于跟踪)
        /// </summary>
        private void WriteLog(bool append, string ErrStr)
        {
            string filename = Server.MapPath("/logs/log_" + DateTime.Now.ToString("yyyy-M-d") + ".txt");
            if (!Directory.Exists(Server.MapPath("//logs//")))
                Directory.CreateDirectory(Server.MapPath("//")+"\\logs\\");
            StreamWriter sr = null;
            try
            {
                StreamWriter writer = new StreamWriter(filename, append);
                writer.WriteLine(ErrStr);
                writer.Flush();
                writer.Dispose();
            }
            catch
            {
            }
            finally
            {
                if (sr != null)
                    sr.Close();
            }
        }
    }
}
