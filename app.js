const express=require('express');
//express app
const app= express();

//register view engine
app.set('view engine','ejs');//automaitically looks in views 
//app.set('views','myviews');//to search in myviews instead

app.listen(3000);
app.get('/',(req,res)=>{
    //res.send('<p> home page</p>');
    //res.sendFile('./views/index.html',{ root:__dirname });//absolute path
    const blogs=[
        {title:'Eleena is amazing', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
        {title:'Eleena is not amazing',snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    ];

    res.render('index',{title:'Home',blogs});
});
app.get('/about',(req,res)=>{
    //res.send('<p> about page</p>');
    //res.sendFile('./views/about.html',{ root:__dirname });
    res.render('about',{title:'About'});
});
app.get('/about-us',(req,res)=>{ //also automatically set the status code
    res.redirect('/about');
});
app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'create'});
});
app.use((req,res)=>{ //we put 404 at the end of the routes simillar to default case of switch
    //res.statusCode(404).sendFile('./views/404.html',{ root:__dirname });
    res.status(404).render('404',{title:'404'});
});