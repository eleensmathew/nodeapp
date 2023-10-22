const fs=require('fs');

// //read
// fs.readFile('./docs/read.txt',(err,data) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(data.toString());
// });

// //write
// fs.writeFile('./docs/read.txt','no fool' ,()=>{
// });
// fs.appendFile('./docs/read.txt','no aa non poop' ,()=>{
// });

// if(!fs.existsSync('./docs/reada')){
//     fs.mkdir('docs/reada',(err)=>{
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log('create');
//         }
//     })
// }
// if (fs.existsSync('./docs/read.txt')){
//     fs.unlink('./docs/read.txt',(err)=>{
//         if (err){
//             console.log(err);
//         }
//         console.log('file deleted');
//     })
// }

const readStream=fs.createReadStream('./docs/read.txt');
const writeStream=fs.createWriteStream('./docs/write.txt');
// readStream.on('data',(chunk)=>{
//     console.log('____NEW CHUNK___');
//     console.log(chunk.toString());
//     writeStream.write('NEW CHUNK');
//     writeStream.write(chunk);

// })

//piping
readStream.pipe(writeStream);//does exact same thing as above