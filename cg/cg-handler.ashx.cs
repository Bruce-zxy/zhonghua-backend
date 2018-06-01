using Sinochem.IT3M.DataAccess;
using Sinochem.IT3M.Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace Sinochem.IT3M.Web.cg
{
    /// <summary>
    /// cg_handler 的摘要说明
    /// </summary>
    public class cg_handler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            Guid viewId = Guid.Empty;
            try
            {
                viewId = Guid.Parse(context.Request["id"]);
            }
            catch { }
            if (viewId == Guid.Empty)
            {
                context.Response.ContentType = "text/plain";
                context.Response.Write("parameters error!");
                return;
            }
            ConfigInfo info = InitConfigs();
            ViewDataAccess vda = new ViewDataAccess(info);
            ViewModel vm = vda.GetDataFowView(viewId);
            JavaScriptSerializer jss = new JavaScriptSerializer();
            string json = jss.Serialize(vm);
            context.Response.ContentType = "text/plain";

            context.Response.Write(json);
        }

        private ConfigInfo InitConfigs()
        {
            ConfigInfo info = new ConfigInfo();
            info.ConnectionString = ConfigurationManager.ConnectionStrings["PE"].ConnectionString;
            return info;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}