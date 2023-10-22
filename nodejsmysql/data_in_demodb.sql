/*
DBMS: MySQL
DabaseName: demodb
UserName: root
Password: ไม่มี
*/

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `remark` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `tbl_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `tbl_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuID` int(11) NOT NULL,
  `roleID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

INSERT INTO `users`( `name`, `email`, `password`, `role`, `remark`) 
VALUES ('admin','admin@hotmail.com','admin123','admin','remark');

INSERT INTO `tbl_menu`(`role`) VALUES ('admin');
INSERT INTO `tbl_menu`(`role`) VALUES ('technic');
INSERT INTO `tbl_menu`(`role`) VALUES ('stock');

INSERT INTO `tbl_permission`(`menuID`, `roleID`) VALUES (1,1);
INSERT INTO `tbl_permission`(`menuID`, `roleID`) VALUES (2,1);
INSERT INTO `tbl_permission`(`menuID`, `roleID`) VALUES (3,1);
INSERT INTO `tbl_permission`(`menuID`, `roleID`) VALUES (2,2);
INSERT INTO `tbl_permission`(`menuID`, `roleID`) VALUES (3,2);
INSERT INTO `tbl_permission`(`menuID`, `roleID`) VALUES (3,3);