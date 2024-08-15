const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const student = require('../models/student');


router.get('/', (req, res) => {
    res.render('new_page');
});

router.get('/admlogin', (req, res) => {
    res.render('admlogin');
});

router.post('/admlogin', (req, res) => {
    if (req.body.givenUserName === "kravi21" && req.body.givenPassword === "12345") {
        req.app.locals.isAuthenticate = 1;
        res.redirect('/index');
    } else {
        res.send("Invalid Request");
    }
});
router.get('/update',(req,res)=>{
    if(req.app.locals.isAuthenticate==1)
    res.render('update', {data:[],message:""})
    else{
        res.redirect('/')
    }
})
router.get('/index', (req, res) => {
    if (req.app.locals.isAuthenticate === 1) {
        res.render('index');
    } else {
        res.redirect('/');
    }
});

router.get('/add', (req, res) => {
    if (req.app.locals.isAuthenticate === 1) {
        res.render('add');
    } else {
        res.redirect('/');
    }
});

router.post('/add', (req, res) => {
    const data = new Student({
        Roll: req.body.givenRoll,
        Name: req.body.givenName,
        User_ID: req.body.givenUser,
        Branch: req.body.givenBranch,
        Hall: req.body.givenHall,
        Room: req.body.givenRoom,
        Programme: req.body.givenProgramme,
        Gender: req.body.givenGender,
        Blood_Group: req.body.givenBlood_Group,
        Location: req.body.givenLocation,
    });
    data.save()
        .then(() => res.redirect('/add'))
        .catch(err => res.send('Error occurred: ' + err));
});

router.get('/find', (req, res) => {
    res.render('find', { data: [], message: "" });
});

router.post('/find', (req, res) => {
    let query = {};
    if (req.body.givenName) query.Name = req.body.givenName;
    if (req.body.givenRoll) query.Roll = req.body.givenRoll;
    if (req.body.givenUser_ID) query.User_ID = req.body.givenUser_ID;
    if (req.body.givenBranch) query.Branch = req.body.givenBranch;

    Student.find(query, (err, result) => {
        if (err) {
            res.send('Error occurred: ' + err);
        } else {
            let message = `${result.length} results found!`;
            res.render('find', { data: result, message });
        }
    });
});

router.get('/delete', (req, res) => {
    if (req.app.locals.isAuthenticate === 1) {
        res.render('delete', { data: [], message: "" });
    } else {
        res.redirect('/');
    }
});

router.post('/delete', (req, res) => {
    Student.deleteOne({ Roll: req.body.givenRoll }, (err) => {
        if (err) res.send('Error occurred: ' + err);
        else res.redirect('/delete');
    });
});

router.post('/deleteData', (req, res) => {
    let query = {};
    if (req.body.givenRoll) query.Roll = req.body.givenRoll;
    if (req.body.givenName) query.Name = req.body.givenName;

    Student.find(query, (err, result) => {
        if (err) {
            res.send('Error occurred: ' + err);
        } else {
            let message = `${result.length} results found!`;
            res.render('delete', { data: result, message });
        }
    });
});

router.get('/updateMy', (req, res) => {
    if (req.app.locals.isAuthenticate === 1) {
        res.render('update', { data: [], message: "" });
    } else {
        res.render('update_my_login');
    }
});
router.post('/updateMy', (req, res) => {
    Student.find({User_ID:req.body.givenUserName,Roll:req.body.givenPassword},(err,result)=>{
        if(err){
            res.send('error occured');
        }else{
            if(Object.keys(result).length!=0)
          {
            Student.find({Roll:req.body.givenPassword},(err,result)=>{
                res.render('selfUpdate',{data:result,message:""})
            })
          }
            else{
            res.send("No user found");
            }
        }
    })
})
router.post('/selfupdateData',(req,res)=>{
    // console.log(req.body)
    Student.updateOne({Roll:req.body.givenRoll},{Name:req.body.givenName,Roll:req.body.givenRoll,Branch:req.body.givenBranch,User_ID:req.body.givenUser_ID,Programme:req.body.givenProgramme,Hall:req.body.givenHall,Room:req.body.givenRoom,Gender:req.body.givenGender,Blood_Group:req.body.givenBlood_Group,Location:req.body.givenLocation},(err,result)=>{
        console.log(result)
    
    })
    res.redirect('/')
})
router.post('/updateSearch',(req,res)=>{
    if(req.body.givenRoll!==""&&req.body.givenName=="")
    {
    Student.find({Roll:req.body.givenRoll},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}else if(req.body.givenRoll==""&&req.body.givenName!=="")
{
    Student.find({Name:req.body.givenName},(err,result)=>{
        temp=  Object.keys(result).length +" results found!"
        res.render('update',{data:result,message:temp})
    })
}else if(req.body.givenRoll!==""&&req.body.givenName!=="")
{
    Student.find({Name:req.body.givenName,Roll:req.body.givenRoll},(err,result)=>{
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

router.post('/updateData', (req, res) => {
    Student.updateOne(
        { Roll: req.body.givenRoll },
        {
            Name: req.body.givenName,
            Branch: req.body.givenBranch,
            User_ID: req.body.givenUser_ID,
            Programme: req.body.givenProgramme,
            Hall: req.body.givenHall,
            Room: req.body.givenRoom,
            Gender: req.body.givenGender,
            Blood_Group: req.body.givenBlood_Group,
            Location: req.body.givenLocation
        }, (err) => {
            if (err) res.send('Error occurred: ' + err);
            else res.redirect('/update');
        });
});

module.exports = router;