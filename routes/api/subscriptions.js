const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/index");
const Subscription = require('../../models/Subscription');
// const News = require('../../models/News');

router.get("/all",(req,res)=>{
    Subscription.find()
     .sort({date: -1})
     .exec()
     .then(data=>{
        res.json(data)
     })
    .catch(err => res.status(404).json({ nosubscriptionfound: 'No Subscription found' }));
   

})



router.post("/add", (req,res)=>{
   
            var subscription = new Subscription({
                name: req.body.name,
                price: req.body.price,
                validity: req.body.validity,
                user: req.body.user
            });
            
            subscription.save()
             .then(subscription=> res.json(subscription))
             .catch(err=> res.json(err));
        
     
    
})

router.get("/:id",(req,res)=>{
    Subscription.findById(req.params.id).then(sub=>{
        if(!review){
            res.status(404).json("NO subscription found")
        }else{
            res.json(sub);
        }
    }).catch(err=>{
        res.json(err)
    })
})



module.exports = router;
