<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="register.aspx.cs" Inherits="外卖数据分析系统_第二版.register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
            height: 462px;
        }
        .auto-style2 {
            height: 178px;
           
        }
      
        .auto-style5 {
            height: 223px;
        }
        .auto-style6 {
            height: 58px;
        }
        .auto-style7 {
            height: 190px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <table cellpadding="0" cellspacing="1" class="auto-style1">
              
                <tr>
                    <td class="auto-style6" style="text-align: center; background-color: antiquewhite; font-family: 隶书, Arial, Helvetica, sans-serif; font-size: 40px;">新用户注册</td>
                </tr>
                <tr>
                    <td class="auto-style5" style="background-position: center; text-align: center; background-color: white;font-family: 方正舒体, Arial, Helvetica, sans-serif; font-size: 18px; background-image: url('image/外卖3.jpg');padding-right: 250px; background-repeat: no-repeat;">
                        创建用户名：<asp:TextBox ID="regnameText" runat="server" ></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="regnameText" ErrorMessage="该信息不能为空！" ForeColor="#CC0000" ></asp:RequiredFieldValidator>
                        <br /><br />
&nbsp; 创建密码：&nbsp; 
                        <asp:TextBox ID="regpasswordText" runat="server" TextMode="Password"></asp:TextBox>
                        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="regpasswordText" ErrorMessage="该信息不能为空！" ForeColor="#CC3300" ></asp:RequiredFieldValidator>
                        <br /><br />
                        密码确认：
    <asp:TextBox ID="sureTextBox" runat="server" TextMode="Password"></asp:TextBox>
    <asp:CompareValidator ID="CompareValidator1" runat="server" ErrorMessage="两次密码不一致" ControlToCompare="regpasswordText" ControlToValidate="sureTextBox" ForeColor="#CC3300"></asp:CompareValidator>
    <br />  <br /><br />

                        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="注册" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     
                        <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/Login.aspx">返回</asp:HyperLink>
&nbsp;&nbsp; </td>
                </tr>
             
            </table>
        </div>
    </form>
</body>
</html>
