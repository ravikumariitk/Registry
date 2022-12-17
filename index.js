const { Template } = require('ejs');
let express = require('express')
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://Ravi_Kumar:Ravi%40123@cluster0.bnkfpnx.mongodb.net/?retryWrites=true');
}
let app = express();
app.set('view engine', "ejs")
app.use('/static', express.static('static'))
app.get('/', (req, res) => {
    res.render('index')
})
app.use(express.urlencoded())
app.get('/add', (req, res) => {
    res.render('add')
})
const kittySchema = new mongoose.Schema({
    Name: String,
    Roll: String,
    Userid: String,
    Branch: String
});

const Kitten = mongoose.model('StudentData', kittySchema);
app.post('/add', (req, res) => {

    const data = new Kitten(
        {
            Name: req.body.givenName,
            Roll: req.body.givenRoll,
            Userid: req.body.givenUser,
            Branch: req.body.givenBranch
        });
    data.save()
    res.redirect('/add');
})
app.get('/find', (req, res) => {
    res.render('find',{data:[],message:""})
})
app.post('/find', (req, res) => {
    if (req.body.givenName !== '' && req.body.givenRoll == '' && req.body.givenUser == '' && req.body.givenBranch == '') {
        Kitten.find({ Name: req.body.givenName }, (err, result) => {
           temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
        })
    }
    else if (req.body.givenName == '' && req.body.givenRoll !== '' && req.body.givenUser == '' && req.body.givenBranch == '') {
        Kitten.find({ Roll: req.body.givenRoll }, (err, result) => {
            temp=  Object.keys(result).length +" results found!"
            res.render('find',{data:result,message:temp})
        })
    } else if (req.body.givenName == '' && req.body.givenRoll == '' && req.body.givenUser !== '' && req.body.givenBranch == '') {
        Kitten.find({ Userid: req.body.givenUser }, (err, result) => {
            temp=  Object.keys(result).length +" results found!"
            res.render('find',{data:result,message:temp})
        })
    } else if (req.body.givenName == '' && req.body.givenRoll== '' && req.body.givenUser == '' && req.body.givenBranch !== '') {
        Kitten.find({ Branch: req.body.givenBranch }, (err, result) => {
            temp=  Object.keys(result).length +" results found!"
            res.render('find',{data:result,message:temp})
        })
        
    }
    else if(req.body.givenName!=='' &&req.body.givenRoll!=='' &&req.body.givenUser=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({Name:req.body.givenName,  Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll=='' &&req.body.givenUser!=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({Name:req.body.givenName,  Userid:req.body.givenUser},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll=='' &&req.body.givenUser=='' &&req.body.givenBranch!='' )
   {
    Kitten.find({Name:req.body.givenName,  Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   } else if(req.body.givenName=='' &&req.body.givenRoll!=='' &&req.body.givenUser!=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({Roll:req.body.givenRoll,Userid:req.body.givenUser},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName=='' &&req.body.givenRoll!=='' &&req.body.givenUser=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({Roll:req.body.givenRoll,Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName=='' &&req.body.givenRoll=='' &&req.body.givenUser!=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({Userid:req.body.givenUser,Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll!=='' &&req.body.givenUser!=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({ Name:req.body.givenName, Roll:req.body.givenRoll,Userid:req.body.givenUser},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }else if(req.body.givenName!=='' &&req.body.givenRoll!=='' &&req.body.givenUser=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({ Name:req.body.givenName, Roll:req.body.givenRoll,Branch:req.body.givenBranch},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName!=='' &&req.body.givenRoll=='' &&req.body.givenUser!=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({ Name:req.body.givenName, Branch:req.body.givenBranch,Userid:req.body.givenUser},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }
   else if(req.body.givenName=='' &&req.body.givenRoll!=='' &&req.body.givenUser!=='' &&req.body.givenBranch!=='' )
   {
    Kitten.find({ Branch:req.body.givenBranch, Roll:req.body.givenRoll,Userid:req.body.givenUser},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('find',{data:result,message:temp})
      })
   }else if(req.body.givenName=='' &&req.body.givenRoll=='' &&req.body.givenUser=='' &&req.body.givenBranch=='' )
   {
    Kitten.find({},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
           res.render('find',{data:result,message:temp})
      })
   }
})
app.get('/delete',(req,res)=>{
    res.render('delete',{data:[],message:""})
})
app.post('/delete',(req,res)=>{
    Kitten.deleteOne({Roll:req.body.givenRoll},(err,result)=>{
        // console.log(result)
       
    })
    res.redirect('/delete')
})
app.post('/deleteData',(req,res)=>{
    if(req.body.givenRoll!==""&&req.body.givenName=="")
    {
    Kitten.find({Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
else if(req.body.givenRoll==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
else if(req.body.givenRoll!==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName,Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
else{
    Kitten.find({},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('delete',{data:result,message:temp})
    })
}
})
app.get('/update',(req,res)=>{
    res.render('update', {data:[],message:""})
})
app.post('/updateData',(req,res)=>{
    // console.log(req.body)
    Kitten.updateOne({Roll:req.body.givenRoll},{Name:req.body.givenName,Roll:req.body.givenRoll,Branch:req.body.givenBranch,Userid:req.body.givenUser},(err,result)=>{
        console.log(result)
    
    })
    res.redirect('/update')
})
app.post('/updateSearch',(req,res)=>{
    if(req.body.givenRoll!==""&&req.body.givenName=="")
    {
       
    Kitten.find({Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}else if(req.body.givenRoll==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}else if(req.body.givenRoll!==""&&req.body.givenName!=="")
{
    Kitten.find({Name:req.body.givenName,Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}
else{
 
     Kitten.find({},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}
})
app.listen(80, () => {
    console.log("the server is running at port 80")
})