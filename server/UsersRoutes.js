const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passwords = require("./passwords");
const db = require("./connectDB");
let users;

//get user by id
router.get("/:user_numberId", async (req, res) => {
  let q = `SELECT 
    users.city,
    users.street,
    carts.id,
    carts.user_numberid
    FROM supermarket.carts
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

//get all users
router.get("", async (req, res) => {
  let q = `SELECT * FROM users`;
  try {
    const results = await Query(q);
    res.send(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//get all number_id of users
router.get("/id/numberId", async (req, res) => {
  let q = `SELECT numberId FROM users`;

  try {
    const results = await Query(q);
    res.json(results);
  } catch (err) {
    res.sendStatus(500);
    throw err;
  }
});

//login and create token to user
router.post("/login", async (req, res) => {
  // ACCESS: all
  const { email, password } = req.body;

  if (email && password) {
    const q = `SELECT * FROM users`;
    const users = await Query(q);
    const user = users.filter((u) => u.email == req.body.email);
    if (user.length) {
      const userObj = user[0];
      if (bcrypt.compareSync(req.body.password, userObj.password)) {
        jwt.sign(
          {
            email: userObj.email,
            isAdmin: userObj.isAdmin,
            numberId: userObj.numberId,
            firstname: userObj.firstname,
          },
          passwords.JWT_SECRET,
          { expiresIn: "50m" },
          (err, token) => {
            if (err) {
              res.sendStatus(500);
              throw err;
            }
            console.log(token);
            res.status(201).json({
              token: token,
              user_numberId: userObj.numberId,
              isAdmin: userObj.isAdmin,
              firstname: userObj.firstname,
            });
          }
        );
      } else {
        res.status(400).send("wrong password");
      }
    } else {
      res.status(400).send("user not found");
    }
  } else {
    res.status(400).send("missing some info");
  }
});

//register a new user
router.post("/register", async (req, res) => {
  // ACCESS: all

  const {
    firstname,
    lastname,
    email,
    password,
    number_id,
    city,
    street,
    isAdmin = false,
  } = req.body;
  console.log(
    "register",
    firstname,
    lastname,
    email,
    password,
    number_id,
    city,
    street,
    isAdmin
  );

  if (
    firstname &&
    lastname &&
    email &&
    password &&
    number_id &&
    city &&
    street &&
    isAdmin != undefined
  ) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        let q = `INSERT INTO users
                (firstname, lastname, email, password, numberId, city, street, isAdmin)
                VALUES
                (
                    "${firstname}",
                    "${lastname}",
                    "${email}",
                    "${hash}",
                    ${number_id}, 
                    "${city}",
                    "${street}",
                    ${isAdmin} 
                )`;

        try {
          const results = await Query(q);
          console.log(results);
          res.sendStatus(201);
        } catch (err) {
          res.sendStatus(500);
          throw err;
        }
      });
    });
  } else {
    res.status(400).send("missing some info");
  }
});

// //get cart of user if exist
// router.get('/allId', async (req, res) => {
//     let q = `SELECT from cartDetails where `

//     try {
//         const results = await Query(q)
//         res.json(results)
//     }
//     catch (err) {
//         res.sendStatus(500)
//         throw err
//     }

// })

module.exports = router;

function Query(q, ...par) {
  return new Promise((resolve, reject) => {
    db.query(q, par, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
