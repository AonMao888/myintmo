const express = require('express');
const ejs = require("ejs");
const app = express();
const {createClient} = require("@supabase/supabase-js");
let url = 'https://ohcbdlnqcgxxolmaeaev.supabase.co';
let key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oY2JkbG5xY2d4eG9sbWFlYWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMTY2MjgsImV4cCI6MjAwOTU5MjYyOH0.g_svOmKl9Xkpf4Sct3jEgeEquTglAcG9p38A9URVgzo';

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
const supabase = createClient(url,key)

//get css file
app.get('/h.css',(req,res)=>{
    res.sendFile(__dirname+'/css/h.css');
})
app.get('/history.css',(req,res)=>{
    res.sendFile(__dirname+'/css/history.css');
})
app.get('/home.css',(req,res)=>{
    res.sendFile(__dirname+'/css/home.css');
})
app.get('/logo',(req,res)=>{
    res.sendFile(__dirname+'/logo.png');
})
app.get('/font',(req,res)=>{
    res.sendFile(__dirname+'/jojar.ttf');
})

//get home page
app.get('/',async(req,res)=>{
    let {data,error} = await supabase.from('user').select('*');
    res.render('home',{
        all:data
    })
})

//get user page
app.get("/u/:id",async(req,res)=>{
    let {data:user,error:uerr} = await supabase.from('user').select().eq('uid',req.params.id);
    let {data:member,error:merr} = await supabase.from('member').select().eq('inviter',req.params.id);
    if(user.length !== 0){
        res.render('user',{
            id:req.params.id,
            user:user,
            member:member
        })
    }else{
        res.send('No user found!')
    }
})

//listen history page
app.get('/:id/history',async(req,res)=>{
    let {data,error} = await supabase.from('history').select().eq('receiver',req.params.id);
    if(data.length !== 0){
        res.render('history',{
            id:req.params.id,
            all:data
        })
    }else{
        res.send('No user payment found!');
    }
})

//listen article page
app.get('/article',(req,res)=>{
    res.sendFile(__dirname+'/html/article.html')
})

//listen setting page
app.get('/setting',(req,res)=>{
    res.sendFile(__dirname+'/html/setting.html')
})

//listen about page
app.get('/about',(req,res)=>{
    res.sendFile(__dirname+'/html/about.html')
})

app.listen(80,()=>{
    console.log("server started with port 80");
})