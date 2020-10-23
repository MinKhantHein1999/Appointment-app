const express = require ('express');
const app = express();
const path = require ('path');
const mongoose = require ('mongoose');
const cors = require('cors');

mongoose.connect('mongodb+srv://mkh:123@cluster0.dgz0g.mongodb.net/<dbname>?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify : false },()=>{
  console.log("DB is connected");
})

app.use (express.static(__dirname + '/dist/Appointment'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+ '/dist/Appointment/index.html'))
})

app.use(express.json());
app.use(cors());

const appRouter = require('./Back-end/router/route');
app.use('/appointments',appRouter);

app.listen(process.env.PORT || 8080,()=>{
  console.log("server is running on port 8080")
})
