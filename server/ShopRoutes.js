const router = require("express").Router();
const db = require("./connectDB");

//get all products
router.get("/products", async (req, res) => {
  let q = `SELECT * FROM supermarket.products`;
  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get products by Id
router.get("/products/:id", async (req, res) => {
  try {
    let b = await Query(
      `SELECT
        products.id,
        products.productName,
        products.price,
        products.img_url,
        categories.category as 'categories'
        FROM products
        INNER JOIN categories ON products.category_id = categories.id
        WHERE products.id=` + req.params.id
    );

    res.json(b);
  } catch (err) {
    res.send(500, "ooops..");
    throw err;
  }
});

//get sum of products
router.get("/sumProducts", async (req, res) => {
  let q = `SELECT count(*) as products_cnt from products`;

  try {
    const results = await Query(q);
    if (results && results.length > 0) {
      res.json(results[0]);
    }
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});
//get all categories
router.get("/categories", async (req, res) => {
  let q = `SELECT * from categories`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get products of categories
router.get("/categories/products", async (req, res) => {
  let q = `SELECT categories.category, products.productName
    FROM categories
    INNER JOIN products
    on categories.id = products.id`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get products by category id
router.get("/category/product/:id", async (req, res) => {
  let q = `SELECT * FROM products WHERE category_id=` + req.params.id;
  console.log({ id: req.params.id });
  try {
    const results = await Query(q, req.params.id);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get all products of cart
router.get("/cart/products", async (req, res) => {
  let q = `SELECT  cartDetails.cart_id, products.productName 
    FROM products
    INNER JOIN cartDetails
    on products.id = cartDetails.product_id`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get cart details check cart status
router.get("/carts/:user_numberId", async (req, res) => {
  let q = `SELECT carts.* FROM carts
     JOIN users on users.numberId = carts.user_numberId
     WHERE carts.completed = 0
     AND 
     users.numberId = ${req.params.user_numberId}`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get cart details
router.get("/carts/products/:user_numberid", async (req, res) => {
  let q = `SELECT 
    cartDetails.id,
    cartDetails.quantity,
    cartDetails.price,
    cartDetails.sum_price,
    cartDetails.product_id,
    cartDetails.product_id,
    cartDetails.cart_id,
    products.img_url,
    products.productName
     FROM supermarket.cartDetails
     INNER JOIN carts on carts.id = cartDetails.cart_id
     INNER JOIN products on products.id = cartDetails.product_id
     INNER JOIN users on users.numberId = carts.user_numberid
     WHERE users.numberId = ${req.params.user_numberid} AND carts.completed = 0`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//add new cart to user
router.post("/addNewCart", async (req, res) => {
  let q = `INSERT INTO carts
    (user_numberid)
    VALUES
    (${req.body.user_numberId})`;

  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//add a product to cart
router.post("/add", async (req, res) => {
  let q = `INSERT INTO cartDetails
    (quantity, price, product_id, cart_id)
    VALUES
    (${req.body.quantity},${req.body.price},${req.body.product_id},${req.body.cart_id})`;

  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

// remove a product from cart
router.delete("/remove/:prodId/:cartId", async (req, res) => {
  let q = `DELETE from cartDetails
            WHERE id=${req.params.prodId} AND cart_id=${req.params.cartId}`;
  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

// remove all products from cart
router.delete("/removeAll/:cartId", async (req, res) => {
  let q = `DELETE from cartDetails
            WHERE cart_id=${req.params.cartId}`;
  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//search a product
router.post("/search", async (req, res) => {
  const { productName } = req.body;
  console.log(req.body);
  let q = `SELECT 
    *
    FROM products WHERE 
        productName LIKE '%${productName}%'`;

  try {
    const results = await Query(q);
    console.log(productName);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

module.exports = router;

function Query(q) {
  return new Promise((resolve, reject) => {
    db.query(q, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function QueryArray(q, array) {
  return new Promise((resolve, reject) => {
    db.query(q, array, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
