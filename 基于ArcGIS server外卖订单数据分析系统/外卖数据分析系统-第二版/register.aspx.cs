using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
using System.Data;

namespace 外卖数据分析系统_第二版
{
    public partial class register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            UnobtrusiveValidationMode = UnobtrusiveValidationMode.None;
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            MySqlConnection cnn = new MySqlConnection();
            cnn.ConnectionString = "server=localhost;DATABASE=take-out food;USER ID=root;PASSWORD=123456;";
           
            MySqlTransaction Mtran = null;
            MySqlCommand cmm = new MySqlCommand();
            try
            {
                cnn.Open();
                Mtran = cnn.BeginTransaction();
                cmm.Connection = cnn;
                cmm.Transaction = Mtran;

                cmm.CommandText = "Insert Into master(name,password) values(@name,@password)";
                cmm.Parameters.Add("@name", MySqlDbType.VarChar);
                cmm.Parameters.Add("@password", MySqlDbType.Int32);
                cmm.Parameters["@name"].Value = regnameText.Text;
                cmm.Parameters["@password"].Value = regpasswordText.Text;
                
                cmm.ExecuteNonQuery();
                Mtran.Commit();
                Response.Write("<font color=red >注册成功！</font>");
            }
            catch
            {
                Mtran.Rollback();
                Response.Write("<font color=red>注册失败！</font>");
            }
        }
    }
}