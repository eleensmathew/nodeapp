const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blogs')
//express app
const app= express();

const dbURI="mongodb+srv://eleena:eleena@blognode.yttzmby.mongodb.net/blog-node?retryWrites=true&w=majority"
mongoose.connect(dbURI,{useUnifiedTopology: true })  //help to receive cleaner data otherwise receive it as undefined.
    .then((result) => app.listen(3000))
    .catch((err)=> console.log(err));
//register view engine
app.set('view engine','ejs');//automaitically looks in views 
//app.set('views','myviews');//to search in myviews instead


app.use(express.static('public')); //setting up static files location
app.use(express.urlencoded({extended:true}));  
app.use(morgan('dev'));

// app.use((req,res,next)=>{
//     console.log('new req made: ');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     next();//so we can move down 
// })
// app.use((req,res,next)=>{
//     console.log('next middleware ');
//     next();//so we can move down 
// })
app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title:'mew Blog',
        snippet:'hhe',
        body:'tooooooooooooo'
    });
    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
});
app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});
app.get('/single-blog',(req,res)=>{
    Blog.findById('')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
})
app.get('/',(req,res)=>{
    //res.send('<p> home page</p>');
    //res.sendFile('./views/index.html',{ root:__dirname });//absolute path
    // const blogs=[
    //     {title:'Eleena is amazing', snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    //     {title:'Eleena is not amazing',snippet:'Lorem ipsum dolor sit amet, consectetur adipiscing elit'},
    // ];
    //res.render('index',{title:'Home',blogs});
    res.redirect('/blogs');
});
app.get('/about',(req,res)=>{
    //res.send('<p> about page</p>');
    //res.sendFile('./views/about.html',{ root:__dirname });
    res.render('about',{title:'About'});
});
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1})//descing order 
        .then((result)=>{
            res.render('index',{title:'All BLogs',blogs:result })
        })
        .catch((err)=>{
            console.log(err);
        })
})
app.post('/blogs',(req,res)=>{
    console.log(req.body);
    const blog=new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
});
app.get('/about-us',(req,res)=>{ //also automatically set the status code
    res.redirect('/about');
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'create'});
});
app.get('/blogs/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    Blog.findById(id)
    .then(result=>{
        res.render('details',{blog:result,title:'Blog details'});
    })
    .catch(err=>{
        console.log(err);
    })
})
app.delete('/blogs/:id',(req,res)=>{
    const id=req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect: '/blogs'})
    })
    .catch(err=>{
        console.log(err);
    })
})
app.use((req,res)=>{ //we put 404 at the end of the routes simillar to default case of switch
    //res.statusCode(404).sendFile('./views/404.html',{ root:__dirname });
    res.status(404).render('404',{title:'404'});
});