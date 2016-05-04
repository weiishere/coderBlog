using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace APIApplication.Controllers
{
    public class MovieController : Controller
    {
        //
        // GET: /Movie/

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Data(string api_url)
        {
            Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            // 需要通过代理访问的站点URL
            //string _url = HttpUtility.UrlDecode("https://api.douban.com/v2/movie/top250");
            string _url = HttpUtility.UrlDecode(api_url);
            string htmlStr = "";
            try
            {
                Uri uri = new Uri(_url);
                HttpWebRequest hwReq = (HttpWebRequest)WebRequest.Create(uri);
                HttpWebResponse hwRes = (HttpWebResponse)hwReq.GetResponse();
                hwReq.Method = "GET";
                hwReq.KeepAlive = false;
                //将该属性设置为 true 以发送带有 Keep-alive 值的 Connection HTTP 标头。
                //应用程序使用 KeepAlive 指示持久连接的首选项。
                //当 KeepAlive 属性为 true 时，应用程序与支持它们的服务器建立持久连接。
                //注意 使用 HTTP/1.1 时，Keep-Alive 默认情况下处于打开状态。
                //将 KeepAlive 设置为假可能导致将 Connection: Close 标头发送到服务器。
                StreamReader reader = new StreamReader(hwRes.GetResponseStream(), System.Text.Encoding.UTF8);
                //StreamReader reader = new StreamReader(hwRes.GetResponseStream(), System.Text.Encoding.GetEncoding("gb2312"));
                htmlStr = HttpUtility.UrlDecode(reader.ReadToEnd());
                htmlStr = Server.HtmlDecode(htmlStr);
                //Response.Write(htmlStr);
            }
            catch
            {
                //Response.Write("error");
                // 拦截404等偶发性异常
            }
            return Content("localHandler({'result':" + htmlStr + "})");
        }
    }
}
