const fs= require('fs');
const http=require('http');

const server=http.createServer((req,res)=>{
    console.log(req.url,req.method);
    res.setHeader('Content-Type', 'text/html');

    let path='./views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='index.html';
            res.statusCode = 200;
            break;
        case '/about-me':

            res.statusCode = 301;//redirect page
            res.setHeader('Location','/about');
            res.end();
        default:
            path+='404.html';
            res.statusCode = 404;
            break;
    }


    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            //res.write(data);
            
            res.end(data);
        }
    });
});
server.listen(3000,'localhost',()=>{
    console.log('listening on port');
})