const express = require("express")
const jwt = require("jasonwebtoken")
const jwtPassword = "123456"
const app = express()
app.user(express.json())
const ALL_USERS =[
    {
        username: "abinash@gmail.com",
        password: "12"
    },
    {
        username: "aman@gmail.com",
        password: "123"
    },
    {
        username: "rahul@gmail.com",
        password: "1234"
    }

]
function userExists(username,password){
    //write logic to return true or false if this user exists
    //in ALL_USERS array
     return ALL_USERS.some(user => user.username === username && user.password === password);

}

app.post("/signin",function(req,res){
    const username= req.body.username;
    const password= req.body.password;

    if(!userExists(username,password)){
        return res.status(403).json(
            {
                msg:"user doesn't exist in our memory",
            }
        )
    }
    var token = jwt.sign({username: username},jwtPassword)
    return res.json({
        token,
    })
});

app.get("/users",function(req,res){
    const token = req.headers.authorization
    try{
        const decoded = jwt.verify(token,jwtPassword)
        const username = decoded.username
    }catch(err){
        return res.status(403).json({
            msg: "Invalid token"
        })
    }
})

app.listen(3000)