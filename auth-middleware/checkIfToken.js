const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/users");

 function check(req,res,next) {
    if (req.headers.authorization){
        if (req.headers.authorization.split(" ")[0] === "Bearer"){
            const token = req.headers.authorization.split(" ")[1]
            jwt.verify(token, process.env.jwtkey , function(err, payload){
                if (err) console.log(err);
                userSchema.findOne({username:payload.username}, 'username', function(err, user){
                    if(err) console.log(err);
                    else if(!user) {
                        res.send("user doesn't exist")
                    }
                    else{
                        // i passed down the username of current user using the syntax below
                        req.user = user.username
                        next()
                    }
                })
            })
        }
    }
    else{
        res.send("You're not allowed access to this route")
    }
     
 }

 module.exports = {check}