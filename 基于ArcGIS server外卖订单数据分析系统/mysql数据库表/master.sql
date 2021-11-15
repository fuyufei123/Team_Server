/*
Navicat MySQL Data Transfer

Source Server         : ym-mysql
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : take-out food

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2020-12-23 23:08:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `master`
-- ----------------------------
DROP TABLE IF EXISTS `master`;
CREATE TABLE `master` (
  `id` int(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `password` int(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of master
-- ----------------------------
INSERT INTO `master` VALUES ('1', 'ym', '111');
