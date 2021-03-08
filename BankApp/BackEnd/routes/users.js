var express = require('express');
//const bank = require('../services/bank');
var router = express.Router();
var Bank = require('../services/bank');




function authMiddleware(req,res,next){
  console.log("Inside authMiddleware");
  if(req.session.currentUser){
    next();
  }
  else{    
    res.staus(401).send({message:"Please login"});
  }
}
/* GET users listing. */

router.get('/', function(req, res) {
  Bank.getUsers()
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,users:data.users});
  });
});

router.post('/register',function(req, res) {
  let usname=req.body.username;
  let pwd=req.body.password;
  let acno=req.body.acno;
  let confirmpassword=req.body.confirmpassword;
  if(pwd!=confirmpassword){
    res.status(400).send({message:"password and confirm password doesnot match"});
  }
  else{
    Bank.addUser(usname,pwd,acno)
    .then(data=>{
      res.status(data.statusCode).send({message:data.message});
    }) 
  }

})

router.post('/login',function(req, res) {
  console.log("In Login Router");
  let username=req.body.username;
  let password=req.body.password;
  console.log(username);
  console.log(password);
  Bank.login(username,password)
  .then(data=>{
    if(data.statusCode==200){
      req.session.currentUser=username;
    }
    res.status(data.statusCode).send({message:data.message});
  }) 
});


router.post('/deposit',authMiddleware, function(req, res) {
  let usname = req.body.username;
  let amt = Number(req.body.amount);
  console.log('In Router post - Deposit')
  Bank.deposit(usname,amt)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,balance:data.balance});
  }) 

});

router.post('/withdraw',authMiddleware,function(req,res) {
  console.log("In Withdraw");
  let usname = req.body.username;
  let amt = Number(req.body.amount);
  console.log('In Router post - Withdraw')
   Bank.withdraw(usname,amt)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,balance:data.balance});
  }) 
  
});


router.get('/transactionhistory',authMiddleware,function(req,res){
  console.log("In Transaction History");
  let uname=req.session.currentUser;
  Bank.getTransactionHistory(uname)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message,history:data.history});
  }) 
})

router.get('/delete',authMiddleware,function(req,res){
  console.log("In Delete User");
 // let uname=req.session.currentUser;
  Bank.deleteUser(uname)
  .then(data=>{
    res.status(data.statusCode).send({message:data.message});
  }) 
})


module.exports = router;