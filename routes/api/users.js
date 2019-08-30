// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
// const passport = require('passport');
// const middleware = require("../../middleware/index");
// const async = require("async")

// // Load User model
// const User = require('../../models/User');
// const News = require('../../models/News');
// const ReferManager = require('../../models/ReferManager');

// // @route   GET api/users/test
// // @desc    Tests users route
// // @access  Public
// router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

//  function random (low, high, name){
//   var x =  Math.random() * (high - low) + low
//   x = name + x.substring(0,4) ;

// }

// // @route   POST api/users/register
// // @desc    Register user
// // @access  Public
// router.post('/register',async (req, res) => {

//   User.findOne({ phone: req.body.phone }).then(user => {
//     if (user) {
//       return res.status(400).json('phone no. already exists');
//     } else {

//       const newUser = new User({
//         name: req.body.name,
//         age: req.body.age,
//         state: req.body.state,
//         city: req.body.city,
//         gender: req.body.gender,
//         phone: req.body.phone,
//         device_id: req.body.device_id,
//         refer_code: req.body.phone
//       }).save()
//         .then(user => res.json(user))
//         .catch(err => { console.log(err);  res.json(err)});

//     }
//   });
// });

// // @route   GET api/users/login
// // @desc    Login User / Returning JWT Token
// // @access  Public
// router.post('/login', (req, res) => {
//   // const { errors, isValid } = validateLoginInput(req.body);

//   // Check Validation
//   // if (!isValid) {
//   //   return res.status(400).json(errors);
//   // }

//   const phone = req.body.phone;
//   // const password = req.body.password;

//   // Find user by email
//   // console.log(phone)

//   User.findOne({ phone }).then(user => {
//     // Check for user
//     if (!user) {

//       return res.status(404).json('User not found');
//     }

//     const payload = { id: user.id, name: user.name, phone: user.phone  }; // Create JWT Payload

//         // Sign Token
//         jwt.sign(
//           payload,
//           keys.secretOrKey,
//           { expiresIn: '30d' },
//           (err, token) => {
//             if(err){
//               res.json(err)
//             }
//             res.json({
//               success: true,
//               token: 'Bearer ' + token
//             });
//           }
//         );
//   });
// });

// // @route   GET api/users/current
// // @desc    Return current user
// // @access  Private
// router.get(
//   '/current',
//   middleware.checkToken,
//   (req, res) => {
//     res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email
//     });
//   }
// );

// // @route   GET api/users/all
// // @desc    Return all user
// // @access  Private

// router.get('/all',(req, res) => {
//   User.find()
//     .sort({ date: -1 })

//     .then(users => res.json(users))
//     .catch(err => res.status(404).json({ nousersfound: 'No users found' }));
// });

// router.get('/refer-manager',middleware.checkToken,async (req,res)=>{

//   var allUsers= await User.find()
//   .sort({ joining_date: -1 }).exec().then(users => {return users})
//   .catch(err=> res.json("Some Error occured or no user found"));

//   referred=[]

//   allUsers.forEach(user=>{
//       if(user.referred_code){
//           referred.push(user)
//       }
//   })

//   var list=[];
//    referred.forEach(async (user,index)=>{
//       var referreduser = await User.find({"refer_code": user.referred_code})
//                                 .sort({joining_date:-1})
//                                 .then(user=>{return user})
//                                 .catch(err=>{res.json("There seems to be discrepancy in data, user has successfully applied a refer code , but no user exist for that refer code  "+ user.referred_code)})

//       var total =0;

//       user.credit_history.forEach(history=>{
//         total+=history.amount;
//       })
//       user.total_earning=total
//       var obj ={
//         user,
//         referredUserId: referreduser[0]._id,
//         referredUserName : referreduser[0].name,
//         referredUserPhone: referreduser[0].phone
//       };
//       list.push(obj);

//       if(index==referred.length-1){
//         res.json(list)
//       }

//   })

// })

// router.get('/date-wise',middleware.checkToken,(req,res)=>{
//   User.aggregate(
//     [
//       {
//         $group: {
//          _id: {
//            day: {
//               $dayOfMonth: "$joining_date"
//           },
//           month: {
//               $month: "$joining_date"
//           },
//           year: {
//               $year: "$joining_date"
//           }
//       },
//         count: {
//             $sum: 1
//         }
//       }
//     },
//     {
//       $sort: { joining_date: -1 }
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
// router.get("/totalreferraltime/:id",(req,res)=>{
//   var t=0;
//   User.findById(req.params.id).then(users=>{
//     if(users){
//       console.log(users);
//       User.find({referred_code:users.refer_code}).then(referredusers=>{
//         if(referredusers){
//           for(var i of referredusers){
//             t = t+ i.total_ad_time;
//           }
//           res.json({time:t});
//         }else{
//           res.status(404).json("no  referred users found")
//         }

//       }).catch(err=> res.json("Error occured!!"))

//     } else{
//       res.status(404).json("no users found")
//     }
//   }).catch(err=> res.json("Error occured!!"))

// })

// router.post('/block/:id',middleware.checkToken,(req,res)=>{
//   User.findByIdAndUpdate(req.params.id,{blocked: true},{new: true},(err,updated)=>{
//     if(err){
//       res.json(err)
//     } else {
//       res.json(updated);
//     }
//   })
// })

// router.post('/unblock/:id',middleware.checkToken,(req,res)=>{
//   User.findByIdAndUpdate(req.params.id,{blocked: false},{new: true},(err,updated)=>{
//     if(err){
//       console.log(err)
//       res.json(err)
//     } else {
//       res.json(updated);
//     }
//   })
// })

// router.get("/totalreferraltime", async (req,res)=>{
//   var allUsers = await  User.find();

//   var index=0
//   async.each(allUsers, (user,callback)=>{
//     User.findById(user._id).then(async users=>{
//       if(users){
//         var t=0;
//         if(users.refer_code!=""&&typeof users.refer_code!='undefined'){
//         await User.find({referred_code:users.refer_code}).then(referredusers=>{
//           if(referredusers.length>0){
//             for(var i of referredusers){
//               t = t+ i.total_ad_time;
//             }
//             users.refer_friend_earning_time= t
//             user.save().then(()=>{
//               allUsers[allUsers.indexOf(user)].refer_friend_earning_time= t
//             callback()

//             })
//           }else{
//             callback()

//           }

//         }).catch(err=> callback("Error occured!!"))
//       } else{
//         callback()
//       }
//       } else{

//         callback()
//       }
//     }).catch(err=> { callback(err);})

//   },(err)=>{

//     if(err){
//       console.log(err)
//       res.json("error occured!!")
//     }
//     else{
//       allUsers.sort(function(a,b){

//         console.log()
//         return b.refer_friend_earning_time-a.refer_friend_earning_time;

//     })
//       // console.log("callback")
//       res.json(allUsers)
//     }
//   })
// })

// //search by name
// router.get("/name/:name",(req,res)=>{
//   User.find({name:req.params.name}).then(users=>{
//     if(users){
//       res.json(users)
//     } else{
//       res.status(404).json("no users found")
//     }
//   }).catch(err=> res.json("Error occured!!"))
// })

// //search by phone

// router.get("/phone/:phone",(req,res)=>{
//   User.findOne({phone:req.params.phone}).then(users=>{
//     if(users){
//       res.json(users)
//     } else{
//       res.status(404).json("no users found")
//     }
//   }).catch(err=> res.json("Error occured!!"))
// })

// //search by refer code

// router.get("/refercode/:refcode",(req,res)=>{
//   User.findOne({refer_code:req.params.refcode}).then(users=>{
//     if(users){
//       res.json(users)
//     } else{
//       res.status(404).json("no users found")
//     }
//   }).catch(err=> res.json("Error occured!!"))
// })

// router.get("/age/:age",middleware.checkToken,(req,res)=>{
//   User.find({age:req.params.age}).then(users=>{
//     if(users){
//       res.json(users)
//     } else{
//       res.status(404).json("no users found")
//     }
//   }).catch(err=> res.json("Error occured!!"))
// })

// router.get("/gender/:gender",middleware.checkToken,(req,res)=>{
//   User.find({gender:req.params.gender}).then(users=>{
//     if(users){
//       res.json(users)
//     } else{
//       res.status(404).json("no users found")
//     }
//   }).catch(err=> res.json("Error occured!!"))
// })

// router.post(
//   '/favourite/:id',
//   // passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     User.findById(req.params.id).then(user => {
//           if (
//             user.favourites.filter(favourite => favourite.news === req.body.news)
//               .length > 0
//           ) {
//             return res
//               .status(400)
//               .json({ alreadyadded: 'User already added this news as favourite' });
//           }

//           user.favourites.unshift({ news: req.body.news });

//           user.save().then(user => res.json(user));

//     }) .catch(err =>{console.log(err); res.status(404).json({ usernotfound: 'No user found' })});
//   }
// );

// router.post(
//   '/unfavourite/:id',
//   // passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     User.findById(req.params.id).then(user => {
//       var update=[]
//      user.favourites.forEach(element=>{
//       if(element.news==req.body.news){

//       } else
//        update.push(element)
//       })

//             user.favourites=update
//             user.save().then(user => res.json(user));

//     }) .catch(err =>{console.log(err); res.status(404).json({ usernotfound: 'No user found' })});
//   }
// );

// router.get("/fav-news/:id",(req,res)=>{
//   var allnews=[];
//   User.findById(req.params.id).then(user=>{
//     async.each(user.favourites,(fav,cb)=>{
//       News.findById(fav.news).then(news=>{
//         allnews.unshift(news);
//         cb();
//       }).catch(err=>cb(err))
//     },(err=>{
//       if(err){
//         res.status(400).json("error occured")
//         console.log(err)
//       }
//       else res.json(allnews)
//     }))

//   })
// })

// router.get("/:id/redeem",async (req,res)=>{
//   var price=0;
//   var refermanager = await ReferManager.find().then(found=>{return found[0];})

//   var user = await User.findById(req.params.id).then(found=>{
//                      return found
//                   }).catch(err=> res.json("error while fetching details of user"))

//    price = Number(user.total_ad_time)/refermanager.redeem_time;
//    var list=[];
//    var sum=0;
//    var success=false
//   async.each(user.referred_friends, async (referred,cb)=>{
//     await User.findById(referred.user).then(found=>{
//       var effective_time = found.total_ad_time - referred.time_redeemed;
//       if(sum<refermanager.redeem_time && effective_time>0){
//       var obj={};
//       if(sum + effective_time>refermanager.redeem_time){

//         obj.time= refermanager.redeem_time-sum
//         obj.id=referred.user
//         obj.name= referred.name
//         sum = refermanager.redeem_time;
//         success=true
//         list.push(obj)

//       }else{
//         sum=sum + effective_time
//         obj.id = referred.user;
//         obj.name = referred.name
//         obj.time = effective_time
//         list.push(obj)

//       }

//       }
//     }).catch(err=>cb(err))
//     cb()

//   },(err)=>{
//     if(err){
//       console.log(err)
//       res.json(err)
//     }else{
//       if(success){
//         // var history=false;
//       async.each(user.referred_friends,(friend,callback)=>{
//         var index;
//         var found=false;
//         for(index=0;index<list.length;index++){
//           if(list[index].id==friend.user){
//             found=true;
//             break;
//           }
//         }

//         if(found){
//         friend.time_redeemed+=list[index].time;

//          User.findByIdAndUpdate(user._id,user,{new: true})
//         .then(updated=>{
//           console.log(user)

//             callback()

//         }).catch(err=>{callback(err)})
//       }else{
//         callback()
//       }

//       },(err)=>{
//         if(err){
//           res.json(err)
//         }else {
//           var history={amount: refermanager.redeem_amount , status: "pending"};
//           list.forEach(item=>{
//             var credit={};
//             credit.name=item.name;
//             credit.amount= refermanager.redeem_amount*(item.time/refermanager.redeem_time);
//             credit.status="pending"
//             user.redeem_history.push(credit)
//           })
//           // user.redeem_history.push(history);
//           User.findByIdAndUpdate(user._id,user,{new: true})
//           .then(updated=>{
//           // console.log(user)
//           res.json(updated)

//         }).catch(err=>{res.json(err)})

//         }

//       })
//     } else{
//       // callback()
//       res.status(400).json("User doesn't have sufficient balance")
//     }
//     }
//   })

// })

// router.get("/:id/wallet",async (req,res)=>{
//   var refermanager = await ReferManager.find().then(found=>{return found[0];})

//   var price=0;
//   var user = await User.findById(req.params.id).then(found=>{
//                      return found
//                   }).catch(err=> res.json("error while fetching details of user"))

//   price = Number(user.total_ad_time)/refermanager.redeem_time;
//   var sum=0;

//   if(user.referred_friends.length==0){
//     user.wallet_balance=0
//   }

//   async.each(user.referred_friends, async (referred,cb)=>{
//     await User.findById(referred.user).then(found=>{
//       console.log(sum)
//       sum=sum+(found.total_ad_time - referred.time_redeemed)
//       sum=sum;

//     }).catch(err=>cb(err))
//     console.log(sum)
//     user.wallet_balance=parseInt(sum/refermanager.redeem_time)*refermanager.redeem_amount;
//     cb()

//   },(err)=>{
//     if(err){
//       res.json(err)
//     }else{
//       res.json(user)
//     }
//   })

// })

// router.post("/:id/update-status/:status",middleware.checkToken,async (req, res) => {
//   var user= await User.findById(req.params.id)
//             .then(found=>{return found})
//             .catch(err=> res.json("error while fwetching details of user"))

//   var amount=0;
//   var name;
//   user.redeem_history.forEach((history,index)=>{
//     if(history._id==req.params.status){
//       history.status="complete"
//       amount=history.amount;
//       name= history.name
//     }

//     if(index==user.redeem_history.length-1){
//       var history ={};
//       history.amount = amount;
//       history.name = name;
//       history.status="complete";
//       user.credit_history.push(history);
//       User.findByIdAndUpdate(req.params.id,user,{new:true})
//       .then(updated=>{
//         res.json(updated)
//       }).catch(err=>{
//          res.json("error while updating history of user")
//       })
//     }
//   })
// })

// router.post("/:id/update/:attribute", async (req,res)=>{
//   var user = await User.findById(req.params.id).then(user=>{return user}).catch(err=>{res.json(err)})

//   user[ req.params.attribute] = Number(user[ req.params.attribute])+ Number(req.body.value);

//   user.save().then(updated=>{

//       res.json(updated)
//     }).catch(err=>{

//       res.json(err);
//     })

// })

// router.get("/:id/refer-time",async (req,res)=>{

//     User.findById(req.params.id).then(users=>{
//       if(users){
//         console.log(users);
//         User.find({referred_code:users.refer_code}).then(referredusers=>{
//           if(referredusers){
//             res.json(referredusers)

//           }else{
//             res.status(404).json("no referred users found")
//           }

//         }).catch(err=> res.json("Error occured!!"))

//       } else{
//         res.status(404).json("no users found")
//       }
//     }).catch(err=> res.json("Error occured!!"))
// })
// // @route   GET api/users/:id
// // @desc    Get user by id
// // @access  Public
// router.get('/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(user => res.json(user))
//     .catch(err =>
//       res.status(404).json({ nouserfound: 'No user found with that ID' })
//     );
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const middleware = require("../../middleware/index");
const async = require("async");
const mongoose = require("mongoose");
const { forEach } = require("p-iteration");

// Load User model
const User = require("../../models/User");
const News = require("../../models/News");
const ReferManager = require("../../models/ReferManager");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

function random(low, high, name) {
  var x = Math.random() * (high - low) + low;
  x = name + x.substring(0, 4);
}

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", async (req, res) => {
  User.findOne({ phone: req.body.phone }).then(user => {
    if (user) {
      return res.status(400).json("phone no. already exists");
    } else {
      const newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        state: req.body.state,
        city: req.body.city,
        gender: req.body.gender,
        pincode: req.body.pincode,
        age: req.body.age,
        address: req.body.address,


        refer_code: req.body.phone
      })
        .save()
        .then(user => res.json(user))
        .catch(err => {
          console.log(err);
          res.json(err);
        });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

  const phone = req.body.phone;
  // const password = req.body.password;

  // Find user by email
  // console.log(phone)

  User.findOne({ phone }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json("User not found");
    }

    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      gender: user.gender
    }; // Create JWT Payload

    // Sign Token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: "30d" }, (err, token) => {
      if (err) {
        res.json(err);
      }
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/exist/:phone",

  (req, res) => {
    User.findOne({ phone: req.params.phone }).then(found => {
      // console.log(found)
      if (found) {
        res.json({ exist: true });
      } else {
        res.json({ exist: false });
      }
    });
  }
);

// @route   GET api/users/all
// @desc    Return all user
// @access  Private

router.get("/all", (req, res) => {
  User.find()
    .sort({ date: -1 })

    .then(users => res.json(users))
    .catch(err => res.status(404).json({ nousersfound: "No users found" }));
});

router.get("/refer-manager", async (req, res) => {
  var allUsers = await User.find()
    .sort({ joining_date: -1 })
    .exec()
    .then(users => {
      return users;
    })
    .catch(err => res.json("Some Error occured or no user found"));

  referred = [];

  allUsers.forEach(user => {
    if (user.referred_code) {
      referred.push(user);
    }
  });

  var list = [];
  await forEach(referred, async (user, index) => {
    var referreduser = await User.find({ refer_code: user.referred_code })
      .sort({ joining_date: -1 })
      .then(user => {
        return user;
      })
      .catch(err => {
        res.json(
          "There seems to be discrepancy in data, user has successfully applied a refer code , but no user exist for that refer code  " +
            user.referred_code
        );
      });

    var total = 0;

    user.credit_history.forEach(history => {
      total += history.amount;
    });
    user.total_earning = total;
    var obj = {
      user,
      referredUserId: referreduser[0]._id,
      referredUserName: referreduser[0].name,
      referredUserPhone: referreduser[0].phone
    };
    list.push(obj);

    if (index == referred.length - 1) {
      res.json(list);
    }
  });
});
///:start_date/:end_date
router.get("/datewise/:start_date/:end_date", (req, res) => {
  // console.log("@@@@@")
  // console.log(req.params.start_date)
  // console.log(req.params.end_date)

  User.aggregate(
    [
      {
        $match: {
          joining_date: {
            $gte:
              // (new Date('2019-08-10T05:53:27.959Z'))

              // new Date(2019,08,10)
              new Date(req.params.start_date),
            $lt:
              // (new Date('2019-08-15T05:53:27.959Z'))

              new Date(req.params.end_date)
            //  new Date(2019,08,15)
          }

          // name : "ekta"
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$joining_date"
            },
            month: {
              $month: "$joining_date"
            },
            year: {
              $year: "$joining_date"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 }
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});

router.get("/refer-manager/agewise", (req, res) => {
  // console.log("@@@@@")
  // console.log(req.params.start_date)
  // console.log(req.params.end_date)

  User.aggregate(
    [{
      $match: {
        referred_code: {
          // $gt:null
          $exists: true
          // $gt: { $size: "$referred-code" , 1}
        }

        // name : "ekta"
      }
    },
      
      {
        $group: {
          _id: "$age",
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});


router.get("/refer-manager/genderwise", (req, res) => {
  // console.log("@@@@@")
  // console.log(req.params.start_date)
  // console.log(req.params.end_date)

  User.aggregate(
    [
      {
        $match: {
          referred_code: {
            // $gt:null
            $exists: true
            // $gt: { $size: "$referred-code" , 1}
          }

          // name : "ekta"
        }
      },
      {
        $group: {
          _id: 
             "$gender",
          count: {
            $sum: 1
          }
        }
      
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});


router.get("/highest-referring", (req, res) => {
  // console.log("@@@@@")
  // console.log(req.params.start_date)
  // console.log(req.params.end_date)

  User.aggregate(
    [
      {
        $match: {
          referred_code: {
            // $gt:null
            $exists: true
            // $gt: { $size: "$referred-code" , 1}
          }

          // name : "ekta"
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$joining_date"
            },
            month: {
              $month: "$joining_date"
            },
            year: {
              $year: "$joining_date"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 }
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});

router.get("/datewise-earning/:start_date/:end_date", (req, res) => {
  // console.log("@@@@@")
  // console.log(req.params.start_date)
  // console.log(req.params.end_date)

  User.aggregate(
    [
      {
        $match: {
          redeem_history: {
            $eleMatch: {
              date: {
                $gte: new Date("2019-07-10T05:53:27.959Z"),

                // new Date(2019,08,10)
                //  new Date(req.params.start_date)
                $lt: new Date("2019-08-15T05:53:27.959Z")

                //  new Date(req.params.end_date)
                //  new Date(2019,08,15)
              }
            }
          }

          // name : "ekta"
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$redeem_history.date"
            },
            month: {
              $month: "$redeem_history.date"
            },
            year: {
              $year: "$redeem_history.date"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 }
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});

router.get("/date-wise", (req, res) => {
  User.aggregate(
    [
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$joining_date"
            },
            month: {
              $month: "$joining_date"
            },
            year: {
              $year: "$joining_date"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 }
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});

router.get("/totalreferraltime/:id", (req, res) => {
  var t = 0;
  User.findById(req.params.id)
    .then(users => {
      if (users) {
        console.log(users);
        User.find({ referred_code: users.refer_code })
          .then(referredusers => {
            if (referredusers) {
              for (var i of referredusers) {
                t = t + i.total_ad_time;
              }
              res.json({ time: t });
            } else {
              res.status(404).json("no  referred users found");
            }
          })
          .catch(err => res.json("Error occured!!"));
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});

router.post("/block/:id", middleware.checkToken, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { blocked: true },
    { new: true },
    (err, updated) => {
      if (err) {
        res.json(err);
      } else {
        res.json(updated);
      }
    }
  );
});

router.post("/unblock/:id", middleware.checkToken, (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { blocked: false },
    { new: true },
    (err, updated) => {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        res.json(updated);
      }
    }
  );
});

router.get("/totalreferraltime", async (req, res) => {
  var allUsers = await User.find();

  var index = 0;
  async.each(
    allUsers,
    (user, callback) => {
      User.findById(user._id)
        .then(async users => {
          if (users) {
            var t = 0;
            if (
              users.refer_code != "" &&
              typeof users.refer_code != "undefined"
            ) {
              await User.find({ referred_code: users.refer_code })
                .then(referredusers => {
                  if (referredusers.length > 0) {
                    for (var i of referredusers) {
                      t = t + i.total_ad_time;
                    }
                    users.refer_friend_earning_time = t;
                    user.save().then(() => {
                      allUsers[
                        allUsers.indexOf(user)
                      ].refer_friend_earning_time = t;
                      callback();
                    });
                  } else {
                    callback();
                  }
                })
                .catch(err => callback("Error occured!!"));
            } else {
              callback();
            }
          } else {
            callback();
          }
        })
        .catch(err => {
          callback(err);
        });
    },
    err => {
      if (err) {
        console.log(err);
        res.json("error occured!!");
      } else {
        allUsers.sort(function(a, b) {
          console.log();
          return b.refer_friend_earning_time - a.refer_friend_earning_time;
        });
        // console.log("callback")
        res.json(allUsers);
      }
    }
  );
});

//search by name
router.get("/name/:name", (req, res) => {
  User.find({ name: req.params.name })
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});

//search by phone

router.get("/phone/:phone", (req, res) => {
  User.findOne({ phone: req.params.phone })
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});

//search by refer code

router.get("/refercode/:refcode", (req, res) => {
  User.findOne({ refer_code: req.params.refcode })
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});

router.get("/age/:age", middleware.checkToken, (req, res) => {
  User.find({ age: req.params.age })
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});

router.get("/gender/:gender", middleware.checkToken, (req, res) => {
  User.find({ gender: req.params.gender })
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});

router.post(
  "/favourite/:id",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        if (
          user.favourites.filter(favourite => favourite.news === req.body.news)
            .length > 0
        ) {
          return res.status(400).json({
            alreadyadded: "User already added this news as favourite"
          });
        }

        user.favourites.unshift({ news: req.body.news });

        user.save().then(user => res.json(user));
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ usernotfound: "No user found" });
      });
  }
);

router.post(
  "/unfavourite/:id",
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then(user => {
        var update = [];
        user.favourites.forEach(element => {
          if (element.news == req.body.news) {
          } else update.push(element);
        });

        user.favourites = update;
        user.save().then(user => res.json(user));
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({ usernotfound: "No user found" });
      });
  }
);

router.get("/fav-news/:id", (req, res) => {
  var allnews = [];
  User.findById(req.params.id).then(user => {
    async.each(
      user.favourites,
      (fav, cb) => {
        News.findById(fav.news)
          .then(news => {
            allnews.unshift(news);
            cb();
          })
          .catch(err => cb(err));
      },
      err => {
        if (err) {
          res.status(400).json("error occured");
          console.log(err);
        } else res.json(allnews);
      }
    );
  });
});

router.get("/:id/redeem", async (req, res) => {
  var price = 0;
  var refermanager = await ReferManager.find().then(found => {
    return found[0];
  });

  var user = await User.findById(req.params.id)
    .then(found => {
      return found;
    })
    .catch(err => res.json("error while fetching details of user"));

  price = Number(user.total_ad_time) / refermanager.redeem_time;
  var list = [];
  var sum = 0;
  var success = false;
  await forEach(user.referred_friends, async referred => {
    var found = await User.findById(referred.user).then(found => {return found})
      var effective_time = found.total_ad_time - referred.time_redeemed;
      if (sum < refermanager.redeem_time && effective_time > 0) {
        var obj = {};
        if (sum + effective_time > refermanager.redeem_time) {
          obj.time = refermanager.redeem_time - sum;
          obj.id = referred.user;
          obj.name = found.name;
          sum = refermanager.redeem_time;
          success = true;
          list.push(obj);
        } else {
          sum = sum + effective_time;
          obj.id = referred.user;
          obj.name = found.name;
          obj.time = effective_time;
          list.push(obj);
        }
      }
  })
    // cb()

    console.log(success)

    if (success) {
      console.log("inside succ")
      // var history=false;
      await forEach(user.referred_friends, async friend => {
        var index;
        var found = false;
        for (index = 0; index < list.length; index++) {
          if (list[index].id == friend.user) {
            found = true;
            break;
          }
        }

        if (found) {
          friend.time_redeemed += list[index].time;
          list[index].time_redeemed = friend.time_redeemed;
          await User.findByIdAndUpdate(user._id, user, { new: true })
            .then(updated => {
              // console.log(user)
              // callback()
            })
            .catch(err => {});
        } else {
          // callback()
        }
      });

      var history = { amount: refermanager.redeem_amount, status: "pending" };
      console.log(list);
      list.forEach(item => {
        var credit = {};
        credit.name = item.name;
        credit.amount =
          refermanager.redeem_amount * (item.time / refermanager.redeem_time);
        credit.status = "pending";
        credit.time_redeemed = item.time_redeemed;
        credit.total_time = refermanager.redeem_time;
        user.redeem_history.push(credit);
      });
      // user.redeem_history.push(history);
      User.findByIdAndUpdate(user._id, user, { new: true })
        .then(updated => {
          // console.log(user)
          res.json(updated);
        })
        .catch(err => {
          res.json(err);
        });
    } else {
      // callback()
      res.status(400).json("User doesn't have sufficient balance");
    }
  
});

router.get("/:id/wallet", async (req, res) => {
  var refermanager = await ReferManager.find().then(found => {
    return found[0];
  });

  var price = 0;
  var user = await User.findById(req.params.id)
    .then(found => {
      return found;
    })
    .catch(err => res.json("error while fetching details of user"));

  price = Number(user.total_ad_time) / refermanager.redeem_time;
  var sum = 0;

  if (user.referred_friends.length == 0) {
    user.wallet_balance = 0;
  }

  await forEach(
    user.referred_friends,
    async (referred) => {
      await User.findById(referred.user)
        .then(found => {
          console.log(sum);
          sum = sum + (found.total_ad_time - referred.time_redeemed);
          sum = sum;
        })
        .catch(err => {});
      console.log(sum);
      user.wallet_balance =
        parseInt(sum / refermanager.redeem_time) * refermanager.redeem_amount;
      // cb();
    })
    // err => {
    //   if (err) {
    //     console.log(err);
    //     res.json(err);
    //   } else {
        // console.log("user test");
        res.json(user);
      
    
  
});

router.get("/self-balance/:id", async (req, res) => {
  var refermanager = await ReferManager.find().then(found => {
    return found[0];
  });

  User.findById(req.params.id).then(user => {
    var amount = 0;
    amount =
      (user.total_ad_time / refermanager.redeem_time) *
      refermanager.redeem_amount;
    res.json({ amount });
  });
});

router.post(
  "/:id/update-status/:status",
  middleware.checkToken,
  async (req, res) => {
    var user = await User.findById(req.params.id)
      .then(found => {
        return found;
      })
      .catch(err => res.json("error while fwetching details of user"));

    var amount = 0;
    var name;
    var id;
    user.redeem_history.forEach((history, index) => {
      if (history._id == req.params.status) {
        history.status = "complete";
        amount = history.amount;
        name = history.name;
        // id=history.userid
      }

      if (index == user.redeem_history.length - 1) {
        var history = {};
        history.amount = amount;
        history.name = name;
        history.status = "complete";
        // history.userid=id;
        user.credit_history.push(history);
        User.findByIdAndUpdate(req.params.id, user, { new: true })
          .then(updated => {
            res.json(updated);
          })
          .catch(err => {
            res.json("error while updating history of user");
          });
      }
    });
  }
);

router.post("/update-adtime/:id/", async (req, res) => {
  // User.update({name: "neeraj", "ad_time.date" : "02/04/2109" } ,
  //               {$inc : {"ad_time.$.count" : 1} },
  //               function(update) {
  //                 res.json(update)
  //               });

  User.findById(req.params.id).then(user => {
    var exist = false;
    user.ad_time.forEach(time => {
      if (time.date == req.body.date) {
        exist = true;
      }
    });
    if (exist) {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id, "ad_time.date": req.body.date },
            update: {
              $inc: {
                "ad_time.$.count": req.body.count
              }
            }
          }
        }
      ]);
    } else {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id },
            update: {
              $addToSet: {
                ad_time: {
                  date: req.body.date,
                  count: req.body.count,
                  serialized: true
                }
              }
            }
          }
        }
      ]);
    }
  });
});

router.post("/update-adview/:id/", async (req, res) => {
  // User.update({name: "neeraj", "ad_time.date" : "02/04/2109" } ,
  //               {$inc : {"ad_time.$.count" : 1} },
  //               function(update) {
  //                 res.json(update)
  //               });

  User.findById(req.params.id).then(user => {
    var exist = false;
    user.ad_view.forEach(time => {
      if (time.date == req.body.date) {
        exist = true;
      }
    });
    if (exist) {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id, "ad_view.date": req.body.date },
            update: {
              $inc: {
                "ad_view.$.count": 1
              }
            }
          }
        }
      ]);
    } else {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id },
            update: {
              $addToSet: {
                ad_view: {
                  date: req.body.date,
                  count: 1,
                  serialized: true
                }
              }
            }
          }
        }
      ]);
    }
  });
});

router.post("/update-adclick/:id/", async (req, res) => {
  // User.update({name: "neeraj", "ad_time.date" : "02/04/2109" } ,
  //               {$inc : {"ad_time.$.count" : 1} },
  //               function(update) {
  //                 res.json(update)
  //               });

  User.findById(req.params.id).then(user => {
    var exist = false;
    user.ad_click.forEach(time => {
      if (time.date == req.body.date) {
        exist = true;
      }
    });
    if (exist) {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id, "ad_click.date": req.body.date },
            update: {
              $inc: {
                "ad_click.$.count": 1
              }
            }
          }
        }
      ]);
    } else {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id },
            update: {
              $addToSet: {
                ad_click: {
                  date: req.body.date,
                  count: 1,
                  serialized: true
                }
              }
            }
          }
        }
      ]);
    }
  });
});

router.post("/update-newsread/:id/", async (req, res) => {
  // User.update({name: "neeraj", "ad_time.date" : "02/04/2109" } ,
  //               {$inc : {"ad_time.$.count" : 1} },
  //               function(update) {
  //                 res.json(update)
  //               });

  User.findById(req.params.id).then(user => {
    var exist = false;
    user.news_read.forEach(time => {
      if (time.date == req.body.date) {
        exist = true;
      }
    });
    if (exist) {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id, "news_read.date": req.body.date },
            update: {
              $inc: {
                "news_read.$.count": 1
              }
            }
          }
        }
      ]);
    } else {
      User.bulkWrite([
        {
          updateOne: {
            filter: { _id: req.params.id },
            update: {
              $addToSet: {
                news_read: {
                  date: req.body.date,
                  count: 1,
                  serialized: true
                }
              }
            }
          }
        }
      ]);
    }
  });
});

router.get("/check/:id", (req, res) => {
  User.aggregate(
    [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $unwind: "$redeem_history"
      },
      {
        $project: {
          _id: 1,
          "redeem_history.date": 1
        }
      },
      {
        $group: {
          _id: {
            day: {
              $dayOfMonth: "$redeem_history.date"
            },
            month: {
              $month: "$redeem_history.date"
            },
            year: {
              $year: "$redeem_history.date"
            }
          },
          count: {
            $sum: 1
          }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 }
      }
    ],
    (error, groupedData) => {
      if (error) {
        res.json(error);
      } else {
        res.json(groupedData);
      }
    }
  );
});

router.post("/:id/update/:attribute", async (req, res) => {
  var user = await User.findById(req.params.id)
    .then(user => {
      return user;
    })
    .catch(err => {
      res.json(err);
    });

  user[req.params.attribute] =
    Number(user[req.params.attribute]) + Number(req.body.value);

  user
    .save()
    .then(updated => {
      res.json(updated);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/:id/refer-time", async (req, res) => {
  User.findById(req.params.id)
    .then(users => {
      if (users) {
        console.log(users);
        User.find({ referred_code: users.refer_code })
          .then(referredusers => {
            if (referredusers) {
              res.json(referredusers);
            } else {
              res.status(404).json("no referred users found");
            }
          })
          .catch(err => res.json("Error occured!!"));
      } else {
        res.status(404).json("no users found");
      }
    })
    .catch(err => res.json("Error occured!!"));
});
// @route   GET api/users/:id
// @desc    Get user by id
// @access  Public
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err =>
      res.status(404).json({ nouserfound: "No user found with that ID" })
    );
});

module.exports = router;
