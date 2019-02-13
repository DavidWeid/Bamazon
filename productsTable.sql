CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

USE bamazon;

ALTER TABLE products
MODIFY COLUMN product_name VARCHAR(100) NOT NULL;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Acer WQHD (2560 x 1440) Monitor", "electronics", 220, 44), ("The Gentleman's Guide to Vice and Virtue", "books", 14, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("USB Coffee Warmer", "electronics", 17, 200), ("PhoneSoap Phone Sanitizer and Charger", "electronics", 60, 20),
("Redragon M601 Wired Gaming Mouse","electronics", 12, 85), ("Ankle Brace for Plantar Fasciitis", "health", 14, 101),
("Zinus Taylan Metal and Wood Bed", "home", 165, 12), ("Ballistix Sport 8GB Kit", "electronics", 84, 99), 
("JapanBargain 5 Piece Chopsticks Set", "home", 6, 1000), ("Katekyo Hitman Reborn Poster", "home", 20, 0),
("Kit Kat Chocolatory Chocolate Bar", "food", 10, 312);

SELECT * FROM products;