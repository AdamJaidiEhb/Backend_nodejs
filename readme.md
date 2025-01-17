# Anime/Manga API

Deze API is gemaakt door Adam Jaidi als onderdeel van Backend Web met Node.js en Express. Het biedt CRUD-functionaliteiten voor Anime en Characters, inclusief paginatie, zoekfunctionaliteiten en geavanceerde validaties.

## Inhoud
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [Endpoints](#endpoints)
- [Bronvermeldingen](#bronvermeldingen)
- [Tools en technologieën](#tools-en-technologieën)


## Installatie
1. **Clone de repository**
   ```bash
   git clone <repository-link>
   cd <repository-folder>
   ```
2. **Installeer de afhankelijkheden**
   ```bash
   npm install
   ```
3. **Configureer de .env file**
   Maak een `.env` bestand aan in de rootmap en voeg de volgende configuraties toe:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=anime_manga_db
   DB_PORT=3306
   PORT=3000
   ```
4. **Start de MySQL-server via XAMPP**
   - Download XAMPP via [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html).
   - Zorg ervoor dat MySQL draait.
   - Maak een database aan met de naam `anime_manga_db`.
   - Gebruik het volgende SQL-script om de benodigde tabellen aan te maken:
     ```sql
     CREATE TABLE anime (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       genre VARCHAR(255) NOT NULL,
       release_date DATE,
       score DECIMAL(3,1)
     );

     CREATE TABLE characters (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       role ENUM('Main', 'Supporting') NOT NULL,
       anime_id INT,
       FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE
     );
     ```
5. **Start de server**
   ```bash
   node server.js
   ```


## Gebruik
- **Rootpagina:** Ga naar `http://localhost:3000/` voor een welkomstbericht en een link naar de documentatie.
- **Documentatie:** Ga naar `http://localhost:3000/docs` voor een overzicht van alle endpoints.


## Endpoints
### Anime Endpoints
- **GET /api/anime**: Haal alle anime op.
- **GET /api/anime/:id**: Haal een specifieke anime op.
- **POST /api/anime**: Voeg een nieuwe anime toe.
- **PUT /api/anime/:id**: Update een bestaande anime.
- **DELETE /api/anime/:id**: Verwijder een anime.
- **GET /api/anime/paginated**: Haal anime op met paginatie (limit en offset).
- **GET /api/anime/search?field=&value=**: Zoek anime op een specifiek veld.
- **GET /api/anime/advanced-search?name=&genre=**: Geavanceerd zoeken.
- **GET /api/anime/sort?field=&order=**: Sorteer anime op velden zoals `score` of `release_date`.
- **GET /api/anime/:id/characters**: Haal alle characters van een specifieke anime op.

### Character Endpoints
- **GET /api/characters**: Haal alle characters op.
- **GET /api/characters/:id**: Haal een specifieke character op.
- **POST /api/characters**: Voeg een nieuw character toe.
- **PUT /api/characters/:id**: Update een bestaande character.
- **DELETE /api/characters/:id**: Verwijder een character.


## Bronvermeldingen
Hier is een lijst van bronnen die ik heb gebruikt voor dit project:

### Officiële documentatie
- [Node.js](https://nodejs.org/en/docs/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://dev.mysql.com/doc/)

### Tutorials en gidsen
- [W3Schools MySQL Tutorial](https://www.w3schools.com/sql/)
- [MDN Web Docs: Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [GeeksforGeeks: REST API in Node.js](https://www.geeksforgeeks.org/rest-api-in-node-js/)

### Tools
- [XAMPP](https://www.apachefriends.org/index.html)
- [Postman](https://www.postman.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [GitHub](https://github.com/)

### Stack Overflow Discussies
- [How to handle MySQL connections in Node.js](https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server)
- [Express.js best practices](https://stackoverflow.com/questions/23114374/what-is-the-best-way-to-structure-an-express-js-application)


## Tools en technologieën
- **Node.js**: Voor het bouwen van de API.
- **Express.js**: Framework voor routering en serverbeheer.
- **MySQL**: Voor de database.
- **Postman**: Voor het testen van de API.
- **XAMPP**: Voor het beheren van de MySQL-server.
- **Git/GitHub**: Voor versiebeheer.
- **Visual Studio Code**: Voor het ontwikkelen van de applicatie.