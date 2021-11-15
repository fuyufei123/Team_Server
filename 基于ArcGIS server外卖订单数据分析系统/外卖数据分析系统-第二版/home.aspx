<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="home.aspx.cs" Inherits="外卖数据分析系统_第二版.home" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
      <link rel="stylesheet" type="text/css" href="http://js.arcgis.com/3.14/esri/css/esri.css" />
    <link href="css/style.css" rel="stylesheet" />
    <script src="js/jquery-1.11.1.js"></script>
    <!--<script src="js/jquery-1.10.2.js"></script>-->
    <script src="js/jquery-ui.min.js"></script>  
    <script src="js/easyui/jquery.easyui.min.js"></script>
    <script src="js/easyui/easyui-lang-zh_CN.js"></script>
      <script src="js/easyui/jquery.easyui.extensions.js" type="text/javascript"></script>
    <link href="js/jsPanel/jquery.jspanel.min.css" rel="stylesheet" />
    <script src="js/jsPanel/jquery.jspanel.min.js"></script>
    <script type="text/javascript"src="http://js.arcgis.com/3.14/init.js" ></script> 
    <script src="js/WKTUtil.js"></script>
    <link href="js/loading/fakeLoader.css" rel="stylesheet" />
    <script src="js/loading/fakeLoader.js"></script>
    <script src="js/map.js"></script>
    <style>
        .jsPanel-hdr{
            background-color:#FF6666;
        }

    </style>
 <%--   <style type="text/css">

        .auto-style1 {
            width: 100%;
            height: 642px;
        }
        
        .auto-style2 {
            height: 296px;
            position:center;
                
        }
        .auto-style11 {
            width: 514px;
            height: 240px;
        }
        .auto-style3 {
            width: 514px;
        }
        .auto-style10 {
            height: 38px;
        }
        .auto-style12 {
            width: 514px;
            height: 93px;
        }
        </style>--%>
</head>
<body>
   
   <%-- <form id="form1" runat="server">
        <div>
            <table cellpadding="0" cellspacing="0" class="auto-style1">
                <tr>
                    <td class="auto-style2" style="background-position: center center; background-image: url('/image/外卖.gif'); background-repeat: no-repeat; padding-right: 10px; padding-bottom: 10px;"></td>
                </tr>
                <tr>
                    <td class="auto-style12" style="background-color: #FFFF99; text-align: center;">
                        <asp:Menu ID="Menu2" runat="server" Orientation="Horizontal" OnMenuItemClick="Menu2_MenuItemClick">
                            <Items>
                                <asp:MenuItem Text="竞业分析" Value="competition">
                                    <asp:MenuItem Text="商家对比" Value="contrast"></asp:MenuItem>
                                    <asp:MenuItem Text="订单查询" Value="Purchase"></asp:MenuItem>
                                </asp:MenuItem>
                                <asp:MenuItem Text="用户市场分析" Value="market">
                                    <asp:MenuItem Text="分类渲染" Value="classify"></asp:MenuItem>
                                    <asp:MenuItem Text="商家分布" Value="distributed"></asp:MenuItem>
                                </asp:MenuItem>
                                <asp:MenuItem Text="商家个体分析" Value="Business"></asp:MenuItem>
                                <asp:MenuItem Text="用户挖掘" Value="user"></asp:MenuItem>
                            </Items>
                        </asp:Menu>
                    </td>
                </tr>
                <tr>
                    <td class="auto-style11"></td>
                </tr>
                <tr>
                    <td class="auto-style3">&nbsp;</td>
                </tr>
                <tr>
                    <td style="background-color: #E96781" class="auto-style10"></td>
                </tr>
            </table>
        </div>
    </form>--%>
    <nav class="hl_nav">
    <h2 style="line-height:50px;display:inline;margin-left:10px">外卖数据分析系统</h2>
    <ul class="nav_list">      
        <li>
            <a class="nav_head" href="javascipt:;" onclick="FLXR()">分类渲染</a>         
        </li>
        <li class="">
            <a class="nav_head" href="javascipt:;" onclick="SJFB()">商家分布</a>           
        </li>
        <li class="">
            <a class="nav_head" href="javascipt:;" onclick="RQSJ()">人气商家</a>           
        </li> 
         <li class="">
            <a class="nav_head" href="javascipt:;" onclick="DDCX()">订单查询</a> 
        </li>
    </ul>
</nav>
    <div style="position:absolute;right:25px;top:15px;z-index:99999;color:white">       
                 <span id="curuser"></span>
                 <a href="Login.aspx" style="color:white">退出</a>
    </div>
    <div id="map"></div>   
    <div id="loadingInfo"></div>
    <script>
        $(function () {
            //初始化地图
            Freedom.Map.init("map");      
        });
        function RQSJ()
        {
            $.ajax({
                url: "Handler.ashx?action=GetTop",
                cache: false,            
                type: 'POST',
                success: function (result) {
                    var jgdata = JSON.parse(result);//获取结果json
                    var map = Freedom.Map.mapControl;//定义地图对象
                    var Layer = Freedom.Map.getGraphicLayer(map, 'tempLayer');//临时图层定义
                    Layer.clear();
                    for (i = 0; i < jgdata.length; i++) {                      
                        var fillSymbol = top.Freedom.Map.Symbol.customMarkSymbol(15, "red");
                        var geometry = new top.esri.geometry.Point(parseFloat(jgdata[i].x), parseFloat(jgdata[i].y), top.Freedom.Map.mapControl.spatialReference);
                        var graphic = new top.esri.Graphic(geometry, fillSymbol, null, null);
                        Layer.add(graphic);
                    }
                    map.addLayer(Layer);
                },
                error: function (err) {
                }
            });
        }
        function RemoveZS()
        {
            //清空地图临时图层
            Freedom.Map.delAllGraphicLayers(Freedom.Map.mapControl);
            //取消地图绘制事件
            Freedom.Map.mapDraw.deactivate();
            //设置地图鼠标样式
            Freedom.Map.mapControl.setMapCursor("pointer");
            Freedom.Map.clearLayerByID(Freedom.Map.mapControl,"flxr");
        }
             
       
        function DDCX() {
            $.jsPanel({
                id: 'ddcx',
                headerTitle: '订单查询',
                content: '<iframe src="订单查询.aspx" width="100%" height="100%" frameborder="0" />',
                contentSize: { width: 600, height: 400 },
                theme: '#FF6666',
                //theme: '#33559B',
                headerControls: {
                    minimize: 'remove',
                    maximize: 'remove',
                }
            });
        }   
      
       
        function FLXR()
        {
            require([
           "esri/layers/FeatureLayer",
           "esri/renderers/UniqueValueRenderer", "esri/Color", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol","esri/symbols/SimpleMarkerSymbol",
        "dojo/domReady!"
                ],
            function (FeatureLayer, UniqueValueRenderer, Color, SimpleLineSymbol, SimpleFillSymbol,SimpleMarkerSymbol) {
                var featureLayer = Freedom.Map.featureLayer;
                var defaultSymbol = new SimpleMarkerSymbol().setColor(new Color([255, 0, 0, 0.5])).setSize("15");
                //create renderer
                var renderer = new UniqueValueRenderer(defaultSymbol, "类别");
                //add symbol for each possible value
                renderer.addValue("中餐", new SimpleMarkerSymbol().setColor(new Color([255, 0, 0, 0.5])).setSize("15"));
                renderer.addValue("西餐", new SimpleMarkerSymbol().setColor(new Color([0, 255, 0, 0.5])).setSize("15"));
                renderer.addValue("咖啡", new SimpleMarkerSymbol().setColor(new Color([0, 0, 255, 0.5])).setSize("15"));
                renderer.addValue("火锅", new SimpleMarkerSymbol().setColor(new Color([255, 0, 255, 0.5])).setSize("15"));
                renderer.addValue("酒吧", new SimpleMarkerSymbol().setColor(new Color([255, 255, 255, 0.75])).setSize("15"));
                renderer.addValue("休闲", new SimpleMarkerSymbol().setColor(new Color([0, 255, 255, 0.5])).setSize("15"));
                renderer.addValue("小吃", new SimpleMarkerSymbol().setColor(new Color([255, 255, 0, 0.5])).setSize("15"));
                featureLayer.setRenderer(renderer);
               //添加图层
                Freedom.Map.mapControl.addLayer(featureLayer);
          var defaultGrades, defaultColors;
                    defaultGrades = ['中餐', '西餐', "咖啡", "火锅", "酒吧", "休闲", "小吃"];
                    defaultColors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFFFF', "#00FFFF", "#FFFF00"];
                    top.Freedom.Map._initModuleLengend_diy1(defaultGrades, defaultColors);//设置图例
                });
           
        }

        function SJFB() {
            require([
         "esri/layers/FeatureLayer",
         "esri/renderers/HeatmapRenderer"
            ],
     function (FeatureLayer, HeatmapRenderer) {
         var heatLayer = Freedom.Map.featureLayer;
         //定义热力渲染
         var heatmapRenderer = new HeatmapRenderer({
             blurRadius: 6,//半径
             maxPixelIntensity: 60,//最大像素
             minPixelIntensity: 5,//最小像素
             field: "编号"
         });
         //设置颜色段
         heatmapRenderer.setColorStops([
             { ratio: 0, color: "rgb(000, 000, 255, 0)" },
             { ratio: 0.45, color: "rgb(000, 000, 255)" },
             { ratio: 0.55, color: "rgb(000, 255, 255)" },
             { ratio: 0.65, color: "rgb(000, 255, 000)" },
             { ratio: 0.95, color: "rgb(255, 255, 000)" },
             { ratio: 1, color: "rgb(255, 000, 000)" }
         ]);
         heatLayer.setRenderer(heatmapRenderer);
         //添加图层
         Freedom.Map.mapControl.addLayer(heatLayer);
     });
        }
    </script>
</body>
</html>
