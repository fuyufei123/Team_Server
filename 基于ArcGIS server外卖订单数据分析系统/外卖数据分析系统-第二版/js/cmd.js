//初始化命名空间
if (!this["John"]) { John = {}; }

John.dangerOperate = {
    //热力图层
    heatLayer: null,
    //
    feaLayer: null,
    listScale: null,
    //热力渲染
    heatmapRenderer: null,
    //初始化热力图层
    InitHeatLayer: function (heatFeaColl) {
        //删除临时图层
        Freedom.Map.delAllGraphicLayers(Freedom.Map.mapControl);
        require([
             "esri/layers/FeatureLayer",
             "esri/renderers/HeatmapRenderer"
        ],
         function (FeatureLayer, HeatmapRenderer) {
             //定义图层
             var layerDefinition = {
                 "geometryType": "esriGeometryPoint",//几何类型
                 "fields": [{//字段
                     "name": "OBJECTID",
                     "type": "esriFieldTypeOID",
                     "alias": "OBJECTID"
                 },
                 {
                     "name": "签到次数",
                     "type": "esriFieldTypeInteger",
                     "alias": "签到次数"
                 }
                 ]
             };
             //要素几何，解析FeatureCollection对象文件
             var featureCollection = {
                 layerDefinition: layerDefinition,
                 featureSet:heatFeaColl
             };
             //初始化热力图层
             John.dangerOperate.heatLayer = new FeatureLayer(featureCollection, {
                 id: "heatLayer",
                 mode: FeatureLayer.MODE_SNAPSHOT,
                 opacity: 0.65
             });
           //定义热力渲染
             John.dangerOperate.heatmapRenderer = new HeatmapRenderer({
                 blurRadius: 10,//半径
                 maxPixelIntensity: 30,//最大像素
                 minPixelIntensity: 0,//最小像素
                 field:"签到次数"
             });
             //设置颜色段
             John.dangerOperate.heatmapRenderer.setColorStops([
                 { ratio: 0, color: "rgb(000, 000, 255, 0)" },
                 { ratio: 0.45, color: "rgb(000, 000, 255)" },
                 { ratio: 0.55, color: "rgb(000, 255, 255)" },
                 { ratio: 0.65, color: "rgb(000, 255, 000)" },
                 { ratio: 0.95, color: "rgb(255, 255, 000)" },
                 { ratio: 1, color: "rgb(255, 000, 000)" }
             ]);
             
             John.dangerOperate.heatLayer.setRenderer(John.dangerOperate.heatmapRenderer);
             //添加图层
             Freedom.Map.mapControl.addLayer(John.dangerOperate.heatLayer);
         });
    },
    //总体特征函数
    ZTTZ: function (type,date) {
        top.$("#loadingInfo").fakeLoader({ loadText: "正在生成..." });
        //ajax调用
        $.ajax({
            type: 'POST',
            url: 'handler/Handler.ashx?action=Zttz',
            data: {type:type,date:date},//传递参数类型和日期
            success: function (data) {
                var obj = JSON.parse(data);//转成JSON实体
                if (obj) {
                    var result = [];
                    //遍历JSON
                    for (var i = 0; i < obj.length; i++) {
                        var attr = { "OBJECTID": obj[i].编号, "签到次数": obj[i].签到次数 };//定义属性
                        //定义点
                        var point = new top.esri.geometry.Point(obj[i].经度, obj[i].纬度, Freedom.Map.mapControl.spatialReference);
                        //定义样式
                        var symbol = Freedom.Map.Symbol.markSymbol();
                        //定义graphic
                        var graphic = new top.esri.Graphic(point, symbol, attr, null);
                        result.push(graphic);
                    }
                    var heatFeaColl = {
                        "displayFieldName": "",
                        //"fieldAliases": {
                        //    "OBJECTID": "OBJECTID"
                        //},
                        "geometryType": "esriGeometryPoint",
                        "spatialReference": {
                            "wkid": 4490
                        },
                        "fields": [
                            {
                                "name": "OBJECTID",
                                "type": "esriFieldTypeOID",
                                "alias": "OBJECTID"
                            },
                             {
                                 "name": "签到次数",
                                 "type": "esriFieldTypeInteger",
                                 "alias": "签到次数"
                             }
                        ],
                        "features": result
                    };
                    John.dangerOperate.InitHeatLayer(heatFeaColl);
                    top.$("#loadingInfo").fakeLoader({ close: "close" });
                } else {
                    top.$("#loadingInfo").fakeLoader({ close: "close" });
                }
            },
            error: function (x, t, e) {
                top.$("#loadingInfo").fakeLoader({ close: "close" });
                console.log('获取数据失败！');
            }
        });
    },
    //初始化featurelayer图层
    InitFeatureLayer: function (data, geoType) {        
        top.require([
                "esri/layers/FeatureLayer",
                "esri/symbols/SimpleLineSymbol",
                "esri/renderers/UniqueValueRenderer",
                "esri/Color",
                "esri/dijit/Legend",
                "esri/renderers/ClassBreaksRenderer",
                "esri/InfoTemplate",
                "esri/symbols/SimpleFillSymbol",
                "esri/renderers/SimpleRenderer",
                "dojo/domReady!"
        ],
            function (FeatureLayer, SimpleLineSymbol, UniqueValueRenderer, Color, Legend, ClassBreaksRenderer, InfoTemplate, SimpleFillSymbol, SimpleRenderer) {
                var layerDefinition = {
                    "geometryType": geoType,
                    "fields":
                        [
                          {
                              "name": "OBJECTID",
                              "type": "esriFieldTypeOID",
                              "alias": "OBJECTID"
                          },
                          {
                              "name": "Join_Count",
                              "type": "esriFieldTypeInteger",
                              "alias": "Join_Count"
                          }
                        ]
                };
                var featureCollection = {
                    layerDefinition: layerDefinition,
                    featureSet: data
                };
                John.dangerOperate.feaLayer = new FeatureLayer(featureCollection, {
                    id: "feaLayer",
                    mode: FeatureLayer.MODE_AUTO,
                    opacity: 1,
                    outFields: ["*"]
                });
              //定义简单渲染对象
                var renderer = new SimpleRenderer(new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.5)));
                //定义颜色
                renderer.setColorInfo({
                    field: "Join_Count",
                    minDataValue: 0,
                    maxDataValue: 100,
                    colors: [
                      new Color([255, 255, 255]),
                      new Color([127, 127, 0])
                    ]
                });
                ///设置颜色渲染
                John.dangerOperate.feaLayer.setRenderer(renderer);
                //图层颜色透明度
                John.dangerOperate.feaLayer.opacity = 0.7;
                Freedom.Map.mapControl.addLayer(John.dangerOperate.feaLayer);             
                top.$("#loadingInfo").fakeLoader({ close: "close" });
            });
    },
};