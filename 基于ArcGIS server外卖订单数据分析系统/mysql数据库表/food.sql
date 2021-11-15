/*
Navicat MySQL Data Transfer

Source Server         : ym-mysql
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : take-out food

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2020-12-23 23:07:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `food`
-- ----------------------------
DROP TABLE IF EXISTS `food`;
CREATE TABLE `food` (
  `id` int(5) NOT NULL,
  `fshop` varchar(30) DEFAULT NULL,
  `x` char(20) DEFAULT NULL,
  `y` char(20) DEFAULT NULL,
  `class` varchar(30) DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of food
-- ----------------------------
INSERT INTO `food` VALUES ('1', '拉芳舍咖啡馆', '121.504975', '28.764567', '咖啡', '');
INSERT INTO `food` VALUES ('2', '肯德基(杜川路)', '121.498649', '28.761804', '休闲', '');
INSERT INTO `food` VALUES ('3', '上岛咖啡(巾山东路店)', '121.14315', '28.845773', '咖啡', '');
INSERT INTO `food` VALUES ('4', '肯德基(柏叶西路)', '121.142413', '28.849801', '休闲', '');
INSERT INTO `food` VALUES ('5', '壹期壹会港式甜品', '121.139122', '28.84629', '休闲', '');
INSERT INTO `food` VALUES ('6', '肯德基(煌朝大酒店店)', '121.12646', '28.84537', '休闲', '');
INSERT INTO `food` VALUES ('7', 'CC咖啡烘培坊', '121.14405', '28.845581', '休闲', '');
INSERT INTO `food` VALUES ('8', '兰桂坊酒吧', '121.137329', '28.849153', '酒吧', '');
INSERT INTO `food` VALUES ('9', '三点一刻bar', '121.124359', '28.85013', '酒吧', '');
INSERT INTO `food` VALUES ('10', '临海新荣记', '121.122095', '28.835845', '中餐', '');
INSERT INTO `food` VALUES ('11', '江南荣庄', '121.135452', '28.820989', '中餐', '');
INSERT INTO `food` VALUES ('12', '巾山火锅城', '121.136441', '28.845101', '火锅', '');
INSERT INTO `food` VALUES ('13', '新荣记', '121.169494', '28.853958', '中餐', '');
INSERT INTO `food` VALUES ('14', '川福火锅', '121.13674', '28.85239', '火锅', '');
INSERT INTO `food` VALUES ('15', '荣莊', '121.128299', '28.831383', '中餐', '');
INSERT INTO `food` VALUES ('16', '荣小馆', '121.148109', '28.840242', '中餐', '');
INSERT INTO `food` VALUES ('17', '樱花肥牛', '121.127304', '28.845939', '中餐', '');
INSERT INTO `food` VALUES ('18', '鲜芋仙', '121.137756', '28.842901', '休闲', '');
INSERT INTO `food` VALUES ('19', '咖语咖啡', '121.117034', '28.839342', '咖啡', '');
INSERT INTO `food` VALUES ('20', '有意思休闲餐厅', '121.129264', '28.853845', '休闲', '');
INSERT INTO `food` VALUES ('21', '白塔桥饭店', '121.116683', '28.847116', '中餐', '');
INSERT INTO `food` VALUES ('22', 'CC咖啡洪培坊', '121.126716', '28.845987', '休闲', '');
INSERT INTO `food` VALUES ('23', '临海白塔桥饭店', '121.112793', '28.847845', '中餐', '');
INSERT INTO `food` VALUES ('24', '临海国贸大酒店中餐厅', '121.124771', '28.842951', '中餐', '');
INSERT INTO `food` VALUES ('25', '新荣记（东湖店）', '121.165192', '28.856537', '中餐', '');
INSERT INTO `food` VALUES ('26', '双平麦虾店', '121.123405', '28.84601', '休闲', '');
INSERT INTO `food` VALUES ('27', '鸿记餐厅', '121.13811', '28.84259', '中餐', '');
INSERT INTO `food` VALUES ('28', '聚鑫港式茶餐厅', '121.135185', '28.849412', '西餐', '');
INSERT INTO `food` VALUES ('29', '小肥羊火锅', '121.142456', '28.845714', '火锅', '');
INSERT INTO `food` VALUES ('30', '风韵龙虾临海旗舰店', '121.139389', '28.835306', '西餐', '');
INSERT INTO `food` VALUES ('31', '原子弹小吃', '121.149485', '28.856208', '休闲', null);
INSERT INTO `food` VALUES ('32', '临海星巴克', '121.14463', '28.85208', '休闲', null);
INSERT INTO `food` VALUES ('33', '如家饭店', '121.16435', '28.87356', '中餐', null);
INSERT INTO `food` VALUES ('34', '澳门豆捞(临海店)', '121.170915', '28.866175', '中餐', null);
INSERT INTO `food` VALUES ('35', '炭膳宫韩国烧烤', '121.126754', '28.846395', '西餐', null);
INSERT INTO `food` VALUES ('36', '旅途咖啡馆', '121.49553', '28.76931', '咖啡', null);
INSERT INTO `food` VALUES ('37', '海鲜码头', '121.151634', '28.861267', '海鲜', null);
INSERT INTO `food` VALUES ('38', '小家居', '121.153282', '28.859174', '中餐', null);
INSERT INTO `food` VALUES ('39', '澜桂坊', '121.133651', '28.84992', '中餐', null);
INSERT INTO `food` VALUES ('40', '老朱麦饼', '121.11792', '28.84793', '休闲', null);
INSERT INTO `food` VALUES ('41', '宜麦香城(鹿城路店)', '121.13018', '28.845655', '中餐', null);
INSERT INTO `food` VALUES ('42', '伊之友饼屋台州府路店', '121.136253', '28.84465', '休闲', null);
INSERT INTO `food` VALUES ('43', '和记私房菜', '121.117072', '28.841149', '中餐', null);
INSERT INTO `food` VALUES ('44', '亿口香', '121.135131', '28.838556', '中餐', null);
INSERT INTO `food` VALUES ('45', '姊妹饮食店', '121.501152', '28.762495', '中餐', null);
INSERT INTO `food` VALUES ('46', '江南古城', '121.30369', '28.70248', '中餐', null);
INSERT INTO `food` VALUES ('47', '买几客鸡排', '121.157493', '28.883367', '休闲', null);
INSERT INTO `food` VALUES ('48', '星巢咖啡馆', '121.16841', '28.87044', '咖啡', null);
INSERT INTO `food` VALUES ('49', '云湖厨房', '121.187774', '28.862897', '中餐', null);
INSERT INTO `food` VALUES ('50', '忆品香龙虾', '121.151931', '28.861524', '休闲', null);
INSERT INTO `food` VALUES ('51', '越界', '121.14419', '28.85278', '西餐', null);
INSERT INTO `food` VALUES ('52', '临海金腾商务酒店ECM', '121.14969', '28.852161', '中餐', null);
INSERT INTO `food` VALUES ('53', '左岸厨房', '121.215454', '28.851301', '中餐', null);
INSERT INTO `food` VALUES ('54', '耀达商场小吃店', '121.215461', '28.851299', '小吃', null);
INSERT INTO `food` VALUES ('55', '新天地烘焙(洪池店)', '121.127334', '28.850515', '小吃', null);
INSERT INTO `food` VALUES ('56', '周太麦饼', '121.143409', '28.850025', '小吃', null);
INSERT INTO `food` VALUES ('57', '丁哥黑鱼馆(崇和路)', '121.133651', '28.849939', '西餐', null);
INSERT INTO `food` VALUES ('58', 'my house', '121.119781', '28.849849', '休闲', null);
INSERT INTO `food` VALUES ('59', '古咖主题小馆', '121.1173', '28.84784', '休闲', null);
INSERT INTO `food` VALUES ('60', '壹期壹会', '121.134094', '28.847295', '休闲', null);
INSERT INTO `food` VALUES ('61', '舌尖传说主题餐厅', '121.14854', '28.84541', '中餐', null);
INSERT INTO `food` VALUES ('62', '舌尖传说主题餐厅', '121.14827', '28.84536', '中餐', null);
INSERT INTO `food` VALUES ('63', '靖江春天', '121.149169', '28.8442', '中餐', null);
INSERT INTO `food` VALUES ('64', '蒋招娣小吃店', '121.12454', '28.84274', '小吃', null);
INSERT INTO `food` VALUES ('65', '小米餐厅', '121.14742', '28.8424', '中餐', null);
INSERT INTO `food` VALUES ('66', '靖江春天', '121.13842', '28.84225', '中餐', null);
INSERT INTO `food` VALUES ('67', '银泰•绿茶致青春', '121.124655', '28.841033', '中餐', null);
INSERT INTO `food` VALUES ('68', '两水烧烤', '121.18438', '28.78908', '中餐', null);
INSERT INTO `food` VALUES ('69', '鼎尊堂炖品阁', '121.498283', '28.767923', '中餐', null);
INSERT INTO `food` VALUES ('70', '旅途咖啡馆', '121.49953', '28.76647', '中餐', null);
INSERT INTO `food` VALUES ('71', '姐妹饮食', '121.498481', '28.765481', '中餐', null);
INSERT INTO `food` VALUES ('72', 'good coffee', '121.49628', '28.757', '中餐', null);
INSERT INTO `food` VALUES ('73', '临海小学', '121.27441', '28.74378', '中餐', null);
INSERT INTO `food` VALUES ('74', '仙人山庄', '121.057365', '29.03799', '中餐', null);
INSERT INTO `food` VALUES ('75', '麦香村', '121.106676', '28.99363', '中餐', null);
INSERT INTO `food` VALUES ('76', '溪口粮站酒家', '121.060394', '28.95329', '中餐', null);
INSERT INTO `food` VALUES ('77', '两头门饭店', '121.21698', '28.9474', '中餐', null);
INSERT INTO `food` VALUES ('78', '金元渔庄', '121.503776', '28.926008', '中餐', null);
INSERT INTO `food` VALUES ('79', '白沙岛渔家海鲜城', '121.503784', '28.925992', '中餐', null);
INSERT INTO `food` VALUES ('80', '老李记麦虾面', '121.269363', '28.923353', '中餐', null);
INSERT INTO `food` VALUES ('81', '临江小吃', '121.197578', '28.880094', '中餐', null);
INSERT INTO `food` VALUES ('82', '神仙居早餐', '121.21504', '28.87773', '中餐', null);
INSERT INTO `food` VALUES ('83', '天美食府', '121.16289', '28.871589', '中餐', null);
INSERT INTO `food` VALUES ('84', '火焰山烤蹄', '121.15097', '28.87042', '中餐', null);
INSERT INTO `food` VALUES ('85', '朝阳渔港', '121.152839', '28.863529', '中餐', null);
INSERT INTO `food` VALUES ('86', '华侨大酒店餐厅', '121.168683', '28.862551', '中餐', null);
INSERT INTO `food` VALUES ('87', '醉江南风味餐厅', '121.168853', '28.86145', '中餐', null);
INSERT INTO `food` VALUES ('88', '麻辣烫', '121.154548', '28.861396', '中餐', null);
INSERT INTO `food` VALUES ('89', '石师傅包子', '121.154701', '28.860378', '中餐', null);
INSERT INTO `food` VALUES ('90', '聚鑫港式茶餐厅 一号店', '121.154296', '28.860055', '中餐', null);
INSERT INTO `food` VALUES ('91', '随意美食', '121.150711', '28.85951', '中餐', null);
INSERT INTO `food` VALUES ('92', '舒舒面馆', '121.15039', '28.857736', '中餐', null);
INSERT INTO `food` VALUES ('93', '长安街包子铺', '120.985694', '28.857341', '中餐', null);
INSERT INTO `food` VALUES ('94', '长安路大排档', '120.98677', '28.855918', '中餐', null);
INSERT INTO `food` VALUES ('95', '灵敏麦饼', '121.149612', '28.855655', '中餐', null);
INSERT INTO `food` VALUES ('96', '江南印象', '121.153305', '28.854402', '中餐', null);
INSERT INTO `food` VALUES ('97', '大田大排面协会', '121.13613', '28.85318', '中餐', null);
INSERT INTO `food` VALUES ('98', '甜心炖品屋', '121.137519', '28.853153', '中餐', null);
INSERT INTO `food` VALUES ('99', '优卡冰淇淋', '121.134323', '28.853065', '中餐', null);
INSERT INTO `food` VALUES ('100', '彩蝶飞飞', '121.134353', '28.85305', '中餐', null);
INSERT INTO `food` VALUES ('101', 'SWAG', '121.12432', '28.85232', '中餐', null);
INSERT INTO `food` VALUES ('102', '麦当劳 临海服务区店', '121.161414', '28.851738', '中餐', null);
INSERT INTO `food` VALUES ('103', '双平麦虾', '121.215454', '28.851297', '中餐', null);
INSERT INTO `food` VALUES ('104', '鼎峰记', '121.215454', '28.851293', '中餐', null);
INSERT INTO `food` VALUES ('105', '扇耗海鲜粥', '121.150444', '28.85054', '中餐', null);
INSERT INTO `food` VALUES ('106', '川味观', '121.137351', '28.849718', '中餐', null);
INSERT INTO `food` VALUES ('107', '川香味川菜馆', '121.144342', '28.849654', '中餐', null);
INSERT INTO `food` VALUES ('108', '菲滋意式休闲餐厅', '121.12944', '28.84818', '中餐', null);
INSERT INTO `food` VALUES ('109', '大人面馆', '121.110939', '28.847778', '中餐', null);
INSERT INTO `food` VALUES ('110', '面道', '121.142303', '28.847232', '中餐', null);
INSERT INTO `food` VALUES ('111', '宜麦香城(腊梅店)', '121.144432', '28.846824', '中餐', null);
INSERT INTO `food` VALUES ('112', '贪嘴鸡煲', '121.144416', '28.846809', '中餐', null);
INSERT INTO `food` VALUES ('113', '朱记麦虾店', '121.1305', '28.8465', '中餐', null);
INSERT INTO `food` VALUES ('114', '天香楼食府', '121.13038', '28.84587', '中餐', null);
INSERT INTO `food` VALUES ('115', 'CC烘培', '121.1269', '28.84578', '中餐', null);
INSERT INTO `food` VALUES ('116', '红石梁', '121.13044', '28.8456', '中餐', null);
INSERT INTO `food` VALUES ('117', '一鸣真鲜奶吧(回浦店)', '121.120796', '28.845582', '中餐', null);
INSERT INTO `food` VALUES ('118', '果麦de鲜饮创作(广场路店)', '121.127464', '28.845117', '中餐', null);
INSERT INTO `food` VALUES ('119', '回忆面馆', '121.116699', '28.844974', '中餐', null);
INSERT INTO `food` VALUES ('120', '李兴麦虾', '121.13069', '28.84493', '中餐', null);
INSERT INTO `food` VALUES ('121', '元祖(临海店)', '121.13607', '28.844495', '中餐', null);
INSERT INTO `food` VALUES ('122', '老李麦虾', '121.137842', '28.843969', '中餐', null);
INSERT INTO `food` VALUES ('123', '小鸣厨房', '121.123641', '28.84353', '中餐', null);
INSERT INTO `food` VALUES ('124', '华必和', '121.12619', '28.843439', '中餐', null);
INSERT INTO `food` VALUES ('125', '檀香姜汁扁食', '121.118152', '28.843048', '中餐', null);
INSERT INTO `food` VALUES ('126', '临海爱尚商务宾馆', '121.123624', '28.842895', '中餐', null);
INSERT INTO `food` VALUES ('127', '白塔桥头', '121.116844', '28.842687', '中餐', null);
INSERT INTO `food` VALUES ('128', '紫腾排档', '121.130577', '28.842617', '中餐', null);
INSERT INTO `food` VALUES ('129', '果麦de鲜饮创作 耀达百货店', '121.129609', '28.842545', '中餐', null);
INSERT INTO `food` VALUES ('130', '一间面铺', '121.134635', '28.842237', '中餐', null);
INSERT INTO `food` VALUES ('131', '新天地烘焙(台州府路店)', '121.138214', '28.842157', '中餐', null);
INSERT INTO `food` VALUES ('132', '青蜜小筑', '121.117897', '28.842094', '中餐', null);
INSERT INTO `food` VALUES ('133', '青蜜小筑', '121.116821', '28.842061', '中餐', null);
INSERT INTO `food` VALUES ('134', '阿强麦饼', '121.13256', '28.841747', '中餐', null);
INSERT INTO `food` VALUES ('135', '丽江腊排骨煲', '121.141654', '28.840915', '中餐', null);
INSERT INTO `food` VALUES ('136', '昌好记', '121.116668', '28.840196', '中餐', null);
INSERT INTO `food` VALUES ('137', '九畹兰庄', '121.110694', '28.832811', '中餐', null);
INSERT INTO `food` VALUES ('138', '屯桥小笼包', '121.175794', '28.828574', '中餐', null);
INSERT INTO `food` VALUES ('139', '健翔小海鲜', '121.175794', '28.828564', '中餐', null);
INSERT INTO `food` VALUES ('140', '茶理一世奶茶铺', '121.12879', '28.82638', '中餐', null);
INSERT INTO `food` VALUES ('141', '健跳小海鲜', '121.01786', '28.814777', '中餐', null);
INSERT INTO `food` VALUES ('142', '杜桥镇应山塘村', '121.56797', '28.787186', '中餐', null);
INSERT INTO `food` VALUES ('143', '老宋饭店', '121.252187', '28.782892', '中餐', null);
INSERT INTO `food` VALUES ('144', '山里人家', '121.412696', '28.778987', '中餐', null);
INSERT INTO `food` VALUES ('145', '坐铺农家乐', '121.571252', '28.766015', '中餐', null);
INSERT INTO `food` VALUES ('146', '瘌痢头炒麻糍', '121.498466', '28.765478', '中餐', null);
INSERT INTO `food` VALUES ('147', '湘味小炒', '121.490066', '28.763319', '中餐', null);
INSERT INTO `food` VALUES ('148', '金富特色面馆', '121.49396', '28.76255', '中餐', null);
INSERT INTO `food` VALUES ('149', '古茗奶茶', '121.491422', '28.762014', '中餐', null);
INSERT INTO `food` VALUES ('150', '春龙小吃', '121.498855', '28.761625', '中餐', null);
INSERT INTO `food` VALUES ('151', '英力小炒', '121.490623', '28.760881', '中餐', null);
INSERT INTO `food` VALUES ('152', '清潭山庄', '121.217277', '28.758643', '中餐', null);
INSERT INTO `food` VALUES ('153', '黄土岭圣女湖农家乐', '121.241012', '28.741525', '中餐', null);
INSERT INTO `food` VALUES ('159', '7080主题餐厅', '121.442565', '28.682537', '中餐', null);
INSERT INTO `food` VALUES ('160', '海杰排档', '121.442558', '28.682535', '中餐', null);
INSERT INTO `food` VALUES ('162', '甄如宴', '121.208877', '28.654098', '中餐', null);
INSERT INTO `food` VALUES ('164', '张记川菜馆', '121.38771', '28.577796', '中餐', null);
INSERT INTO `food` VALUES ('165', '状元食府', '121.306144', '28.379743', '中餐', null);
INSERT INTO `food` VALUES ('319', null, null, null, '', null);
