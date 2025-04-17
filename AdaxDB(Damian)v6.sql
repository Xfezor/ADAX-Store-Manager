CREATE DATABASE  IF NOT EXISTS `adaxstore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `adaxstore`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: adaxstore
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `Documento` int(10) NOT NULL,
  `Tipo_documento` varchar(15) DEFAULT NULL,
  `NombreCliente` varchar(20) DEFAULT NULL,
  `ApellidoCliente` varchar(20) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1012345678,'CC','Juan','Garc√≠a','juan.garcia@gmail.com'),(1012345680,'CC','Ana','Mart√≠nez',NULL),(1023456789,'CC','Carlos','Hern√°ndez',NULL),(1034567801,'TI','Laura','L√≥pez',NULL),(1045678902,'CC','Jorge','Ram√≠rez',NULL),(1056789013,'TI','Marta','Morales',NULL),(1067890124,'CC','David','G√≥mez',NULL),(1078901235,'TI','Paola','Reyes',NULL),(1089012346,'CC','Felipe','S√°nchez',NULL),(1090123457,'TI','Sandra','Guerrero',NULL),(1101234568,'CC','Sergio','Castillo',NULL),(1112345679,'TI','Isabella','Acosta',NULL),(1123456790,'CC','Andr√©s','Berm√∫dez',NULL),(1134567802,'TI','Daniela','Jim√©nez',NULL),(1145678903,'CC','Javier','Cordero',NULL),(1156789014,'TI','Ver√≥nica','Garc√≠a',NULL),(1167890125,'CC','Esteban','M√©ndez',NULL),(1178901236,'TI','Juliana','G√≥mez',NULL),(1189012347,'CC','Mauricio','Salazar',NULL),(1190123458,'TI','Natalia','Herrera',NULL),(1201234569,'CC','Alejandro','P√©rez',NULL),(1212345681,'TI','Lina','R√≠os',NULL),(1223456791,'CC','√ìscar','C√°rdenas',NULL),(1234567803,'TI','Claudia','Garc√≠a',NULL),(1245678904,'CC','Fernando','Zapata',NULL),(1256789015,'TI','Catherine','Guti√©rrez',NULL),(1267890126,'CC','Juan','Moreno',NULL),(1278901237,'TI','Mar√≠a','Rivas',NULL),(1289012348,'CC','Ricardo','Casta√±o',NULL),(1290123459,'TI','Melissa','Castro',NULL);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entregaproductos`
--

DROP TABLE IF EXISTS `entregaproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregaproductos` (
  `proveedor_idproveedor` int(11) NOT NULL,
  `producto_id_Producto` int(11) NOT NULL,
  `fecha_Entrega` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`proveedor_idproveedor`,`producto_id_Producto`),
  KEY `fk_entregaproductos_producto1_idx` (`producto_id_Producto`),
  CONSTRAINT `fk_entregaproductos_producto1` FOREIGN KEY (`producto_id_Producto`) REFERENCES `producto` (`id_Producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_entregaproductos_proveedor1` FOREIGN KEY (`proveedor_idproveedor`) REFERENCES `proveedor` (`idproveedor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entregaproductos`
--

LOCK TABLES `entregaproductos` WRITE;
/*!40000 ALTER TABLE `entregaproductos` DISABLE KEYS */;
INSERT INTO `entregaproductos` VALUES (2,2,'2024-08-02',150,'entregado'),(3,3,'2024-08-03',10,'entregado'),(4,4,'2024-08-04',8,'entregado'),(5,5,'2024-08-05',300,''),(6,6,'2024-08-06',350,''),(7,7,'2024-08-07',400,''),(8,8,'2024-08-08',450,''),(9,9,'2024-08-09',500,''),(10,10,'2024-08-10',550,''),(11,11,'2024-08-11',600,''),(12,12,'2024-08-12',650,''),(13,13,'2024-08-13',700,''),(14,14,'2024-08-14',750,''),(15,15,'2024-08-15',800,''),(16,16,'2024-08-16',850,''),(17,17,'2024-08-17',900,''),(18,18,'2024-08-18',950,''),(19,19,'2024-08-19',1000,''),(20,20,'2024-08-20',1050,''),(21,21,'2024-08-21',1100,''),(22,22,'2024-08-22',1150,''),(23,23,'2024-08-23',1200,''),(24,24,'2024-08-24',1250,''),(26,26,'2024-08-26',1350,''),(27,27,'2024-08-27',1400,''),(28,28,'2024-08-28',1450,''),(29,29,'2024-08-29',1500,''),(30,30,'2024-08-30',1550,'');
/*!40000 ALTER TABLE `entregaproductos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_actualizastock_despuesentrega
AFTER update ON entregaproductos
FOR EACH ROW
BEGIN
    IF NEW.estado = 'entregado' AND OLD.estado != 'entregado' THEN 
		UPDATE producto
        SET Stock = stock + NEW.cantidad
        WHERE id_Producto = NEW.producto_id_Producto;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `factura` (
  `venta_id_Venta` int(11) NOT NULL,
  `producto_id_Producto` int(11) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Precio` double NOT NULL,
  `Estado` varchar(45) NOT NULL,
  PRIMARY KEY (`venta_id_Venta`,`producto_id_Producto`),
  KEY `fk_detalles_venta_producto1_idx` (`producto_id_Producto`),
  CONSTRAINT `fk_detalles_venta_producto1` FOREIGN KEY (`producto_id_Producto`) REFERENCES `producto` (`id_Producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalles_venta_venta1` FOREIGN KEY (`venta_id_Venta`) REFERENCES `venta` (`id_Venta`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (3,5,1,150,'Pagado'),(3,6,1,80,'Pagado'),(5,9,1,50,'Pagado'),(5,10,2,180,'Pagado'),(7,3,1,1200,'Pendiente'),(7,4,1,800,'Pendiente'),(10,9,2,50,'Pagado'),(10,10,1,180,'Pagado'),(13,5,1,150,'Pagado'),(13,6,2,80,'Pagado'),(15,9,1,50,'Pagado'),(15,10,3,180,'Pagado'),(17,3,1,1200,'Pendiente'),(17,4,1,800,'Pendiente'),(20,9,2,50,'Pagado'),(20,10,2,180,'Pagado'),(23,5,2,150,'Pagado'),(23,6,2,80,'Pagado'),(24,7,1,600,'Pendiente'),(24,8,1,120,'Pendiente'),(25,8,20,800,'Pagado'),(25,9,1,50,'Pagado'),(25,10,2,180,'Pagado'),(25,11,1,40,'Pendiente'),(25,12,10,300,'Pagado');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_actualziarstock_despuesfactura
AFTER INSERT ON factura
FOR EACH ROW
BEGIN
	IF NEW.estado = 'pagado' THEN
		UPDATE producto
		SET Stock = Stock-NEW.cantidad
		where id_producto = NEW.producto_id_Producto;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_actualizarstock_actualizar_esatdofactura
AFTER UPDATE ON factura
FOR EACH ROW
BEGIN
	IF OLD.Estado != 'Pagado' and NEW.Estado = 'Pagado' THEN
		UPDATE producto
		SET Stock = Stock-NEW.Cantidad
		where id_Producto = NEW.producto_id_Producto;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `inventario`
--

DROP TABLE IF EXISTS `inventario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventario` (
  `id_Inventario` int(11) NOT NULL,
  `cantidadInventario` int(11) DEFAULT NULL,
  `fechaModificacion` date DEFAULT NULL,
  `estado_revision` varchar(15) NOT NULL,
  `tienda_idtienda` int(11) NOT NULL,
  PRIMARY KEY (`id_Inventario`),
  KEY `fk_inventario_tienda1_idx` (`tienda_idtienda`),
  CONSTRAINT `fk_inventario_tienda1` FOREIGN KEY (`tienda_idtienda`) REFERENCES `tienda` (`idtienda`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventario`
--

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (2,80,'2024-08-11','Revisado',2),(3,200,'2024-08-12','Revisado',3),(4,60,'2024-08-13','Revisado',4),(5,120,'2024-08-14','Revisado',5),(6,90,'2024-08-15','Revisado',6),(7,100,'2024-08-16','Revisado',7),(8,75,'2024-08-17','Revisado',8),(9,130,'2024-08-18','Revisado',9),(10,110,'2024-08-19','Revisado',10),(11,85,'2024-08-20','Revisado',11),(12,95,'2024-08-21','Revisado',12),(13,140,'2024-08-22','Revisado',13),(14,70,'2024-08-23','Revisado',14),(15,105,'2024-08-24','Revisado',15),(16,125,'2024-08-25','Revisado',16),(17,80,'2024-08-26','Revisado',17),(18,90,'2024-08-27','Revisado',18),(19,115,'2024-08-28','Revisado',19),(20,100,'2024-08-29','Revisado',20),(21,85,'2024-08-30','Revisado',21),(22,95,'2024-08-31','Revisado',22),(23,110,'2024-09-01','Revisado',23),(24,120,'2024-09-02','Revisado',24),(26,135,'2024-09-04','Revisado',26),(27,80,'2024-09-05','Revisado',27),(28,100,'2024-09-06','Revisado',28),(29,115,'2024-09-07','Revisado',90),(30,90,'2024-09-08','Revisado',30);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metododepago`
--

DROP TABLE IF EXISTS `metododepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metododepago` (
  `ID_Met_pago` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_Met_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metododepago`
--

LOCK TABLES `metododepago` WRITE;
/*!40000 ALTER TABLE `metododepago` DISABLE KEYS */;
INSERT INTO `metododepago` VALUES (1,'tarjeta de credito'),(2,'tarjeta de debito'),(3,'nequi'),(4,'Daviplata'),(5,'Efectivo');
/*!40000 ALTER TABLE `metododepago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos` (
  `id_Movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `id_Producto_id` int(5) NOT NULL,
  `stock_antes` int(11) NOT NULL,
  `entradas` int(5) NOT NULL,
  `salidas` int(5) NOT NULL,
  `stock_despues` int(11) NOT NULL,
  `fecha_movimiento` date NOT NULL,
  `inventario_id_Inventario` int(11) NOT NULL,
  PRIMARY KEY (`id_Movimiento`),
  KEY `fk_movimientos_inventario1_idx` (`inventario_id_Inventario`),
  KEY `fk_producto_id` (`id_Movimiento`),
  KEY `fk_producto_id_idx` (`id_Producto_id`),
  CONSTRAINT `fk_movimientos_inventario1` FOREIGN KEY (`inventario_id_Inventario`) REFERENCES `inventario` (`id_Inventario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimientos`
--

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
INSERT INTO `movimientos` VALUES (33,0,0,0,0,0,'2024-08-18',2),(34,0,0,0,0,0,'2024-08-18',3),(35,0,0,0,0,0,'2024-08-18',4),(36,0,0,0,0,0,'2024-08-18',5),(37,0,0,0,0,0,'2024-08-18',6),(38,0,0,0,0,0,'2024-08-18',7),(39,0,0,0,0,0,'2024-08-18',8),(40,0,0,0,0,0,'2024-08-18',9),(41,0,0,0,0,0,'2024-08-18',10),(42,0,0,0,0,0,'2024-08-18',11),(43,0,0,0,0,0,'2024-08-18',12),(44,0,0,0,0,0,'2024-08-18',13),(45,0,0,0,0,0,'2024-08-18',14),(46,0,0,0,0,0,'2024-08-18',15),(47,0,0,0,0,0,'2024-08-18',16),(48,0,0,0,0,0,'2024-08-18',17),(49,0,0,0,0,0,'2024-08-18',18),(50,0,0,0,0,0,'2024-08-18',19),(51,0,0,0,0,0,'2024-08-18',20),(52,0,0,0,0,0,'2024-08-18',21),(53,0,0,0,0,0,'2024-08-18',22),(54,0,0,0,0,0,'2024-08-18',23),(55,0,0,0,0,0,'2024-08-18',24),(56,0,0,0,0,0,'2024-08-18',26),(58,0,0,0,0,0,'2024-08-18',27),(59,0,0,0,0,0,'2024-08-18',28),(60,0,0,0,0,0,'2024-08-18',29),(61,2,0,5,0,0,'2025-03-31',3),(62,2,0,0,5,0,'2025-03-31',3),(63,2,100,0,1,99,'2025-03-31',3),(64,2,99,0,6,105,'2025-03-31',3),(65,2,105,0,5,110,'2025-03-31',3),(66,2,110,40,0,150,'2025-03-31',3),(68,2,150,150,0,300,'2025-04-01',3),(69,3,30,10,0,40,'2025-04-01',3),(70,11,95,0,5,90,'2025-04-01',11),(71,4,40,8,0,48,'2025-04-01',3),(72,12,100,0,10,90,'2025-04-01',12),(73,45,13,0,3,10,'2025-04-09',3);
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_Producto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(100) NOT NULL,
  `Precio_unit` double NOT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Marca` varchar(100) DEFAULT NULL,
  `Categoria` varchar(100) DEFAULT NULL,
  `Presentacion` varchar(100) DEFAULT NULL,
  `Fecha_vencimiento` date DEFAULT NULL,
  `Stock` int(11) NOT NULL,
  `Stock_Min` int(11) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `inventario_id_Inventario` int(11) NOT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Producto`),
  KEY `fk_producto_inventario1_idx` (`inventario_id_Inventario`),
  KEY `fk_producto_proveedor1_idx` (`idProveedor`),
  CONSTRAINT `fk_producto_inventario1` FOREIGN KEY (`inventario_id_Inventario`) REFERENCES `inventario` (`id_Inventario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_producto_proveedor1` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idproveedor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (2,'Samsung S24 Ultra',750,'Smartphone con c√°mara de 64MP','Samsung','Electr√≥nic','Unidad','2025-10-30',300,20,1,3,5),(3,'Televisor LG OLED',1200,'Televisor con pantalla OLED de 55 pulgadas','LG','Electr√≥nica','Unidad','2025-11-15',40,5,1,3,3),(4,'Refrigerador Samsung',800,'Refrigerador de 500 litros','Samsung','Electrodom√©stico','Unidad','2026-03-10',48,8,1,3,5),(5,'Aspiradora Rowenta',150,'Aspiradora de 1500W con bolsa','Rowenta','Electrodom√©stico','Unidad','2025-07-22',60,15,1,3,4),(6,'Cafetera Philips',80,'Cafetera de 12 tazas','Philips','Electrodom√©stico','Unidad','2025-05-30',75,20,1,3,2),(7,'C√°mara Canon EOS',600,'C√°mara r√©flex digital con lente de 18-55mm','Canon','Electr√≥nica','Unidad','2025-09-01',25,5,1,3,1),(8,'Microwave Panasonic',120,'Microondas de 20 litros','Panasonic','Electrodom√©stico','Unidad','2025-06-15',90,10,1,3,3),(9,'Plancha T-fal',50,'Plancha de vapor antiadherente','T-fal','Electrodom√©stico','Unidad','2024-12-31',85,10,1,3,3),(10,'Air Fryer Philips',180,'Freidora de aire de 1.8 litros','Philips','Electrodom√©stico','Unidad','2025-01-20',70,15,0,3,3),(11,'Teclado Logitech',40,'Teclado mec√°nico con retroiluminaci√≥n','Logitech','Electr√≥nica','Unidad','2025-04-10',90,25,0,11,NULL),(12,'Rat√≥n Logitech',30,'Rat√≥n inal√°mbrico con bater√≠a recargable','Logitech','Electr√≥nica','Unidad','2025-02-28',90,30,0,12,NULL),(13,'Silla Gamer DXRacer',350,'Silla ergon√≥mica para gaming','DXRacer','Muebles','Unidad','2025-08-15',20,5,0,13,NULL),(14,'Escritorio de Madera',200,'Escritorio de madera de 120x60 cm','MarcaEjemplo','Muebles','Unidad','2025-11-30',35,10,0,14,NULL),(15,'Auriculares Sony WH-1000XM4',300,'Auriculares inal√°mbricos con cancelaci√≥n de ruido','Sony','Electr√≥nica','Unidad','2025-12-01',45,10,0,15,NULL),(16,'Impresora HP DeskJet',100,'Impresora a color multifunci√≥n','HP','Electr√≥nica','Unidad','2025-07-10',55,15,0,16,NULL),(17,'Teclado Gaming Corsair',80,'Teclado mec√°nico RGB para gaming','Corsair','Electr√≥nica','Unidad','2025-09-05',60,20,0,17,NULL),(18,'Monitor Acer 24 pulgadas',220,'Monitor Full HD de 24 pulgadas','Acer','Electr√≥nica','Unidad','2025-10-20',50,10,1,18,NULL),(19,'Bater√≠a externa Anker',45,'Bater√≠a externa de 10000mAh','Anker','Electr√≥nica','Unidad','2025-03-15',80,25,1,19,NULL),(20,'Tablet Samsung Galaxy Tab',350,'Tablet con pantalla de 10.4 pulgadas','Samsung','Electr√≥nica','Unidad','2025-06-01',30,8,1,20,NULL),(21,'Silla de Oficina Ergohuman',400,'Silla ergon√≥mica con ajuste lumbar','Ergohuman','Muebles','Unidad','2025-08-10',25,5,0,21,NULL),(22,'L√°mpara LED Philips',60,'L√°mpara LED regulable','Philips','Electrodom√©stico','Unidad','2025-04-15',70,12,1,22,NULL),(23,'Barra de sonido JBL',150,'Barra de sonido con Bluetooth','JBL','Electr√≥nica','Unidad','2025-09-30',40,10,0,23,NULL),(24,'Estufa a gas Teka',180,'Estufa a gas de 4 quemadores','Teka','Electrodom√©stico','Unidad','2025-12-15',35,7,1,24,NULL),(26,'Sart√©n T-fal',70,'Sart√©n antiadherente de 30 cm','T-fal','Electrodom√©stico','Unidad','2025-05-01',85,15,1,26,NULL),(27,'Cuchillos de Cocina Zwilling',90,'Juego de cuchillos de acero inoxidable','Zwilling','Electrodom√©stico','Juego','2025-11-20',55,10,1,27,NULL),(28,'Reloj Garmin Forerunner',200,'Reloj deportivo con GPS','Garmin','Electr√≥nica','Unidad','2025-07-25',30,8,1,28,NULL),(29,'Caja de herramientas Stanley',120,'Caja de herramientas con 100 piezas','Stanley','Herramientas','Unidad','2025-10-01',40,10,1,29,NULL),(30,'Ventilador Orbegozo',90,'Ventilador de pie con 3 velocidades','Orbegozo','Electrodom√©stico','Unidad','2025-08-01',50,12,1,30,NULL),(31,'papaya',1500,'Fruta','Mercadito tintala','Fruta','unidad','2025-01-08',20,0,1,3,NULL);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER trg_entradas_salidas_productos
AFTER UPDATE ON producto
FOR EACH ROW
BEGIN
    -- Verificar si el stock ha aumentado
    IF NEW.Stock > OLD.Stock THEN
        -- Registrar la entrada cuando el stock aumenta
        INSERT INTO movimientos (
            id_Producto_id,
            stock_antes,
            entradas,
            salidas,
            fecha_movimiento,
            stock_despues,
            inventario_id_inventario
        ) VALUES (
			NEW.id_Producto,
            OLD.Stock,
			NEW.Stock - OLD.Stock,
            0,
            NOW(),
            NEW.Stock,
            NEW.inventario_id_inventario
        );
    END IF;
    
    if NEW.STOCK < OLD.Stock THEN
		INSERT INTO movimientos (
            id_Producto_id,
            stock_antes,
            entradas,
            salidas,
            fecha_movimiento,
            stock_despues,
            inventario_id_inventario
        ) 
        VALUES (
			NEW.id_Producto,
            OLD.Stock,
            0,
			OLD.Stock - NEW.Stock,
            NOW(),
            NEW.Stock,
            NEW.inventario_id_inventario
        );
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `idproveedor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `id_tienda` int(11) DEFAULT NULL,
  PRIMARY KEY (`idproveedor`),
  KEY `id_tienda_fk_idx` (`id_tienda`),
  CONSTRAINT `id_tienda_fk` FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`idtienda`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'ElectroMundo S.A.S.',12345678,'info@electromundo.com.co',3),(2,'Muebles y Decoraci√≥n Ltda.',8765432,'contacto@mueblesdecoracion.com.co',3),(3,'TechnoGadgets',3456789,'ventas@technogadgets.com.co',3),(4,'Electrodom√©sticos del Norte',2345679,'info@electrodomesticosnorte.com',3),(5,'Central Herramientas S.A.',4567890,'ventas@centralherramientas.com',3),(6,'Hogar y Estilo',6789012,'contacto@hogaryestilo.com.co',3),(7,'Computech Ltda.',7890123,'ventas@computechltda.com',7),(8,'ElectroPlus S.A.S.',8901234,'info@electroplus.com.co',8),(9,'Muebles y M√°s',9012345,'ventas@mueblesymas.com.co',9),(10,'Tecnolog√≠a Avanzada',123456,'info@tecnologiaavanzada.com',10),(11,'ElectroCentro Ltda.',1234567,'contacto@electrocentroltda.com',11),(12,'Mobiliario Urbano',2345670,'ventas@mobiliariourbano.com.co',12),(13,'TechMaster S.A.S.',3456780,'info@techmaster.com.co',13),(14,'Electrohogar Ltda.',4567891,'contacto@electrohogar.com.co',14),(15,'ElectroTrend S.A.S.',5678901,'ventas@electrotrend.com',15),(16,'Muebles & M√°s',6789013,'info@mueblesymas.com.co',16),(17,'SmartElectro S.A.S.',7890124,'ventas@smartelectro.com.co',17),(18,'ElectroCasa Ltda.',8901235,'contacto@electrocasa.com.co',18),(19,'Tecnolog√≠a Hogar',9012346,'ventas@tecnologiahogar.com',19),(20,'ElectroService Ltda.',123457,'info@electroservice.com.co',20),(21,'Muebles del Hogar',1234568,'ventas@mueblesdelhogar.com.co',21),(22,'TechnoTools S.A.S.',2345671,'contacto@technotools.com.co',22),(23,'ElectroPower Ltda.',3456781,'ventas@electropower.com.co',23),(24,'HogarTech S.A.S.',4567892,'info@hogartech.com.co',24),(25,'ElectroMax Ltda.',5678902,'contacto@electromax.com.co',24),(26,'Muebles Bogot√°',6789014,'ventas@mueblesbogota.com.co',26),(27,'TechWorld Ltda.',7890125,'info@techworld.com.co',27),(28,'ElectroF√°cil S.A.S.',8901236,'ventas@electrofacil.com.co',28),(29,'Mobiliario Actual',9012347,'contacto@mobiliarioactual.com',29),(30,'ElectroSmart Ltda.',123458,'info@electrosmart.com.co',30),(36,'Sistematics S.A.S',2147483647,'sistematics@gmail.com',3);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_Rol` int(11) NOT NULL,
  `nombreRol` varchar(45) NOT NULL,
  `descripcion` varchar(65) NOT NULL,
  PRIMARY KEY (`id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador','Acceso completo a todas las funciones del sistema'),(2,'Empleado','Acceso limitado a las funciones operativas'),(3,'Due√±o','Acceso total a su tienda');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tienda`
--

DROP TABLE IF EXISTS `tienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tienda` (
  `idtienda` int(11) NOT NULL AUTO_INCREMENT,
  `nombreTienda` varchar(45) NOT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varbinary(255) NOT NULL,
  `codigo_invitacion` int(6) DEFAULT NULL,
  PRIMARY KEY (`idtienda`),
  UNIQUE KEY `email_UNIQUE` (`correo`),
  UNIQUE KEY `codigo_invitacion_UNIQUE` (`codigo_invitacion`)
) ENGINE=InnoDB AUTO_INCREMENT=192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tienda`
--

LOCK TABLES `tienda` WRITE;
/*!40000 ALTER TABLE `tienda` DISABLE KEYS */;
INSERT INTO `tienda` VALUES (1,'Marianitas','calle 92 bis',0,'mari@gmail.com',_binary 'ÔøΩÔøΩÔøΩGÔøΩ/\0ÔøΩÔøΩ-\0ÔøΩÔøΩvWHŸÉÔøΩ4ÔøΩÔøΩ	ÔøΩlÔøΩ;ÔøΩ)bÔøΩÔøΩÔøΩ!ÔøΩ\\ÔøΩÔøΩ:$*ÔøΩ‘≤ÔøΩÔøΩ4ÔøΩÔøΩÔøΩÔøΩGÔøΩ:ÔøΩ3eÔøΩ#n\Z',126),(2,'ElectroShop Bogot√°','Av. Boyac√° # 71-45',3123456789,'info@electroshopbogota.com','',93),(3,'Librer√≠a El Saber','Calle 72 # 6-14',3145678901,'ventas@libreriaelsaber.com','',94),(4,'Farmacia La Salud','Carrera 15 # 101-34',3178901234,'atencion@farmacialasalud.com','',95),(5,'Moda y Estilo','Calle 85 # 10-20',3189012345,'info@modayestilo.com','',96),(6,'Deportes y M√°s','Calle 53 # 21-12',3190123456,'contacto@deportesymas.com','',97),(7,'Tienda de Abarrotes La Familia','Cra 19 # 32-15',3201234567,'ventas@tiendafamilia.com','',98),(8,'Muebles y Decoraci√≥n','Av. Jim√©nez # 5-60',3212345678,'info@mueblesdecoracion.com','',99),(9,'Jugueter√≠a Divertida','Cra 10 # 22-30',3223456789,'contacto@jugueteriadivertida.com','',100),(10,'Panader√≠a El Trigo','Calle 50 # 8-90',3234567890,'info@panaderiaeltrigo.com','',101),(11,'Caf√© Gourmet','Cra 9 # 45-67',3245678901,'contacto@cafegourmet.com','',102),(12,'Ropa y Moda','Av. Caracas # 48-20',3256789012,'info@ropaymoda.com','',103),(13,'Tecnolog√≠a al D√≠a','Calle 26 # 11-25',3267890123,'ventas@tecnologiaaldia.com','',104),(14,'L√°cteos y M√°s','Cra 7 # 10-45',3278901234,'info@lacteosymas.com','',105),(15,'Tienda de Vinos','Calle 94 # 17-30',3289012345,'contacto@tiendadevinos.com','',106),(16,'Zapater√≠a El Paso','Cra 22 # 5-90',3290123456,'info@zapateriaalpaso.com','',107),(17,'Delicatessen Gourmet','Calle 55 # 12-65',3301234567,'ventas@delicatessengourmet.com','',108),(18,'Electrodom√©sticos Centro','Av. El Dorado # 20-40',3312345678,'contacto@electrodomesticoscentro.com','',109),(19,'Florister√≠a Elegante','Cra 3 # 21-75',3323456789,'info@floristeriaelegante.com','',110),(20,'Tienda de Deportes','Calle 17 # 3-60',3334567890,'contacto@tiendadeportes.com','',111),(21,'Pasteler√≠a La Dulce Vida','Cra 12 # 45-89',3345678901,'info@pastelerialadulcevida.com','',112),(22,'Centro de Belleza','Av. Chile # 25-40',3356789012,'contacto@centrobelleza.com','',113),(23,'Muebles Modernos','Calle 8 # 18-90',3367890123,'ventas@mueblesmodernos.com','',114),(24,'Juguetes para Todos','Cra 11 # 25-15',3378901234,'info@juguetesparatodos.com','',115),(26,'Perfumer√≠a y Cosm√©ticos','Cra 16 # 30-45',3390123456,'info@perfumeriaycosmeticos.com','',117),(27,'Tiendas El Ahorro','Calle 32 # 22-90',3401234567,'contacto@tiendaselahorro.com','',118),(28,'Tienda de Tecnolog√≠a','Av. San Mart√≠n # 50-60',3412345678,'ventas@tiendatecnologia.com','',119),(29,'Librer√≠a y Papeler√≠a','Cra 8 # 15-70',3423456789,'info@libreriaypapeleria.com','',120),(30,'Ropa y Calzado','Calle 46 # 22-80',3434567890,'contacto@ropaycalzado.com','',121),(31,'La esquina','calle 56',3125256732,'esquinastienda@gmail.com',_binary 'ÔøΩÔøΩÔøΩÔøΩ^ÔøΩÔøΩÔøΩ;<Dl*ÔøΩ',1),(80,'Margaritas','calle 32',123412,'tienda@gmail.com',_binary '›Ç(JÔøΩÔøΩ?ÔøΩÔøΩ_÷¶Ÿ•',122),(90,'Los rosales','calle 6a',3156782834,'losrosalestienda@gmail.com',_binary 'ÔøΩUjI\0ÔøΩu»™00vG',123),(91,'Polleria 22','calle 82a',317462345,'pollosla22@gmail.com',_binary 'ÔøΩÔøΩxeÔøΩÔøΩÔøΩ9ÔøΩ]ykÔøΩÔøΩt',124),(129,'Prueba','Calle 83 #89a-34',3156793467,'prueba@gmail.com',_binary 'IÔøΩ.q=ÔøΩ-ÔøΩUTÔøΩ\rÔøΩ',127),(163,'dasd','asd',12334,'asd@gmail.com',_binary 'ÔøΩ\rÔøΩ/+ÔøΩ!ÔøΩLDÔøΩÔøΩzÔøΩÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû',11),(169,'Peregrinos','',0,'peregrinos@gmail.com',_binary 'ÔøΩ\0ÔøΩr›©ÔøΩÔøΩvÔøΩUÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû',2),(178,'Peregrinitos','',0,'pregrinitos@gmail.com',_binary 'ÔøΩW/ÔøΩfÔøΩp89K9ÔøΩ\'\\',0),(191,'Peregrinitosss','',0,'peregrinitos@gmail.com',_binary 'ÔøΩW/ÔøΩfÔøΩp89K9ÔøΩ\'\\',116);
/*!40000 ALTER TABLE `tienda` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_tienda` BEFORE INSERT ON `tienda` FOR EACH ROW BEGIN
    SET NEW.codigo_invitacion = NEW.idtienda + 100;

    -- Aseg√∫rate de que el valor sea √∫nico
    WHILE EXISTS (SELECT 1 FROM tienda WHERE codigo_invitacion = NEW.codigo_invitacion) DO
        SET NEW.codigo_invitacion = NEW.codigo_invitacion + 1; -- Incrementa hasta que sea √∫nico
    END WHILE;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `encriptarContrasenasTienda` BEFORE INSERT ON `tienda` FOR EACH ROW begin
set new.contrasena = AES_ENCRYPT(new.contrasena, "adaxdecripter2024");
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizarContrasenaEncriptadaTienda` BEFORE UPDATE ON `tienda` FOR EACH ROW begin
set new.contrasena = aes_encrypt(new.contrasena, "adaxdecripter2024");
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `documento` bigint(20) NOT NULL,
  `tipo_doc` text NOT NULL,
  `contrasena` varbinary(255) NOT NULL,
  `nombre1` text NOT NULL,
  `nombre2` text DEFAULT NULL,
  `apellido1` varchar(45) NOT NULL,
  `apellido2` varchar(45) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `rol_id_Rol` int(11) NOT NULL,
  `codigo_invitacion` int(11) NOT NULL,
  `tienda_idtienda` int(11) DEFAULT NULL,
  `codigo` varchar(6) NOT NULL,
  PRIMARY KEY (`documento`),
  UNIQUE KEY `documento_UNIQUE` (`documento`),
  UNIQUE KEY `correo` (`correo`),
  KEY `fk_usuarios_rol1_idx` (`rol_id_Rol`),
  KEY `fk_usuarios_tienda1_idx` (`tienda_idtienda`),
  CONSTRAINT `fk_usuarios_rol1` FOREIGN KEY (`rol_id_Rol`) REFERENCES `rol` (`id_Rol`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_tienda1` FOREIGN KEY (`tienda_idtienda`) REFERENCES `tienda` (`idtienda`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'TI',_binary '°\Õ>ˆ&l7óS\'±F¯<´®\r2s™D>\ZßçÛ√ïú\\<óaPâö)˛üÜº¶g/ò<\Z¿1d˙\∆ò˛@ô','Damian','','Camacho','','da@gmail.com',2,123,1,'421502'),(2,'CC',_binary '˜E{8%≤9yúx\Ênä\‘,#úù.\Ô¸\Zó_\Ët≈Æ','Mariana','','Jimenez','','marianita@gmail.com',2,123,2,''),(10001,'CE',_binary 'iÔøΩ=ÔøΩÔøΩÔøΩCLfÔøΩÔøΩÔøΩ_ÔøΩÔøΩ','Damianohjhkjhjk','','Camacho','','damiancho@gmail.com',3,94,3,''),(1001331,'CC',_binary 'sÔøΩeÔøΩÔøΩlÔøΩ&ÔøΩÔøΩÔøΩZ(ÔøΩyÔøΩÔøΩ.ÔøΩ\n ÔøΩGÔøΩÔøΩÔøΩÔøΩ#','javier','','lopez','','javier23@gmail.com',2,0,2,''),(101088908,'CC',_binary 'î\◊ úÄ®»ã˛˚\ﬁÛ\'or[¢û5ˆ®ÑIx=≠ãb(%\\o¢˛\‰πX¢è\∆zkØôúÑ\·\Œ–ªÑ\ÂÄ:s˛*#í§Ä2¶µtÈÜß\Ôp\Z<ëC\‰\ÿ\„VÉóf\›c\Ì+Y∑„ôû','Santiago','','Martinez','','matinotes956@gmail.com',1,0,3,'440243'),(102369956,'CC',_binary '\Â¨Ω_˙\◊≥:imåõ','Juan','','Perez','Gonz√°lez','juan.perez@example.com',2,123,2,''),(1000133145,'CC',_binary 'ÔøΩ\ruÔøΩ–íÔøΩkÔøΩÔøΩ3ÔøΩ1sÔøΩ','Santiago','','Martinez','','martinotes@gmail.com',2,123,90,''),(1000145674,'CC',_binary 'ÔøΩ\n‹ù◊çnÔøΩLÔøΩ/ÔøΩÔøΩ','SI','','Si','','si@gmail.com',2,123,90,''),(1000234567,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Maria','Fernanda','Lopez','Castro','maria.lopez@example.com',2,0,7,''),(1000345678,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Andres','Felipe','Rodriguez','Sierra','andres.rodriguez@example.com',3,0,1,''),(1000456789,'CC','','Laura','Isabel','Hernandez','Martinez','laura.hernandez@example.com',1,0,1,''),(1000567890,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Carlos','Andres','Mendoza','Valencia','carlos.mendoza@example.com',2,0,4,''),(1000678901,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Valentina','Paredes','Cruz','Garc√≠a','valentina.paredes@example.com',3,0,2,''),(1000789012,'CC','','Sebastian','Gonzalez','Ardila','Ospina','sebastian.gonzalez@example.com',1,0,2,''),(1000890123,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Catalina','Cruz','Cardenas','Rodriguez','catalina.cruz@example.com',2,0,2,''),(1000901234,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Nicolas','Sanchez','Henao','Rivas','nicolas.sanchez@example.com',3,0,3,''),(1001012345,'CC','','Sofia','Torres','Morales','Su√°rez','sofia.torres@example.com',1,0,1,''),(1001123456,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Daniela','Ramirez','Cano','Loaiza','daniela.ramirez@example.com',2,0,3,''),(1001234567,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Alejandro','Hernandez','Mora','Hurtado','alejandro.hernandez@example.com',3,0,4,''),(1001345678,'CC','','Isabella','Mendoza','P√©rez','Orjuela','isabella.mendoza@example.com',1,0,1,''),(1001456789,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Jorge','Martinez','G√≥mez','M√©ndez','jorge.martinez@example.com',2,0,4,''),(1001567890,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Camila','Guerra','Pati√±o','Garc√≠a','camila.guerra@example.com',3,0,5,''),(1001678901,'CC','','Felipe','Castro','Bermudez','Garc√≠a','felipe.castro@example.com',1,0,2,''),(1001789012,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Mariana','Pineda','Pineda','Arboleda','mariana.pineda@example.com',2,0,8,''),(1001890123,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','David','Gomez','Arias','Correa','david.gomez@example.com',3,0,6,''),(1001901234,'CC','','Juliana','Ospina','Bermudez','Jaramillo','juliana.ospina@example.com',1,0,1,''),(1002012345,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Mateo','Guerrero','Reyes','Pati√±o','mateo.guerrero@example.com',2,0,3,''),(1002123456,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Valeria','Rojas','Martinez','Vargas','valeria.rojas@example.com',3,0,7,''),(1002234567,'CC','','Lucas','Vega','Ospina','Castro','lucas.vega@example.com',1,0,1,''),(1002345678,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Natalia','Cano','Guzm√°n','Garc√≠a','natalia.cano@example.com',2,0,9,''),(1002456789,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Juanita','Jaramillo','Mendoza','Ardila','juanita.jaramillo@example.com',3,0,8,''),(1002567890,'CC','','Mateo','Vargas','Pineda','Cano','mateo.vargas@example.com',1,0,1,''),(1002678901,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Emilia','Cordero','G√≥mez','Cano','emilia.cordero@example.com',2,0,10,''),(1002789012,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Samir','Alvarez','Rinc√≥n','Mora','samir.alvarez@example.com',3,0,9,''),(1002890123,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Paola','Martinez','Pati√±o','Ospina','paola.martinez@example.com',1,0,1,''),(1002901234,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Juli√°n','Rinc√≥n','Guzm√°n','Rivas','julian.rincon@example.com',2,0,5,''),(1003012345,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Diana','Uribe','Salazar','S√°nchez','diana.uribe@example.com',3,0,10,''),(1003234567,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Carolina','Sierra','L√≥pez','Casta√±o','carolina.sierra@example.com',2,0,6,''),(1003345678,'CC',_binary 'ÔøΩVÔøΩÔøΩfÔøΩcÔøΩ+YÔøΩ„ôû','Sebasti√°n','Mart√≠nez','Ospina','M√©ndez','sebastian.martinez@example.com',3,0,11,''),(1010101011,'CC',_binary 'ÔøΩ<-ÔøΩ$ÔøΩ$ÔøΩ.ÔøΩÔøΩÔøΩ2','jajaja','','jhajajaj','','sisas@gmail.com',1,123,90,''),(1011322703,'CC',_binary 'W†\Àô\‰¡&\ﬁWó¡l\ƒ;\'\ÿ\…ıâC∞$1Y/P\◊L\ŒW´^FJS1¶#ı¢@§\ÿÛì7Äk·Çï`é\Œ˛hô!#t@\‰\“˜ø=àÇ˛h˚F\‚«ΩXP3Ãí(\Í~$Ωî\ÂÑ4áè\\hC\‘2\ÓêH6Irı¥π\rTÿ≥.\¬\Îï_…†πß\ƒ\nM-D\’çã?Y\‡h?S∞\ÎR3≤qô\‰}Å\‡è\"˛íäΩ\Ÿ\ÍúdVï≠˚K Gfé˘å,.$\⁄Sû\'“ä\–w†4\Z6¥g≥©Ò√£%˝ñ*/\‘?p¨Ki\„#¿Uó¡?Ò=¶+jùå\Íq¿\Â3l≤úBPÅoºY¡#˘™\‚','Santiago',NULL,'Mart√≠nez','Molina','martinotes95@gmail.com',1,94,3,'476716'),(1021674896,'CC',_binary '%Ä\ZF\€\√\ŸDˆ.ì(JzË£¢©U∏z©-≠‘çv§/\«H≤4\∆\n¸]ãM8Z§°+IuuÄD_¢|\÷jÛE-≥®\ƒ∑∞i∑[g;Ω/•8ÒAá±¢ê\‹\Í\Ó€óú•ëk\È¶\\o¢˛\‰πX¢è\∆zkØôúÑ\·\Œ–ªÑ\ÂÄ:s˛*#í§Ä2¶µtÈÜß\Ôp\Z<ëC\‰\ÿ\„VÉóf\›c\Ì+Y∑„ôû','Evelyn','','Giraldo','Torres','evelynestefaniagiraldotorres@gmail.com',1,123,3,'282829'),(1234567891,'CC',_binary 'iÛ=ç˜©CLf´óä_\ÿ˘','Damiancho','','Camacho','','damono600@gmail.com',1,94,3,'907555');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `encriptarContrasenas` BEFORE INSERT ON `usuarios` FOR EACH ROW begin
set new.contrasena = AES_ENCRYPT(new.contrasena, "adaxdecripter2024");
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizarContrasenaEncriptada` BEFORE UPDATE ON `usuarios` FOR EACH ROW begin
set new.contrasena = aes_encrypt(new.contrasena, "adaxdecripter2024");
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id_Venta` int(11) NOT NULL AUTO_INCREMENT,
  `FechaVenta` date DEFAULT NULL,
  `HoraVenta` time NOT NULL,
  `EstadoVenta` varchar(10) NOT NULL,
  `cliente_documento_Cliente` int(11) NOT NULL,
  `tienda_idtienda` int(11) NOT NULL,
  `metododepago_ID_Met_pago` int(11) NOT NULL,
  `usuarios_documento` bigint(20) NOT NULL,
  `usuarios_tienda_idtienda` int(11) NOT NULL,
  PRIMARY KEY (`id_Venta`,`usuarios_documento`,`usuarios_tienda_idtienda`),
  KEY `fk_venta_tienda1_idx` (`tienda_idtienda`),
  KEY `fk_venta_metodo de pago1_idx` (`metododepago_ID_Met_pago`),
  KEY `fk_venta_usuarios1_idx` (`usuarios_documento`,`usuarios_tienda_idtienda`),
  KEY `fk_venta_usuarios2` (`usuarios_tienda_idtienda`),
  KEY `fk_venta_cliente_documento1_idx` (`cliente_documento_Cliente`),
  CONSTRAINT `fk_venta_metodo de pago1` FOREIGN KEY (`metododepago_ID_Met_pago`) REFERENCES `metododepago` (`ID_Met_pago`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_tienda1` FOREIGN KEY (`tienda_idtienda`) REFERENCES `tienda` (`idtienda`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_usuarios1` FOREIGN KEY (`usuarios_documento`) REFERENCES `usuarios` (`documento`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_usuarios2` FOREIGN KEY (`usuarios_tienda_idtienda`) REFERENCES `usuarios` (`tienda_idtienda`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (3,'2024-05-14','14:44:00','Anulada',1012345678,3,3,2,2),(5,'2024-05-16','00:00:00','Pendiente',1023456789,3,5,1001331,2),(7,'2024-05-18','00:00:00','Completa',1167890125,3,2,101088908,3),(10,'2024-05-21','21:11:00','Completa',10,5,5,1000456789,2),(13,'2024-05-24','00:44:00','Completa',1190123458,3,3,1000678901,2),(15,'2024-05-26','00:00:00','Anulada',15,5,5,1000890123,2),(17,'2024-05-28','00:00:00','Pendiente',17,2,2,1000901234,3),(20,'2024-05-31','07:11:00','Pendiente',20,5,5,1001234567,4),(23,'2024-06-03','10:44:00','Pendiente',23,3,3,1001456789,2),(24,'2024-06-04','11:55:00','Anulada',24,4,4,1001567890,3),(25,'2024-06-05','00:00:00','Completa',25,5,5,1001678901,2),(27,'2024-06-07','00:00:00','Anulada',27,2,2,1001789012,8),(28,'2024-06-08','00:00:00','Completa',28,3,3,1001890123,6),(30,'2024-06-10','17:11:00','Anulada',30,5,5,1002012345,3),(31,'2025-04-01','00:00:00','Completa',1,2,1,1011322703,3);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'adaxstore'
--

--
-- Dumping routines for database 'adaxstore'
--
/*!50003 DROP FUNCTION IF EXISTS `desencriptarClave` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClave`(`docu` INT) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
declare contrasenaDesencriptada varchar(45);
select aes_decrypt(contrasena, "adaxdecripter2024") into contrasenaDesencriptada from usuarios where documento = docu;
RETURN contrasenaDesencriptada;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `desencriptarClaveCorreo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClaveCorreo`(`email` VARCHAR(45)) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN

declare contrasenaDesencriptada varchar(45);

select aes_decrypt(contrasena, "adaxdecripter2024") into contrasenaDesencriptada from usuarios where correo = email;

RETURN contrasenaDesencriptada;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `desencriptarClaveCorreoTienda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClaveCorreoTienda`(`email` VARCHAR(45)) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
declare contrasenaDesencriptada varchar(45);
select aes_decrypt(contrasena, "adaxdecripter2024") into contrasenaDesencriptada from tienda where correo = email;
RETURN contrasenaDesencriptada;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `desencriptarClaveTienda` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClaveTienda`(`docu` INT) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
declare contrasenaDesencriptada varchar(45);
select aes_decrypt(contrasena, "adaxdecripter2024") into contrasenaDesencriptada from tienda where documento = docu;
RETURN contrasenaDesencriptada;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `obtener_historial_movimientos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `obtener_historial_movimientos`(`id_Venta` INT(11)) RETURNS decimal(10,2)
BEGIN
    DECLARE costo_total DECIMAL(10,2);
    SELECT SUM(Cantidad * Precio) INTO costo_total
    FROM Factura
    WHERE venta_id_Venta = id_Venta;
    RETURN costo_total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `obtener_stock_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `obtener_stock_producto`(`p_id_producto` INT(11)) RETURNS int(11)
BEGIN
    DECLARE p_stock INT;
    SELECT stock INTO p_stock FROM producto WHERE id_producto = p_id_producto;
RETURN p_stock;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `producto_mas_vendido` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `producto_mas_vendido`() RETURNS int(11)
BEGIN
    DECLARE id INT;
    SELECT 
        f.producto_id_Producto
    INTO 
        id
    FROM 
        factura f
    GROUP BY 
        f.producto_id_Producto
    ORDER BY 
        SUM(f.Cantidad) DESC
    LIMIT 1;
    RETURN id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `total_cliente` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `total_cliente`() RETURNS int(11)
BEGIN  
DECLARE total_clientes INT; 
SELECT COUNT(id_cliente) INTO total_clientes 
FROM cliente;
RETURN total_clientes;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `Total_venta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `Total_venta`(`dia_venta` DATE) RETURNS decimal(10,2)
BEGIN
DECLARE total_ventas DECIMAL(10, 2);
DECLARE mensaje VARCHAR(30);
SELECT SUM(factura.Precio) INTO total_ventas
FROM factura
JOIN venta on factura.venta_id_Venta=venta.id_Venta
WHERE DATE(venta.FechaVenta)= dia_venta;
 IF total_ventas IS NULL THEN 
 SET mensaje = 'no se hicieron ventas ese dia'; 
 RETURN 0; 
    ELSE
RETURN total_ventas;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BucarProductospopularidad` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `BucarProductospopularidad`(IN `Nivel_popu` VARCHAR(20))
BEGIN
    SELECT p.id_Producto, p.nombre, SUM(f.cantidad) AS cantidad,
    CASE
        WHEN  SUM(f.cantidad)> 10 THEN 'popular'
        WHEN  SUM(f.cantidad)BETWEEN 5 AND 10 THEN 'Medio Popular'
        ELSE 'No Popular'
    END AS categoria_popularidad
    FROM factura f
    JOIN producto p ON f.producto_id_Producto = p.id_Producto
    GROUP BY p.id_Producto, p.nombre
    HAVING categoria_popularidad = Nivel_popu
    ORDER BY cantidad DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `BuscarFactura` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `BuscarFactura`(IN `id_fac` INT(11))
BEGIN
SELECT venta_id_Venta, producto_id_producto, estado FROM factura
WHERE venta_id_Venta=id_fac;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Fechasdesdehasta` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Fechasdesdehasta`(IN `fecha1` DATE, IN `fecha2` DATE)
BEGIN
SELECT id_Venta,FechaVenta as Fecha,HoraVenta,EstadoVenta,cliente_id_Cliente as cliente, tienda_idtienda as tienda,
metododepago_ID_Met_pago as metodo_de_pago
FROM venta 
WHERE FechaVenta between fecha1 AND fecha2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertarProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarProducto`(IN `id_Producto` INT(11), IN `Nombre` VARCHAR(100), IN `Precio_unit` DOUBLE, IN `Cantidad` INT(11))
BEGIN
    INSERT INTO producto (id_Producto, Nombre, Precio_unit)
    VALUES (id_Producto, Nombre, Precio_unit);
    
    INSERT INTO factura (producto_id_Producto, Cantidad)
    VALUES (id_Producto, Cantidad); 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ModificarProducto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarProducto`(IN `id_Producto ` INT(11), IN `NuevoNombre` VARCHAR(100), IN `NuevaCantidad ` INT(11), IN `NuevoPrecio` DOUBLE, IN `NuevoStockMinimo` INT(11), IN `NuevaPresentacion ` VARCHAR(100), IN `NuevaMarca` VARCHAR(100), IN `PromocionActual ` VARCHAR(100), IN `NuevaCategoria ` VARCHAR(50), IN `NuevaFechaVencimiento` DATE)
BEGIN
    UPDATE producto AS p
    SET p.Nombre = NuevoNombre,
        p.Precio_unit= NuevoPrecio,
        p.Stock_Min = NuevoStockMinimo,
        p.Presentacion = NuevaPresentacion,
        p.Marca = NuevaMarca,
        p.Categor√≠a = NuevaCategoria,
        p.Fecha_vencimiento = NuevaFechaVencimiento
    WHERE p.id_Producto = id_Producto;
    UPDATE factura AS f
    SET f.Cantidad = NuevaCantidad
    WHERE f.producto_id_Producto = id_Producto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `monstrar_proveedor_de_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `monstrar_proveedor_de_producto`(IN `p_id_Producto` INT(11))
BEGIN 
select producto.nombre as nombre_producto,
proveedor.nombre as nombre_proveedor
from producto
join entregaproductos on producto.id_Producto = entregaproductos.producto_id_Producto
join proveedor on entregaproductos.proveedor_idproveedor = proveedor.idproveedor
where id_producto = p_id_producto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `mostrar_proveedor_de_producto` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `mostrar_proveedor_de_producto`(IN `p_id_Producto` INT(11))
BEGIN 
select producto.nombre as nombre_producto,
proveedor.nombre as nombre_proveedor
from producto
join entregaproductos on producto.id_Producto = entregaproductos.producto_id_Producto
join proveedor on entregaproductos.proveedor_idproveedor = proveedor.idproveedor
where id_producto = p_id_producto;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RecuperarContrasenaUsuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RecuperarContrasenaUsuario`(IN `p_correo ` VARCHAR(100))
BEGIN
    DECLARE v_contrasena VARBINARY(255);
    
    SELECT contrasena INTO v_contrasena
    FROM usuarios
    WHERE correo = p_correo;
    
    IF v_contrasena IS NOT NULL THEN
        SELECT CONCAT('La contrase√±a para el correo ', p_correo, ' es: ', CONVERT(v_contrasena USING utf8)) AS Mensaje;
    ELSE
        SELECT 'Correo electr√≥nico no encontrado' AS Mensaje;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `RecuperarContrasenaUsuario2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RecuperarContrasenaUsuario2`(IN `p_correo` VARCHAR(100))
BEGIN
    DECLARE contrasena VARBINARY(255);
    
    
    SELECT contrasena INTO contrasena
    FROM usuarios
    WHERE correo = correo
    LIMIT 1;
    
    IF contrasena IS NOT NULL THEN
        SELECT CONCAT('La contrase√±a para el correo ', p_correo, ' es: ', contrasena )
        AS Mensaje;
    ELSE
        SELECT 'Correo electr√≥nico no encontrado' AS Mensaje;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-17 14:14:11
