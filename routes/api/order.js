const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/index");
const Order = require('../../models/Order');
// const News = require('../../models/News');


// var dummy = {name:"TECHNOLOGY"};

// Category.create(dummy,(err,category)=>{
//     console.log("category created - ")
//     console.log(category)
// })
router.get("/all",(req,res)=>{
    Order.find()
     .sort({date: -1})
     .exec()
     .then(data=>{
        res.json(data)
     })
    .catch(err => res.status(404).json({ nocopounfound: 'No Coupon found' }));
   

})



router.post("/create", (req,res)=>{
    // Order.findOne({name: req.body.name}).then(cat=>{
    //     if(cat){
    //         res.status(401).status("this coupon is already present")
    //     }else {
            var order = new Order({
                product_id: req.body.product_id,
                address: req.body.address,
                amount: req.body.amount,
                coupon: req.body.coupon,
                cashback: req.body.cashback,
                user: req.body.user
                // category: req.body.category
            });
            
            order.save()
             .then(order=> res.json(order))
             .catch(err=> res.json(err));
        
        // }
    // })
    
})

// router.post("/disable/:id",(req,res)=>{
//     Coupon.findById(req.params.id).then(coupon=>{
//         if(!coupon){
//             res.status(404).json("NO Coupon found")
//         }else{
//             coupon.active= false;
//             coupon.save().then(updated=>{
//                 res.json(updated)
//             }).catch(err=>{
//                 res.json(err)
//             })
//         }
//     }).catch(err=>{
//         res.json(err)
//     })
// })

router.get("/:id",(req,res)=>{
    Order.findById(req.params.id).then(order=>{
        res.json(order);
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
