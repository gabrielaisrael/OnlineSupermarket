CREATE DATABASE supermarket;
USE supermarket;

CREATE TABLE users (
firstname varchar(255) not null,
lastname varchar(255) not null,
email varchar(255) not null,
password varchar(1000) not null,
numberId int not null,
city varchar(255) not null,
street varchar(255) not null,
isAdmin boolean,
PRIMARY KEY (numberId)
)

CREATE TABLE categories (
id int auto_increment,
category varchar(255) not null,
PRIMARY KEY (id)
)

CREATE TABLE products (
id int auto_increment,
productName varchar(255) not null,
price int not null,
img_url varchar(500) not null,
category_id int not null,
PRIMARY KEY (id),
FOREIGN KEY(category_id) REFERENCES categories(id)
)

CREATE TABLE carts (
id int auto_increment,
dateCreated datetime default now(),
user_numberid int not null,
PRIMARY KEY (id),
FOREIGN KEY(user_numberId) REFERENCES users(numberId)
)

CREATE TABLE cartDetails (
id int auto_increment,
quantity int not null,
price DECIMAL(6,2),
sum_price DECIMAL(10,2) default (price*quantity),
product_id int not null,
cart_id int not null,
PRIMARY KEY (id),
FOREIGN KEY(product_id) REFERENCES products(id),
FOREIGN KEY(cart_id) REFERENCES carts(id)
)

CREATE TABLE orders (
id int auto_increment,
cityShipping varchar(255) not null,
stretShipping varchar(255) not null,
toDate date not null,
orderDate datetime default now(),
totalPrice int not null,
creditCard int not null,
cart_id int not null,
user_numberid int not null,
PRIMARY KEY (id),
FOREIGN KEY(cart_id) REFERENCES carts(id),
FOREIGN KEY(user_numberid) REFERENCES users(numberId)
)

INSERT INTO users (firstname, lastname, email, password, numberId, city, street, isAdmin)
VALUES ("Gabriela", "Israel", "gabisrael@gmail.com", "1234", "332529338", "bracha", "tzurim", 0),
("Jaqueline", "Skaba", "jaqueskaba@gmail.com", "12345", "332529339", "rio de janeiro", "mariz e barros", 0),
("Michele", "Skaba", "micheleskaba@gmail.com", "123456", "332529330", "ramat gan", "yarden", 0)

INSERT INTO categories (category)
VALUES ("Fruits and Veg"),
("Drinks"),
("Fresh"),
("Meat and Fish"),
("Bakery")

INSERT INTO products (productName, price, img_url, category_id)
VALUES ("Milk", 5, "https://img.zapmarket.co.il/images/B_7290000474076/dm_1.jpg", 3),
("Coca Cola", 6, "https://images-na.ssl-images-amazon.com/images/I/5156FefjlqL._SX679_.jpg", 2),
("Butter", 4, "https://www.tnuva.co.il/uploads/f_5e0ca99562c7f_1577888149.jpg", 3),
("Salmon", 50, "https://www.paskovich.co.il/Warehouse/catalog/items/db01a531-e15b-4800-9e78-d928388e0d9f.jpg", 4),
("Banana per Kg", 10, "https://www.foodworld.co.zw/wp-content/uploads/2016/06/p-2172-Banana21.jpg", 1),
("Cake", 15, "https://www.elite.co.il/areas/uploads/91c22c54-c537-4868-a50f-a1a5d9469621.png", 5)

INSERT INTO carts (user_numberid)
VALUES (332529338),
(332529339)



INSERT INTO cartDetails(quantity, price, product_id, cart_id)
VALUES (2, 5, 1, 3),
(2,50, 4, 4)

SELECT * FROM carts
SELECT * FROM products

INSERT INTO orders(cityShipping, stretShipping, toDate, totalPrice, creditCard, cart_id, user_numberid)
VALUES
("Ramat Gan", "Ben Gurion", "2020-06-20", 100, 205670, 4, 332529330),
("Rio de Janeiro", "Maris e Barros", "2020-06-25", 10, 205675, 3, 332529339)

SELECT * FROM users

{"cityShipping":"Jerusalem", "stretShipping":"ben gurion", "toDate":"Sat Jun 20 2020 00:00:00 GMT+0300 (GMT+03:00)1", "totalPrice":"100", "creditCard":5555, "cart_id":13, "user_numberid":66}

{"firstname":"gaga", "lastname":"gaga", "email":"gaga@gmail.com", "password":"gaga", "numberId":333, "city":"gaga", "street":"gaga"}