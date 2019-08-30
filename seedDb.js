var mongoose = require("mongoose"),
    User = require("./models/User"),
    News = require("./models/News"),
    Employ = require("./models/Employ")
    ReferManager = require("./models/ReferManager")

var data = [
    {headline : "clouds rest" ,author:"author 1", description: "bloah blah blah", tags:["tag 1","tag 2", "tag 3"],category:["cat A","cat B","cat C"],photo_download_url :"https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg?maxwidth=1200&maxheight=1200&autorotate=false"}
   , {headline : "sky high" ,author:"author 2", description: "its sky descriptoion",tags:["tag 5","tag 4", "tag 3"],category:["cat D","cat C"],photo_download_url :"https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg?maxwidth=1200&maxheight=1200&autorotate=false"}
   , {headline : "ccolt steels" ,author:"author 3", description: "colt steele", tags:["tag 7","tag 6", "tag 5"],category:["cat A","cat E","cat C"],photo_download_url :"https://www.nps.gov/maca/planyourvisit/images/MapleSpringsCampground-Campsite.jpg?maxwidth=1200&maxheight=1200&autorotate=false"}

];
var user = {name: "Daphnis", email:"daphnis@gmail.com",age:29,refer_code:"daph123", state:"delhi", city:"West delhi",gender:"female",phone:9999999999,device_id:"moto 2011"
            ,use_time:10,active_time:9,total_news_read:4,refer_friend_earning_time:0,total_ads_clicked:6,total_ads_viewed:4,total_app_usage_time:12,total_ad_time:7,total_earnings:300
            ,credit_history:[{amount:200,status:"complete"},{amount:100,status:"complete"}],redeem_history:[{amount:250,status:"complete"},{amount:50,status:"complete"}]
        }

var employ = {name: "employ 1", email:"employ@gmail.com",state:"haryana", city:"gurugram",gender:"male",salary:"102500",phone:9716822108,isSuper:true}
 var refermanager = {redeem_amount : 25, redeem_time: 36000};

function seedDB(){
    ReferManager.create(refermanager,(err,created)=>{
        if(err){
            console.log(err)
        } else{
            console.log("refermanager created with id "+ created._id )
        }
    })
    // data.forEach(function(seed){
    //     News.create(seed,function(err,news){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("added a news : "+news._id);
                
    //         }
    //     });
    // }); 
    // User.create(user,function(err,user){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("added a user: " + user._id)
    //     }
    // })

    // Employ.create(employ,function(err,employ){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log("added a employ: " + employ._id)
    //     }
    // })
}

module.exports = seedDB;