const express = require('express');
const router = express.Router();
const middleware = require("../../middleware/index");
const Category = require('../../models/Category');
const News = require('../../models/News');


// var dummy = {name:"TECHNOLOGY"};

// Category.create(dummy,(err,category)=>{
//     console.log("category created - ")
//     console.log(category)
// })
router.get("/all",(req,res)=>{
    Category.find()
     .sort({views: -1})
     .exec()
     .then(data=>{
        res.json(data)
     })
    .catch(err => res.status(404).json({ nocategoryfound: 'No Categories found' }));
   

})



router.post("/add", (req,res)=>{
    Category.findOne({name: req.body.name}).then(cat=>{
        if(cat){
            res.status(401).status("this category is already present")
        }else {
            var category = new Category({
                name: req.body.name
            });
            
            category.save()
             .then(category=> res.json(category))
             .catch(err=> res.json(err));
        
        }
    })
    
})

router.get("/:name",(req, res)=>{

    Category.findOneAndUpdate({ name: req.params.name }, { $inc: { views: 1 } }, {new: true })
    .then(data=>{
        if(data){
            News.find({category: req.params.name})
            .sort({date: -1})
            .then(news => { 
                if(news) 
                res.json(news)
                else
                res.status(404).json({nonewsfound: "no news found for this category"})
            })
            .catch(err=>{
                res.json({nonewsfound: "no news found "})
            })            
        }
        else
          res.status(404).json({nonewsfound: "no news found"})
    }).catch(err=>res.json({nocategoryfound: "no category found"}))
})


module.exports = router;
