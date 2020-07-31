const express= require('express');
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./Models/contact');
const { request } = require('http');
const port=8000;


const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/assets'));

// To Run The Server
app.listen(port,function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log('Express Server is running');
});
// Normal Text Response From Server
// app.get('/',function(req,res){
//     res.send('Thank God! It Returns');
// });

// For HTML 
// app.get('/',function(req,res){
//     res.send('<h1> This is HTML </h1>');
// });

// Rendering the file
app.get('/',function(req,res){
   
   Contact.find({},function(err,contacts){
       if(err){
           console.log('Error in fetching contacts form db');
           return;

       }
       return res.render('home',{
           title:"ContactList",
           contact_list:contacts
       });
   });
});

app.post('/add_contact',function(req,res){
   Contact.create(
       {
           name:req.body.name,
           phone:req.body.phone
       },
       function(err,newContact){
           if(err){
               console.log('Error');
               return;
           }
           console.log('********',newContact);

           return res.redirect('back');
       });
   });
// String Param
// app.get('/delete-contact/:name/:phone',function(req,res){
    
//     console.log(req.params);
// });
// Query Param
app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });
});