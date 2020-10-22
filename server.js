const express = require ('express');
const app = express();
const path = require ('path');
const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://mkh:123@cluster0.dgz0g.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
  console.log("DB is connected");
})

app.use (express.static(__dirname + '/dist/Appointment'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+ '/dist/Appointment/index.html'))
})

const appRouter = require('./Back-end/router/route');
app.use('/appointment',appRouter);

app.listen(process.env.PORT || 8080,()=>{
  console.log("server is running on port 8080")
})
