const express = require('express')

const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", require('./UsersRoutes'))
app.use("/shop", require("./ShopRoutes"))
app.use("/order", require("./OrderRoutes"))
app.use("/admin", require("./AdminRoutes"))

app.listen(1000, () => console.log("rockin1000"))

