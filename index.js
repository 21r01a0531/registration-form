var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('pub'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=>console.log("Error in connecting database"))
db.once('open',()=>console.log("connected to database"))

app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phn=req.body.phn
    var gender=req.body.gender
    var password=req.body.password


    var data={
        "name":name,
        "age":age,
        "email":email,
        "phn":phn,
        "gender":gender,
        "password":password
    }
    db.collection('users').insertOne(data,(err,Collection)=>{
        if(err)
        {
            throw err;
        }
        console.log("Record Inserted ")
    })
    return res.redirect('signup_successful.html')
})

app.get("/",(req,res) => {
res.set({"Allow-access-Allow-Origin":'*'})
return res.redirect('index.html')
}).listen(8000);

console.log("listening on port 8000")