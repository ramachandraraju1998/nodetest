const mongoose = require('mongoose')
console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL,{}) 
.then(async ()=> {
    console.log("connected to database");

}).catch(err =>{
    console.log('could not connected to DB. existing now...'+err);
    process.exit();

})
