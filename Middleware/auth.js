

const jwt  = require('jsonwebtoken')
const secretKey = 'acharya'

const auth  = (req,res,next)=>{

    const data = req.headers["authorization"]
    console.log(data,"token") 
    const tokenParts = data.split(' ')
    // console.log(token)
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).send({ msg: "Authorization header format is 'Bearer <token>'" });
    }

    const token = tokenParts[1];

    if(token){
    jwt.verify(token,secretKey,(err,validate)=>{
        if(err){
            return res.send("Error while accessing",err)
        }
        if(validate){
            return next()
        }
        return res.send("user is not authorized")
    })
}
else{
    return res.send({msg:"Email id is not registered"})
}
}

module.exports = auth







