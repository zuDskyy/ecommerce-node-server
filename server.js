const dotenv = require('dotenv')
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const orderRoute = require('./routes/order')
const cartRoute = require('./routes/cart')
const stripeRoute = require('./routes/stripe');
const  uploadRoute = require('./routes/Uploadassets');
const path = require('path');
require('events').EventEmitter.defaultMaxListeners = 15;

dotenv.config()

 mongoose.set({strictQuery: false})
 mongoose.connect(process.env.MONGO_DB)
 .then(() => console.log('DB  connection Seccessfull!'))
 .catch((err) => {console.log(err)})

  const port = process.env.PORT || 8000

 app.use(cors());  
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

 app.use("/assets/ijordan", express.static(path.join(__dirname, "assets/ijordan")));
 app.use("/assets/productassets", express.static(path.join(__dirname, "assets/productassets")));
 app.use('/api/users', userRoute);
 app.use('/api/auth', authRoute);
 app.use('/api/products', productRoute);
 app.use('/api/carts', cartRoute);
 app.use('/api/orders', orderRoute);
 app.use('/api/checkout', stripeRoute);
 app.use('/api/upload',uploadRoute);

 app.listen(port , () => {
    console.log("listening to 8000");
 })