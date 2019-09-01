const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const middleware = require("../../middleware/index");
const Grid = require('gridfs-stream');
const async = require("async");

// Load User Model
const Product = require('../../models/Product');
const User = require('../../models/User');



const conn = mongoose.createConnection(require('../../config/keys').mongoURI);

    let gfs;
    conn.once('open', () => {
        // Init stream
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
      });


// @route   GET api/news/test
// @desc    Tests news route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'News Works' }));

// @route   GET api/news
// @desc    Get current users profile
// @access  Private
router.get(
  '/all',middleware.checkToken,
  (req, res) => {

    Product.find().sort({date:-1})
      .then(news => {
        if (!news) {
          errors.nonews = 'There is no news';
          return res.status(404).json(errors);
        }
        res.json(news);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/news/:id
// @desc    Get  news ID
// @access  Public




router.post('/update/:id', middleware.checkToken,async (req, res) => {
  const errors = {};
  // console.log("inside update")
  Product.findById(req.params.id)
    .then(product => {
      // if (news) {
        // Update
        product.name= req.body.name;
        product.description= req.body.description;
        product.price= req.body.price;
        product.reviews= req.body.reviews;
        // news.tags= req.body.tags;
        // news.category= req.body.category;
        // news.photo_download_url= req.file.filename;
        if(typeof req.body.image !== 'undefined'){ news.image= req.body.image}
        // console.log("news-----")
        // console.log(news);
        Product.findByIdAndUpdate(
         product._id,
          product,
          { new: true }
      ).then(product => res.json(product));
    })
    .catch(err =>{
      // console.log(err)
      res.status(404).json({ nouserfound: 'No product found with that ID' })
    }).then();
    // .catch(err =>
    //   res.status(404).json({ news: 'There is no news present' })
    // );
});

// @route   POST api/news/add
// @desc    Create news
// @access  Private
router.post(
  '/add',middleware.checkToken,
  (req, res) => {
    // const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    // if (!isValid) {
    //   // Return any errors with 400 status
    //   return res.status(400).json(errors);
    // }

    // Get fields

    Product.findOne({name : req.body.name}).then(found=>{
      if(found)
        res.status(401).json("Product alredy exist")
      else{
        const newProduct = new Product({
          name: req.body.name,
          description: req.body.description,
          image: req.body.image,
          price: req.body.price,
          added_by: req.body.added_by
          // tags: req.body.tags,
          // category: req.body.category,
          // isTop: req.body.isTop
        });
    
        newProduct.save().then(product => res.json(product)).catch(err=> res.json("error while creating product"));
      
      }  
    })
   
   
  }
);

router.delete(
  '/delete/:id',middleware.checkToken,
  (req, res) => {
   Product.findByIdAndRemove(req.params.id)
   .then(()=>{
     res.json("Product Deleted Successfully")
   }).catch(err=> res.json(err))
  
  }
);

// router.get('/date-wise',(req,res)=>{
//   News.aggregate(
//     [
//       { 
//         $group: {
//          _id: {
//            day: {
//               $dayOfMonth: "$date"
//           },
//           month: {
//               $month: "$date"
//           },
//           year: {
//               $year: "$date"
//           }
//       },
//         count: {
//             $sum: 1
//         }
//       }
//     },
//     {
//       $sort: {"_id.year":-1, "_id.month":-1, "_id.day":-1}
//     }
//     ],
//     (error, groupedData) => {
//       if (error) {
//           res.json(error)
//       } else {
//         res.json(groupedData)
//       }
//   });
// })

// router.get('/datewise/:start_date/:end_date',(req,res)=>{
//   // console.log("@@@@@")
//   // console.log(req.params.start_date)
//   // console.log(req.params.end_date)

//   News.aggregate(
//     [
//       {$match: {
//         date :{
//               $gte: 
//         // (new Date('2019-08-10T05:53:27.959Z'))

//             // new Date(2019,08,10)
//              new Date(req.params.start_date)
//              , 
//              $lt: 
//         // (new Date('2019-08-15T05:53:27.959Z'))

//              new Date(req.params.end_date) 
//             //  new Date(2019,08,15)
//         }
           
//         // name : "ekta"
//             }
//         }
//     ,
//       { 
//         $group: {
//          _id: {
//            day: {
//               $dayOfMonth: "$date"
//           },
//           month: {
//               $month: "$date"
//           },
//           year: {
//               $year: "$date"
//           }
//       },
//         count: {
//             $sum: 1
//         }
//       }
//     },
//     {
//       $sort: {"_id.year":-1, "_id.month":-1, "_id.day":-1}
//     }
//     ],
//     (error, groupedData) => {
//       if (error) {
//           res.json(error)
//       } else {
//         res.json(groupedData)
//       }
//   });
// })


// router.post('/add-like/:id/:userid',async (req,res)=>{
//       News.findByIdAndUpdate(
//         req.params.id,
//         {$push: {"likes": {id:req.params.userid,like_type:req.body.like_type}}},
//         {safe: true, upsert: true, new : true},
//         function(err, news) {
//           if(err){
//             // console.log(err);
//             res.json("error while updating news")
//           }
//           else {
//             // console.log(news)
//             res.json(news)
//           }
//         }
//     );
// })

// router.post('/remove-like/:id/:userid',async (req,res)=>{
// //   News.findByIdAndUpdate(
// //     req.params.id,
// //     {$pull: {"likes": {userid:req.params.userid}}},
// //     { safe: true},
// //     function(err, news) {
// //       if(err){
// //         console.log(err);
// //         res.json("error while updating news")
// //       }
// //       else {
// //         console.log(news)
// //         res.json(news)
// //       }
// //     }
// // );

//   var news= await News.findById(req.params.id).then(news=>{return news})
//   var update=[]
//   news.likes.forEach(element=>{
//     console.log(element.id)
//     console.log(req.params.userid)
//     if(element.id==req.params.userid){

//     } else
//      update.push(element)
//   })
//   console.log(update)
//   News.findByIdAndUpdate(req.params.id,{likes:update}, { new: true })
//   .then(updated=>{
//     res.json(updated)
//   }).catch( err=>{
//     console.log(news)

//     res.json("error while updating news")
//   }
//   )
// })

// router.get('/comment/:id',async (req, res) => {
//   // const errors = {};

//   var allComments=[];
//   News.findById(req.params.id)
//     .then(news =>{
//       // console.log(news.comments)
//       async.each(news.comments,(comment,cb)=>{
//         User.findById(comment.user).then(found=>{
//           // console.log(found.gender);
//           comment.gender= found.gender;
//           allComments.push(comment);
//           cb();
//           // console.log("@@@");

//           // var obj ;
//           // obj.comment = comment;
//           // obj.gender = found.gender;
//           // comment.gender= found.gender;
//           // console.log(obj);

         
//         }).catch(err=>cb(err))
//       },(err)=>{
//         if(err){
//           res.json(err)
//         } else {
//           // console.log("@@@@@@")
          
//           res.json(allComments)
//         }
//       })
//     })
//     .catch(err =>
//       res.status(404).json({ nonewsfound: 'No news found with that ID' })
//     );
    
// });

// router.post(
//   '/comment/:id',
//   // passport.authenticate('jwt', { session: false }),
//   (req, res) => {

//     News.findById(req.params.id)
//       .then(news => {
//         const newComment = {
//           text: req.body.text,
//           name: req.body.name,
//           user: req.body.user
//         };
//         // console.log(req.body.user)

//         // Add to comments array
//         news.comments.unshift(newComment);

//         // Save
//         news.save().then(news => res.json(news));
//       })
//       .catch(err =>{ console.log(err); res.status(404).json({ newsnotfound: 'No news found' })});
//   }
// );

// router.get("/find/:employid",(req,res)=>{
//   News.find({added_by:req.params.employid}).sort({ date: -1 }).exec()
//   .then(list=>res.json(list))
//   .catch(err=>res.json(err))
// })


router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

router.get('/:id',async (req, res) => {
  const errors = {};

  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err =>
      res.status(404).json({ noproductfound: 'No product found with that ID' })
    );
    // .catch(err =>
    //   res.status(404).json({ news: 'There is no news present' })
    // );
});



module.exports = router;
