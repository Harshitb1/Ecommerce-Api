const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/index");
const Order = require('../../models/Order');
const mongoose = require('mongoose');

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
        // console.log(req.body.product_id)
        // var d = req.body.product_id.map(item=>{
        //     return new mongoose.Types.ObjectId(item._id)
        // })
        // console.log(d)
            var order = new Order({
                product_id: req.body.product_id,
                address: req.body.address,
                amount: req.body.amount,
                quantity: req.body.quantity||1,
                // coupon: req.body.coupon,
                cashback: req.body.cashback||0,
                user: req.body.user
                // category: req.body.category
            });
            if(typeof req.body.coupon!= 'undefined'){
                order.coupon= req.body.coupon
            }
            // console.log(new mongoose.Types.ObjectId(order._id))
            order.save()
             .then(order=> {
                //  res.json(order)
                User.findByIdAndUpdate(
                    req.body.user,
                    {$push: {"orders":  new mongoose.Types.ObjectId(order._id)}},
                    {safe: true, upsert: true, new : true},
                    function(err, news) {
                      if(err){
                        console.log(err);
                        res.json("error while updating user")
                      }
                      else {
                        // console.log(news)
                        res.json(news)
                      }
                    }
                );
             })
             .catch(err=> { console.log(err); res.json(err)});
        
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
