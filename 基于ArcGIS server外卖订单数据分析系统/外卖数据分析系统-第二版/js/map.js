if (!this["Freedom"]) { Freedom = {}; }
Freedom.Map = {
    mapControl: null,//定义地图对象变量
    geometryServer: "http://192.168.0.249:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer",
    mapDraw: null,
    onMapDrawEnd: null,
    featureLayer: null,
    //初始化
    init: function (div) {
        require(["esri/map", "esri/layers/FeatureLayer", "esri/toolbars/draw", "dojo/domReady!"], function (Map, FeatureLayer) {
            Freedom.Map.mapControl = new Map(div, {
                logo: false,
                slider: false,
                fadeOnZoom: true
            });
            dojo.connect(Freedom.Map.mapControl, "onLoad", Freedom.Map.loadCompleted);    //绑定地图事件 
            Freedom.Map.mapDraw = new esri.toolbars.Draw(Freedom.Map.mapControl, { showTooltips: false });
            dojo.connect(Freedom.Map.mapDraw, "onDrawEnd", Freedom.Map.mapDrawEnd);
            Freedom.Map.InitMap();//初始化地图
            //Freedom.Map.mapControl.on('click', function (evt) {
            //    alert(evt.mapPoint.x+";"+evt.mapPoint.y);
            //})
            Freedom.Map.featureLayer = new FeatureLayer("http://localhost:6080/arcgis/rest/services/food/MapServer/0", {
                mode: FeatureLayer.MODE_SNAPSHOT,
                outFields: ["*"],
                id:"flxr"
            });
        });   
    },
    //缩放到范围函数
    zoom2FullExtent: function () {
        var extent = new esri.geometry.Extent(
            121.0935094230835,
            28.83381758505371,
            121.16157315904542,
            28.863600833955076,
            Freedom.Map.mapControl.spatialReference);
        Freedom.Map.fly2Geometry(Freedom.Map.mapControl, extent, null, 1);
    },
    mapDrawEnd: function (evt) {
        if (Freedom.Map.onMapDrawEnd && $.isFunction(Freedom.Map.onMapDrawEnd)) {
            Freedom.Map.onMapDrawEnd(evt);
        }
    },
    loadCompleted: function (evt) {
        Freedom.Map.zoom2FullExtent();       
    },
    //添加图层
    addLayer2Map: function (id, type, url, index) {
        var tempLayer = null;
        switch (type) {
            case "ArcGISTiledMapServiceLayer":
                tempLayer = new esri.layers.ArcGISTiledMapServiceLayer(url);
                tempLayer.id = id;
                break;
            case "ArcGISDynamicMapServiceLayer":
                tempLayer = new esri.layers.ArcGISDynamicMapServiceLayer(url);
                tempLayer.id = id;
                break;
            case "GoogleMapLayer":
                tempLayer = new GoogleMapLayer();
                tempLayer.id = id;
                break;
            case "GoogleAnooLayer":
                tempLayer = new GoogleAnooLayer();
                tempLayer.id = id;
                break;
            case "GoogleImageLayer":
                tempLayer = new GoogleImageLayer();
                tempLayer.id = id;
                break;
            default: break;
        }
        Freedom.Map.mapControl.addLayer(tempLayer, index);
    },  
    //获取集合
    getGraphic: function (geometry, symbol, attribute) {
        var graphic = new esri.Graphic(geometry, symbol, attribute);
        return graphic;
    },
    //获取临时图层
    getGraphicLayer: function (map, id) {
        var myGraphicLayer = map.getLayer(id);
        if (myGraphicLayer == null) {
            myGraphicLayer = new esri.layers.GraphicsLayer({ id: id });
            map.addLayer(myGraphicLayer);
        }
        return myGraphicLayer;
    },
    //定位到几何
    fly2Geometry: function (map, geometry, completed) {
        if (map != null && map.extent != null && geometry != null) {
            var extent = geometry.getExtent();
            if (geometry.type == "point") {
                extent = new esri.geometry.Extent(geometry.x - 0.0000001, geometry.y - 0.0000001, geometry.x + 0.0000001, geometry.y + 0.0000001, map.spatialReference);
                extent = extent.expand(1.5);
            }
            if (extent != null) {
                var point = new esri.geometry.Point(extent.xmin + (extent.xmax - extent.xmin) / 2, extent.ymin + (extent.ymax - extent.ymin) / 2, map.spatialReference);
                var newExtent = new esri.geometry.Extent(point.x, point.y, point.x, point.y, point.spatialReference);
                //如果当前视图包含要缩放视图
                if (Freedom.Map.isExtent1ContainExtent2(map.extent, extent)) {
                    map.setExtent(extent);
                    if (completed != null && $.isFunction(completed)) {
                        completed();
                    }
                } else {
                    var firstEx = Freedom.Map.union2Extent(newExtent, map.extent);
                    map.setExtent(firstEx, true);
                    setTimeout(function () {
                        map.centerAt(point)
                    }, 700);
                    setTimeout(function () {
                        map.setExtent(extent);
                        if (completed != null && $.isFunction(completed)) {
                            completed();
                        }
                    }, 1400);
                }
            }
        }
    },
    //定位几何
    location2Geometry: function (map, geometry, completed) {
        var graphic = Freedom.Map.getGraphicByGeometry(geometry, "#2200FF00");
        var tempLayer = Freedom.Map.getGraphicLayer(map, "johnLiuTempLayer");
        tempLayer.clear();
        tempLayer.add(graphic);
        Freedom.Map.fly2Geometry(map, geometry, completed, 1.2);
    },
    //判断是否一个范围包含另一个范围
    isExtent1ContainExtent2: function (extent1, extent2) {
        var isContain = false;
        if (extent1.xmin < extent2.xmin
            && extent1.ymin < extent2.ymin
            && extent1.xmax > extent2.xmax
            && extent1.ymax > extent2.ymax) {
            isContain = true;
        }
        return isContain;

    },
    //合并两个范围
    union2Extent: function (extent1, extent2) {
        var newExtent = new esri.geometry.Extent(extent1.xmin, extent1.ymin, extent1.xmax, extent1.ymax, extent1.spatialReference);
        if (extent1 != null && extent2 != null) {
            newExtent.xmax = (extent1.xmax > extent2.xmax ? extent1.xmax : extent2.xmax);
            newExtent.xmin = (extent1.xmin < extent2.xmin ? extent1.xmin : extent2.xmin);
            newExtent.ymax = (extent1.ymax > extent2.ymax ? extent1.ymax : extent2.ymax);
            newExtent.ymin = (extent1.ymin < extent2.ymin ? extent1.ymin : extent2.ymin);
        }
        return newExtent;
    },
    //通过传入几何参数获取graphic
    getGraphicByGeometry: function (geometry) {
        var graphic = null;
        //point | multipoint | polyline | polygon | extent
        switch (geometry.type) {
            case "point": case "multipoint":
                graphic = new esri.Graphic(geometry, Freedom.Map.Symbol.markSymbol());
                break;
            case "polyline":
                graphic = new esri.Graphic(geometry, Freedom.Map.Symbol.lineSymbol());
                break;
            case "polygon": case "extent":
                graphic = new esri.Graphic(geometry, Freedom.Map.Symbol.fillSymbol());
                break;
            default: break;
        }
        return graphic;
    },
    //清空所有图层
    delAllGraphicLayers: function (map) {
        var graphicLayerIDs = [];
        $.each(map.graphicsLayerIds, function (i, item) {
            graphicLayerIDs.push(item);
        })
        $.each(graphicLayerIDs, function (i, item) {
            Freedom.Map.clearLayerByID(map, item);
        });
        map.graphics.clear();
    },
    //清除地图通过id
    clearLayerByID: function (map, id) {
        if (map != null) {
            var tempLayer = map.getLayer(id);
            if (tempLayer != null) {
                tempLayer.clear();
                map.removeLayer(tempLayer);
            }
        }
    },
    Symbol: {
        /**
         * @constructor 名称：markSymbol
         * @description 作用：系统点样式
         */
        markSymbol: function () {
            var markSymbol = new esri.symbol.SimpleMarkerSymbol();
            markSymbol.color = new dojo.Color("red");
            markSymbol.size = 15;
            return markSymbol;
        },
        /**
         * @constructor 名称：fillSymbol
         * @description 作用：系统填充样式
         */
        fillSymbol: function (color) {
            var simpleFillSymbol = new esri.symbol.SimpleFillSymbol();
            //simpleFillSymbol.color = new dojo.Color("#2200FF00");
            simpleFillSymbol.color = new dojo.Color([0, 255, 0, 0.5]);
            // simpleFillSymbol.color = new dojo.Color(color);
            simpleFillSymbol.outline = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("red"), 2);
            return simpleFillSymbol;
        },
        /**
         * @constructor 名称：lineSymbol
         * @description 作用：系统线样式
         */
        lineSymbol: function () {
            var sls = new esri.symbol.SimpleLineSymbol();
            sls.color = new dojo.Color("red");
            sls.width = 4;
            return sls;
        },
        /**
         * @constructor 名称：txtSymbol
         * @description 作用：系统文字样式
         * @param {object} txt 文本
         * @param {object} offsetX 左偏移
         * @param {object} offsetY 上偏移
         * @param {object} color 颜色
         */
        txtSymbol: function (txt, offsetX, offsetY, color) {
            var txtSym = new esri.symbol.TextSymbol();
            txtSym.color = color;
            txtSym.text = txt;
            txtSym.xoffset = offsetX;
            txtSym.yoffset = offsetY;
            return txtSym;
        },
        /**
         * @constructor 名称：customMarkSymbol
         * @description 作用：自定义点样式
         * @param {object} size 大小
         * @param {object} color 颜色
         */
        customMarkSymbol: function (size, color) {
            var markSymbol = new esri.symbol.SimpleMarkerSymbol();
            markSymbol.color = color;
            markSymbol.size = size;
            return markSymbol;
        },
        customMarkSymbol: function (size, color) {
            var markSymbol = new esri.symbol.SimpleMarkerSymbol();
            markSymbol.color = new dojo.Color(color);
            markSymbol.size = size;
            return markSymbol;
        },
        /**
         * @constructor 名称：customFillSymbol
         * @description 作用：自定义填充样式
         * @param {object} color 颜色
         */
        customFillSymbol: function (color) {
            var simpleFillSymbol = new esri.symbol.SimpleFillSymbol();
            simpleFillSymbol.color = color;
            simpleFillSymbol.outline = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("red"), 1);
            return simpleFillSymbol;
        },
        /**
         * @constructor 名称：customPicFillSymbol
         * @description 作用：自定义图片填充样式
         * @param {string} url 图片地址
         * @param {object} width 宽度
         * @param {object} height 高度
         */
        customPicFillSymbol: function (url, width, height) {
            var outline = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("red"), 1);
            var picFillSymbol = esri.symbol.PictureFillSymbol(url, outline, width, height);
            return picFillSymbol;
        },
        /**
         * @constructor 名称：customLineSymbol
         * @description 作用：自定义线条样式
         * @param {object} color 颜色
         * @param {object} width 线宽度
         */
        customLineSymbol: function (color, width) {
            var sls = new esri.symbol.SimpleLineSymbol();
            sls.color = color;
            sls.width = width;
            return sls;
        },
        /**
         * @constructor 名称：pictureMarkerSymbol
         * @description 作用：自定义图片标注样式
         * @param {object} url 图片地址
         * @param {object} width 宽度
         * @param {object} height 高度
         * @param {object} offsetX 左偏移
         * @param {object} offsetY 上偏移
         */
        pictureMarkerSymbol: function (url, width, height, offsetX, offsetY) {
            var picMS = new esri.symbol.PictureMarkerSymbol(url, width, height);
            picMS.xoffset = offsetX;
            picMS.yoffset = offsetY;
            return picMS;
        }
    },
   //在线地图调用
    InitMap: function () {
        require([
            "esri/map",
            "esri/layers/WebTiledLayer",
            "esri/layers/WMTSLayer",
            "esri/layers/WMTSLayerInfo",
            "esri/layers/TileInfo",
            "esri/layers/TiledMapServiceLayer",
            "esri/geometry/Extent",
            "esri/SpatialReference",
            "esri/geometry/Point",
            "esri/toolbars/navigation",
            "esri/geometry/Circle",
            "esri/geometry/Polygon",
            "esri/toolbars/draw",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "esri/graphic",
            "esri/geometry/jsonUtils",
            "esri/Color",
            "dojo/parser",
            "esri/tasks/IdentifyTask",
            "esri/tasks/IdentifyParameters",
            "esri/tasks/BufferParameters",
            "dijit/form/Button",
            "dijit/layout/BorderContainer",
            "dijit/layout/ContentPane",
            "dojo/domReady!"
        ],
            function () {

                var tileInfo = new esri.layers.TileInfo({
                    "rows": 256,
                    "cols": 256,
                    "compressionQuality": 0,
                    "origin": {
                        "x": -180,
                        "y": 90
                    },
                    "spatialReference": {
                        "wkid": 4490
                    },
                    "lods": [
                        {
                            "level": 2,
                            "resolution": 0.3515625,
                            "scale": 147748796.52937502
                        },

                        {
                            "level": 3,
                            "resolution": 0.17578125,
                            "scale": 73874398.264687508
                        },

                        {
                            "level": 4,
                            "resolution": 0.087890625,
                            "scale": 36937199.132343754
                        },

                        {
                            "level": 5,
                            "resolution": 0.0439453125,
                            "scale": 18468599.566171877
                        },

                        {
                            "level": 6,
                            "resolution": 0.02197265625,
                            "scale": 9234299.7830859385
                        },

                        {
                            "level": 7,
                            "resolution": 0.010986328125,
                            "scale": 4617149.8915429693
                        },

                        {
                            "level": 8,
                            "resolution": 0.0054931640625,
                            "scale": 2308574.9457714846
                        },

                        {
                            "level": 9,
                            "resolution": 0.00274658203125,
                            "scale": 1154287.4728857423
                        },

                        {
                            "level": 10,
                            "resolution": 0.001373291015625,
                            "scale": 577143.73644287116
                        },

                        {
                            "level": 11,
                            "resolution": 0.0006866455078125,
                            "scale": 288571.86822143558
                        },

                        {
                            "level": 12,
                            "resolution": 0.00034332275390625,
                            "scale": 144285.93411071779
                        },

                        {
                            "level": 13,
                            "resolution": 0.000171661376953125,
                            "scale": 72142.967055358895
                        },

                        {
                            "level": 14,
                            "resolution": 8.58306884765625e-005,
                            "scale": 36071.483527679447
                        },

                        {
                            "level": 15,
                            "resolution": 4.291534423828125e-005,
                            "scale": 18035.741763839724
                        },

                        {
                            "level": 16,
                            "resolution": 2.1457672119140625e-005,
                            "scale": 9017.8708819198619
                        },

                        {
                            "level": 17,
                            "resolution": 1.0728836059570313e-005,
                            "scale": 4508.9354409599309
                        },

                        {
                            "level": 18,
                            "resolution": 5.3644180297851563e-006,
                            "scale": 2254.4677204799655
                        }
                    ]
                });
                var baseMap = new esri.layers.WebTiledLayer("http://\${subDomain}.tianditu.com/DataServer?T=vec_c&X=\${col}&Y=\${row}&L=\${level}&tk=9641d4bc7cc5c1fa85a9f08daad96fe9", {
                    "copyright": "Tianditu",
                    "id": "Tianditu",
                    "subDomains": ["t0", "t1", "t2"],
                    "tileInfo": tileInfo
                });
                Freedom.Map.mapControl.addLayer(baseMap);
                var baseMapMarker = new esri.layers.WebTiledLayer("http://\${subDomain}.tianditu.com/DataServer?T=cva_c&X=\${col}&Y=\${row}&L=\${level}&tk=9641d4bc7cc5c1fa85a9f08daad96fe9", {
                    "copyright": "Tianditu",
                    "id": "Tianditu2",
                    "subDomains": ["t0", "t1", "t2"],
                    "tileInfo": tileInfo
                });
                Freedom.Map.mapControl.addLayer(baseMapMarker);
                //Freedom.Map.mapControl.setLevel(10);
                //Freedom.Map.zoom2FullExtent();
            }
        );
    },
    //图例函数
    _initModuleLengend_diy: function (inputGrades, inputColors) {
        var div = $("<div id='legendDiv'>");
        div.attr("class", "info legend");
        var defaultGrades = [0, 10, 20, 50, 100, 200, 500, 1000],
            defaultColors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'],
            grades = inputGrades.length > 0 ? inputGrades : defaultGrades,
            colors = inputColors.length > 0 ? inputColors : defaultColors,
            labels = [],
            from, to;
        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '+'));
            console.log(labels[i]);
        }
        div.append(labels.join('<br>'));
        $("body").append(div);
        // 根据属性范围设置渲染颜色
        function getColor(d) {
            return d > grades[6] ? colors[7] :
                d > grades[5] ? colors[6] :
                    d > grades[4] ? colors[5] :
                        d > grades[3] ? colors[4] :
                            d > grades[2] ? colors[3] :
                                d > grades[1] ? colors[2] :
                                    d > grades[0] ? colors[1] :
                                        colors[0];
        }
    },
    _initModuleLengend_diy1: function (inputGrades, inputColors) {
        var div = $("<div id='legendDiv'>");
        div.attr("class", "info legend");
        var defaultGrades = [0, 10, 20, 50, 100, 200, 500, 1000],
            defaultColors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'],
            grades = inputGrades.length > 0 ? inputGrades : defaultGrades,
            colors = inputColors.length > 0 ? inputColors : defaultColors,
            labels = [],
            from, to;
        for (var i = 0; i < grades.length; i++) {
            labels.push(
               '<i style="background:' + colors[i] + '"></i> ' + grades[i]);              
        }
        div.append(labels.join('<br>'));
        $("body").append(div);  
    }
     
};