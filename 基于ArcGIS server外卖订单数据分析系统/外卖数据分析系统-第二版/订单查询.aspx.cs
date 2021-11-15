using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace 外卖数据分析系统_第二版
{
    public partial class 订单查询 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
            {
                GetData();
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            string where = " where";
            if(orderNo.Text==""&&pName.Text==""&&orderName.Text=="")
            {
                GetData();
                return;
            }
            if (orderNo.Text!="")
            {
                where += " id="+Int32.Parse(orderNo.Text)+" and";
            }
            if (pName.Text != "")
            {
                where += " pname='" + (pName.Text) + "' and";
            }
            if (orderName.Text != "")
            {
                where += " ordername='" + (orderName.Text) + "' and";
            }
            where = where.Substring(0, where.Length - 4);
            MySqlConnection cnn = new MySqlConnection();
            cnn.ConnectionString = "server=localhost;DATABASE=take-out food;USER ID=root;PASSWORD=123456;SslMode=none;";
            cnn.Open();
            string mySqlstr = "select * from orders"+where;
            MySqlDataAdapter da = new MySqlDataAdapter(mySqlstr, cnn);
            DataSet ds = new DataSet();
            da.Fill(ds);  //填充DataSet
            DataTable dt = ds.Tables[0];
            List<orderinfo> orders = new List<orderinfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                orderinfo order = new orderinfo();
                order.订单编号 = dt.Rows[i][0].ToString();
                order.外卖店名 = dt.Rows[i][3].ToString();
                order.下单时间 = dt.Rows[i][4].ToString();
                order.用户编号 = dt.Rows[i][5].ToString();
                order.用户姓名 = dt.Rows[i][6].ToString();
                orders.Add(order);
            }
            this.GridView1.DataSource = orders;
            this.GridView1.DataBind();
        }
        private void GetData()
        {
            MySqlConnection cnn = new MySqlConnection();
            //string strConn = "SERVER=.;DATABASE=PhoneBook;TRUSTED_CONNECTION=true";
            cnn.ConnectionString = "server=localhost;DATABASE=take-out food;USER ID=root;PASSWORD=123456;SslMode=none;";
            cnn.Open();
            string mySqlstr = "select * from orders";
            MySqlDataAdapter da = new MySqlDataAdapter(mySqlstr, cnn);
            DataSet ds = new DataSet();
            da.Fill(ds);  //填充DataSet
            DataTable dt = ds.Tables[0];
            List<orderinfo> orders = new List<orderinfo>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                orderinfo order = new orderinfo();
                order.订单编号 = dt.Rows[i][0].ToString();
                order.外卖店名 = dt.Rows[i][3].ToString();
                order.下单时间 = dt.Rows[i][4].ToString();
                order.用户编号 = dt.Rows[i][5].ToString();
                order.用户姓名 = dt.Rows[i][6].ToString();
                orders.Add(order);
            }
            this.GridView1.DataSource = orders;
            this.GridView1.DataBind();
        }
    }
    public class orderinfo
    {
        public string 订单编号 { get; set; }
        public string 外卖店名 { get; set; }
        public string 下单时间 { get; set; }
        public string 用户编号 { get; set; }
        public string 用户姓名 { get; set; }
    }
}