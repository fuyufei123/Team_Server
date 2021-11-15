using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace 外卖数据分析系统_第二版
{
    public partial class home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void Menu2_MenuItemClick(object sender, MenuEventArgs e)
        {
            switch (e.Item.Value)
            {
                case "contrast":
                    Response.Redirect("商家对比.aspx");
                    return;
                case "Purchase":
                    Response.Redirect("订单查询.aspx");
                    return;
                case "classify":
                    Response.Redirect("分类渲染.aspx");
                    return;
                case "distributed":
                    Response.Redirect("商家分布.aspx");
                    return;
                case "Business":
                    Response.Redirect("商家个体分析.aspx");
                    return;
                case "user":
                    Response.Redirect("用户挖掘.aspx");
                    return;


            }

        }
    }
}