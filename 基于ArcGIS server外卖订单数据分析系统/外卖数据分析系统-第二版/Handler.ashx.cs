using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Data;
using System.Net;
using System.IO;
using System.Net.Cache;
using System.Web.Caching;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using MySql.Data.MySqlClient;


namespace 外卖数据分析系统_第二版
{
    /// <summary>
    /// Handler 的摘要说明
    /// </summary>
    public class Handler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string action = context.Request.QueryString["action"];
            switch (action)
            {
                   //登录
                case "GetTop":
                    GetTop(context);
                    break;              
            }
        }
        private void GetTop(HttpContext context)
        {
            MySqlConnection cnn = new MySqlConnection();
            cnn.ConnectionString = "server=localhost;DATABASE=take-out food;USER ID=root;PASSWORD=123456;SslMode=none;";
            cnn.Open();
            string mySqlstr = "SELECT fid, COUNT(*)  FROM orders GROUP BY fid ORDER BY COUNT(*)  DESC";
            MySqlDataAdapter da = new MySqlDataAdapter(mySqlstr, cnn);
            DataSet ds = new DataSet();
            da.Fill(ds);  //填充DataSet
            DataTable dt=ds.Tables[0];
            List<object> objs = new List<object>();
            for (int i = 0; i < 5; i++)
            {
                int id =Int32.Parse(dt.Rows[i][0].ToString());
                string fsql = "select x,y from food where id="+id;
                MySqlDataAdapter da1 = new MySqlDataAdapter(fsql, cnn);
                DataSet ds1 = new DataSet();
                da1.Fill(ds1);  //填充DataSet
                DataTable dt1 = ds1.Tables[0];
                var obj = new 
                { 
                    x=dt1.Rows[0][0],
                    y = dt1.Rows[0][1]
                };
                objs.Add(obj);
            }
            cnn.Close();
            context.Response.Write(JsonConvert.SerializeObject(objs));
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