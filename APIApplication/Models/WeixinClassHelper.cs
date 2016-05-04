using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Web;
using System.Web.Security;
using System.Xml;
using System.IO;
using System.Net;
using APIApplication.Extensions;
using System.Text;
using System.Reflection;
using System.Data;
using System.Web.Script.Serialization;

namespace APIApplication.Models
{
    public static class WeixinClassHelper
    {
        private static string AppId = "wx925e39d38bc91b2d";
        private static string AppSecret = "8c5a57b9cb7831eec7cf56b8d1aab9da";
        
        /// <summary>
        /// 验证签名
        /// </summary>
        /// <param name="signature">signature</param>
        /// <param name="timestamp">timestamp</param>
        /// <param name="nonce">nonce</param>
        /// <param name="token">token</param>
        /// <returns></returns>
        public static bool Check(string signature, string timestamp, string nonce, string token)
        {
            return signature.ToUpper() == GetSignature(timestamp, nonce, token);
        }
        //辅助验证函数
        private static string GetSignature(string timestamp, string nonce, string token)
        {
            string[] arr = { token, timestamp, nonce };
            Array.Sort(arr);
            var arrString = string.Join("", arr);
            var sha1 = FormsAuthentication.HashPasswordForStoringInConfigFile(arrString, "SHA1");
            //Console.WriteLine(sha1);
            return sha1;
        }
        /// <summary>
        /// 将XML流转换为对象
        /// </summary>
        /// <param name="path">XML路径</param>
        /// <param name="out_root">OUT 出根节点</param>
        /// <returns>返回MessageEntity对象</returns>
        public static MessageEntity getXmlInfo(Stream path, out XmlElement out_root)
        {
            //接收并读取POST过来的XML文件流  
            StreamReader reader = new StreamReader(path);
            String xmlData = reader.ReadToEnd();
            try
            {
                XmlDocument doc = new XmlDocument();
                MessageEntity messageEntity = new MessageEntity();
                doc.LoadXml(xmlData);
                XmlElement root = doc.DocumentElement;
                Type t = typeof(MessageEntity);
                foreach(XmlNode node in root){
                    foreach (PropertyInfo pi in t.GetProperties(BindingFlags.Instance | BindingFlags.Public))
                    {
                        if (node.Name == pi.Name) {
                            pi.SetValue(messageEntity, node.InnerText, null);
                        }
                    }
                }
                //XmlNode contentNode = root.SelectSingleNode(name);
                out_root = root;
                return messageEntity;
            }
            catch (Exception ex)
            {
                out_root = null;
                throw ex;
            }
        }
        /// <summary>
        /// 获取access_token
        /// </summary>
        /// <returns></returns>
        public  static String getAccess_token()
        {
            //说明:access_token是公众号的全局唯一票据，公众号调用各接口时都需使用access_token。正常情况下access_token有效期为7200秒，重复获取将导致上次获取的access_token失效
            String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + AppId + "&secret=" + AppSecret;
            //String accessToken = null;
            try
            {
                Uri urlGet = new Uri(url);
                HttpWebRequest Req = (HttpWebRequest)WebRequest.Create(urlGet);
                HttpWebResponse Res = (HttpWebResponse)Req.GetResponse();
                Req.Method = "POST";
                Req.KeepAlive = false;
                StreamReader reader = new StreamReader(Res.GetResponseStream(), System.Text.Encoding.UTF8);
                string jsonStr = HttpUtility.UrlDecode(reader.ReadToEnd());
                var tokenInfo = jsonStr.ToObject<TokenInfo>();
                return tokenInfo.access_token;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        /// <summary>
        /// 请求授权oauth获取Access_token
        /// </summary>
        /// <param name="code">通过oauth形式获取的code</param>
        /// <returns>TokenInfo对象</returns>
        public static TokenInfo getAccess_tokenForOAuth(string code)
        {
            String url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + AppId + "&secret=" + AppSecret + "&code=" + code + "&grant_type=authorization_code";
            //String accessToken = null;
            try
            {
                #region Json示例
                //{
                //    "access_token": "OezXcEiiBSKSxW0eoylIeAsR0GmYd1awCffdHgb4fhS_KKf2CotGj2cBNUKQQvj-G0ZWEE5-uBjBz941EOPqDQy5sS_GCs2z40dnvU99Y5AI1bw2uqN--2jXoBLIM5d6L9RImvm8Vg8cBAiLpWA8Vw",
                //    "expires_in": 7200,
                //    "refresh_token": "OezXcEiiBSKSxW0eoylIeAsR0GmYd1awCffdHgb4fhS_KKf2CotGj2cBNUKQQvj-G0ZWEE5-uBjBz941EOPqDQy5sS_GCs2z40dnvU99Y5CZPAwZksiuz_6x_TfkLoXLU7kdKM2232WDXB3Msuzq1A",
                //    "openid": "oLVPpjqs9BhvzwPj5A-vTYAX3GLc",
                //    "scope": "snsapi_userinfo,"
                //}
                #endregion
                Uri urlGet = new Uri(url);
                HttpWebRequest Req = (HttpWebRequest)WebRequest.Create(urlGet);
                HttpWebResponse Res = (HttpWebResponse)Req.GetResponse();
                Req.Method = "POST";
                Req.KeepAlive = false;
                StreamReader reader = new StreamReader(Res.GetResponseStream(), System.Text.Encoding.UTF8);
                string jsonStr = HttpUtility.UrlDecode(reader.ReadToEnd());
                var tokenInfo = jsonStr.ToObject<TokenInfo>();
                return tokenInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="access_token">通过oauth形式获取的access_token</param>
        /// <param name="openId">微信用户的openId</param>
        /// <returns>用户对象</returns>
        public static UserInfo getUserInfo(string access_token,string openId,out string jsonString)
        {
            String url = "https://api.weixin.qq.com/sns/userinfo?access_token=" + access_token + "&openid=" + openId;
            //String accessToken = null;
            try
            {
                Uri urlGet = new Uri(url);
                HttpWebRequest Req = (HttpWebRequest)WebRequest.Create(urlGet);
                HttpWebResponse Res = (HttpWebResponse)Req.GetResponse();
                Req.Method = "POST";
                Req.KeepAlive = false;
                StreamReader reader = new StreamReader(Res.GetResponseStream(), System.Text.Encoding.UTF8);
                string jsonStr = HttpUtility.UrlDecode(reader.ReadToEnd());
                var tokenInfo = jsonStr.ToObject<UserInfo>();
                jsonString = jsonStr;
                return tokenInfo;
            }
            catch (Exception ex)
            {
                jsonString = "出错";
                throw ex;
                //return new UserInfo();
            }
        }

        #region 作废createMenu
        /*
        public static string createMenu()
        {
            String menu = "{\"button\":[{\"type\":\"click\",\"name\":\"主菜单1\",\"key\":\"1\"},{\"type\":\"click\",\"name\":\"主菜单2\",\"key\":\"2\"},{\"name\":\"主菜单3\",\"sub_button\":[{\"type\":\"click\",\"name\":\"子菜单3-1\",\"key\":\"3-1\"},{\"type\":\"click\",\"name\":\"子菜单3-2\",\"key\":\"3-2\"},{\"type\":\"click\",\"name\":\"子菜单3-3\",\"key\":\"3-3\"},{\"type\":\"click\",\"name\":\"子菜单3-4\",\"key\":\"3-4\"},{\"type\":\"click\",\"name\":\"子菜单3-5\",\"key\":\"3-5\"}]}]}";
            String access_token = getAccess_token();
            String url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + access_token;
            Uri urlGet = new Uri(url);
            HttpWebRequest Req = (HttpWebRequest)WebRequest.Create(urlGet);
            HttpWebResponse Res = (HttpWebResponse)Req.GetResponse();
            Req.Method = "POST";
            Req.KeepAlive = false;
            Res.Write(doc.InnerXml);
            Res.End();
        }
         */
        #endregion

        /// <summary>
        /// 创建自定义菜单
        /// </summary>
        /// <param name="postData">自定义菜单JSON</param>
        /// <returns></returns>
        public static string createMenu(string postData)
        {
            string posturl = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=" + getAccess_token();
            Stream outstream = null;
            Stream instream = null;
            StreamReader sr = null;
            HttpWebResponse response = null;
            HttpWebRequest request = null;
            Encoding encoding = Encoding.UTF8;
            byte[] data = encoding.GetBytes(postData);
            try
            {
                // 设置参数
                request = WebRequest.Create(posturl) as HttpWebRequest;
                CookieContainer cookieContainer = new CookieContainer();
                request.CookieContainer = cookieContainer;
                request.AllowAutoRedirect = true;
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = data.Length;
                outstream = request.GetRequestStream();
                outstream.Write(data, 0, data.Length);
                outstream.Close();
                //发送请求并获取相应回应数据
                response = request.GetResponse() as HttpWebResponse;
                //直到request.GetResponse()程序才开始向目标网页发送Post请求
                instream = response.GetResponseStream();
                sr = new StreamReader(instream, encoding);
                //返回结果网页（html）代码
                string content = sr.ReadToEnd();
                string err = string.Empty;
                return content;
            }
            catch (Exception ex)
            {
                string err = ex.Message;
                //Response.Write(err);
                return string.Empty;
            }
        }

        /// <summary>
        /// 响应XML回执
        /// </summary>
        /// <param name="_type">用户发送信息类型</param>
        /// <returns></returns>
        public static XmlDocument SendRequestXml(MessageEntity messageEntity)
        {
            /*
             * XDocument模式（可以设置XCData，格式会更加标准）
            XDocument doc = new XDocument();
            XElement root = new XElement("xml");
            doc.Add(root);
            root.Add(new XElement("ToUserName", new XCData(messageEntity.FromUserName)));
            root.Add(new XElement("FromUserName", new XCData(messageEntity.ToUserName)));
            root.Add(new XElement("CreateTime", ConvertDateTimeInt(DateTime.Now).ToString()));
            root.Add(new XElement("MsgType", new XCData("text")));
            root.Add(new XElement("Content", new XCData("您好，请您选择菜单开始操作，谢谢合作！")));
             * */
            //初始化响应XML
            XmlDocument doc = new XmlDocument();
            XmlElement Root = doc.CreateElement("xml");//主内容
            doc.AppendChild(Root);
            Root.AppendChild(CreateNodeElement(ref doc, "ToUserName", messageEntity.FromUserName));
            Root.AppendChild(CreateNodeElement(ref doc, "FromUserName", messageEntity.ToUserName));
            Root.AppendChild(CreateNodeElement(ref doc, "CreateTime", ConvertDateTimeInt(DateTime.Now).ToString()));
            //加载数据XML
            XmlDocument xmlRoot = new XmlDocument();
            xmlRoot.Load(XmlExtensions.GetXmlFullPath("~/Content/XML/MessageConfig.xml"));
            XmlElement root = xmlRoot.DocumentElement;

            if (messageEntity.theMsgType == ReqMsgType.message_text)
            {
                //响应文本信息
                //Root.AppendChild(CreateNodeElement(ref doc, "MsgType", "text"));
                //Root.AppendChild(CreateNodeElement(ref doc, "Content", "您好，请您选择菜单开始操作，谢谢合作！"));
                string content=messageEntity.Content;
                XmlNode xml_subscribe = root.SelectSingleNode("text");
                foreach (XmlNode xmlNode in xml_subscribe.SelectNodes("option"))
                {
                    string orderStr = xmlNode.SelectSingleNode("orderContent").InnerText;
                    if (orderStr.Contains("/"))
                    {
                        foreach (String _order in orderStr.Split('/'))
                        {
                            if (_order.Equals(content))
                            {
                                foreach (XmlNode _xmlNode in xmlNode.SelectSingleNode("replayContent"))
                                    Root.AppendChild(CreateNodeElement(ref doc, _xmlNode.Name, _xmlNode.InnerText.Replace("\\n","\r\n").Trim()));
                                break;
                            }
                        }
                    } else {
                        if (orderStr.Equals(content))
                        {
                            foreach (XmlNode _xmlNode in xmlNode.SelectSingleNode("replayContent"))
                                Root.AppendChild(CreateNodeElement(ref doc, _xmlNode.Name, _xmlNode.InnerText.Replace("\\n", "\r\n").Trim()));
                            break;
                        }
                    }
                }
            }
            else if (messageEntity.theMsgType == ReqMsgType.message_event)
            {
                if (messageEntity.Event == "CLICK")//自定义菜单
                {
                    string content = messageEntity.EventKey;
                    XmlNode xml_subscribe = root.SelectSingleNode("click");
                    foreach (XmlNode xmlNode in xml_subscribe.SelectNodes("option"))
                    {
                        string clickKey = xmlNode.SelectSingleNode("clickKey").InnerText;
                        if (clickKey.Equals(content))
                        {
                            //CreateNodeElementRecursion(ref doc, ref Root, xmlNode.SelectSingleNode("replayContent"));
                            XmlDocument xml = new XmlDocument();
                            foreach (XmlNode _xmlNode in xmlNode.SelectSingleNode("replayContent"))
                                Root.AppendChild(CreateNodeElement(ref doc, _xmlNode.Name, _xmlNode.InnerXml.Replace("\\n", "\r\n").Trim()));
                            break;
                        }
                    }
                }
                else if (messageEntity.Event == "subscribe")//关注
                {
                    XmlNode xml_subscribe = root.SelectSingleNode("subscribe");
                    foreach (XmlNode xmlNode in xml_subscribe)
                        Root.AppendChild(CreateNodeElement(ref doc, xmlNode.Name, xmlNode.InnerXml.Replace("\\n", "\r\n").Trim()));
                    if (messageEntity.EventKey.Contains("qrscene_"))
                    { 
                        //通过扫描二维码的关注，可以回去场景值
                        string sceneValue = messageEntity.EventKey.Split('_')[1];//获取场景值
                        //do something
                    }
                }
                else if (messageEntity.Event == "SCAN")
                {
                    //已关注的状态下扫描二维码
                    string sceneValue = messageEntity.EventKey;//获取场景值
                    //do something
                }
            }
            else
            {
                //响应其他类型信息
                Root.AppendChild(CreateNodeElement(ref doc, "MsgType", "text"));
                Root.AppendChild(CreateNodeElement(ref doc, "Content", "对不起，目前此服务号只支持文本命令响应和菜单响应"));
            }
             
            return doc;
        }

        /// <summary>
        /// 获取生成二维码需要的ticket
        /// </summary>
        /// <param name="scene_id">二维码场景值</param>
        /// <returns>ticket</returns>
        public static string getTicket(string scene_id)
        {
            string postData = "{\"action_name\": \"QR_LIMIT_SCENE\", \"action_info\": {\"scene\": {\"scene_id\": " + scene_id + "}}}";
            string posturl = "https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=" + getAccess_token();
            Stream outstream = null;
            Stream instream = null;
            StreamReader sr = null;
            HttpWebResponse response = null;
            HttpWebRequest request = null;
            Encoding encoding = Encoding.UTF8;
            byte[] data = encoding.GetBytes(postData);
            try
            {
                // 设置参数
                request = WebRequest.Create(posturl) as HttpWebRequest;
                CookieContainer cookieContainer = new CookieContainer();
                request.CookieContainer = cookieContainer;
                request.AllowAutoRedirect = true;
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = data.Length;
                outstream = request.GetRequestStream();
                outstream.Write(data, 0, data.Length);
                outstream.Close();
                //发送请求并获取相应回应数据
                response = request.GetResponse() as HttpWebResponse;
                //直到request.GetResponse()程序才开始向目标网页发送Post请求
                instream = response.GetResponseStream();
                sr = new StreamReader(instream, encoding);
                //返回结果网页（html）代码
                string jsonStr = sr.ReadToEnd();
                return jsonStr.ToObject<ticketInfo>().ticket;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Xml添加节点辅助方法
        private static XmlElement CreateNodeElement(ref XmlDocument doc, string ElemenName, string ElemenValue)
        {
            XmlElement node_toUserName = doc.CreateElement(ElemenName);
            node_toUserName.InnerXml = ElemenValue;
            return node_toUserName;
        }

        private static void CreateNodeElementRecursion(ref XmlDocument doc, ref XmlElement Root, XmlNode replayContent)
        {
            foreach (XmlNode _xmlNode in replayContent)
            {
                if (_xmlNode.ChildNodes.Count == 1)
                {
                    
                    Root.AppendChild(CreateNodeElement(ref doc, _xmlNode.Name, _xmlNode.InnerText.Replace("\\n", "\r\n").Trim()));
                }
                else
                {
                    XmlElement newNode = doc.CreateElement(_xmlNode.Name);
                }
            }
        }

        /// <summary>
        /// unix时间转换为datetime
        /// </summary>
        /// <param name="timeStamp"></param>
        /// <returns></returns>
        private static DateTime UnixTimeToTime(string timeStamp)
        {
            DateTime dtStart = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            long lTime = long.Parse(timeStamp + "0000000");
            TimeSpan toNow = new TimeSpan(lTime);
            return dtStart.Add(toNow);
        }

        /// <summary>
        /// datetime转换为unixtime
        /// </summary>
        /// <param name="time"></param>
        /// <returns></returns>
        private static int ConvertDateTimeInt(System.DateTime time)
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1));
            return (int)(time - startTime).TotalSeconds;
        }

    }
    public enum ReqMsgType
    {
        message_text = 1,// "text",
        message_image = 2,// "image",
        message_voice = 3,//"voice",
        message_video = 4,//"video",
        message_location = 5,//"location",
        message_link = 6,//"link"
        message_event=7//"enevt"
    }
    public class MessageEntity
    {
        public string ToUserName { get; set; }//开发者微信号
        public string FromUserName { get; set; }//发送方帐号（一个OpenID）
        public string CreateTime { get; set; }//消息创建时间 （整型）
        public string MsgType { get; set; }
        public ReqMsgType theMsgType
        {
            get
            {
                ReqMsgType temp = ReqMsgType.message_text;
                switch (MsgType) {
                    case "text": temp = ReqMsgType.message_text; break;
                    case "image": temp = ReqMsgType.message_image; break;
                    case "voice": temp = ReqMsgType.message_voice; break;
                    case "video": temp = ReqMsgType.message_video; break;
                    case "location": temp = ReqMsgType.message_location; break;
                    case "link": temp = ReqMsgType.message_link; break;
                    case "event": temp = ReqMsgType.message_event; break;
                }
                return temp;
            }
            set {
                theMsgType = value;
            }
        }//信息类型
        public string Content { get; set; }//文本消息内容
        public string PicUrl { get; set; }//图片链接
        public string MediaId { get; set; }//消息媒体id，可以调用多媒体文件下载接口拉取数据。
        public string Format { get; set; }//语音格式，如amr，speex等
        public string ThumbMediaId { get; set; }//视频消息缩略图的媒体id，可以调用多媒体文件下载接口拉取数据。
        public string Location_X	  { get; set; }//地理位置维度
        public string Location_Y	 { get; set; } //地理位置精度
        public string Scale { get; set; }	 //地图缩放大小
        public string Label { get; set; } //地理位置信息
        public string Title{ get; set; }	 //消息标题
        public string Description{ get; set; }	// 消息描述
        public string Url{ get; set; }	 //消息链接
        public string MsgId { get; set; }//消息id，64位整型
        public string Event { get; set; }
        /*
         * 当MsgType=event时，此值会被赋值
         * 关注/取消关注：subscribe(订阅)、unsubscribe(取消订阅)
         * 自定义菜单：CLICK
         * 地理位置：LOCATION
         * 扫描带参数二维码:用户未关注时，进行关注后-subscribe/用户已关注时，进行关注后-scan
        */
        public string EventKey { get; set; }//当Event=CLICK时，事件EventKey值与自定义菜单接口中KEY值对应
        public string Ticket { get; set; }//二维码的ticket，可用来换取二维码图片(扫描带参数二维码事件)
        public string Latitude { get; set; }//地理位置纬度(上报地理位置事件)
        public string Longitude { get; set; }//地理位置经度(上报地理位置事件)
        public string Precision { get; set; }//地理位置精度(上报地理位置事件)
    }
    public class TokenInfo
    {
        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string refresh_token { get; set; }
        public string openid { get; set; }
        public string scope { get; set; }
    }
    public class UserInfo {
        public string openid{ get; set; }//用户的唯一标识
        public string nickname { get; set; }//用户昵称
        public int sex { get; set; }//用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
        public string gender {
            get {
                string temp = "";
                switch (sex)
                {
                    case 0: temp = "未知"; break;
                    case 1: temp = "男"; break;
                    case 2: temp = "女"; break;
                }
                return temp;
            }
            set {
                gender = value;
            }
        }
        public string province { get; set; }//用户个人资料填写的省份
        public string city { get; set; }//普通用户个人资料填写的城市
        public string country { get; set; }//国家，如中国为CN
        public string headimgurl { get; set; }//用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
        public string[] privilege { get; set; }//用户特权信息，json 数组，如微信沃卡用户为（chinaunicom）
    }
    public class ticketInfo {
        public string ticket { get; set; }
        public int seconds { get; set; }
    }
}
