const mongoose = require("mongoose")

// i used this because i was having issues setting up my local database on mongodb compass
const connectDB = (url)=>{
    return mongoose.connect(url)
    .then(()=> console.log('CONNECTED TO THE DB...')).catch((err)=> console.log(err))}

module.exports = connectDB