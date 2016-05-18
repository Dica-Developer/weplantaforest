-- MySQL dump 10.13  Distrib 5.1.73, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ipat
-- ------------------------------------------------------
-- Server version	5.1.73-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Abo`
--

DROP TABLE IF EXISTS `Abo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Abo` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_amount` int(11) NOT NULL,
  `_last` bigint(20) DEFAULT NULL,
  `_period` int(11) NOT NULL,
  `_timeStamp` bigint(20) NOT NULL,
  `_type` int(11) NOT NULL,
  `_user__userId` bigint(20) DEFAULT NULL,
  `_active` bit(1) NOT NULL,
  `_currentCart__cartId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK1004EB5D3ECA7` (`_user__userId`),
  KEY `FK1004EE8A367C1` (`_currentCart__cartId`),
  CONSTRAINT `FK1004EB5D3ECA7` FOREIGN KEY (`_user__userId`) REFERENCES `User` (`_userId`),
  CONSTRAINT `FK1004EE8A367C1` FOREIGN KEY (`_currentCart__cartId`) REFERENCES `Cart` (`_cartId`)
) ENGINE=InnoDB AUTO_INCREMENT=520 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Article`
--

DROP TABLE IF EXISTS `Article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Article` (
  `_articleId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_createdOn` bigint(20) DEFAULT NULL,
  `_lastEditedOn` bigint(20) DEFAULT NULL,
  `_articleType` int(11) NOT NULL,
  `_lang` int(11) NOT NULL,
  `_showFull` bit(1) NOT NULL,
  `_title` varchar(10000) DEFAULT '',
  `_intro` text,
  `_imageFileName` varchar(255) DEFAULT NULL,
  `_imageAlign` varchar(255) DEFAULT NULL,
  `_owner__userId` bigint(20) NOT NULL,
  `_customCreationDate` datetime DEFAULT NULL,
  `_imageSize` int(11) DEFAULT NULL,
  `_imageZoomable` bit(1) DEFAULT NULL,
  `_imageCopyrights` varchar(255) DEFAULT NULL,
  `_imageCopyrightsLink` varchar(255) DEFAULT NULL,
  `_imageCC` varchar(255) DEFAULT NULL,
  `_imageCCLink` varchar(255) DEFAULT NULL,
  `_visible` bit(1) DEFAULT NULL,
  PRIMARY KEY (`_articleId`),
  KEY `FK379164D6963DF3B1` (`_owner__userId`),
  CONSTRAINT `FK379164D6963DF3B1` FOREIGN KEY (`_owner__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1589 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Attachment`
--

DROP TABLE IF EXISTS `Attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Attachment` (
  `_attachmentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_title` varchar(255) DEFAULT NULL,
  `_filePath` varchar(255) DEFAULT NULL,
  `_owner__userId` bigint(20) NOT NULL,
  PRIMARY KEY (`_attachmentId`),
  KEY `FK1C93543963DF3B1` (`_owner__userId`),
  CONSTRAINT `FK1C93543963DF3B1` FOREIGN KEY (`_owner__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Cart`
--

DROP TABLE IF EXISTS `Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cart` (
  `_cartId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_timeStamp` bigint(20) DEFAULT NULL,
  `_cartState` varchar(255) DEFAULT NULL,
  `_callbackParams` varchar(1024) DEFAULT NULL,
  `_buyer__userId` bigint(20) DEFAULT NULL,
  `_callBackBanktransactionid` varchar(32) DEFAULT NULL,
  `_callBackBetrag` varchar(16) DEFAULT NULL,
  `_callBackEmail` varchar(256) DEFAULT NULL,
  `_callBackFirma` varchar(256) DEFAULT NULL,
  `_callBackFirmanzusatz` varchar(256) DEFAULT NULL,
  `_callBackLand` varchar(16) DEFAULT NULL,
  `_callBackMethod` varchar(128) DEFAULT NULL,
  `_callBackNachname` varchar(128) DEFAULT NULL,
  `_callBackOid` varchar(32) DEFAULT NULL,
  `_callBackOrt` varchar(128) DEFAULT NULL,
  `_callBackPlz` varchar(16) DEFAULT NULL,
  `_callBackStatus` varchar(32) DEFAULT NULL,
  `_callBackStrasse` varchar(32) DEFAULT NULL,
  `_callBackTimestamp` varchar(32) DEFAULT NULL,
  `_callBackTrackingcode` varchar(32) DEFAULT NULL,
  `_callBackTransactionid` varchar(64) DEFAULT NULL,
  `_callBackVorname` varchar(128) DEFAULT NULL,
  `_callBackVzid` varchar(32) DEFAULT NULL,
  `_callBackZahlungsart` varchar(32) DEFAULT NULL,
  `_receipt__receiptId` bigint(20) DEFAULT NULL,
  `_event__id` bigint(20) DEFAULT NULL,
  `_abo__id` bigint(20) DEFAULT NULL,
  `_code__id` bigint(20) DEFAULT NULL,
  `_client__id` bigint(20) DEFAULT NULL,
  `_targetedPrice` float DEFAULT '0',
  PRIMARY KEY (`_cartId`),
  KEY `FK1FEF40D00702B1` (`_buyer__userId`),
  KEY `FK1FEF40F2388566` (`_receipt__receiptId`),
  KEY `FK1FEF4054D2D904` (`_event__id`),
  KEY `FK1FEF40406DCBEC` (`_abo__id`),
  KEY `FK1FEF403A4F3FE0` (`_code__id`),
  KEY `FK1FEF4048AB75DC` (`_client__id`),
  CONSTRAINT `FK1FEF403A4F3FE0` FOREIGN KEY (`_code__id`) REFERENCES `Code` (`_id`),
  CONSTRAINT `FK1FEF40406DCBEC` FOREIGN KEY (`_abo__id`) REFERENCES `Abo` (`_id`),
  CONSTRAINT `FK1FEF4048AB75DC` FOREIGN KEY (`_client__id`) REFERENCES `Client` (`_id`),
  CONSTRAINT `FK1FEF4054D2D904` FOREIGN KEY (`_event__id`) REFERENCES `Event` (`_id`),
  CONSTRAINT `FK1FEF40D00702B1` FOREIGN KEY (`_buyer__userId`) REFERENCES `User` (`_userId`),
  CONSTRAINT `FK1FEF40F2388566` FOREIGN KEY (`_receipt__receiptId`) REFERENCES `Receipt` (`_receiptId`)
) ENGINE=InnoDB AUTO_INCREMENT=13015 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `CartItem`
--

DROP TABLE IF EXISTS `CartItem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CartItem` (
  `_cartItemId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_plantName` varchar(100) DEFAULT NULL,
  `_amount` int(11) NOT NULL,
  `_plantArticleId` bigint(20) DEFAULT NULL,
  `_basePricePerPiece` decimal(7,2) DEFAULT NULL,
  `_scontoPerPiece` decimal(7,2) DEFAULT NULL,
  `_fundingPerPiece` decimal(7,2) DEFAULT NULL,
  `_totalPrice` decimal(7,2) DEFAULT NULL,
  `_cart__cartId` bigint(20) DEFAULT NULL,
  `_treeType_treeTypeId` bigint(20) DEFAULT NULL,
  `_treeId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_cartItemId`),
  KEY `FK4393E7323CDF466` (`_cart__cartId`),
  KEY `FK4393E73A425551F` (`_treeType_treeTypeId`),
  CONSTRAINT `FK4393E7323CDF466` FOREIGN KEY (`_cart__cartId`) REFERENCES `Cart` (`_cartId`),
  CONSTRAINT `FK4393E73A425551F` FOREIGN KEY (`_treeType_treeTypeId`) REFERENCES `TreeType` (`treeTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=18469 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Certificate`
--

DROP TABLE IF EXISTS `Certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Certificate` (
  `_certId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_number` varchar(255) NOT NULL,
  `_text` varchar(255) DEFAULT NULL,
  `_creator__userId` bigint(20) NOT NULL,
  PRIMARY KEY (`_certId`),
  UNIQUE KEY `_number` (`_number`),
  KEY `FKD7C8E977DC877BEA` (`_creator__userId`),
  CONSTRAINT `FKD7C8E977DC877BEA` FOREIGN KEY (`_creator__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=898 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Certificate_Cart`
--

DROP TABLE IF EXISTS `Certificate_Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Certificate_Cart` (
  `Certificate__certId` bigint(20) NOT NULL,
  `_carts__cartId` bigint(20) NOT NULL,
  KEY `FK2ECC1108D742E7BB` (`_carts__cartId`),
  KEY `FK2ECC11082D7624A1` (`Certificate__certId`),
  CONSTRAINT `FK2ECC11082D7624A1` FOREIGN KEY (`Certificate__certId`) REFERENCES `Certificate` (`_certId`),
  CONSTRAINT `FK2ECC1108D742E7BB` FOREIGN KEY (`_carts__cartId`) REFERENCES `Cart` (`_cartId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Click`
--

DROP TABLE IF EXISTS `Click`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Click` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_height` int(11) DEFAULT NULL,
  `_timeStamp` bigint(20) DEFAULT NULL,
  `_trigger` int(11) NOT NULL,
  `_user` bigint(20) DEFAULT NULL,
  `_width` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5108 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Client` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_host` varchar(128) DEFAULT NULL,
  `_token` varchar(16) DEFAULT NULL,
  `_user__userId` bigint(20) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK7877DFEBB5D3ECA7` (`_user__userId`),
  CONSTRAINT `FK7877DFEBB5D3ECA7` FOREIGN KEY (`_user__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ClientUser`
--

DROP TABLE IF EXISTS `ClientUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ClientUser` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_token` varchar(255) NOT NULL,
  `_client__id` bigint(20) NOT NULL,
  `_user__userId` bigint(20) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `FKB888525648AB75DC` (`_client__id`),
  KEY `FKB8885256B5D3ECA7` (`_user__userId`),
  CONSTRAINT `FKB888525648AB75DC` FOREIGN KEY (`_client__id`) REFERENCES `Client` (`_id`),
  CONSTRAINT `FKB8885256B5D3ECA7` FOREIGN KEY (`_user__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Code`
--

DROP TABLE IF EXISTS `Code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Code` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_amount` float DEFAULT NULL,
  `_code` varchar(255) NOT NULL,
  `_month` int(11) NOT NULL,
  `_number` int(11) NOT NULL,
  `_treeCount` int(11) DEFAULT NULL,
  `_year` int(11) NOT NULL,
  `_cart__cartId` bigint(20) DEFAULT NULL,
  `_event__id` bigint(20) DEFAULT NULL,
  `_evaluated` bit(1) NOT NULL,
  `_gift__id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_code` (`_code`),
  KEY `FK20220D54D2D904` (`_event__id`),
  KEY `FK20220D23CDF466` (`_cart__cartId`),
  KEY `FK20220DA0AD5CE6` (`_gift__id`),
  CONSTRAINT `FK20220D23CDF466` FOREIGN KEY (`_cart__cartId`) REFERENCES `Cart` (`_cartId`),
  CONSTRAINT `FK20220D54D2D904` FOREIGN KEY (`_event__id`) REFERENCES `Event` (`_id`),
  CONSTRAINT `FK20220DA0AD5CE6` FOREIGN KEY (`_gift__id`) REFERENCES `Gift` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4286 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `_commentId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_text` varchar(30000) DEFAULT '',
  `_createdOn` bigint(20) DEFAULT NULL,
  `_commenter__userId` bigint(20) NOT NULL,
  `_tree__treeId` bigint(20) DEFAULT NULL,
  `_type` int(11) DEFAULT NULL,
  `_article__articleId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_commentId`),
  KEY `FK9BDE863FBDD4ECA` (`_commenter__userId`),
  KEY `FK9BDE863F90005860` (`_tree__treeId`),
  KEY `FK9BDE863F721FA5E4` (`_article__articleId`),
  CONSTRAINT `FK9BDE863F721FA5E4` FOREIGN KEY (`_article__articleId`) REFERENCES `Article` (`_articleId`),
  CONSTRAINT `FK9BDE863F90005860` FOREIGN KEY (`_tree__treeId`) REFERENCES `Tree` (`_treeId`),
  CONSTRAINT `FK9BDE863FBDD4ECA` FOREIGN KEY (`_commenter__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=804 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Event` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_name` varchar(255) NOT NULL,
  `_valid` int(11) DEFAULT NULL,
  `_team__teamId` bigint(20) DEFAULT NULL,
  `_user__userId` bigint(20) DEFAULT NULL,
  `_userReceiptReceiver` bit(1) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_name` (`_name`),
  KEY `FK403827AD0A7E1DD` (`_team__teamId`),
  KEY `FK403827AB5D3ECA7` (`_user__userId`),
  CONSTRAINT `FK403827AB5D3ECA7` FOREIGN KEY (`_user__userId`) REFERENCES `User` (`_userId`),
  CONSTRAINT `FK403827AD0A7E1DD` FOREIGN KEY (`_team__teamId`) REFERENCES `Team` (`_teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Gift`
--

DROP TABLE IF EXISTS `Gift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Gift` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_status` int(11) DEFAULT NULL,
  `_code__id` bigint(20) DEFAULT NULL,
  `_consignor__userId` bigint(20) DEFAULT NULL,
  `_recipient__userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `_code__id` (`_code__id`),
  KEY `FK21DD50AF5C497` (`_recipient__userId`),
  KEY `FK21DD503A4F3FE0` (`_code__id`),
  KEY `FK21DD50429E41E0` (`_consignor__userId`),
  CONSTRAINT `FK21DD503A4F3FE0` FOREIGN KEY (`_code__id`) REFERENCES `Code` (`_id`),
  CONSTRAINT `FK21DD50429E41E0` FOREIGN KEY (`_consignor__userId`) REFERENCES `User` (`_userId`),
  CONSTRAINT `FK21DD50AF5C497` FOREIGN KEY (`_recipient__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Image`
--

DROP TABLE IF EXISTS `Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Image` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_file` varchar(255) NOT NULL,
  `_type` int(11) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Message` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_removedByReceiver` bit(1) DEFAULT NULL,
  `_removedBySender` bit(1) DEFAULT NULL,
  `_status` int(11) DEFAULT NULL,
  `_subject` varchar(255) DEFAULT NULL,
  `_text` varchar(30000) DEFAULT '',
  `_timeStamp` bigint(20) NOT NULL,
  `_type` int(11) DEFAULT NULL,
  `_parent__id` bigint(20) DEFAULT NULL,
  `_receiver__userId` bigint(20) DEFAULT NULL,
  `_sender__userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK9C2397E73427CA9F` (`_parent__id`),
  KEY `FK9C2397E7DD947F4B` (`_receiver__userId`),
  KEY `FK9C2397E72CB21551` (`_sender__userId`),
  CONSTRAINT `FK9C2397E72CB21551` FOREIGN KEY (`_sender__userId`) REFERENCES `User` (`_userId`),
  CONSTRAINT `FK9C2397E73427CA9F` FOREIGN KEY (`_parent__id`) REFERENCES `Message` (`_id`),
  CONSTRAINT `FK9C2397E7DD947F4B` FOREIGN KEY (`_receiver__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Paragraph`
--

DROP TABLE IF EXISTS `Paragraph`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Paragraph` (
  `_paragraphId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_title` varchar(10000) DEFAULT '',
  `_text` text,
  `_imageFileName` varchar(255) DEFAULT NULL,
  `_imageAlign` varchar(255) DEFAULT NULL,
  `_article__articleId` bigint(20) NOT NULL,
  `_customCreationDate` datetime DEFAULT NULL,
  `_imageSize` int(11) DEFAULT NULL,
  `_imageZoomable` bit(1) DEFAULT NULL,
  `_imageCopyrights` varchar(255) DEFAULT NULL,
  `_imageCopyrightsLink` varchar(255) DEFAULT NULL,
  `_imageCC` varchar(255) DEFAULT NULL,
  `_imageCCLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`_paragraphId`),
  KEY `FKEBA1E94E721FA5E4` (`_article__articleId`),
  CONSTRAINT `FKEBA1E94E721FA5E4` FOREIGN KEY (`_article__articleId`) REFERENCES `Article` (`_articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=1725 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Param`
--

DROP TABLE IF EXISTS `Param`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Param` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_name` varchar(255) NOT NULL,
  `_value` varchar(10000) NOT NULL DEFAULT '',
  `_abo__id` bigint(20) DEFAULT NULL,
  `_client__id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK495286D406DCBEC` (`_abo__id`),
  KEY `FK495286D48AB75DC` (`_client__id`),
  CONSTRAINT `FK495286D406DCBEC` FOREIGN KEY (`_abo__id`) REFERENCES `Abo` (`_id`),
  CONSTRAINT `FK495286D48AB75DC` FOREIGN KEY (`_client__id`) REFERENCES `Client` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1480 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Plant`
--

DROP TABLE IF EXISTS `Plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Plant` (
  `_plantId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_name` varchar(255) DEFAULT NULL,
  `_description` text,
  `_longitude` float DEFAULT NULL,
  `_latitude` float DEFAULT NULL,
  `_zoom` int(11) DEFAULT NULL,
  `_shopOpening` bigint(20) DEFAULT NULL,
  `_shopClosing` bigint(20) DEFAULT NULL,
  `_shopActive` bit(1) DEFAULT NULL,
  `_visible` bit(1) DEFAULT NULL,
  `_mainImageFileName` varchar(255) DEFAULT NULL,
  `_googleMapsOverlayImageFileName` varchar(255) DEFAULT NULL,
  `_manager__userId` bigint(20) NOT NULL,
  `_parent__plantId` bigint(20) DEFAULT NULL,
  `_generateAvailable` bit(1) DEFAULT NULL,
  `_image__id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_plantId`),
  UNIQUE KEY `_name` (`_name`),
  KEY `FK499EA4BA77EFA6B` (`_manager__userId`),
  KEY `FK499EA4BA5ED4CFC` (`_parent__plantId`),
  KEY `FK499EA4B1ECFFE06` (`_image__id`),
  CONSTRAINT `FK499EA4B1ECFFE06` FOREIGN KEY (`_image__id`) REFERENCES `Image` (`_id`),
  CONSTRAINT `FK499EA4BA5ED4CFC` FOREIGN KEY (`_parent__plantId`) REFERENCES `Plant` (`_plantId`),
  CONSTRAINT `FK499EA4BA77EFA6B` FOREIGN KEY (`_manager__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlantArticle`
--

DROP TABLE IF EXISTS `PlantArticle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlantArticle` (
  `_articleId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_amount` bigint(20) DEFAULT NULL,
  `_description` varchar(20000) DEFAULT '',
  `_price__priceId` bigint(20) NOT NULL,
  `_treeType_treeTypeId` bigint(20) NOT NULL,
  `_plant__plantId` bigint(20) NOT NULL,
  PRIMARY KEY (`_articleId`),
  KEY `FKC6D4602B7F5FFCB9` (`_plant__plantId`),
  KEY `FKC6D4602BA8896DD7` (`_price__priceId`),
  KEY `FKC6D4602BA425551F` (`_treeType_treeTypeId`),
  CONSTRAINT `FKC6D4602B7F5FFCB9` FOREIGN KEY (`_plant__plantId`) REFERENCES `Plant` (`_plantId`),
  CONSTRAINT `FKC6D4602BA425551F` FOREIGN KEY (`_treeType_treeTypeId`) REFERENCES `TreeType` (`treeTypeId`),
  CONSTRAINT `FKC6D4602BA8896DD7` FOREIGN KEY (`_price__priceId`) REFERENCES `Price` (`_priceId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PlantImage`
--

DROP TABLE IF EXISTS `PlantImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PlantImage` (
  `_imageId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_title` varchar(400) DEFAULT '',
  `_text` text,
  `_file` varchar(500) DEFAULT NULL,
  `_date` bigint(20) DEFAULT NULL,
  `_plant__plantId` bigint(20) NOT NULL,
  PRIMARY KEY (`_imageId`),
  KEY `FKC53B85D07F5FFCB9` (`_plant__plantId`),
  CONSTRAINT `FKC53B85D07F5FFCB9` FOREIGN KEY (`_plant__plantId`) REFERENCES `Plant` (`_plantId`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Price`
--

DROP TABLE IF EXISTS `Price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Price` (
  `_priceId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_scontoType` varchar(255) NOT NULL,
  `_amount` decimal(7,2) DEFAULT NULL,
  `_funding` decimal(7,2) DEFAULT NULL,
  `_sconto` decimal(7,2) DEFAULT NULL,
  `_nrToSconto` smallint(6) DEFAULT NULL,
  `_marge` decimal(7,2) DEFAULT NULL,
  PRIMARY KEY (`_priceId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Receipt`
--

DROP TABLE IF EXISTS `Receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Receipt` (
  `_receiptId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_createdOn` bigint(20) DEFAULT NULL,
  `_invoiceNumber` varchar(255) DEFAULT NULL,
  `_ownerId` bigint(20) DEFAULT NULL,
  `_sentOn` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_receiptId`),
  UNIQUE KEY `_invoiceNumber` (`_invoiceNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2792 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Stat`
--

DROP TABLE IF EXISTS `Stat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stat` (
  `_statId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_amount` double DEFAULT NULL,
  `_count` bigint(20) DEFAULT NULL,
  `_hash` int(11) NOT NULL,
  `_mwd` int(11) DEFAULT NULL,
  `_period` int(11) NOT NULL,
  `_subject` int(11) NOT NULL,
  `_type` int(11) NOT NULL,
  `_year` int(11) DEFAULT NULL,
  `_referrer` varchar(255) DEFAULT NULL,
  `_userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_statId`)
) ENGINE=InnoDB AUTO_INCREMENT=1643 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tag`
--

DROP TABLE IF EXISTS `Tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tag` (
  `_id` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tag_Article`
--

DROP TABLE IF EXISTS `Tag_Article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tag_Article` (
  `_id` varchar(255) NOT NULL,
  `_articleId` bigint(20) NOT NULL,
  KEY `FKD6883911FB1FABA8` (`_id`),
  KEY `FKD688391165E26C5C` (`_articleId`),
  CONSTRAINT `FKD688391165E26C5C` FOREIGN KEY (`_articleId`) REFERENCES `Article` (`_articleId`),
  CONSTRAINT `FKD6883911FB1FABA8` FOREIGN KEY (`_id`) REFERENCES `Tag` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Team`
--

DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Team` (
  `_teamId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_description` text,
  `_name` varchar(256) NOT NULL,
  `_timeStamp` bigint(20) DEFAULT NULL,
  `_admin__userId` bigint(20) NOT NULL,
  PRIMARY KEY (`_teamId`),
  UNIQUE KEY `_name` (`_name`),
  UNIQUE KEY `_admin__userId` (`_admin__userId`),
  KEY `FK27B67DE413A84D` (`_admin__userId`),
  CONSTRAINT `FK27B67DE413A84D` FOREIGN KEY (`_admin__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tree`
--

DROP TABLE IF EXISTS `Tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tree` (
  `_treeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_desc` text,
  `_amount` int(11) NOT NULL,
  `_imagePath` varchar(255) DEFAULT NULL,
  `_longitude` float DEFAULT NULL,
  `_latitude` float DEFAULT NULL,
  `_submittedOn` bigint(20) NOT NULL,
  `_plantedOn` bigint(20) NOT NULL,
  `_owner__userId` bigint(20) NOT NULL,
  `_treeType_treeTypeId` bigint(20) DEFAULT NULL,
  `_plantArticle__articleId` bigint(20) DEFAULT NULL,
  `_image__id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`_treeId`),
  KEY `FK27E7BE963DF3B1` (`_owner__userId`),
  KEY `FK27E7BEA425551F` (`_treeType_treeTypeId`),
  KEY `FK27E7BE65718C9E` (`_plantArticle__articleId`),
  KEY `FK27E7BE1ECFFE06` (`_image__id`),
  CONSTRAINT `FK27E7BE1ECFFE06` FOREIGN KEY (`_image__id`) REFERENCES `Image` (`_id`),
  CONSTRAINT `FK27E7BE963DF3B1` FOREIGN KEY (`_owner__userId`) REFERENCES `User` (`_userId`),
  CONSTRAINT `FK27E7BEA425551F` FOREIGN KEY (`_treeType_treeTypeId`) REFERENCES `TreeType` (`treeTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=10386 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TreeType`
--

DROP TABLE IF EXISTS `TreeType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TreeType` (
  `treeTypeId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_name` varchar(255) DEFAULT NULL,
  `_annualCo2SavingInTons` double NOT NULL,
  `_description` varchar(20000) DEFAULT '',
  `_imageFile` varchar(255) DEFAULT NULL,
  `_infoLink` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`treeTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Tree_Certificate`
--

DROP TABLE IF EXISTS `Tree_Certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tree_Certificate` (
  `Tree__treeId` bigint(20) NOT NULL,
  `_certificate__certId` bigint(20) NOT NULL,
  KEY `FKF0798276D60EE81` (`Tree__treeId`),
  KEY `FKF07982762284B1E2` (`_certificate__certId`),
  CONSTRAINT `FKF07982762284B1E2` FOREIGN KEY (`_certificate__certId`) REFERENCES `Certificate` (`_certId`),
  CONSTRAINT `FKF0798276D60EE81` FOREIGN KEY (`Tree__treeId`) REFERENCES `Tree` (`_treeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `_userId` bigint(20) NOT NULL AUTO_INCREMENT,
  `_name` varchar(255) DEFAULT NULL,
  `_password` varchar(500) DEFAULT NULL,
  `_email` varchar(500) DEFAULT NULL,
  `_homepage` varchar(500) DEFAULT NULL,
  `_regDate` bigint(20) DEFAULT NULL,
  `_lastVisit` bigint(20) DEFAULT NULL,
  `_enabled` bit(1) NOT NULL,
  `_banned` bit(1) NOT NULL,
  `_organisation` varchar(255) DEFAULT NULL,
  `_location` varchar(255) DEFAULT NULL,
  `_rememberMeKey` bigint(20) DEFAULT NULL,
  `_activationKey` varchar(255) DEFAULT NULL,
  `_organisationType` int(11) DEFAULT NULL,
  `_aboutme` varchar(1000) DEFAULT NULL,
  `_newsletter` bit(1) DEFAULT NULL,
  `_lang` int(11) DEFAULT NULL,
  `_joinDate` bigint(20) DEFAULT NULL,
  `_team__teamId` bigint(20) DEFAULT NULL,
  `_city` varchar(255) DEFAULT NULL,
  `_firstName` varchar(255) DEFAULT NULL,
  `_lastName` varchar(255) DEFAULT NULL,
  `_street` varchar(255) DEFAULT NULL,
  `_zip` varchar(255) DEFAULT NULL,
  `_code__id` bigint(20) DEFAULT NULL,
  `_clientable` bit(1) DEFAULT NULL,
  `_fbAccount` bit(1) DEFAULT NULL,
  `_fbId` bigint(20) DEFAULT NULL,
  `_fbToken` varchar(255) DEFAULT NULL,
  `_widgetCalls` int(11) DEFAULT NULL,
  `_widgetClicks` int(11) DEFAULT NULL,
  `_visible` bit(1) DEFAULT NULL,
  `_imageName` varchar(255) DEFAULT 'default',
  `_managed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`_userId`),
  UNIQUE KEY `_name` (`_name`),
  KEY `FK285FEBD0A7E1DD` (`_team__teamId`),
  KEY `FK285FEB3A4F3FE0` (`_code__id`),
  CONSTRAINT `FK285FEB3A4F3FE0` FOREIGN KEY (`_code__id`) REFERENCES `Code` (`_id`),
  CONSTRAINT `FK285FEBD0A7E1DD` FOREIGN KEY (`_team__teamId`) REFERENCES `Team` (`_teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=3086 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User__roles`
--

DROP TABLE IF EXISTS `User__roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User__roles` (
  `User__userId` bigint(20) NOT NULL,
  `element` int(11) DEFAULT NULL,
  KEY `FK3839E092333482C8` (`User__userId`),
  CONSTRAINT `FK3839E092333482C8` FOREIGN KEY (`User__userId`) REFERENCES `User` (`_userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Voting`
--

DROP TABLE IF EXISTS `Voting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Voting` (
  `_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_align` int(11) DEFAULT NULL,
  `_count` int(11) DEFAULT NULL,
  `_title` varchar(255) DEFAULT NULL,
  `_type` int(11) DEFAULT NULL,
  `_article__articleId` bigint(20) NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK99134947721FA5E4` (`_article__articleId`),
  CONSTRAINT `FK99134947721FA5E4` FOREIGN KEY (`_article__articleId`) REFERENCES `Article` (`_articleId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Voting__options`
--

DROP TABLE IF EXISTS `Voting__options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Voting__options` (
  `Voting__id` bigint(20) NOT NULL,
  `element` varchar(255) DEFAULT NULL,
  KEY `FKE56895575037E4F5` (`Voting__id`),
  CONSTRAINT `FKE56895575037E4F5` FOREIGN KEY (`Voting__id`) REFERENCES `Voting` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Voting__votes`
--

DROP TABLE IF EXISTS `Voting__votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Voting__votes` (
  `Voting__id` bigint(20) NOT NULL,
  `element` int(11) DEFAULT NULL,
  KEY `FKEB0B73C25037E4F5` (`Voting__id`),
  CONSTRAINT `FKEB0B73C25037E4F5` FOREIGN KEY (`Voting__id`) REFERENCES `Voting` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-01 15:09:13
