// importamos variables de entorno de nuestro fichero .env
require("dotenv").config();

// importamos la función que nos da la conexión con la BDD
const getDb = require("./getDb.js");

// funcion que borrará las tablas de la BDD si existen
const init = async () => {
  let connection;

  try {
    let connection = await getDb();

    console.log("-> DELETING TABLES... <-");

    await connection.query("DROP TABLE IF EXISTS favourites");
    await connection.query("DROP TABLE IF EXISTS orders");
    await connection.query("DROP TABLE IF EXISTS products");
    await connection.query("DROP TABLE IF EXISTS users");

    console.log("-> CREATING TABLES... <-");

    await connection.query(` 
        CREATE TABLE IF NOT EXISTS users (
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(100) NOT NULL UNIQUE,
          username VARCHAR(30) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL,
          avatar VARCHAR(100) NULL,
          bio VARCHAR(200) NULL,
          createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          modifiedAt DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS products (
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          productName VARCHAR(150) NOT NULL,
          description VARCHAR(200) NOT NULL,
          category ENUM('Audio', 'Cámaras de fotos', 'Consolas', 'Juguetes', 'Máquinas de escribir', 'Ordenadores', 'Relojes', 'Teléfonos', 'Televisores', 'Video', 'Otros') NOT NULL,
          state ENUM('Nuevo', 'Como nuevo', 'En buen estado', 'En condiciones aceptables', 'No funciona') NOT NULL,
          place VARCHAR(30) NULL,
          price DECIMAL(6,2) NULL,
          image VARCHAR(100),
          createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
          modifiedAt DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
          isSelled TINYINT UNSIGNED DEFAULT 0 NOT NULL,
          userId INT UNSIGNED NOT NULL,
          FOREIGN KEY (userId) REFERENCES users (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
    )
`);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
          resno VARCHAR(100) NOT NULL UNIQUE,
          deliveryPlace VARCHAR(30) NULL,
          deliveryTime DATETIME NULL,
          createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
          userBuyerId INT UNSIGNED NOT NULL,
          FOREIGN KEY (userBuyerId) REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
          productId INT UNSIGNED NOT NULL,
          FOREIGN KEY (productId) REFERENCES products (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    )
`);
    await connection.query(`
        CREATE TABLE IF NOT EXISTS favorites (
          userIdFav INT UNSIGNED NOT NULL,
          FOREIGN KEY (userIdFav) REFERENCES users (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
          productIdFav INT UNSIGNED NOT NULL,
          FOREIGN KEY (productIdFav) REFERENCES products (id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
    )
`);

    console.log("¡TABLES SUCCESSFULLY CREATED!");
  } catch (error) {
    console.error('Error to create database tables', error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

init();
