-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Feb 06, 2020 at 02:21 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `galerija`
--

-- --------------------------------------------------------

--
-- Table structure for table `komentari`
--

DROP TABLE IF EXISTS `komentari`;
CREATE TABLE IF NOT EXISTS `komentari` (
  `id_korisnika` int(11) NOT NULL,
  `ime` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `komentar` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `komentari`
--

INSERT INTO `komentari` (`id_korisnika`, `ime`, `email`, `komentar`) VALUES
(1, 'Slobodan', 'slobodanilic98@gmail.com', 'Zdravo kako ste ?'),
(1, 'Nikola', 'danilovic@gmail.com', 'Hejhe!');

-- --------------------------------------------------------

--
-- Table structure for table `korisnici`
--

DROP TABLE IF EXISTS `korisnici`;
CREATE TABLE IF NOT EXISTS `korisnici` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sifra` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `korisnici`
--

INSERT INTO `korisnici` (`id`, `email`, `sifra`) VALUES
(3, 'slobodanilic98@gmail.com', '$2a$10$AHH5OPxKuk8rf8Ehq9OKQO0uI0AO8zdLepCfvpW2rlIiMDUS.FJge');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
