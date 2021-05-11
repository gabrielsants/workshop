-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema workshop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema workshop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `workshop` DEFAULT CHARACTER SET utf8 ;
USE `workshop` ;

-- -----------------------------------------------------
-- Table `workshop`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`role` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`department` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `full_name` VARCHAR(90) NOT NULL,
  `isActive` TINYINT(1) NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `department_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_role_idx` (`role_id` ASC) VISIBLE,
  INDEX `fk_user_department1_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `workshop`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_department1`
    FOREIGN KEY (`department_id`)
    REFERENCES `workshop`.`department` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`product` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`productModel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`productModel` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `isActive` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_productModel_product1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_productModel_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `workshop`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`file` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(150) NOT NULL,
  `kind` INT NULL COMMENT 'KINDS:\n0 - TMO\n1 - OPERATOR\n2 - CATALOG\n3- Boletim',
  `productModel_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_file_productModel1_idx` (`productModel_id` ASC) VISIBLE,
  CONSTRAINT `fk_file_productModel1`
    FOREIGN KEY (`productModel_id`)
    REFERENCES `workshop`.`productModel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`fileHistoric`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`fileHistoric` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `modifiedIn` DATE NOT NULL,
  `message` VARCHAR(50) NOT NULL,
  `file_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_fileHistoric_file1_idx` (`file_id` ASC) VISIBLE,
  INDEX `fk_fileHistoric_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_fileHistoric_file1`
    FOREIGN KEY (`file_id`)
    REFERENCES `workshop`.`file` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fileHistoric_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `workshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `workshop`.`productHistoric`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `workshop`.`productHistoric` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `modifiedIn` DATE NOT NULL,
  `message` VARCHAR(50) NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `productModel_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_productHistoric_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_productHistoric_productModel1_idx` (`productModel_id` ASC) VISIBLE,
  CONSTRAINT `fk_productHistoric_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `workshop`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productHistoric_productModel1`
    FOREIGN KEY (`productModel_id`)
    REFERENCES `workshop`.`productModel` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
