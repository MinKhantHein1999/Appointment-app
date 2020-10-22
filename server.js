const express = require ('express');
const app = express();
const path = require ('path');

app.use (express.static(__dirname + '/dist/Appointment'));
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname+ '/dist/Appointment/index.html'))
})

app.listen(process.env.PORT || 8080,()=>{
  console.log("server is running on port 8080")
})
