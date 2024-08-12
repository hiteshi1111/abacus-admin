const dotenv = require("dotenv");
const express = require('express'); 
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI).then(resp => {
    console.log("Database Connected!")
}).catch(error => console.log("Unable to connect to DB!"));

app.get("/", (req, res) => {
    res.send("Working!");
})

app.use("/api/user", require("./controllers/user.controller"));
app.use("/api/password", require("./controllers/password.controller"));
app.use("/api/product", require("./controllers/product.controller"));
app.use("/api/tax", require("./controllers/tax.controller"));
app.use("/api/blog", require("./controllers/blog.controller"));
app.use("/api/referral", require("./controllers/referral.controller"));
app.use("/api/plan", require("./controllers/plan.controller"));
app.use("/api/payment", require("./controllers/payment.controller"));
app.use("/api/contact", require("./controllers/contact.controller"));

app.all("*", function (req, res) {
    res.status(404).send("Abacus Cloud Servers");
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Server started at ${process.env.PORT}!`);  
})