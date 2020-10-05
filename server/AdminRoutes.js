const router = require('express').Router()
const db = require('./connectDB')

//add a product
router.post('/add', async (req, res) => {

    let q = `INSERT INTO products
    (productName, price, img_url, category_id)
    VALUES
    ("${req.body.productName}",${req.body.price},
    "${req.body.img_url}",${req.body.category_id})`

    const { productName, price, img_url, category_id } = req.body

    if (productName && price && img_url && category_id) {
        try {
            const results = await Query(q)
            console.log(results);
            res.status(201).send("added")
        }
        catch (err) {
            res.sendStatus(500)
            throw err
        }
    } else {
        res.status(401).send("missing some info...")
        console.log(req.body)
    }
        })
    

//edit a product
router.put('/edit/:id',  async (req, res) => {

    let q = `UPDATE products
    SET 
    productName="${req.body.productName}", 
    price="${req.body.price}",
    img_url="${req.body.img_url}",
    category_id=${req.body.category_id}
    WHERE id=${req.params.id}`

    try {
        res.sendStatus(201);
        const results = await Query(q)
    }
    catch (err) {
        res.sendStatus(500)
        throw err
    }
})

// // delete a product
// router.delete("/products/:id", async (req, res) => {
//     try {
//         let q = "DELETE from products WHERE id=" + req.params.id ;
//         let b = await Query(q, req.params.id);
//         res.send(200);
//     } catch (err) {
//         res.sendStatus(500);

//     }
// });

module.exports = router

function Query(q) {
    return new Promise((resolve, reject) => {
        db.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}