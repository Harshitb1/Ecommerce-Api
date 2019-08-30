  var  Employ = require("../models/Employ");
  var jwt_decode = require("jwt-decode")

var middlewareObj ={};

 middlewareObj.checkToken = async function(req,res,next ){
 
    const header = req.headers['authorization'];

    // console.log(req.headers)
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        const decoded = jwt_decode(token);
        // console.log("----------token------------")
        // console.log(decoded)
        await Employ.findById(decoded.id)
        .then(user=>{
          if(user){
            next();
          }else {
            res.status(401).json("You are an unauthorized employ")
          }

        })
        // next();
    } else {
        //If header is undefined return Forbidden (403)
        // console.log("inside forbidden")
        res.status(403).json("You are accessing unauthorized route")
    }
   
}

  
 
module.exports = middlewareObj