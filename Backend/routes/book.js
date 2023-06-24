let express = require("express");
let Book = require("../models/Book");
let fs = require("fs");
let bodyparser = require("body-parser");
let app=express()
app.use(bodyparser)

let router = express.Router();
//pcid is foreign key from bookcategory
router.post("/save", async(req, res)=>{
    try{
        let body = req.body;
        let book = new Book();
        if(body.data.id != ""){
            book = await Book.findById(body.data.id);
        }
        book.pcid = body.data.pcid;
        book.name = body.data.name;
        book.description = body.data.description;
        book.specification = body.data.specification;
        book.mrp = body.data.mrp;
        book.price = body.data.price;
       
        book.instock = body.data.instock;
        book.isactive = body.data.isactive;
        let base64image = body.data.image; //hbjhbjb changed
        if(base64image != "")
        {
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base64image = base64image.replace(/^data:image\*;base64,/, "");
            book.imagepath = "books/" + randomname + ".png";
            fs.writeFile("assets/" + book.imagepath, base64image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });
        }
        book.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

router.post("/list", async(req, res)=>{
    try{
        let body = req.body;
        let pcid = body.data.pcid;
        if(pcid == ""){
            let books = await Book.find();
            res.end(JSON.stringify({status:"success", data:books}));
        }
        else{
            let books = await Book.find({pcid : pcid});
            res.end(JSON.stringify({status:"success", data:books}));
        }
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});


router.post("/get", async(req, res)=>{
    try{
        let body = req.body;
        console.log(body)
        let booki = await Book.findById(body.data.id);
        console.log(JSON.stringify({status:"success", data:booki}))
        res.end(JSON.stringify({status:"success", data:booki}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});


router.post("/delete", async(req, res)=>{
    try{
        let body = req.body;
        await Book.findByIdAndDelete(body.data.id);
        res.end(JSON.stringify({status:"success"}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));
    }
});

// router.post("/savevariety", async(req, res)=>{
//     try{
//         let body = req.body;
//         let book = new Book();
//         book = await Book.findById(body.data.id);
//         book.varieties.push(body.data.variety);
//         book.save().then(result=>{
//             res.send(JSON.stringify({status:"success", data:result}));
//         }, err=>{
//             res.send(JSON.stringify({status:"failed", data:err}));
//         });
//     }
//     catch{
//         res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
//     }
// });
// router.post("/deletevariety", async(req, res)=>{
//     try{
//         let body = req.body;
//         let book = new Book();
//         book = await Book.findById(body.data.id);
//         let varieties = [];
//         for(let i = 0; i < book.varieties.length; i++)
//         {
//             if(book.varieties[i].color != body.data.variety.color || book.varieties[i].size != body.data.variety.size)
//             {
//                 varieties.push(book.varieties[i]);
//             }
//         }
//         book.varieties = varieties;
//         book.save().then(result=>{
//             res.send(JSON.stringify({status:"success", data:result}));
//         }, err=>{
//             res.send(JSON.stringify({status:"failed", data:err}));
//         });
//     }
//     catch{
//         res.end(JSON.stringify({status:"failed", data:"Something went wrong"}));        
//     }
// });

module.exports = router;