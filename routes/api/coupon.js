const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/index");
const Coupon = require('../../models/Coupon');
// const News = require('../../models/News');


// var dummy = {name:"TECHNOLOGY"};

// Category.create(dummy,(err,category)=>{
//     console.log("category created - ")
//     console.log(category)
// })
router.get("/all",(req,res)=>{
    Coupon.find()
     .sort({date: -1})
     .exec()
     .then(data=>{
        res.json(data)
     })
    .catch(err => res.status(404).json({ nocopounfound: 'No Coupon found' }));
   

})



router.post("/add", (req,res)=>{
    Coupon.findOne({name: req.body.name}).then(cat=>{
        if(cat){
            res.status(401).status("this coupon is already present")
        }else {
            var coupon = new Coupon({
                name: req.body.name,
                percentag: req.body.percentage,
                max_amount: req.body.max_amount,
                category: req.body.category
            });
            
            coupon.save()
             .then(coupon=> res.json(coupon))
             .catch(err=> res.json(err));
        
        }
    })
    
})

router.post("/disable/:id",(req,res)=>{
    Coupon.findById(req.params.id).then(coupon=>{
        if(!coupon){
            res.status(404).json("NO Coupon found")
        }else{
            coupon.active= false;
            coupon.save().then(updated=>{
                res.json(updated)
            }).catch(err=>{
                res.json(err)
            })
        }
    }).catch(err=>{
        res.json(err)
    })
})

// router.get("/:name",(req, res)=>{

//     Category.findOneAndUpdate({ name: req.params.name }, { $inc: { views: 1 } }, {new: true })
//     .then(data=>{
//         if(data){
//             News.find({category: req.params.name})
//             .sort({date: -1})
//             .then(news => { 
//                 if(news) 
//                 res.json(news)
//                 else
//                 res.status(404).json({nonewsfound: "no news found for this category"})
//             })
//             .catch(err=>{
//                 res.json({nonewsfound: "no news found "})
//             })            
//         }
//         else
//           res.status(404).json({nonewsfound: "no news found"})
//     }).catch(err=>res.json({nocategoryfound: "no category found"}))
// })


module.exports = router;
