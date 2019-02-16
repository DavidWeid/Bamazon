DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price INTEGER(10),
    stock_quantity INTEGER(10) NOT NULL,
    product_sales INTEGER(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    over_head_costs INTEGER(10) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Acer WQHD (2560 x 1440) Monitor", "electronics", 220, 44), ("The Gentleman's Guide to Vice and Virtue", "books", 14, 120), ("USB Coffee Warmer", "electronics", 17, 200), ("PhoneSoap Phone Sanitizer and Charger", "electronics", 60, 20), ("Redragon M601 Wired Gaming Mouse","electronics", 12, 85), ("Ankle Brace for Plantar Fasciitis", "health", 14, 101), ("Zinus Taylan Metal and Wood Bed", "home", 165, 12), ("Ballistix Sport 8GB Kit", "electronics", 84, 99), ("JapanBargain 5 Piece Chopsticks Set", "home", 6, 1000), ("Katekyo Hitman Reborn Poster", "home", 20, 0), ("Kit Kat Chocolatory Chocolate Bar", "food", 10, 312), ("5000-Piece Lego Set", "toys", 59, 100), ("Max Instant Pot", "home", 89, 30), ("8MM Men's Steel The Legend of Zelda Ring", "jewelry", 10, 7), ("12-Pack Sharpie Pen Blue", "office", 10, 9), ("Chemistry Periodic Elements Coaster (4-Pack)", "home", 49, 3);

INSERT INTO departments (department_name, over_head_costs)
VALUES("books", 800),("electronics", 4000),("food", 1500),("health", 600),("home", 4000),("jewelry", 500),("office", 500),("toys", 400);

SELECT * FROM products;
SELECT * FROM departments;