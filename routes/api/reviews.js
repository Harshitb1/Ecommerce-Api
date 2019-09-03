const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/index");
const Review = require('../../models/Review');
// const News = require('../../models/News');

router.get("/all",(req,res)=>{
    Review.find()
     .sort({date: -1})
     .exec()
     .then(data=>{
        res.json(data)
     })
    .catch(err => res.status(404).json({ noreviewfound: 'No Review found' }));
   

})



router.post("/add", (req,res)=>{
   
            var review = new Review({
                user_name: req.body.user_name,
                user: req.body.user,
                rating: req.body.rating,
                desc: req.body.desc
            });
            
            review.save()
             .then(review=> res.json(review))
             .catch(err=> res.json(err));
        
     
    
})

router.get("/:id",(req,res)=>{
    Review.findById(req.params.id).then(review=>{
        if(!review){
            res.status(404).json("NO review found")
        }else{
            res.json(review);
        }
    }).catch(err=>{
        res.json(err)
    })
})



module.exports = router;
