const {User}= require("../models/users");

let currentUser;


function getUsers(){
    return User.find({}) 
    .then (users=>{
            return{
                statusCode:200,
                users:users
            }
    })
}


function addUser(username,password,acno){
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
            return{
                statusCode:400,
                message:"Account already exists"
            }
        }
        const newUser= new User({
            username,password,acno,history:[],balance:0
        });
        newUser.save();

        return {
            statusCode:200,
            message:"Account created successfully"
        }
    })
    //data[username]={username,password,acno,history:[],balance:0};
}

function login(username,password){
    console.log('Login Function in Bank.js.........................')
    return User.findOne({
        username,
        password
    })
    .then (user=>{
        if(user){
            return{
                statusCode:200,
                message:"Logged in successfully"
            }
        }
        return {
            statusCode:400,
            message:"Invalid credentials"
        }
    })
    //data[username]={username,password,acno,history:[],balance:0};
}

function deposit(username,amount){
    console.log('Deposit Function in Bank.js')
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
            user.balance+=amount    
            let bal = user.balance
            user.history.push({
                typeOfTransaction:"Credit",
                amount:amount
            })
            user.save();
            return{
                statusCode:200,balance:bal,message:"Deposit successfull"
            }
        }
        return {
            statusCode:400,
            message:"Invalid Deposit Details"
        }
    })
    //data[username]={username,password,acno,history:[],balance:0};
}

function withdraw(username,amount){
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
			if(amount>user.balance){
				return {statusCode:400,balance:user.balance,message:"Insufficient Account Balance"}
			}
            user.balance-=amount    
            let bal = user.balance
            user.history.push({
                typeOfTransaction:"Debit",
                amount:amount
            })
            user.save();
            return{
                statusCode:200,balance:bal,message:"Withdraw successfull"
            }
        }
        return {
            statusCode:400,
            message:"Invalid Withdraw Details"
        }
    })
}

function getTransactionHistory(username){
    console.log('getTransactionHistory Function in Bank.js')
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
            return{
                statusCode:200,history:user.history,message:"Transaction History Retrieved"
            }
        }
        return {
            statusCode:400,
            message:"Invalid Transaction History"
        }
    })
}

function deleteUser(username){
    console.log('DeleteUser Function in Bank.js')
    return User.findOne({
        username
    })
    .then (user=>{
        if(user){
            user.delete();
            return{
                statusCode:200,
                message:"Deleted user successfully"
            }
        }
        return {
            statusCode:200,
            message:"Deletion Failed"
        }
    })

}

function setCurrentUser(username){
    console.log("Express Bank setCurrentUSer"+username)
    currentUser=username;
}

function getCurrentUser(){
    return currentUser;
}


module.exports={
    getUsers:getUsers,
    addUser:addUser,
    login:login,
    deposit:deposit,
    withdraw:withdraw,
    setCurrentUser:setCurrentUser,
    getCurrentUser:getCurrentUser,
    getTransactionHistory:getTransactionHistory,
    deleteUser:deleteUser
    }