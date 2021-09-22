const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/User");
const underarmourRoute = require("./routes/Underarmour");
const reeboxRoute = require("./routes/Reebox");
const pumaRoute = require("./routes/Puma");
const nikeRoute = require("./routes/Nike");
const adidasRoute = require("./routes/Adidas");
const adminRoute = require('./routes/Admin')
const db = require("./models");
require('./configs/passport');
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use('/image', express.static('./images'))

app.use("/admin",adminRoute)
app.use("/users", userRoute);
app.use("/underarmours", underarmourRoute);
app.use("/reeboxes", reeboxRoute);
app.use("/pumas", pumaRoute);
app.use("/nikes", nikeRoute);
app.use("/adidass",adidasRoute)

const port = process.env.PORT || 8000

db.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Sever start port ${port}`);
  });
});
