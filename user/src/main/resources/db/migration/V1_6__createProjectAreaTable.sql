/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AreaPositions` (
  `_projectId` bigint(20) NOT NULL,
  `_lat` DOUBLE(17,14) DEFAULT NULL,
  `_lng` DOUBLE(17,14) DEFAULT NULL,
  FOREIGN KEY(_projectId) REFERENCES Plant(_plantId)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
