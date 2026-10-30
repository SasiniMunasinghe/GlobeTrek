-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2026 at 01:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `package_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `people` int(11) NOT NULL,
  `notes` text DEFAULT NULL,
  `booking_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `mapImage` varchar(255) DEFAULT NULL,
  `bestTime` text DEFAULT NULL,
  `activities` text DEFAULT NULL,
  `tips` text DEFAULT NULL,
  `facts` text DEFAULT NULL,
  `slug` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `destinations`
--

INSERT INTO `destinations` (`id`, `name`, `description`, `image`, `created_at`, `mapImage`, `bestTime`, `activities`, `tips`, `facts`, `slug`) VALUES
(1, 'Sigiriya', 'Ancient rock fortress in Sri Lanka', 'images/sigiriya.jpg', '2026-05-01 05:23:20', 'images/map-sigiriya.png', 'December to April', '[\"Climb Lion Rock\",\"See frescoes\",\"Explore gardens\"]', '[\"Start early morning\",\"Wear good shoes\",\"Bring water\"]', '{\"Region\":\"Central Province\",\"Type\":\"Archaeology & Nature\",\"UNESCO\":\"Yes\"}', 'sigiriya'),
(2, 'Colombo', 'Colombo is Sri Lanka\'s vibrant commercial capital, blending modern city life with colonial architecture.', 'images/colombo.jpg', '2026-05-01 05:26:56', 'images/map-colombo.png', 'December to March — dry season with pleasant temperatures', '[\"Stroll along Galle Face Green\",\"Explore Pettah market\",\"Visit National Museum\",\"Tour Parliament building\",\"Dine in Fort district\"]', '[\"Use PickMe for transport\",\"Visit Pettah in mornings\",\"Try kottu roti\",\"Dress modestly in temples\"]', '{\"Region\":\"Western Province\",\"Type\":\"City & Culture\",\"Known For\":\"Commerce, Food, History\",\"Entry\":\"Free\"}', 'colombo'),
(3, 'Galle', 'Galle is a historic coastal city known for its UNESCO-listed Dutch Fort and colonial charm.', 'images/galle5.jpg', '2026-05-01 05:26:56', 'images/map-galle.png', 'December to April — calm seas and clear skies', '[\"Walk Galle Fort walls\",\"Visit Dutch Church\",\"Explore museums\",\"Shop boutiques\",\"Swim at Jungle Beach\"]', '[\"Stay inside fort\",\"Evening walks are best\",\"Try seafood\",\"Hire a local guide\"]', '{\"Region\":\"Southern Province\",\"Type\":\"Heritage & Coast\",\"UNESCO\":\"Yes\",\"Entry\":\"Free fort access\"}', 'galle'),
(5, 'Kandy', 'Kandy is the cultural capital of Sri Lanka, home to the sacred Temple of the Tooth Relic.', 'images/kandy4.jpg', '2026-05-01 05:26:56', 'images/map-kandy.png', 'January to April, July to August', '[\"Visit Temple of Tooth\",\"Walk Kandy Lake\",\"Watch cultural dance\",\"Visit botanical gardens\",\"Explore forest reserve\"]', '[\"Dress modestly\",\"Book early during festivals\",\"Take scenic train\",\"Visit spice gardens\"]', '{\"Region\":\"Central Province\",\"Type\":\"Culture & Heritage\",\"UNESCO\":\"Yes\",\"Entry\":\"Temple LKR 1500\"}', 'kandy'),
(6, 'Ella', 'Ella is a scenic mountain town surrounded by tea plantations and misty hills.', 'images/ella4.jpg', '2026-05-01 05:26:56', 'images/map-ella.png', 'January to March, July to September', '[\"Hike Little Adam\'s Peak\",\"Visit Nine Arch Bridge\",\"Tea factory tour\",\"Train ride experience\",\"Hike Ella Rock\"]', '[\"Book trains early\",\"Go sunrise hikes\",\"Stay with valley view\",\"Use tuk-tuks\"]', '{\"Region\":\"Uva Province\",\"Type\":\"Nature & Hiking\",\"Altitude\":\"~1000m\",\"Entry\":\"Mostly free\"}', 'ella'),
(7, 'Nuwara Eliya', 'Known as Little England, this town is famous for tea plantations and cool climate.', 'images/nuwaraeliya358.png', '2026-05-01 05:26:56', 'images/map-nuwaraeliya.png', 'March to May, July to August', '[\"Tea factory tour\",\"Horton Plains\",\"Victoria Park\",\"Gregory Lake\",\"Botanical Gardens\"]', '[\"Bring warm clothes\",\"Visit early morning Horton Plains\",\"Try fresh tea\",\"Book April season early\"]', '{\"Region\":\"Central Province\",\"Type\":\"Tea Country\",\"Altitude\":\"~1868m\",\"Known For\":\"Tea, Colonial architecture\"}', 'nuwara-eliya'),
(8, 'Yala', 'Yala National Park is Sri Lanka\'s most famous wildlife safari destination.', 'images/yala4.jpg', '2026-05-01 05:26:56', 'images/map-yala.png', 'February to July — best wildlife visibility', '[\"Leopard safari\",\"Birdwatching\",\"Visit temple\",\"Spot elephants\",\"Camping\"]', '[\"Go early morning\",\"Use licensed jeep\",\"Wear neutral colors\",\"Check park closing months\"]', '{\"Region\":\"Southern/Uva\",\"Type\":\"Wildlife Safari\",\"Area\":\"979 km²\",\"Entry\":\"LKR 3500+\"}', 'yala'),
(9, 'hikkaduwa', 'Hikkaduwa is a lively beach destination famous for its coral reefs and vibrant marine life. It’s perfect for snorkeling, surfing, and enjoying the tropical coastal lifestyle. With golden beaches and energetic nightlife, it offers both relaxation and adventure.', 'images/hikkaduwa.jpg', '2026-05-01 05:51:16', 'images/map-hikkaduwa.png', 'November to April — calm sea conditions ideal for water sports', '[\"Snorkel or dive the Hikkaduwa Coral Sanctuary\",\"Surf the reef breaks\",\"Visit Sea Turtle Hatchery\",\"Explore Hikkaduwa National Park\",\"Enjoy beachfront nightlife\"]', '[\"Rent snorkel gear locally\",\"Do not feed turtles\",\"Go surfing in the morning\",\"Try grilled seafood by beach stalls\"]', '{\"Region\":\"Southern Province\",\"Type\":\"Beach & Water Sports\",\"Feature\":\"Coral Sanctuary\",\"Entry\":\"Free beach access\"}', 'hikkaduwa'),
(10, 'mirissa', 'Mirissa is a beautiful coastal town known for whale watching and calm beaches. The relaxed atmosphere and palm-fringed shores make it a perfect getaway for ocean lovers.', 'images/mirissa3.jpg', '2026-05-01 05:51:16', 'images/map-mirissa.png', 'November to April — peak whale watching season', '[\"Whale watching tours\",\"Relax on Mirissa Beach\",\"Climb Parrot Rock\",\"Snorkeling\",\"Sunset beach bars\"]', '[\"Book whale tours early morning\",\"Use licensed operators\",\"Avoid overcrowded boats\",\"Respect marine life\"]', '{\"Region\":\"Southern Province\",\"Type\":\"Beach & Wildlife\",\"Famous For\":\"Blue whales\",\"Entry\":\"Free beach\"}', 'mirissa'),
(11, 'trincomalee', 'Trincomalee is a coastal paradise with pristine beaches, rich history, and one of the world’s finest natural harbors.', 'images/trinco.jpg', '2026-05-01 05:51:16', 'images/map-trincomalee.png', 'April to September — best east coast season', '[\"Swim at Nilaveli Beach\",\"Snorkel Pigeon Island\",\"Visit Koneswaram Temple\",\"Whale watching\",\"Explore Fort Frederick\"]', '[\"Get permits for Pigeon Island\",\"Travel during east coast season\",\"Try local Tamil cuisine\",\"Use boat negotiation carefully\"]', '{\"Region\":\"Eastern Province\",\"Type\":\"Beach & History\",\"Highlight\":\"Natural harbor\",\"Entry\":\"Some sites paid\"}', 'trincomalee'),
(12, 'unawatuna', 'Unawatuna is a tropical beach destination known for its calm turquoise waters and relaxed atmosphere near Galle.', 'images/unawatuna2.jpg', '2026-05-01 05:51:16', 'images/map-unawatuna.png', 'November to April — calm sea season', '[\"Swim in calm bay\",\"Snorkeling\",\"Visit Jungle Beach\",\"Explore Galle Fort\",\"Sunset walks\"]', '[\"Visit western side for peace\",\"Avoid peak crowd hours\",\"Protect sea turtle nests\",\"Combine with Galle trip\"]', '{\"Region\":\"Southern Province\",\"Type\":\"Beach\",\"Distance\":\"5km from Galle\",\"Entry\":\"Free\"}', 'unawatuna'),
(13, 'polonnaruwa', 'Polonnaruwa is an ancient city filled with ruins, temples, and incredible historical architecture from Sri Lanka’s medieval kingdom.', 'images/polonnaruwa1.jpg', '2026-05-01 05:51:16', 'images/map-polonnaruwa.png', 'May to September — dry season', '[\"Cycle ancient city\",\"Visit Gal Vihara\",\"Royal Palace ruins\",\"Parakrama Samudra\",\"Museum visit\"]', '[\"Rent bicycle at entrance\",\"Hire guide for history\",\"Start early morning\",\"Carry water\"]', '{\"Region\":\"North Central Province\",\"Type\":\"Archaeology\",\"UNESCO\":\"Yes\",\"Entry\":\"Paid for foreigners\"}', 'polonnaruwa'),
(14, 'jaffna', 'Jaffna is a culturally rich northern city known for its Tamil heritage, temples, and unique coastal landscapes.', 'images/jaffna.jpg', '2026-05-01 05:51:16', 'images/map-jaffna.png', 'May to September — dry season', '[\"Nallur Temple visit\",\"Jaffna Fort\",\"Nainativu Island\",\"Local market tour\",\"Cycling countryside\"]', '[\"Try Jaffna crab curry\",\"Respect temple rules\",\"Hire local tuk guide\",\"Use train for scenic travel\"]', '{\"Region\":\"Northern Province\",\"Type\":\"Culture\",\"Language\":\"Tamil majority\",\"Entry\":\"Mostly free\"}', 'jaffna'),
(15, 'pasikuda', 'Pasikuda is known for its extremely shallow, crystal-clear waters and peaceful beach environment perfect for relaxation.', 'images/pasikuda.jpg', '2026-05-01 05:51:16', 'images/map-pasikuda.png', 'April to September — best season', '[\"Shallow lagoon swimming\",\"Snorkeling\",\"Jet skiing\",\"Beach resorts\",\"Day trip Batticaloa\"]', '[\"Wear reef shoes\",\"Combine with Trincomalee\",\"Book luxury stays early\",\"Safe for swimming\"]', '{\"Region\":\"Eastern Province\",\"Type\":\"Beach\",\"Feature\":\"Shallow lagoon\",\"Entry\":\"Free\"}', 'pasikuda'),
(16, 'anuradhapura', 'Anuradhapura is an ancient sacred city filled with stupas, ruins, and one of the oldest continuously cultivated trees in the world.', 'images/anuradhapura.jpg', '2026-05-01 05:51:16', 'images/map-anuradhapura.png', 'May to September — dry season', '[\"Sri Maha Bodhi visit\",\"Ruwanwelisaya Stupa\",\"Cycling ruins\",\"Isurumuniya temple\",\"Thuparamaya Dagoba\"]', '[\"Wear white clothing\",\"Remove shoes at sites\",\"Explore by bicycle\",\"Visit early morning\"]', '{\"Region\":\"North Central Province\",\"Type\":\"Religious Heritage\",\"UNESCO\":\"Yes\",\"Entry\":\"Paid for foreigners\"}', 'anuradhapura'),
(17, 'negombo', 'Negombo is a coastal town near the airport known for beaches, fishing culture, and colonial heritage.', 'images/negombo.jpg', '2026-05-01 05:51:16', 'images/map-negombo.png', 'November to April — best weather', '[\"Fish market visit\",\"Dutch canal boat ride\",\"Beach relaxation\",\"St Mary’s Church\",\"Lagoon tours\"]', '[\"Visit fish market early morning\",\"Use as airport base\",\"Try seafood restaurants\",\"Hire tuk for sightseeing\"]', '{\"Region\":\"Western Province\",\"Type\":\"Coastal City\",\"Distance\":\"Near airport\",\"Entry\":\"Free beach\"}', 'negombo'),
(18, 'tangalle', 'Tangalle is a peaceful coastal escape with untouched beaches and a slow travel atmosphere perfect for relaxation.', 'images/tangalle2.jpg', '2026-05-01 05:51:16', 'images/map-tangalle.png', 'December to April — dry season', '[\"Secluded beaches\",\"Mulkirigala temple\",\"Turtle watching\",\"Lagoon boat trips\",\"Rekawa sanctuary\"]', '[\"Avoid turtle disturbance\",\"Rent scooter for travel\",\"Visit golden hour lagoons\",\"Stay in quiet resorts\"]', '{\"Region\":\"Southern Province\",\"Type\":\"Secluded Beach\",\"Known For\":\"Turtles\",\"Entry\":\"Free\"}', 'tangalle');

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `duration` varchar(100) DEFAULT NULL,
  `accommodation` varchar(150) DEFAULT NULL,
  `activities` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `title`, `description`, `price`, `image`, `duration`, `accommodation`, `activities`, `created_at`) VALUES
(1, 'Sigiriya Cultural Tour', '3 Days cultural experience in Sigiriya including village tours, rock fortress climb and cultural shows.', 43900.00, 'images/sigiriya.jpg', '3 Days / 2 Nights', '4-star hotel with breakfast', 'Hiking, cultural tours, sightseeing', '2026-05-01 05:20:52'),
(2, 'Ella Adventure Tour', '2 Days adventure tour in Ella with train ride, hiking and scenic views.', 56000.00, 'images/ella.jpg', '2 Days / 1 Night', 'Mountain view guesthouse', 'Hiking, nature, photography', '2026-05-01 05:20:52'),
(3, 'Yala Safari Tour', 'Wildlife safari experience in Yala National Park with guided jeep tours.', 37400.00, 'images/yala.jpg', '3 Days / 2 Nights', 'Safari lodge', 'Wildlife safari, photography', '2026-05-01 05:20:52'),
(4, 'Kandy Heritage Tour', 'Explore Kandy cultural city including Temple of Tooth and heritage sites.', 45000.00, 'images/kandy.jpg', '2 Days / 1 Night', 'City hotel', 'Cultural tour, sightseeing', '2026-05-01 05:20:52'),
(5, 'Nuwara Eliya Tea Tour', 'Scenic tea plantation experience in Sri Lanka hill country.', 39000.00, 'images/nuwara2.jpg', '3 Days / 2 Nights', 'Tea estate hotel', 'Tea tasting, nature walks', '2026-05-01 05:20:52'),
(6, 'Galle Beach Escape', 'Relaxing beach holiday in Galle with fort visit and coastal views.', 45000.00, 'images/galle1.jpeg', '2 Days / 1 Night', 'Beach resort', 'Beach, sightseeing', '2026-05-01 05:20:52');

-- --------------------------------------------------------

--
-- Table structure for table `queries`
--

CREATE TABLE `queries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reply` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','staff') NOT NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `must_change_password` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `package_id` (`package_id`);

--
-- Indexes for table `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queries`
--
ALTER TABLE `queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `queries`
--
ALTER TABLE `queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
