using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Routing;

namespace web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            RegisterRoutes(RouteTable.Routes);
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
        void RegisterRoutes(RouteCollection routes)
        {
            routes.MapPageRoute("index", "Index", "~/SystemPage/Default.aspx", false);
            routes.MapPageRoute("profile", "Profiles/{uid}", "~/Profile/ProfileIndex.aspx", false, new RouteValueDictionary { { "uid", "this" } });
            routes.MapPageRoute("profileArticle", "ProfilesArticle/{uid}", "~/Profile/UserArticle.aspx", false, new RouteValueDictionary { { "uid", "this" } });
            routes.MapPageRoute("article", "Articles/{articleId}", "~/Article/ArticlesIndex.aspx", false, new RouteValueDictionary { { "articleId", "*" } });
        }
    }
}