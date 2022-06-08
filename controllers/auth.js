const { userSchema } = require('../models/users')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function register(req,res) {
    const {username, email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)
    const newUser = new userSchema({
        username,
        email,
        password: hashedPassword,
        role: 'user'
    })
    newUser.save(function(err){
        if (err) console.log(err);

        res.send("User Successfully Created")
    })
}

async function login(req,res){
    const { username , password } = req.body
    const user = await userSchema.findOne({username}, 'username password')
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch){
        res.send("Enter correct credentials(username or password)")
    }
    else{
        jwt.sign({username: user.username}, process.env.jwtkey, function(err,token){
            res.send(token)
            // res.send('log in successful')
        } )
    }
}

function general(req, res){
    res.send("this route is accessible to everyone")
}
function restricted(req, res){
    const user = req.user
    res.send(`welcome ${user}, you're authorized to view this route`)
}



module.exports = {register,login,general,restricted}