CREATE DATABASE  IF NOT EXISTS `adaxstore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `adaxstore`;
-- Estructura de la tabla cliente
DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_Cliente` int(11) NOT NULL,
  `Documento` int(10) NOT NULL,
  `Nombre1_Cliente` varchar(20) NOT NULL,
  `Nombre2_Cliente` varchar(20) NOT NULL,
  `Apellido1_Cliente` varchar(20) NOT NULL,
  `Apellido2_Cliente` varchar(20) NOT NULL,
  `Tipo_documento` varchar(15) NOT NULL,
  PRIMARY KEY (`id_Cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla cliente

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,1012345678,'Juan','Pablo','García','Mendoza','CC'),(2,1012345680,'Ana','María','Martínez','Rodríguez','CC'),(3,1023456789,'Carlos','Andrés','Hernández','Pérez','CC'),(4,1034567801,'Laura','Alejandra','López','Castro','TI'),(5,1045678902,'Jorge','Luis','Ramírez','Serrano','CC'),(6,1056789013,'Marta','Lucía','Morales','Ospina','TI'),(7,1067890124,'David','Alejandro','Gómez','Córdoba','CC'),(8,1078901235,'Paola','Andrea','Reyes','Suárez','TI'),(9,1089012346,'Felipe','Javier','Sánchez','Cano','CC'),(10,1090123457,'Sandra','Paola','Guerrero','Naranjo','TI'),(11,1101234568,'Sergio','Iván','Castillo','Vargas','CC'),(12,1112345679,'Isabella','Carolina','Acosta','Molina','TI'),(13,1123456790,'Andrés','Felipe','Bermúdez','Castro','CC'),(14,1134567802,'Daniela','Camila','Jiménez','Salazar','TI'),(15,1145678903,'Javier','Antonio','Cordero','Jaramillo','CC'),(16,1156789014,'Verónica','Sánchez','García','Hurtado','TI'),(17,1167890125,'Esteban','David','Méndez','Torres','CC'),(18,1178901236,'Juliana','Alejandra','Gómez','Valencia','TI'),(19,1189012347,'Mauricio','Leonardo','Salazar','Pineda','CC'),(20,1190123458,'Natalia','Serrano','Herrera','Palacio','TI'),(21,1201234569,'Alejandro','José','Pérez','Ordoñez','CC'),(22,1212345681,'Lina','Marcelá','Ríos','Castillo','TI'),(23,1223456791,'Óscar','Alberto','Cárdenas','Márquez','CC'),(24,1234567803,'Claudia','Lorena','García','Ruiz','TI'),(25,1245678904,'Fernando','Luis','Zapata','Porras','CC'),(26,1256789015,'Catherine','Alejandra','Gutiérrez','Vásquez','TI'),(27,1267890126,'Juan','Esteban','Moreno','Méndez','CC'),(28,1278901237,'María','Fernanda','Rivas','Álvarez','TI'),(29,1289012348,'Ricardo','Andrés','Castaño','Cifuentes','CC'),(30,1290123459,'Melissa','Andrea','Castro','Hernández','TI');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla entregaproductos

DROP TABLE IF EXISTS `entregaproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entregaproductos` (
  `proveedor_idproveedor` int(11) NOT NULL,
  `producto_id_Producto` int(11) NOT NULL,
  `fecha_Entrega` date DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`proveedor_idproveedor`,`producto_id_Producto`),
  KEY `fk_entregaproductos_producto1_idx` (`producto_id_Producto`),
  CONSTRAINT `fk_entregaproductos_producto1` FOREIGN KEY (`producto_id_Producto`) REFERENCES `producto` (`id_Producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_entregaproductos_proveedor1` FOREIGN KEY (`proveedor_idproveedor`) REFERENCES `proveedor` (`idproveedor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla entregadeproductos

LOCK TABLES `entregaproductos` WRITE;
/*!40000 ALTER TABLE `entregaproductos` DISABLE KEYS */;
INSERT INTO `entregaproductos` VALUES (2,2,'2024-08-02',150),(3,3,'2024-08-03',200),(4,4,'2024-08-04',250),(5,5,'2024-08-05',300),(6,6,'2024-08-06',350),(7,7,'2024-08-07',400),(8,8,'2024-08-08',450),(9,9,'2024-08-09',500),(10,10,'2024-08-10',550),(11,11,'2024-08-11',600),(12,12,'2024-08-12',650),(13,13,'2024-08-13',700),(14,14,'2024-08-14',750),(15,15,'2024-08-15',800),(16,16,'2024-08-16',850),(17,17,'2024-08-17',900),(18,18,'2024-08-18',950),(19,19,'2024-08-19',1000),(20,20,'2024-08-20',1050),(21,21,'2024-08-21',1100),(22,22,'2024-08-22',1150),(23,23,'2024-08-23',1200),(24,24,'2024-08-24',1250),(26,26,'2024-08-26',1350),(27,27,'2024-08-27',1400),(28,28,'2024-08-28',1450),(29,29,'2024-08-29',1500),(30,30,'2024-08-30',1550);
/*!40000 ALTER TABLE `entregaproductos` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla factura

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

-- Datos de la tabla factura

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (2,3,1,1200,'Pendiente'),(2,4,1,800,'Pendiente'),(3,5,3,150,'Pagado'),(3,6,1,80,'Pagado'),(4,7,2,600,'Pendiente'),(4,8,1,120,'Pendiente'),(5,9,1,50,'Pagado'),(5,10,2,180,'Pagado'),(7,3,1,1200,'Pendiente'),(7,4,1,800,'Pendiente'),(8,5,2,150,'Pagado'),(8,6,2,80,'Pagado'),(9,7,1,600,'Pendiente'),(9,8,1,120,'Pendiente'),(10,9,2,50,'Pagado'),(10,10,1,180,'Pagado'),(12,3,2,1200,'Pendiente'),(12,4,1,800,'Pendiente'),(13,5,1,150,'Pagado'),(13,6,2,80,'Pagado'),(14,7,2,600,'Pendiente'),(14,8,1,120,'Pendiente'),(15,9,1,50,'Pagado'),(15,10,3,180,'Pagado'),(17,3,1,1200,'Pendiente'),(17,4,1,800,'Pendiente'),(18,5,3,150,'Pagado'),(18,6,1,80,'Pagado'),(19,7,2,600,'Pendiente'),(19,8,1,120,'Pendiente'),(20,9,2,50,'Pagado'),(20,10,2,180,'Pagado'),(22,3,1,1200,'Pendiente'),(22,4,1,800,'Pendiente'),(23,5,2,150,'Pagado'),(23,6,2,80,'Pagado'),(24,7,1,600,'Pendiente'),(24,8,1,120,'Pendiente'),(25,9,1,50,'Pagado'),(25,10,2,180,'Pagado');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla Inventario

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

-- Datos d ela tabla inventario

LOCK TABLES `inventario` WRITE;
/*!40000 ALTER TABLE `inventario` DISABLE KEYS */;
INSERT INTO `inventario` VALUES (2,80,'2024-08-11','Revisado',2),(3,200,'2024-08-12','Revisado',3),(4,60,'2024-08-13','Revisado',4),(5,120,'2024-08-14','Revisado',5),(6,90,'2024-08-15','Revisado',6),(7,100,'2024-08-16','Revisado',7),(8,75,'2024-08-17','Revisado',8),(9,130,'2024-08-18','Revisado',9),(10,110,'2024-08-19','Revisado',10),(11,85,'2024-08-20','Revisado',11),(12,95,'2024-08-21','Revisado',12),(13,140,'2024-08-22','Revisado',13),(14,70,'2024-08-23','Revisado',14),(15,105,'2024-08-24','Revisado',15),(16,125,'2024-08-25','Revisado',16),(17,80,'2024-08-26','Revisado',17),(18,90,'2024-08-27','Revisado',18),(19,115,'2024-08-28','Revisado',19),(20,100,'2024-08-29','Revisado',20),(21,85,'2024-08-30','Revisado',21),(22,95,'2024-08-31','Revisado',22),(23,110,'2024-09-01','Revisado',23),(24,120,'2024-09-02','Revisado',24),(26,135,'2024-09-04','Revisado',26),(27,80,'2024-09-05','Revisado',27),(28,100,'2024-09-06','Revisado',28),(29,115,'2024-09-07','Revisado',29),(30,90,'2024-09-08','Revisado',30);
/*!40000 ALTER TABLE `inventario` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- Trigger de registrar_movimiento

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger registrar_movimiento
after insert on inventario
for each row
begin
insert into movimientos(cantidad_despues,fecha_movimiento,fecha_modificacion,estado_despues,inventario_id_Inventario) 
values(new.cantidadInventario,current_date(),new.fechaModificacion,new.estado_revision,new.id_Inventario);
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

-- Estructura de la tabla metododepago

DROP TABLE IF EXISTS `metododepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metododepago` (
  `ID_Met_pago` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_Met_pago`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos d ela tabla metodo de pago

LOCK TABLES `metododepago` WRITE;
/*!40000 ALTER TABLE `metododepago` DISABLE KEYS */;
INSERT INTO `metododepago` VALUES (1,'tarjeta de credito'),(2,'tarjeta de debito'),(3,'nequi'),(4,'Daviplata'),(5,'Efectivo');
/*!40000 ALTER TABLE `metododepago` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla movimientos

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos` (
  `id_Movimiento` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_despues` int(11) DEFAULT NULL,
  `fecha_movimiento` date DEFAULT NULL,
  `fecha_modificacion` date DEFAULT NULL,
  `estado_despues` varchar(45) DEFAULT NULL,
  `inventario_id_Inventario` int(11) NOT NULL,
  PRIMARY KEY (`id_Movimiento`),
  KEY `fk_movimientos_inventario1_idx` (`inventario_id_Inventario`),
  CONSTRAINT `fk_movimientos_inventario1` FOREIGN KEY (`inventario_id_Inventario`) REFERENCES `inventario` (`id_Inventario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos d ela tabla movimientos

LOCK TABLES `movimientos` WRITE;
/*!40000 ALTER TABLE `movimientos` DISABLE KEYS */;
INSERT INTO `movimientos` VALUES (33,200,'2024-08-18','2024-08-12','Revisado',0),(34,60,'2024-08-18','2024-08-13','Revisado',0),(35,120,'2024-08-18','2024-08-14','Revisado',0),(36,90,'2024-08-18','2024-08-15','Revisado',0),(37,100,'2024-08-18','2024-08-16','Revisado',0),(38,75,'2024-08-18','2024-08-17','Revisado',0),(39,130,'2024-08-18','2024-08-18','Revisado',0),(40,110,'2024-08-18','2024-08-19','Revisado',0),(41,85,'2024-08-18','2024-08-20','Revisado',0),(42,95,'2024-08-18','2024-08-21','Revisado',0),(43,140,'2024-08-18','2024-08-22','Revisado',0),(44,70,'2024-08-18','2024-08-23','Revisado',0),(45,105,'2024-08-18','2024-08-24','Revisado',0),(46,125,'2024-08-18','2024-08-25','Revisado',0),(47,80,'2024-08-18','2024-08-26','Revisado',0),(48,90,'2024-08-18','2024-08-27','Revisado',0),(49,115,'2024-08-18','2024-08-28','Revisado',0),(50,100,'2024-08-18','2024-08-29','Revisado',0),(51,85,'2024-08-18','2024-08-30','Revisado',0),(52,95,'2024-08-18','2024-08-31','Revisado',0),(53,110,'2024-08-18','2024-09-01','Revisado',0),(54,120,'2024-08-18','2024-09-02','Revisado',0),(55,75,'2024-08-18','2024-09-03','Revisado',0),(56,135,'2024-08-18','2024-09-04','Revisado',0),(58,100,'2024-08-18','2024-09-06','Revisado',0),(59,115,'2024-08-18','2024-09-07','Revisado',0),(60,90,'2024-08-18','2024-09-08','Revisado',0);
/*!40000 ALTER TABLE `movimientos` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla producto
DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id_Producto` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Precio_unit` double DEFAULT NULL,
  `Descripción` varchar(100) NOT NULL,
  `Marca` varchar(100) NOT NULL,
  `Categoría` varchar(100) NOT NULL,
  `Presentacion` varchar(100) DEFAULT NULL,
  `Fecha_vencimiento` date DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `Stock_Min` int(11) DEFAULT NULL,
  `inventario_id_Inventario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_Producto`),
  KEY `fk_producto_inventario1_idx` (`inventario_id_Inventario`),
  CONSTRAINT `fk_producto_inventario1` FOREIGN KEY (`inventario_id_Inventario`) REFERENCES `inventario` (`id_Inventario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla producto

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (2,'Smartphone Samsung Galaxy',750,'Smartphone con cámara de 64MP','Samsung','Electrónica','Unidad','2025-10-30',100,20,2),(3,'Televisor LG OLED',1200,'Televisor con pantalla OLED de 55 pulgadas','LG','Electrónica','Unidad','2025-11-15',30,5,3),(4,'Refrigerador Samsung',800,'Refrigerador de 500 litros','Samsung','Electrodoméstico','Unidad','2026-03-10',40,8,4),(5,'Aspiradora Rowenta',150,'Aspiradora de 1500W con bolsa','Rowenta','Electrodoméstico','Unidad','2025-07-22',60,15,5),(6,'Cafetera Philips',80,'Cafetera de 12 tazas','Philips','Electrodoméstico','Unidad','2025-05-30',75,20,6),(7,'Cámara Canon EOS',600,'Cámara réflex digital con lente de 18-55mm','Canon','Electrónica','Unidad','2025-09-01',25,5,7),(8,'Microwave Panasonic',120,'Microondas de 20 litros','Panasonic','Electrodoméstico','Unidad','2025-06-15',90,10,8),(9,'Plancha T-fal',50,'Plancha de vapor antiadherente','T-fal','Electrodoméstico','Unidad','2024-12-31',85,10,9),(10,'Air Fryer Philips',180,'Freidora de aire de 1.8 litros','Philips','Electrodoméstico','Unidad','2025-01-20',70,15,10),(11,'Teclado Logitech',40,'Teclado mecánico con retroiluminación','Logitech','Electrónica','Unidad','2025-04-10',95,25,11),(12,'Ratón Logitech',30,'Ratón inalámbrico con batería recargable','Logitech','Electrónica','Unidad','2025-02-28',100,30,12),(13,'Silla Gamer DXRacer',350,'Silla ergonómica para gaming','DXRacer','Muebles','Unidad','2025-08-15',20,5,13),(14,'Escritorio de Madera',200,'Escritorio de madera de 120x60 cm','MarcaEjemplo','Muebles','Unidad','2025-11-30',35,10,14),(15,'Auriculares Sony WH-1000XM4',300,'Auriculares inalámbricos con cancelación de ruido','Sony','Electrónica','Unidad','2025-12-01',45,10,15),(16,'Impresora HP DeskJet',100,'Impresora a color multifunción','HP','Electrónica','Unidad','2025-07-10',55,15,16),(17,'Teclado Gaming Corsair',80,'Teclado mecánico RGB para gaming','Corsair','Electrónica','Unidad','2025-09-05',60,20,17),(18,'Monitor Acer 24 pulgadas',220,'Monitor Full HD de 24 pulgadas','Acer','Electrónica','Unidad','2025-10-20',50,10,18),(19,'Batería externa Anker',45,'Batería externa de 10000mAh','Anker','Electrónica','Unidad','2025-03-15',80,25,19),(20,'Tablet Samsung Galaxy Tab',350,'Tablet con pantalla de 10.4 pulgadas','Samsung','Electrónica','Unidad','2025-06-01',30,8,20),(21,'Silla de Oficina Ergohuman',400,'Silla ergonómica con ajuste lumbar','Ergohuman','Muebles','Unidad','2025-08-10',25,5,21),(22,'Lámpara LED Philips',60,'Lámpara LED regulable','Philips','Electrodoméstico','Unidad','2025-04-15',70,12,22),(23,'Barra de sonido JBL',150,'Barra de sonido con Bluetooth','JBL','Electrónica','Unidad','2025-09-30',40,10,23),(24,'Estufa a gas Teka',180,'Estufa a gas de 4 quemadores','Teka','Electrodoméstico','Unidad','2025-12-15',35,7,24),(26,'Sartén T-fal',70,'Sartén antiadherente de 30 cm','T-fal','Electrodoméstico','Unidad','2025-05-01',85,15,26),(27,'Cuchillos de Cocina Zwilling',90,'Juego de cuchillos de acero inoxidable','Zwilling','Electrodoméstico','Juego','2025-11-20',55,10,27),(28,'Reloj Garmin Forerunner',200,'Reloj deportivo con GPS','Garmin','Electrónica','Unidad','2025-07-25',30,8,28),(29,'Caja de herramientas Stanley',120,'Caja de herramientas con 100 piezas','Stanley','Herramientas','Unidad','2025-10-01',40,10,29),(30,'Ventilador Orbegozo',90,'Ventilador de pie con 3 velocidades','Orbegozo','Electrodoméstico','Unidad','2025-08-01',50,12,30);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla proovedor

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `idproveedor` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `telefono` int(10) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `id_tienda` int(11) DEFAULT NULL,
  PRIMARY KEY (`idproveedor`),
  KEY `id_tienda_fk_idx` (`id_tienda`),
  CONSTRAINT `id_tienda_fk` FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`idtienda`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla proovedor

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'ElectroMundo S.A.S.',12345678,'info@electromundo.com.co',NULL),(2,'Muebles y Decoración Ltda.',8765432,'contacto@mueblesdecoracion.com.co',NULL),(3,'TechnoGadgets',3456789,'ventas@technogadgets.com.co',NULL),(4,'Electrodomésticos del Norte',2345679,'info@electrodomesticosnorte.com',NULL),(5,'Central Herramientas S.A.',4567890,'ventas@centralherramientas.com',NULL),(6,'Hogar y Estilo',6789012,'contacto@hogaryestilo.com.co',NULL),(7,'Computech Ltda.',7890123,'ventas@computechltda.com',NULL),(8,'ElectroPlus S.A.S.',8901234,'info@electroplus.com.co',NULL),(9,'Muebles y Más',9012345,'ventas@mueblesymas.com.co',NULL),(10,'Tecnología Avanzada',123456,'info@tecnologiaavanzada.com',NULL),(11,'ElectroCentro Ltda.',1234567,'contacto@electrocentroltda.com',NULL),(12,'Mobiliario Urbano',2345670,'ventas@mobiliariourbano.com.co',NULL),(13,'TechMaster S.A.S.',3456780,'info@techmaster.com.co',NULL),(14,'Electrohogar Ltda.',4567891,'contacto@electrohogar.com.co',NULL),(15,'ElectroTrend S.A.S.',5678901,'ventas@electrotrend.com',NULL),(16,'Muebles & Más',6789013,'info@mueblesymas.com.co',NULL),(17,'SmartElectro S.A.S.',7890124,'ventas@smartelectro.com.co',NULL),(18,'ElectroCasa Ltda.',8901235,'contacto@electrocasa.com.co',NULL),(19,'Tecnología Hogar',9012346,'ventas@tecnologiahogar.com',NULL),(20,'ElectroService Ltda.',123457,'info@electroservice.com.co',NULL),(21,'Muebles del Hogar',1234568,'ventas@mueblesdelhogar.com.co',NULL),(22,'TechnoTools S.A.S.',2345671,'contacto@technotools.com.co',NULL),(23,'ElectroPower Ltda.',3456781,'ventas@electropower.com.co',NULL),(24,'HogarTech S.A.S.',4567892,'info@hogartech.com.co',NULL),(25,'ElectroMax Ltda.',5678902,'contacto@electromax.com.co',NULL),(26,'Muebles Bogotá',6789014,'ventas@mueblesbogota.com.co',NULL),(27,'TechWorld Ltda.',7890125,'info@techworld.com.co',NULL),(28,'ElectroFácil S.A.S.',8901236,'ventas@electrofacil.com.co',NULL),(29,'Mobiliario Actual',9012347,'contacto@mobiliarioactual.com',NULL),(30,'ElectroSmart Ltda.',123458,'info@electrosmart.com.co',NULL);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla rol

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

-- Datos de la tabla rol

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador','Acceso completo a todas las funciones del sistema'),(2,'Empleado','Acceso limitado a las funciones operativas'),(3,'Dueño','Acceso total a su tienda');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

-- Estructura de la tabla tienda

DROP TABLE IF EXISTS `tienda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tienda` (
  `idtienda` int(11) NOT NULL,
  `nombreTienda` varchar(45) NOT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `telefono` bigint(20) DEFAULT NULL,
  `correo` varchar(45) NOT NULL,
  `contrasena` varbinary(255) NOT NULL,
  `codigo_invitacion` int(6) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idtienda`),
  UNIQUE KEY `email_UNIQUE` (`correo`),
  UNIQUE KEY `codigo_invitacion_UNIQUE` (`codigo_invitacion`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla tienda

LOCK TABLES `tienda` WRITE;
/*!40000 ALTER TABLE `tienda` DISABLE KEYS */;
INSERT INTO `tienda` VALUES (1,'Marianitas','calle 92 bis',0,'mari@gmail.com',_binary '��\�G�/\0�\�-\0�\�vWHك\�4\��	�l�;�)b\�\�\�!\�\\�\�:$*\�Բ�\�4����G�:\�3e�#n\Z',126),(2,'ElectroShop Bogotá','Av. Boyacá # 71-45',3123456789,'info@electroshopbogota.com','',93),(3,'Librería El Saber','Calle 72 # 6-14',3145678901,'ventas@libreriaelsaber.com','',94),(4,'Farmacia La Salud','Carrera 15 # 101-34',3178901234,'atencion@farmacialasalud.com','',95),(5,'Moda y Estilo','Calle 85 # 10-20',3189012345,'info@modayestilo.com','',96),(6,'Deportes y Más','Calle 53 # 21-12',3190123456,'contacto@deportesymas.com','',97),(7,'Tienda de Abarrotes La Familia','Cra 19 # 32-15',3201234567,'ventas@tiendafamilia.com','',98),(8,'Muebles y Decoración','Av. Jiménez # 5-60',3212345678,'info@mueblesdecoracion.com','',99),(9,'Juguetería Divertida','Cra 10 # 22-30',3223456789,'contacto@jugueteriadivertida.com','',100),(10,'Panadería El Trigo','Calle 50 # 8-90',3234567890,'info@panaderiaeltrigo.com','',101),(11,'Café Gourmet','Cra 9 # 45-67',3245678901,'contacto@cafegourmet.com','',102),(12,'Ropa y Moda','Av. Caracas # 48-20',3256789012,'info@ropaymoda.com','',103),(13,'Tecnología al Día','Calle 26 # 11-25',3267890123,'ventas@tecnologiaaldia.com','',104),(14,'Lácteos y Más','Cra 7 # 10-45',3278901234,'info@lacteosymas.com','',105),(15,'Tienda de Vinos','Calle 94 # 17-30',3289012345,'contacto@tiendadevinos.com','',106),(16,'Zapatería El Paso','Cra 22 # 5-90',3290123456,'info@zapateriaalpaso.com','',107),(17,'Delicatessen Gourmet','Calle 55 # 12-65',3301234567,'ventas@delicatessengourmet.com','',108),(18,'Electrodomésticos Centro','Av. El Dorado # 20-40',3312345678,'contacto@electrodomesticoscentro.com','',109),(19,'Floristería Elegante','Cra 3 # 21-75',3323456789,'info@floristeriaelegante.com','',110),(20,'Tienda de Deportes','Calle 17 # 3-60',3334567890,'contacto@tiendadeportes.com','',111),(21,'Pastelería La Dulce Vida','Cra 12 # 45-89',3345678901,'info@pastelerialadulcevida.com','',112),(22,'Centro de Belleza','Av. Chile # 25-40',3356789012,'contacto@centrobelleza.com','',113),(23,'Muebles Modernos','Calle 8 # 18-90',3367890123,'ventas@mueblesmodernos.com','',114),(24,'Juguetes para Todos','Cra 11 # 25-15',3378901234,'info@juguetesparatodos.com','',115),(26,'Perfumería y Cosméticos','Cra 16 # 30-45',3390123456,'info@perfumeriaycosmeticos.com','',117),(27,'Tiendas El Ahorro','Calle 32 # 22-90',3401234567,'contacto@tiendaselahorro.com','',118),(28,'Tienda de Tecnología','Av. San Martín # 50-60',3412345678,'ventas@tiendatecnologia.com','',119),(29,'Librería y Papelería','Cra 8 # 15-70',3423456789,'info@libreriaypapeleria.com','',120),(30,'Ropa y Calzado','Calle 46 # 22-80',3434567890,'contacto@ropaycalzado.com','',121),(31,'La esquina','calle 56',3125256732,'esquinastienda@gmail.com',_binary '����^���;<Dl*�',1),(80,'Margaritas','calle 32',123412,'tienda@gmail.com',_binary '݂(J��?��_֦٥',122),(90,'Los rosales','calle 6a',3156782834,'losrosalestienda@gmail.com',_binary '�UjI\0�uȪ00vG',123),(91,'Polleria 22','calle 82a',317462345,'pollosla22@gmail.com',_binary '��xe���9�]yk��t',124);
/*!40000 ALTER TABLE `tienda` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;

-- Trigger de encriptación de la contraseña del dueño de la tienda

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `adaxstore`.`encriptarContrasenasTienda`
BEFORE INSERT ON `adaxstore`.`tienda`
FOR EACH ROW
begin
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;

-- Trigger para actualizar y encriptar la contraseña del dueño de la tienda que no este encriptada.

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `adaxstore`.`actualizarContrasenaEncriptadaTienda`
BEFORE UPDATE ON `adaxstore`.`tienda`
FOR EACH ROW
begin
set new.contrasena = aes_encrypt(new.contrasena, "adaxdecripter2024");
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

-- Estructura de la tabla usuarios 

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
  PRIMARY KEY (`documento`),
  UNIQUE KEY `documento_UNIQUE` (`documento`),
  KEY `fk_usuarios_rol1_idx` (`rol_id_Rol`),
  KEY `fk_usuarios_tienda1_idx` (`tienda_idtienda`),
  CONSTRAINT `fk_usuarios_rol1` FOREIGN KEY (`rol_id_Rol`) REFERENCES `rol` (`id_Rol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_tienda1` FOREIGN KEY (`tienda_idtienda`) REFERENCES `tienda` (`idtienda`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla usuarios

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'TI',_binary 'z�`���E\�G/\���xbO>~0\�\�Y�N\\�%','Damian','','Camacho','','da@gmail.com',2,123,1),(2,'CC',_binary '��\�G�/\0�\�-\0�\�vWHك\�4\��	�l�;�)b\�\�\�!\�\\�\�:$*\�Բ�\�4����G�:\�3e�#n\Z','Mariana','','Jimenez','','marianita@gmail.com',2,123,8),(3,'CC',_binary '�hC⵵�\�8u���!\Z[�JϺ�F嗜`-�>','evelyn','','giraldo','','eve@gmail.com',2,123,1),(1001331,'CC',_binary 's\�e�\�l�&��\�Z(�y��.�\n �G����#','javier','','lopez','','javier23@gmail.com',2,0,2),(101088908,'CC',_binary '���\"@����p�*S','Santiago','','Martinez','','matinotes95@gmail.com',1,0,0),(1000234567,'CC',_binary '\�V��f\�c\�+Y�㙞','Maria','Fernanda','Lopez','Castro','maria.lopez@example.com',2,0,7),(1000345678,'CC',_binary '\�V��f\�c\�+Y�㙞','Andres','Felipe','Rodriguez','Sierra','andres.rodriguez@example.com',3,0,1),(1000456789,'CC','','Laura','Isabel','Hernandez','Martinez','laura.hernandez@example.com',1,0,0),(1000567890,'CC',_binary '\�V��f\�c\�+Y�㙞','Carlos','Andres','Mendoza','Valencia','carlos.mendoza@example.com',2,0,4),(1000678901,'CC',_binary '\�V��f\�c\�+Y�㙞','Valentina','Paredes','Cruz','García','valentina.paredes@example.com',3,0,2),(1000789012,'CC','','Sebastian','Gonzalez','Ardila','Ospina','sebastian.gonzalez@example.com',1,0,0),(1000890123,'CC',_binary '\�V��f\�c\�+Y�㙞','Catalina','Cruz','Cardenas','Rodriguez','catalina.cruz@example.com',2,0,2),(1000901234,'CC',_binary '\�V��f\�c\�+Y�㙞','Nicolas','Sanchez','Henao','Rivas','nicolas.sanchez@example.com',3,0,3),(1001012345,'CC','','Sofia','Torres','Morales','Suárez','sofia.torres@example.com',1,0,0),(1001123456,'CC',_binary '\�V��f\�c\�+Y�㙞','Daniela','Ramirez','Cano','Loaiza','daniela.ramirez@example.com',2,0,3),(1001234567,'CC',_binary '\�V��f\�c\�+Y�㙞','Alejandro','Hernandez','Mora','Hurtado','alejandro.hernandez@example.com',3,0,4),(1001345678,'CC','','Isabella','Mendoza','Pérez','Orjuela','isabella.mendoza@example.com',1,0,0),(1001456789,'CC',_binary '\�V��f\�c\�+Y�㙞','Jorge','Martinez','Gómez','Méndez','jorge.martinez@example.com',2,0,4),(1001567890,'CC',_binary '\�V��f\�c\�+Y�㙞','Camila','Guerra','Patiño','García','camila.guerra@example.com',3,0,5),(1001678901,'CC','','Felipe','Castro','Bermudez','García','felipe.castro@example.com',1,0,0),(1001789012,'CC',_binary '\�V��f\�c\�+Y�㙞','Mariana','Pineda','Pineda','Arboleda','mariana.pineda@example.com',2,0,8),(1001890123,'CC',_binary '\�V��f\�c\�+Y�㙞','David','Gomez','Arias','Correa','david.gomez@example.com',3,0,6),(1001901234,'CC','','Juliana','Ospina','Bermudez','Jaramillo','juliana.ospina@example.com',1,0,0),(1002012345,'CC',_binary '\�V��f\�c\�+Y�㙞','Mateo','Guerrero','Reyes','Patiño','mateo.guerrero@example.com',2,0,3),(1002123456,'CC',_binary '\�V��f\�c\�+Y�㙞','Valeria','Rojas','Martinez','Vargas','valeria.rojas@example.com',3,0,7),(1002234567,'CC','','Lucas','Vega','Ospina','Castro','lucas.vega@example.com',1,0,0),(1002345678,'CC',_binary '\�V��f\�c\�+Y�㙞','Natalia','Cano','Guzmán','García','natalia.cano@example.com',2,0,9),(1002456789,'CC',_binary '\�V��f\�c\�+Y�㙞','Juanita','Jaramillo','Mendoza','Ardila','juanita.jaramillo@example.com',3,0,8),(1002567890,'CC','','Mateo','Vargas','Pineda','Cano','mateo.vargas@example.com',1,0,0),(1002678901,'CC',_binary '\�V��f\�c\�+Y�㙞','Emilia','Cordero','Gómez','Cano','emilia.cordero@example.com',2,0,10),(1002789012,'CC',_binary '\�V��f\�c\�+Y�㙞','Samir','Alvarez','Rincón','Mora','samir.alvarez@example.com',3,0,9),(1002890123,'CC',_binary '\�V��f\�c\�+Y�㙞','Paola','Martinez','Patiño','Ospina','paola.martinez@example.com',1,0,1),(1002901234,'CC',_binary '\�V��f\�c\�+Y�㙞','Julián','Rincón','Guzmán','Rivas','julian.rincon@example.com',2,0,5),(1003012345,'CC',_binary '\�V��f\�c\�+Y�㙞','Diana','Uribe','Salazar','Sánchez','diana.uribe@example.com',3,0,10),(1003123456,'CC','','Felipe','Ortega','Arce','García','felipe.ortega@example.com',1,0,0),(1003234567,'CC',_binary '\�V��f\�c\�+Y�㙞','Carolina','Sierra','López','Castaño','carolina.sierra@example.com',2,0,6),(1003345678,'CC',_binary '\�V��f\�c\�+Y�㙞','Sebastián','Martínez','Ospina','Méndez','sebastian.martinez@example.com',3,0,11);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- Trigger para encriptar la contraseña de los usuarios

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger encriptarContrasenas
before insert on usuarios
for each row
begin
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- Trigger para actualizar y encriptar la contraseña de los usuarios que no se hayan encriptado

DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger actualizarContrasenaEncriptada
before update on usuarios
for each row
begin
set new.contrasena = aes_encrypt(new.contrasena, "adaxdecripter2024");
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

-- Estructura de la tabla venta

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id_Venta` int(11) NOT NULL AUTO_INCREMENT,
  `FechaVenta` date DEFAULT NULL,
  `HoraVenta` time NOT NULL,
  `EstadoVenta` varchar(10) NOT NULL,
  `cliente_id_Cliente` int(11) NOT NULL,
  `tienda_idtienda` int(11) NOT NULL,
  `metododepago_ID_Met_pago` int(11) NOT NULL,
  `usuarios_documento` bigint(20) NOT NULL,
  `usuarios_tienda_idtienda` int(11) NOT NULL,
  PRIMARY KEY (`id_Venta`,`usuarios_documento`,`usuarios_tienda_idtienda`),
  KEY `fk_venta_cliente1_idx` (`cliente_id_Cliente`),
  KEY `fk_venta_tienda1_idx` (`tienda_idtienda`),
  KEY `fk_venta_metodo de pago1_idx` (`metododepago_ID_Met_pago`),
  KEY `fk_venta_usuarios1_idx` (`usuarios_documento`,`usuarios_tienda_idtienda`),
  CONSTRAINT `fk_venta_cliente1` FOREIGN KEY (`cliente_id_Cliente`) REFERENCES `cliente` (`id_Cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_metodo de pago1` FOREIGN KEY (`metododepago_ID_Met_pago`) REFERENCES `metododepago` (`ID_Met_pago`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_tienda1` FOREIGN KEY (`tienda_idtienda`) REFERENCES `tienda` (`idtienda`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_venta_usuarios1` FOREIGN KEY (`usuarios_documento`, `usuarios_tienda_idtienda`) REFERENCES `usuarios` (`documento`, `tienda_idtienda`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Datos de la tabla venta

LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES (2,'2024-05-13','13:33:00','Pendiente',2,2,2,0,0),(3,'2024-05-14','14:44:00','Anulada',3,3,3,0,0),(4,'2024-05-15','15:55:00','Completa',4,4,4,0,0),(5,'2024-05-16','00:00:00','Pendiente',5,5,5,0,0),(7,'2024-05-18','00:00:00','Completa',7,2,2,0,0),(8,'2024-05-19','00:00:00','Pendiente',8,3,3,0,0),(9,'2024-05-20','20:00:00','Anulada',9,4,4,0,0),(10,'2024-05-21','21:11:00','Completa',10,5,5,0,0),(12,'2024-05-23','23:33:00','Anulada',12,2,2,0,0),(13,'2024-05-24','00:44:00','Completa',13,3,3,0,0),(14,'2024-05-25','01:55:00','Pendiente',14,4,4,0,0),(15,'2024-05-26','00:00:00','Anulada',15,5,5,0,0),(17,'2024-05-28','00:00:00','Pendiente',17,2,2,0,0),(18,'2024-05-29','00:00:00','Anulada',18,3,3,0,0),(19,'2024-05-30','06:00:00','Completa',19,4,4,0,0),(20,'2024-05-31','07:11:00','Pendiente',20,5,5,0,0),(22,'2024-06-02','09:33:00','Completa',22,2,2,0,0),(23,'2024-06-03','10:44:00','Pendiente',23,3,3,0,0),(24,'2024-06-04','11:55:00','Anulada',24,4,4,0,0),(25,'2024-06-05','00:00:00','Completa',25,5,5,0,0),(27,'2024-06-07','00:00:00','Anulada',27,2,2,0,0),(28,'2024-06-08','00:00:00','Completa',28,3,3,0,0),(29,'2024-06-09','16:00:00','Pendiente',29,4,4,0,0),(30,'2024-06-10','17:11:00','Anulada',30,5,5,0,0);
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;


-- CREACIÓN DE FUNCIONES

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN DE DESENCRIPTAR CONTRASEÑA

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClave`(docu int) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
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
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- Funcion para desencriptar la contraseña del usuario usando el correo

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA DESENCRIPTAR CLAVE DE LA TIENDA USANDO EL CORREO

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClaveCorreoTienda`(email varchar(45)) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA DESENCRIPTAR CLAVE DE LA TIENDA CON EL DOCUMENTO

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `desencriptarClaveTienda`(docu int) RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA OBTENER EL HISTORIAL DE MOVIMIENTOS 

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA OBTENER EL STOCK DE UN PRODUCTO ESPECIFICO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA VISULAIZAR EL PRODUCTO MÁS VENDIDO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA VER EL TOTAL DE CLIENTES

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- FUNCIÓN PARA VER EL TOTAL DE UNA VENTA, USANDO EL DÍA COMO PARAMETRO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMIENTO PARA BUSCAR UN PRODUCTO POR NIVEL DE POPULARIDAD COMO PARAMETRO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMIENTO PARA BSUACR UNA FACTURA CON EL ID DE LA FACTURA

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMIENTO PARA VER LAS VENTAS ENTRE 2 FECHAS ESPECIFICAS

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMIENTO PARA INSERTAR UN NUEVO PRODUCTO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMIENTO PARA ACTUALIZAR O MODIFICAR UN PRODUCTO ESPECIFICO

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarProducto`(IN `id_Producto ` INT(11), IN `NuevoNombre` VARCHAR(100), IN `NuevaCantidad ` INT(11), IN `NuevoPrecio` DOUBLE, IN `NuevoStockMinimo` INT(11), IN `NuevaPresentacion ` VARCHAR(100), IN `NuevaMarca` VARCHAR(100), IN `PromocionActual ` VARCHAR(100), IN `NuevaCategoria ` VARCHAR(50), IN `NuevaFechaVencimiento` DATE)
BEGIN
    UPDATE producto AS p
    SET p.Nombre = NuevoNombre,
        p.Precio_unit= NuevoPrecio,
        p.Stock_Min = NuevoStockMinimo,
        p.Presentacion = NuevaPresentacion,
        p.Marca = NuevaMarca,
        p.Categoría = NuevaCategoria,
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMEINTO PARA MOSTRAR EL PROOVEDOR DE UN PRODUCTO EN ESPECIFICO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMIENTO PARA MOSTRAR EL PROOVEDOR DE UN PRODUCTO ESPECIFICO

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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMEINTO PARA RECUPERAR LA CONTRASEÑA CON EL CORREO DE UN USUARIO ESPECIFICO

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RecuperarContrasenaUsuario`(IN `p_correo ` VARCHAR(100))
BEGIN
    DECLARE v_contrasena VARBINARY(255);
    
    SELECT contrasena INTO v_contrasena
    FROM usuarios
    WHERE correo = p_correo;
    
    IF v_contrasena IS NOT NULL THEN
        SELECT CONCAT('La contraseña para el correo ', p_correo, ' es: ', CONVERT(v_contrasena USING utf8)) AS Mensaje;
    ELSE
        SELECT 'Correo electrónico no encontrado' AS Mensaje;
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;

-- PROCEDIMEITNO PARA RECUPERAR UNA CONTRASEÑA CON EL CORREO DE UN USUARIO ESPECIFICO

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `RecuperarContrasenaUsuario2`(IN `p_correo` VARCHAR(100))
BEGIN
    DECLARE contrasena VARBINARY(255);
    
    
    SELECT contrasena INTO contrasena
    FROM usuarios
    WHERE correo = correo
    LIMIT 1;
    
    IF contrasena IS NOT NULL THEN
        SELECT CONCAT('La contraseña para el correo ', p_correo, ' es: ', contrasena )
        AS Mensaje;
    ELSE
        SELECT 'Correo electrónico no encontrado' AS Mensaje;
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

-- Dump completed on 2024-09-27 10:08:50
