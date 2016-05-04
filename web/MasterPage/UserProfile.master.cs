using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace web.MasterPage
{
    public partial class UserProfile : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            (Master.FindControl("topDeclaration") as Literal).Text = "这个是我的微博";
            //(Master.FindControl("mainBlogMenu") as Panel).Visible = false;
        }
    }
}