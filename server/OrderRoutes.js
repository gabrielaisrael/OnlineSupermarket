const router = require("express").Router();
const db = require("./connectDB");
const moment = require("moment");
const fs = require("fs");

//get sum of orders
router.get("/sumOrders", async (req, res) => {
  let q = `SELECT count(*) as orders_cnt from orders`;

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

//get orders of user
router.get("/:user_numberId", async (req, res) => {
  let q = `SELECT orders.* FROM orders
     JOIN users on users.numberId = orders.user_numberid
     WHERE
     users.numberId = ${req.params.user_numberId}`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get dates that have been chosen 3x
router.get("/orders/dates", async (req, res) => {
  let q = `SELECT toDate, COUNT(*)
    FROM orders
    GROUP BY toDate HAVING COUNT(*) >=3`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//add a order to user
router.post("/add", async (req, res) => {
  const {
    cityShipping,
    stretShipping,
    toDate,
    totalPrice,
    creditCard,
    cart_id,
    user_numberid,
  } = req.body;
  res.send({
    cityShipping,
    stretShipping,
    toDate,
    totalPrice,
    creditCard,
    cart_id,
    user_numberid,
  });
  let shipDate;
  shipDate = new Date(toDate) + 1;
  let a = moment(shipDate).format();
  const b = a.split("+")[0];
  const c = b + ".000Z";
  console.log({ toDate: req.body.toDate });
  console.log({ shipDate: shipDate });
  console.log({ c: c });
  //   res.send(c);

  let q = `INSERT INTO orders
    (cityShipping, stretShipping, toDate, totalPrice, creditCard, cart_id, user_numberid)
    VALUES('${cityShipping}','${stretShipping}','${c}',${totalPrice},${creditCard},${cart_id},${user_numberid})`;

  try {
    const results = await Query(q);

    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//complete the cart
router.put("/cartCompleted/:id", async (req, res) => {
  let q = `UPDATE carts
  SET
  completed = 1
  WHERE 
  id= ${req.params.id}
    `;

  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//Create a receipt file
router.post("/receiptPdf", async (req, res) => {
  const { content } = req.body;
  console.log(req.body);

  fs.writeFile("Receipt.txt", content, function (err) {
    if (err) throw err;
    console.log("File is created");
    res.status(201).send("File is created");
  });
});

//Get the receipt file
router.get("/download/receipt", function (req, res) {
  const file = `${__dirname}/Receipt.txt`;
  res.download(file, "Receipt.txt");
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
