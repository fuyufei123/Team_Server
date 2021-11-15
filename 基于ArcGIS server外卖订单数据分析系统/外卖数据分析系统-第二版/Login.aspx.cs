using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;

namespace 外卖数据分析系统_第二版
{
    public partial class Login : System.Web.UI.Page
    {
       
        protected void Page_Load(object sender, EventArgs e)
        {
            UnobtrusiveValidationMode = UnobtrusiveValidationMode.None;
        }

        



        protected void Button1_Click(object sender, EventArgs e)
        {
            MySqlConnection cnn = new MySqlConnection();
            cnn.ConnectionString = "server=localhost;DATABASE=take-out food;USER ID=root;PASSWORD=123456;SslMode=none;";
            
            MySqlDataReader mysqldr =null;
             cnn.Open();
             string mySqlstr = "select name,password from master where name='" + nameTextBox.Text + "'";
             MySqlCommand cmd = new MySqlCommand(mySqlstr, cnn);
             mysqldr = cmd.ExecuteReader();
            /* try
             {
                 

             }
             catch
             {
                 Response.Write("<font color=red >登陆用户不存在！</font>");
                 return;
             }*/

                 if (mysqldr.HasRows)
               { 

                 if (mysqldr.Read())
                 {
                    string str = mysqldr.GetValue(1).ToString();

                     if (passwordTextBox.Text == mysqldr.GetValue(1).ToString())
                     {
                        Session["name"] = nameTextBox.Text;
                        Session["password"] = passwordTextBox.Text;
                        Response.Write("<script>alert('欢迎" + Session["name"] + ",您成功登录!');location.href='home.aspx';</script>");
                      //  Response.Redirect("home.aspx");
                         cnn.Close();
                     }
                     else
                     {
                         Response.Write("<font color=red >密码输入错误！</font>");
                         return;
                     }
                 }
               }

            

        }
    }
}