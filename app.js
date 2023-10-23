const express=require('express');
//express app
const app= express();
app.listen(3000);
app.get('/',(req,res)=>{
    //res.send('<p> home page</p>');
    res.sendFile('./views/index.html',{ root:__dirname });//absolute path
});
app.get('/about',(req,res)=>{
    //res.send('<p> about page</p>');
    res.sendFile('./views/about.html',{ root:__dirname });
});
app.get('/about-us',(req,res)=>{ //also automatically set the status code
    res.redirect('/about');
});
app.use((req,res)=>{ //we put 404 at the end of the routes simillar to default case of switch
    res.statusCode(404).sendFile('./views/404.html',{ root:__dirname });
});