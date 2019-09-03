const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const async = require("async")
const middleware = require("../../middleware/index");
const { forEach } = require('p-iteration');


// Load User Model
// const News = require('../../models/News');
const User = require('../../models/User');
const ReferManager = require('../../models/ReferManager');




// @route   GET api/news/test
// @desc    Tests news route
// @access  Public
var users,topEarningUsers, topReferred; 
var referred=[], notReferred=[];
var news ;


router.get('/test',(req,res)=>{ res.json({msg:"Dashboard works"})})

router.get('/recent-users', middleware.checkToken,async (req, res) =>
 {
     
     users = await User.find()
     .sort({ joining_date: -1 }).exec().then(users => {return users})
     .catch(err=> res.json("Some Error occured or no user found"));

     return res.json(users);
    
        // var x= await User.find({"joining_date": {"$gte": new Date(2019, 06, 09), "$lt": new Date(2019, 06, 15)}})
});

router.get('/top-referred',middleware.checkToken, async (req,res)=>{
    topReferred = await User.find()
   .sort({ referred_friends: -1 }).exec().then(users => {return users})
   .catch(err=> res.json("Some Error occured or no user found "));
    return res.json(topReferred);
})


router.get('/top-earning', middleware.checkToken,async (req,res)=>{
    topEarningUsers =  await User.find()
    .exec().then(users => {return users})
    .catch(err=> res.json("Some Error occured or no user found"));

    topEarningUsers.sort(function(a,b){
        var t1=0
         a.redeem_history.forEach(history=> t1=t1+history.amount);
        var t2= 0
        b.redeem_history.forEach(history=> t2=t2+history.amount);

        a.total_earning=t1;
        b.total_earning= t2;

        return t2-t1;

    })
    res.json(topEarningUsers)

})



router.get('/refer-list', async (req,res)=>{

    var allUsers= await User.find()
    .sort({ joining_date: -1 }).exec().then(users => {return users})
    .catch(err=> res.json("Some Error occured or no user found"));

    referred=[],notReferred=[];

    // res.json(allUsers)
    // allUsers.forEach(user=>{
    //     if(user.referred_code){
    //         referred.push(user)
    //     }
    //     else{
    //         notReferred.push(user)
    //     }
    // })

     await forEach(allUsers,async(user)=>{
        
        if(user.referred_code){
         await User.findOne({refer_code:user.referred_code})
         .then(found=>{ 
            user.referred_by_name =  found.name;
            user.referred_by_phone = found.phone;
            // console.log(friend.name);
            referred.push(user)
            console.log(referred)
            // callback()

         })

           
        }
        else{
            notReferred.push(user)
        // callback()

        }

    })
    
       
            console.log("@@@")
            // console.log(referred)
            res.json({referred,notReferred})   
        
    

})

router.get("/total-time-spent",middleware.checkToken,async (req,res)=>{
    var allUsers= await User.find()
    .sort({ joining_date: -1 }).exec().then(users => {return users})
    .catch(err=> res.json("Some Error occured or no user found"));
  
    var sum = 0;
    allUsers.forEach(user=>{
      sum+=user.use_time;
    })
  
    res.json({total:sum})
  })

router.get('/top-withdrawal',middleware.checkToken, async (req,res)=>{
     var topWithdrawing =  await User.find()
    .exec().then(users => {return users})
    .catch(err=> res.json("Some Error occured or no user found"));

     topWithdrawing.sort(function(a,b){
        var t1=0
         a.redeem_history.forEach(history=> t1=t1+history.amount);
        var t2= 0
        b.redeem_history.forEach(history=> t2=t2+history.amount);

        a.total_withdrawal= t1;
        b.total_withdrawal= t2;

        return t2-t1;

    })
    res.json(topWithdrawing)

})

// router.get('/news-today',middleware.checkToken,async (req,res)=>{
//      var d = new Date().getDate();
//      var m = new Date().getMonth();
//      var y = new Date().getFullYear();
//      var news= await News.find({"date": {"$gte": new Date(y, m,d)}})
//      res.json(news);
// })

// router.get('/news-month',middleware.checkToken, async (req,res)=>{
//     var d = new Date().getDate();
//     var m = new Date().getMonth();
//     var y = new Date().getFullYear();
//     var news= await News.find({"date": {"$gte": new Date(y, m,0)}})
//     res.json(news);
// })


// router.get('/top-news',middleware.checkToken, async (req,res)=>{
//     var topNews =  await News.find()
//     .sort({ views: -1 }).exec().then(news => {return news})
//     .catch(err=> res.json("Some Error occured or no news found"));

//     res.json(topNews);
// })

router.get('/earnings-recent',middleware.checkToken, async (req,res)=>{
    var allUsers =  await User.find()
    .exec().then(users => {return users})
    .catch(err=> res.json("Some Error occured or no user found"));
    var recentEarnings=[];

    allUsers.forEach(user=>{
        user.credit_history.forEach(history=>{
           var combo= {history,phone:user.phone,name:user.name,user_id:user._id}
           recentEarnings.push(combo);
       })
   })

    recentEarnings.sort(function(a,b){
       
       return b.history.date-a.history.date;

   })
    res.json(recentEarnings);

})


router.get('/redeems-recent',middleware.checkToken,async (req,res)=>{
    var allUsers =  await User.find()
    .exec().then(users => {return users})
    .catch(err=> res.json("Some Error occured or no user found"));
    var recentRedeems=[];

     allUsers.forEach(user=>{
         user.redeem_history.forEach(history=>{
            var combo= {history,phone:user.phone,name:user.name,user_id:user._id}
            recentRedeems.push(combo);
        })
    })

     recentRedeems.sort(function(a,b){
        
        return b.history.date-a.history.date;

    })
    res.json(recentRedeems);

})

router.get("/refermanager", async (req,res)=>{
    var refermanager = await ReferManager.find().then(found=>{return found}).catch(err=>res.json(err))
    res.json(refermanager[0])     
})

router.post("/refermanager/update-amount",async (req,res)=>{
    var refermanager = await ReferManager.find().then(found=>{return found}).catch(err=>res.json(err))

    ReferManager.findByIdAndUpdate(refermanager[0]._id,{redeem_amount:req.body.amount},{new:true})
    .then(updated=>{
        res.json(updated)
    }).catch(err=>{
        res.json(err)
    })
})

router.post("/refermanager/update-time",async (req,res)=>{
    var refermanager = await ReferManager.find().then(found=>{return found}).catch(err=>res.json(err))

    ReferManager.findByIdAndUpdate(refermanager[0]._id,{redeem_time:req.body.time},{new:true})
    .then(updated=>{
        res.json(updated)
    }).catch(err=>{
        res.json(err)
    })
})

router.post("/refermanager/update-earning-time",async (req,res)=>{
    var refermanager = await ReferManager.find().then(found=>{return found}).catch(err=>res.json(err))

    ReferManager.findByIdAndUpdate(refermanager[0]._id,{earning_time:req.body.time},{new:true})
    .then(updated=>{
        res.json(updated)
    }).catch(err=>{
        res.json(err)
    })
})



module.exports = router;
