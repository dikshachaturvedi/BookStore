let express = require("express");
let bodyparser = require("body-parser");
let app=express()
app.use(bodyparser)
let Bookcategory = require("../models/Bookcategory");
let fs = require("fs");



let router = express.Router();

// save method is for both inserting and updating , id will be sent blank and then for updating we will send id 
router.post("/save" , async(req,res)=>{

    try{
       

        let body = req.body;
        console.log(body)
        let bookcategory = new Bookcategory();
        if(body.data.id!=""){
            bookcategory = await Bookcategory.findById(body.data.id)
        }
        bookcategory.name= body.data.name;
        bookcategory.srno = body.data.srno;
        let base64image = body.data.image;
        
        if(base64image != "")
        {
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            bookcategory.imagepath = "bookcategories/" + randomname + ".png";
        //    console.log(bookcategory.imagepath )
            fs.writeFile("assets/" + bookcategory.imagepath, base64image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });
        }

        bookcategory.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        })
        
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }


    
});


router.post("/list", async(req, res)=>{
    try{
        
        let bookcategories = await Bookcategory.find();
        res.end(JSON.stringify({status:"success", data:bookcategories}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

// particular id deni hogi
router.post("/get", async(req, res)=>{
    try{
        let body = req.body;
        let bookcategory = await Bookcategory.findById(body.data.id);
        res.end(JSON.stringify({status:"success", data:bookcategory}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

router.post("/delete", async(req, res)=>{
    try{
        let body = req.body;
        await Bookcategory.findByIdAndDelete(body.data.id);
        res.end(JSON.stringify({status:"success"}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});
console.log("yoo")
module.exports = router;