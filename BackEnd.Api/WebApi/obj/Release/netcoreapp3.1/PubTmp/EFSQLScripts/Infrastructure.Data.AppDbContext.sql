CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(95) NOT NULL,
    `ProductVersion` varchar(32) NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
);


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ColonoscopySetting` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `LogoPath` longtext CHARACTER SET utf8mb4 NULL,
        `LeftText` longtext CHARACTER SET utf8mb4 NULL,
        `RightText` longtext CHARACTER SET utf8mb4 NULL,
        `ReportName` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_ColonoscopySetting` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ColonoscopyTemplate` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Scope` longtext CHARACTER SET utf8mb4 NULL,
        `OutPatient` longtext CHARACTER SET utf8mb4 NULL,
        `InPatient` longtext CHARACTER SET utf8mb4 NULL,
        `Anaesth` longtext CHARACTER SET utf8mb4 NULL,
        `Indications` longtext CHARACTER SET utf8mb4 NULL,
        `Colonoscopy` longtext CHARACTER SET utf8mb4 NULL,
        `Conclusion` longtext CHARACTER SET utf8mb4 NULL,
        `NameTemplate` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_ColonoscopyTemplate` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `Degrees` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Type` longtext CHARACTER SET utf8mb4 NULL,
        `Name` longtext CHARACTER SET utf8mb4 NULL,
        `NameAr` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_Degrees` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `Department` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Name` longtext CHARACTER SET utf8mb4 NULL,
        `NameAr` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_Department` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ERCPSetting` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `LogoPath` longtext CHARACTER SET utf8mb4 NULL,
        `LeftText` longtext CHARACTER SET utf8mb4 NULL,
        `RightText` longtext CHARACTER SET utf8mb4 NULL,
        `ReportName` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_ERCPSetting` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ERCPTemplate` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Scope` longtext CHARACTER SET utf8mb4 NULL,
        `OutPatient` longtext CHARACTER SET utf8mb4 NULL,
        `InPatient` longtext CHARACTER SET utf8mb4 NULL,
        `Anaesth` longtext CHARACTER SET utf8mb4 NULL,
        `NameTemplate` longtext CHARACTER SET utf8mb4 NULL,
        `Indications` longtext CHARACTER SET utf8mb4 NULL,
        `Procedures` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_ERCPTemplate` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `Roles` (
        `Id` char(36) NOT NULL,
        `Name` varchar(256) CHARACTER SET utf8mb4 NULL,
        `NormalizedName` varchar(256) CHARACTER SET utf8mb4 NULL,
        `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 NULL,
        `NameAr` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_Roles` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `UGISetting` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `LogoPath` longtext CHARACTER SET utf8mb4 NULL,
        `LeftText` longtext CHARACTER SET utf8mb4 NULL,
        `RightText` longtext CHARACTER SET utf8mb4 NULL,
        `ReportName` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_UGISetting` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `UGITemplate` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Scope` longtext CHARACTER SET utf8mb4 NULL,
        `NameTemplate` longtext CHARACTER SET utf8mb4 NULL,
        `OutPatient` longtext CHARACTER SET utf8mb4 NULL,
        `InPatient` longtext CHARACTER SET utf8mb4 NULL,
        `Anaesth` longtext CHARACTER SET utf8mb4 NULL,
        `Indications` longtext CHARACTER SET utf8mb4 NULL,
        `Esophagus` longtext CHARACTER SET utf8mb4 NULL,
        `Stomach` longtext CHARACTER SET utf8mb4 NULL,
        `Pylorus` longtext CHARACTER SET utf8mb4 NULL,
        `Duodenum` longtext CHARACTER SET utf8mb4 NULL,
        `Conclusion` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_UGITemplate` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `Users` (
        `Id` char(36) NOT NULL,
        `UserName` varchar(256) CHARACTER SET utf8mb4 NULL,
        `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 NULL,
        `Email` varchar(256) CHARACTER SET utf8mb4 NULL,
        `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 NULL,
        `EmailConfirmed` tinyint(1) NOT NULL,
        `PasswordHash` longtext CHARACTER SET utf8mb4 NULL,
        `SecurityStamp` longtext CHARACTER SET utf8mb4 NULL,
        `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 NULL,
        `PhoneNumber` longtext CHARACTER SET utf8mb4 NULL,
        `PhoneNumberConfirmed` tinyint(1) NOT NULL,
        `TwoFactorEnabled` tinyint(1) NOT NULL,
        `LockoutEnd` datetime(6) NULL,
        `LockoutEnabled` tinyint(1) NOT NULL,
        `AccessFailedCount` int NOT NULL,
        `FirstName` longtext CHARACTER SET utf8mb4 NULL,
        `LastName` longtext CHARACTER SET utf8mb4 NULL,
        `MiddelName` longtext CHARACTER SET utf8mb4 NULL,
        `State` longtext CHARACTER SET utf8mb4 NULL,
        `City` longtext CHARACTER SET utf8mb4 NULL,
        `Street` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_Users` PRIMARY KEY (`Id`)
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `Doctors` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `FirstName` longtext CHARACTER SET utf8mb4 NULL,
        `SecondName` longtext CHARACTER SET utf8mb4 NULL,
        `ThirdName` longtext CHARACTER SET utf8mb4 NULL,
        `LastName` longtext CHARACTER SET utf8mb4 NULL,
        `Phone` longtext CHARACTER SET utf8mb4 NULL,
        `Email` longtext CHARACTER SET utf8mb4 NULL,
        `DateOfBirth` datetime(6) NOT NULL,
        `NationalId` longtext CHARACTER SET utf8mb4 NULL,
        `State` longtext CHARACTER SET utf8mb4 NULL,
        `City` longtext CHARACTER SET utf8mb4 NULL,
        `Street` longtext CHARACTER SET utf8mb4 NULL,
        `University` longtext CHARACTER SET utf8mb4 NULL,
        `ReportDescription` longtext CHARACTER SET utf8mb4 NULL,
        `IsConsultant` tinyint(1) NOT NULL,
        `IsShowReportMenu` tinyint(1) NOT NULL,
        `DepartmentId` char(36) NOT NULL,
        CONSTRAINT `PK_Doctors` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Doctors_Department_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `Department` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `Patients` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `FirstName` longtext CHARACTER SET utf8mb4 NULL,
        `SecondName` longtext CHARACTER SET utf8mb4 NULL,
        `ThirdName` longtext CHARACTER SET utf8mb4 NULL,
        `LastName` longtext CHARACTER SET utf8mb4 NULL,
        `Phone` longtext CHARACTER SET utf8mb4 NULL,
        `Email` longtext CHARACTER SET utf8mb4 NULL,
        `DateOfBirth` datetime(6) NOT NULL,
        `NationalId` longtext CHARACTER SET utf8mb4 NULL,
        `State` longtext CHARACTER SET utf8mb4 NULL,
        `City` longtext CHARACTER SET utf8mb4 NULL,
        `Street` longtext CHARACTER SET utf8mb4 NULL,
        `LabCode` longtext CHARACTER SET utf8mb4 NULL,
        `DegreeId` char(36) NOT NULL,
        `DepartmentId` char(36) NOT NULL,
        CONSTRAINT `PK_Patients` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_Patients_Degrees_DegreeId` FOREIGN KEY (`DegreeId`) REFERENCES `Degrees` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_Patients_Department_DepartmentId` FOREIGN KEY (`DepartmentId`) REFERENCES `Department` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `AspNetRoleClaims` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `RoleId` char(36) NOT NULL,
        `ClaimType` longtext CHARACTER SET utf8mb4 NULL,
        `ClaimValue` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetRoleClaims` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_AspNetRoleClaims_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `AspNetUserClaims` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `UserId` char(36) NOT NULL,
        `ClaimType` longtext CHARACTER SET utf8mb4 NULL,
        `ClaimValue` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetUserClaims` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_AspNetUserClaims_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `AspNetUserLogins` (
        `LoginProvider` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ProviderKey` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `ProviderDisplayName` longtext CHARACTER SET utf8mb4 NULL,
        `UserId` char(36) NOT NULL,
        CONSTRAINT `PK_AspNetUserLogins` PRIMARY KEY (`LoginProvider`, `ProviderKey`),
        CONSTRAINT `FK_AspNetUserLogins_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `AspNetUserTokens` (
        `UserId` char(36) NOT NULL,
        `LoginProvider` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
        `Value` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_AspNetUserTokens` PRIMARY KEY (`UserId`, `LoginProvider`, `Name`),
        CONSTRAINT `FK_AspNetUserTokens_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `UserRoles` (
        `UserId` char(36) NOT NULL,
        `RoleId` char(36) NOT NULL,
        CONSTRAINT `PK_UserRoles` PRIMARY KEY (`UserId`, `RoleId`),
        CONSTRAINT `FK_UserRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_UserRoles_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ColonoscopyReport` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Scope` longtext CHARACTER SET utf8mb4 NULL,
        `OutPatient` longtext CHARACTER SET utf8mb4 NULL,
        `InPatient` longtext CHARACTER SET utf8mb4 NULL,
        `Anaesth` longtext CHARACTER SET utf8mb4 NULL,
        `Indications` longtext CHARACTER SET utf8mb4 NULL,
        `Colonoscopy` longtext CHARACTER SET utf8mb4 NULL,
        `Conclusion` longtext CHARACTER SET utf8mb4 NULL,
        `PatientId` char(36) NOT NULL,
        `ConsultantId` char(36) NOT NULL,
        `EndoscopistId` char(36) NOT NULL,
        CONSTRAINT `PK_ColonoscopyReport` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_ColonoscopyReport_Doctors_ConsultantId` FOREIGN KEY (`ConsultantId`) REFERENCES `Doctors` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_ColonoscopyReport_Doctors_EndoscopistId` FOREIGN KEY (`EndoscopistId`) REFERENCES `Doctors` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_ColonoscopyReport_Patients_PatientId` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ERCPReport` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Indications` longtext CHARACTER SET utf8mb4 NULL,
        `Procedures` longtext CHARACTER SET utf8mb4 NULL,
        `PatientId` char(36) NOT NULL,
        `ConsultantId` char(36) NOT NULL,
        `EndoscopistId` char(36) NOT NULL,
        CONSTRAINT `PK_ERCPReport` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_ERCPReport_Doctors_ConsultantId` FOREIGN KEY (`ConsultantId`) REFERENCES `Doctors` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_ERCPReport_Doctors_EndoscopistId` FOREIGN KEY (`EndoscopistId`) REFERENCES `Doctors` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_ERCPReport_Patients_PatientId` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `UGIReport` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `Scope` longtext CHARACTER SET utf8mb4 NULL,
        `OutPatient` longtext CHARACTER SET utf8mb4 NULL,
        `InPatient` longtext CHARACTER SET utf8mb4 NULL,
        `Anaesth` longtext CHARACTER SET utf8mb4 NULL,
        `Indications` longtext CHARACTER SET utf8mb4 NULL,
        `Esophagus` longtext CHARACTER SET utf8mb4 NULL,
        `Stomach` longtext CHARACTER SET utf8mb4 NULL,
        `Pylorus` longtext CHARACTER SET utf8mb4 NULL,
        `Duodenum` longtext CHARACTER SET utf8mb4 NULL,
        `Conclusion` longtext CHARACTER SET utf8mb4 NULL,
        `PatientId` char(36) NOT NULL,
        `ConsultantId` char(36) NOT NULL,
        `EndoscopistId` char(36) NOT NULL,
        CONSTRAINT `PK_UGIReport` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_UGIReport_Doctors_ConsultantId` FOREIGN KEY (`ConsultantId`) REFERENCES `Doctors` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_UGIReport_Doctors_EndoscopistId` FOREIGN KEY (`EndoscopistId`) REFERENCES `Doctors` (`Id`) ON DELETE CASCADE,
        CONSTRAINT `FK_UGIReport_Patients_PatientId` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `WatingList` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `PatientId` char(36) NOT NULL,
        `BookDate` datetime(6) NOT NULL,
        `BookReason` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_WatingList` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_WatingList_Patients_PatientId` FOREIGN KEY (`PatientId`) REFERENCES `Patients` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ColonoscopyMedia` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `ColonscopyReportId` char(36) NOT NULL,
        `Path` longtext CHARACTER SET utf8mb4 NULL,
        `Type` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_ColonoscopyMedia` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_ColonoscopyMedia_ColonoscopyReport_ColonscopyReportId` FOREIGN KEY (`ColonscopyReportId`) REFERENCES `ColonoscopyReport` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `ERCPMedia` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `ERCPReportId` char(36) NOT NULL,
        `Path` longtext CHARACTER SET utf8mb4 NULL,
        `Type` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_ERCPMedia` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_ERCPMedia_ERCPReport_ERCPReportId` FOREIGN KEY (`ERCPReportId`) REFERENCES `ERCPReport` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE TABLE `UGIMedia` (
        `Id` char(36) NOT NULL,
        `CreatedDate` datetime(6) NOT NULL,
        `LastEditDate` datetime(6) NOT NULL,
        `UGIReportId` char(36) NOT NULL,
        `Path` longtext CHARACTER SET utf8mb4 NULL,
        `Type` longtext CHARACTER SET utf8mb4 NULL,
        CONSTRAINT `PK_UGIMedia` PRIMARY KEY (`Id`),
        CONSTRAINT `FK_UGIMedia_UGIReport_UGIReportId` FOREIGN KEY (`UGIReportId`) REFERENCES `UGIReport` (`Id`) ON DELETE CASCADE
    );

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_AspNetRoleClaims_RoleId` ON `AspNetRoleClaims` (`RoleId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_AspNetUserClaims_UserId` ON `AspNetUserClaims` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_AspNetUserLogins_UserId` ON `AspNetUserLogins` (`UserId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ColonoscopyMedia_ColonscopyReportId` ON `ColonoscopyMedia` (`ColonscopyReportId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ColonoscopyReport_ConsultantId` ON `ColonoscopyReport` (`ConsultantId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ColonoscopyReport_EndoscopistId` ON `ColonoscopyReport` (`EndoscopistId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ColonoscopyReport_PatientId` ON `ColonoscopyReport` (`PatientId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_Doctors_DepartmentId` ON `Doctors` (`DepartmentId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ERCPMedia_ERCPReportId` ON `ERCPMedia` (`ERCPReportId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ERCPReport_ConsultantId` ON `ERCPReport` (`ConsultantId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ERCPReport_EndoscopistId` ON `ERCPReport` (`EndoscopistId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_ERCPReport_PatientId` ON `ERCPReport` (`PatientId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_Patients_DegreeId` ON `Patients` (`DegreeId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_Patients_DepartmentId` ON `Patients` (`DepartmentId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE UNIQUE INDEX `RoleNameIndex` ON `Roles` (`NormalizedName`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_UGIMedia_UGIReportId` ON `UGIMedia` (`UGIReportId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_UGIReport_ConsultantId` ON `UGIReport` (`ConsultantId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_UGIReport_EndoscopistId` ON `UGIReport` (`EndoscopistId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_UGIReport_PatientId` ON `UGIReport` (`PatientId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_UserRoles_RoleId` ON `UserRoles` (`RoleId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `EmailIndex` ON `Users` (`NormalizedEmail`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE UNIQUE INDEX `UserNameIndex` ON `Users` (`NormalizedUserName`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    CREATE INDEX `IX_WatingList_PatientId` ON `WatingList` (`PatientId`);

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;


DROP PROCEDURE IF EXISTS MigrationsScript;
DELIMITER //
CREATE PROCEDURE MigrationsScript()
BEGIN
    IF NOT EXISTS(SELECT 1 FROM `__EFMigrationsHistory` WHERE `MigrationId` = '20210701104558_init') THEN

    INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
    VALUES ('20210701104558_init', '3.1.14');

    END IF;
END //
DELIMITER ;
CALL MigrationsScript();
DROP PROCEDURE MigrationsScript;

