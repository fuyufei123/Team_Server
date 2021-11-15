<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="订单查询.aspx.cs" Inherits="外卖数据分析系统_第二版.订单查询" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <table border="0" cellspacing="6" style="margin:0 auto">                          
            <tr>                               
               <td style="text-align: right">
                    订单编号：
                </td>
                <td id="wrap">                   
                    <asp:TextBox ID="orderNo" width="80px" runat="server"></asp:TextBox>                   
                </td>

                <td style="text-align: right">
                    外卖店名：
                </td>
                <td id="wrap">                   
                    <asp:TextBox ID="orderName" width="80px" runat="server"></asp:TextBox>                   
                </td>
                
                <td style="text-align: right">
                    用户姓名：
                </td>
                <td id="wrap">                   
                    <asp:TextBox ID="pName" width="80px" runat="server"></asp:TextBox>                   
                </td> 

            </tr>          

          <%--  <tr>
                 <td style="text-align: right">
                    开始时间：
                </td>
                <td id="wrap">                   
                    <asp:TextBox ID="sTime" runat="server"></asp:TextBox>             
                </td>                               
               <td style="text-align: right">
                    结束时间：
                </td>
                <td id="wrap">                   
                    <asp:TextBox ID="eTime" runat="server"></asp:TextBox>                   
                </td>
            </tr>          --%>
             <tr>                               
               <td colspan="8" style="text-align: center">
                   <asp:Button ID="执行查询" runat="server" Text="执行查询" OnClick="Button1_Click" />
                </td>               
            </tr>         
            </table>
       <asp:GridView ID="GridView1" runat="server" Width="100%"></asp:GridView>
    </form>
</body>
</html>
