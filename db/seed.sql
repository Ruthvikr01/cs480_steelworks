/* ============================================================
    SEED DATA – OPERATIONAL ANALYTICS DATASET
   ============================================================ */


---------------------------------------------------------------
-- LOTS 
---------------------------------------------------------------
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (1,'LOT-001','PN-AX12','2025-01-10','completed');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (2,'LOT-002','PN-BX99','2025-01-12','in_progress');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (3,'LOT-003','PN-CX77','2025-01-15','planned');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (4,'LOT-004','PN-DX11','2025-01-18','completed');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (5,'LOT-005','PN-EX44','2025-01-20','completed');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (6,'LOT-006','PN-FX55','2025-01-22','completed');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (7,'LOT-007','PN-GX21','2025-01-25','in_progress');
INSERT INTO lots (id, lot_id, part_number, production_date, status) VALUES (8,'LOT-008','PN-HX88','2025-01-28','planned');

---------------------------------------------------------------
-- PRODUCTION LINES
---------------------------------------------------------------
INSERT INTO production_lines (id, line_name, location) VALUES (1,'Line A','Plant 1');
INSERT INTO production_lines (id, line_name, location) VALUES (2,'Line B','Plant 2');
INSERT INTO production_lines (id, line_name, location) VALUES (3,'Line C','Plant 1');
INSERT INTO production_lines (id, line_name, location) VALUES (4,'Line D','Plant 2');
INSERT INTO production_lines (id, line_name, location) VALUES (5,'Line E','Plant 3');

---------------------------------------------------------------
-- PRODUCTION RECORDS 
---------------------------------------------------------------
INSERT INTO production_records VALUES (1,1,1,'2025-01-10','day',1000,960,12,false,'Normal shift');
INSERT INTO production_records VALUES (2,1,1,'2025-01-10','night',900,880,8,false,'Smooth run');
INSERT INTO production_records VALUES (3,1,2,'2025-01-11','swing',950,910,15,false,'Minor adjustment');
INSERT INTO production_records VALUES (4,2,2,'2025-01-12','day',1200,1120,20,true,'Material delay');
INSERT INTO production_records VALUES (5,2,2,'2025-01-12','night',1100,1080,10,false,'Recovered');
INSERT INTO production_records VALUES (6,2,3,'2025-01-13','swing',1000,970,18,false,'Operator learning');
INSERT INTO production_records VALUES (7,3,3,'2025-01-15','day',900,850,25,true,'Setup issue');
INSERT INTO production_records VALUES (8,3,3,'2025-01-15','night',920,910,6,false,'Stable');
INSERT INTO production_records VALUES (9,3,4,'2025-01-16','swing',940,920,9,false,'Improved run');
INSERT INTO production_records VALUES (10,4,4,'2025-01-18','day',980,960,5,false,'Efficient');
INSERT INTO production_records VALUES (11,4,4,'2025-01-18','night',960,940,7,false,'Good shift');
INSERT INTO production_records VALUES (12,4,5,'2025-01-19','swing',950,930,11,false,'Routine');
INSERT INTO production_records VALUES (13,5,5,'2025-01-20','day',1100,1070,6,false,'High output');
INSERT INTO production_records VALUES (14,5,5,'2025-01-20','night',1050,1030,4,false,'Stable run');
INSERT INTO production_records VALUES (15,5,1,'2025-01-21','swing',1000,970,12,false,'Minor downtime');
INSERT INTO production_records VALUES (16,6,1,'2025-01-22','day',1080,1050,9,false,'Routine');
INSERT INTO production_records VALUES (17,6,1,'2025-01-22','night',1060,1020,14,false,'Adjustment needed');
INSERT INTO production_records VALUES (18,6,2,'2025-01-23','swing',1040,1000,20,true,'Machine vibration');
INSERT INTO production_records VALUES (19,7,2,'2025-01-25','day',970,940,10,false,'Normal');
INSERT INTO production_records VALUES (20,7,2,'2025-01-25','night',960,950,3,false,'Excellent shift');
INSERT INTO production_records VALUES (21,7,3,'2025-01-27','swing',950,930,7,false,'Routine');
INSERT INTO production_records VALUES (22,8,3,'2025-01-28','day',1020,1000,5,false,'Good output');
INSERT INTO production_records VALUES (23,8,3,'2025-01-28','night',1000,980,8,false,'Stable shift');
INSERT INTO production_records VALUES (24,8,4,'2025-01-29','swing',990,960,14,false,'Minor delay');

INSERT INTO production_records VALUES (25,1,5,'2025-01-11','day',970,950,6,false,'Balanced run');
INSERT INTO production_records VALUES (26,1,2,'2025-01-12','night',940,920,7,false,'Normal');
INSERT INTO production_records VALUES (27,2,3,'2025-01-14','swing',960,930,10,false,'Routine');

INSERT INTO production_records VALUES (28,2,4,'2025-01-14','day',990,960,12,false,'Operator training');

INSERT INTO production_records VALUES (29,3,5,'2025-01-16','night',910,890,8,false,'Normal');
INSERT INTO production_records VALUES (30,3,1,'2025-01-17','swing',920,900,9,false,'Stable');

INSERT INTO production_records VALUES (31,4,2,'2025-01-19','day',980,950,10,false,'Routine');
INSERT INTO production_records VALUES (32,4,3,'2025-01-20','night',970,940,11,false,'Slight slowdown');

INSERT INTO production_records VALUES (33,5,4,'2025-01-21','swing',1040,1020,5,false,'Efficient');
INSERT INTO production_records VALUES (34,5,5,'2025-01-22','day',1050,1030,6,false,'Good');

INSERT INTO production_records VALUES (35,6,1,'2025-01-23','night',1080,1060,7,false,'Smooth');
INSERT INTO production_records VALUES (36,6,2,'2025-01-24','swing',1100,1080,9,false,'Stable');

INSERT INTO production_records VALUES (37,7,3,'2025-01-26','day',960,940,8,false,'Routine');
INSERT INTO production_records VALUES (38,7,4,'2025-01-27','night',950,930,7,false,'Normal');

INSERT INTO production_records VALUES (39,8,5,'2025-01-29','swing',1010,990,6,false,'Balanced');
INSERT INTO production_records VALUES (40,8,1,'2025-01-30','day',1020,1000,5,false,'Good output');

INSERT INTO production_records VALUES (41,1,2,'2025-01-12','swing',930,910,6,false,'Normal');
INSERT INTO production_records VALUES (42,2,3,'2025-01-14','night',980,950,10,false,'Routine');
INSERT INTO production_records VALUES (43,3,4,'2025-01-17','day',960,940,8,false,'Stable');
INSERT INTO production_records VALUES (44,4,5,'2025-01-20','swing',990,960,9,false,'Routine');

INSERT INTO production_records VALUES (45,5,1,'2025-01-22','night',1030,1010,7,false,'Normal');
INSERT INTO production_records VALUES (46,6,2,'2025-01-24','day',1080,1050,10,false,'Routine');
INSERT INTO production_records VALUES (47,7,3,'2025-01-26','swing',940,920,8,false,'Normal');
INSERT INTO production_records VALUES (48,8,4,'2025-01-29','night',1000,980,6,false,'Stable');

INSERT INTO production_records VALUES (49,2,5,'2025-01-15','day',970,950,7,false,'Routine');
INSERT INTO production_records VALUES (50,6,1,'2025-01-23','swing',1060,1030,12,false,'Minor delay');

---------------------------------------------------------------
-- INSPECTION RECORDS
---------------------------------------------------------------
INSERT INTO inspection_records VALUES (1,1,'2025-01-11',5,'pass','John Smith','Within tolerance');
INSERT INTO inspection_records VALUES (2,1,'2025-01-12',3,'pass','Lina Perez','Good batch');
INSERT INTO inspection_records VALUES (3,2,'2025-01-13',25,'rework','Maria Lopez','Surface defects');
INSERT INTO inspection_records VALUES (4,2,'2025-01-14',8,'pass','Kevin Tran','Corrected');

INSERT INTO inspection_records VALUES (5,3,'2025-01-16',30,'hold','Sam Lee','Major issues');
INSERT INTO inspection_records VALUES (6,3,'2025-01-17',10,'rework','Liam Patel','Fix required');

INSERT INTO inspection_records VALUES (7,4,'2025-01-19',2,'pass','Sarah Ali','Minor scratches');
INSERT INTO inspection_records VALUES (8,4,'2025-01-20',1,'pass','Evan Cruz','Clean');

INSERT INTO inspection_records VALUES (9,5,'2025-01-21',0,'pass','Anna Wu','Perfect');
INSERT INTO inspection_records VALUES (10,5,'2025-01-22',3,'pass','Brian Scott','Good');

INSERT INTO inspection_records VALUES (11,6,'2025-01-23',6,'pass','Carlos Diaz','Within limits');
INSERT INTO inspection_records VALUES (12,6,'2025-01-24',4,'pass','Nina Roy','Stable');

INSERT INTO inspection_records VALUES (13,7,'2025-01-26',12,'rework','Zack Ford','Tolerance issue');
INSERT INTO inspection_records VALUES (14,7,'2025-01-27',5,'pass','Ivy Chen','Corrected');

INSERT INTO inspection_records VALUES (15,8,'2025-01-29',0,'pass','Omar Khan','Clean batch');
INSERT INTO inspection_records VALUES (16,8,'2025-01-30',2,'pass','Julia Stone','Good');

INSERT INTO inspection_records VALUES (17,1,'2025-01-13',4,'pass','John Smith','Routine');
INSERT INTO inspection_records VALUES (18,2,'2025-01-15',7,'pass','Maria Lopez','Stable');
INSERT INTO inspection_records VALUES (19,3,'2025-01-18',18,'rework','Sam Lee','Fix needed');
INSERT INTO inspection_records VALUES (20,4,'2025-01-21',1,'pass','Kevin Tran','Good');

INSERT INTO inspection_records VALUES (21,5,'2025-01-23',0,'pass','Anna Wu','Excellent');
INSERT INTO inspection_records VALUES (22,6,'2025-01-25',3,'pass','Carlos Diaz','Minor');
INSERT INTO inspection_records VALUES (23,7,'2025-01-27',9,'pass','Zack Ford','OK');
INSERT INTO inspection_records VALUES (24,8,'2025-01-30',2,'pass','Julia Stone','Clean');
INSERT INTO inspection_records VALUES (25,3,'2025-01-19',15,'rework','Liam Patel','Rework done');
INSERT INTO inspection_records VALUES (26,1,'2025-01-14',3,'pass','John Smith','Routine');
INSERT INTO inspection_records VALUES (27,2,'2025-01-16',11,'rework','Maria Lopez','Tolerance exceeded');
INSERT INTO inspection_records VALUES (28,3,'2025-01-20',22,'rework','Sam Lee','Major defects');
INSERT INTO inspection_records VALUES (29,4,'2025-01-22',0,'pass','Kevin Tran','Perfect');

INSERT INTO inspection_records VALUES (30,5,'2025-01-24',4,'pass','Anna Wu','Good batch');
INSERT INTO inspection_records VALUES (31,6,'2025-01-26',7,'pass','Carlos Diaz','Minor');
INSERT INTO inspection_records VALUES (32,7,'2025-01-28',14,'rework','Zack Ford','Fix needed');
INSERT INTO inspection_records VALUES (33,8,'2025-01-31',1,'pass','Julia Stone','Clean');

INSERT INTO inspection_records VALUES (34,1,'2025-01-15',2,'pass','John Smith','Good');
INSERT INTO inspection_records VALUES (35,2,'2025-01-17',6,'pass','Maria Lopez','Acceptable');
INSERT INTO inspection_records VALUES (36,3,'2025-01-21',28,'hold','Sam Lee','Shipment blocked');
INSERT INTO inspection_records VALUES (37,4,'2025-01-23',0,'pass','Kevin Tran','Clean');

INSERT INTO inspection_records VALUES (38,5,'2025-01-25',5,'pass','Anna Wu','OK');
INSERT INTO inspection_records VALUES (39,6,'2025-01-27',2,'pass','Carlos Diaz','Good');
INSERT INTO inspection_records VALUES (40,7,'2025-01-29',8,'pass','Zack Ford','Within limits');
INSERT INTO inspection_records VALUES (41,8,'2025-02-01',0,'pass','Julia Stone','Excellent');

INSERT INTO inspection_records VALUES (42,1,'2025-01-16',1,'pass','John Smith','Routine');
INSERT INTO inspection_records VALUES (43,2,'2025-01-18',12,'rework','Maria Lopez','Rework required');
INSERT INTO inspection_records VALUES (44,3,'2025-01-22',17,'rework','Sam Lee','Fix done');
INSERT INTO inspection_records VALUES (45,4,'2025-01-24',3,'pass','Kevin Tran','Good');

INSERT INTO inspection_records VALUES (46,5,'2025-01-26',0,'pass','Anna Wu','Perfect');
INSERT INTO inspection_records VALUES (47,6,'2025-01-28',6,'pass','Carlos Diaz','Stable');
INSERT INTO inspection_records VALUES (48,7,'2025-01-30',9,'pass','Zack Ford','OK');
INSERT INTO inspection_records VALUES (49,8,'2025-02-02',0,'pass','Julia Stone','Clean');
INSERT INTO inspection_records VALUES (50,4,'2025-01-25',2,'pass','Kevin Tran','Minor');

---------------------------------------------------------------
-- SHIPPING RECORDS 
---------------------------------------------------------------
INSERT INTO shipping_records VALUES (1,1,'2025-01-14','ABC Manufacturing','Texas','UPS','TRK10001',900,'shipped',NULL,'On schedule');
INSERT INTO shipping_records VALUES (2,1,'2025-01-15','ABC Manufacturing','Texas','UPS','TRK10002',50,'delivered',NULL,'Final batch');

INSERT INTO shipping_records VALUES (3,2,NULL,'XYZ Industries','California','FedEx',NULL,0,'hold','Await inspection','Pending QA');
INSERT INTO shipping_records VALUES (4,2,'2025-01-18','XYZ Industries','California','FedEx','TRK10003',600,'shipped',NULL,'Partial release');

INSERT INTO shipping_records VALUES (5,3,NULL,'Vector Corp','Florida','UPS',NULL,0,'hold','Production delay','Waiting');
INSERT INTO shipping_records VALUES (6,4,'2025-01-22','Delta Parts','Illinois','DHL','TRK10004',870,'shipped',NULL,'Express');

INSERT INTO shipping_records VALUES (7,5,'2025-01-23','Omega Inc','Ohio','UPS','TRK10005',1030,'shipped',NULL,'Standard');
INSERT INTO shipping_records VALUES (8,6,'2025-01-24','Nova Systems','Arizona','FedEx','TRK10006',1050,'shipped',NULL,'Routine');

INSERT INTO shipping_records VALUES (9,7,NULL,'Prime Tech','Nevada','UPS',NULL,0,'hold','Await rework','Blocked');
INSERT INTO shipping_records VALUES (10,8,NULL,'Future Devices','Oregon','DHL',NULL,0,'hold','Planned lot','Not released');

INSERT INTO shipping_records VALUES (11,1,'2025-01-16','ABC Manufacturing','Texas','UPS','TRK10007',100,'delivered',NULL,'Add-on');
INSERT INTO shipping_records VALUES (12,2,'2025-01-19','XYZ Industries','California','FedEx','TRK10008',200,'delivered',NULL,'Late release');

INSERT INTO shipping_records VALUES (13,4,'2025-01-24','Delta Parts','Illinois','DHL','TRK10009',100,'delivered',NULL,'Completion');
INSERT INTO shipping_records VALUES (14,5,'2025-01-25','Omega Inc','Ohio','UPS','TRK10010',200,'delivered',NULL,'Batch');

INSERT INTO shipping_records VALUES (15,6,'2025-01-26','Nova Systems','Arizona','FedEx','TRK10011',200,'delivered',NULL,'Partial');
INSERT INTO shipping_records VALUES (16,7,NULL,'Prime Tech','Nevada','UPS',NULL,0,'hold','Inspection','Blocked');

INSERT INTO shipping_records VALUES (17,8,NULL,'Future Devices','Oregon','DHL',NULL,0,'hold','Not produced','Waiting');
INSERT INTO shipping_records VALUES (18,1,'2025-01-17','ABC Manufacturing','Texas','UPS','TRK10012',80,'delivered',NULL,'Supplement');
INSERT INTO shipping_records VALUES (19,2,'2025-01-20','XYZ Industries','California','FedEx','TRK10013',150,'delivered',NULL,'Supplement');
INSERT INTO shipping_records VALUES (20,3,NULL,'Vector Corp','Florida','UPS',NULL,0,'hold','Quality hold','Pending');

INSERT INTO shipping_records VALUES (21,4,'2025-01-26','Delta Parts','Illinois','DHL','TRK10014',50,'delivered',NULL,'Add-on');
INSERT INTO shipping_records VALUES (22,5,'2025-01-27','Omega Inc','Ohio','UPS','TRK10015',75,'delivered',NULL,'Add-on');
INSERT INTO shipping_records VALUES (23,6,'2025-01-28','Nova Systems','Arizona','FedEx','TRK10016',60,'delivered',NULL,'Add-on');

INSERT INTO shipping_records VALUES (24,7,NULL,'Prime Tech','Nevada','UPS',NULL,0,'hold','Rework','Waiting');
INSERT INTO shipping_records VALUES (25,8,NULL,'Future Devices','Oregon','DHL',NULL,0,'hold','Planning','Pending');
INSERT INTO shipping_records VALUES (26,1,'2025-01-18','ABC Manufacturing','Texas','UPS','TRK10017',40,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (27,2,'2025-01-21','XYZ Industries','California','FedEx','TRK10018',30,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (28,4,'2025-01-27','Delta Parts','Illinois','DHL','TRK10019',20,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (29,5,'2025-01-28','Omega Inc','Ohio','UPS','TRK10020',25,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (30,6,'2025-01-29','Nova Systems','Arizona','FedEx','TRK10021',35,'delivered',NULL,'Extra');

INSERT INTO shipping_records VALUES (31,1,'2025-01-19','ABC Manufacturing','Texas','UPS','TRK10022',45,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (32,2,'2025-01-22','XYZ Industries','California','FedEx','TRK10023',55,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (33,4,'2025-01-28','Delta Parts','Illinois','DHL','TRK10024',65,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (34,5,'2025-01-29','Omega Inc','Ohio','UPS','TRK10025',70,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (35,6,'2025-01-30','Nova Systems','Arizona','FedEx','TRK10026',75,'delivered',NULL,'Extra');

INSERT INTO shipping_records VALUES (36,1,'2025-01-20','ABC Manufacturing','Texas','UPS','TRK10027',30,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (37,2,'2025-01-23','XYZ Industries','California','FedEx','TRK10028',40,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (38,4,'2025-01-29','Delta Parts','Illinois','DHL','TRK10029',45,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (39,5,'2025-01-30','Omega Inc','Ohio','UPS','TRK10030',50,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (40,6,'2025-01-31','Nova Systems','Arizona','FedEx','TRK10031',55,'delivered',NULL,'Extra');

INSERT INTO shipping_records VALUES (41,1,'2025-01-21','ABC Manufacturing','Texas','UPS','TRK10032',35,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (42,2,'2025-01-24','XYZ Industries','California','FedEx','TRK10033',45,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (43,4,'2025-01-30','Delta Parts','Illinois','DHL','TRK10034',55,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (44,5,'2025-01-31','Omega Inc','Ohio','UPS','TRK10035',60,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (45,6,'2025-02-01','Nova Systems','Arizona','FedEx','TRK10036',65,'delivered',NULL,'Extra');

INSERT INTO shipping_records VALUES (46,1,'2025-01-22','ABC Manufacturing','Texas','UPS','TRK10037',25,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (47,2,'2025-01-25','XYZ Industries','California','FedEx','TRK10038',35,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (48,4,'2025-01-31','Delta Parts','Illinois','DHL','TRK10039',45,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (49,5,'2025-02-01','Omega Inc','Ohio','UPS','TRK10040',50,'delivered',NULL,'Extra');
INSERT INTO shipping_records VALUES (50,6,'2025-02-02','Nova Systems','Arizona','FedEx','TRK10041',55,'delivered',NULL,'Extra');
