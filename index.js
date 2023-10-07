const express = require('express'); 
const dotenv = require('dotenv'); 
const app = express(); 
app.use(express.json());

dotenv.config(); 
require('./mongoose/mongoose')

const userRouter = require('./routers/user')
const productRouter = require('./routers/product')
app.use(userRouter)
app.use(productRouter)
  
let PORT = process.env.PORT || 5000; 
app.listen(PORT, () => { 
  console.log(`Server is up and running on ${PORT} ...`); 
}); 

