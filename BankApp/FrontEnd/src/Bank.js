import axios from 'axios';
const baseUrl = "http://localhost:4000";

class Bank{

    static login(username,password){ 
        alert(username+password);      
        return axios.post(baseUrl+"/users/login",{
            username,
            password
        }, { withCredentials:true })
    }

    static registration(username,password,confirmpassword,acno){
        return axios.post(baseUrl+"/users/register",{
            username,
            password,
            confirmpassword,
            acno
        })
    }

    static deposit(username,amount){
        return axios.post(baseUrl+"/users/deposit",{
            username,
        amount
        },{withCredentials:true })
    }

    static withdraw(username,amount){
        return axios.post(baseUrl+"/users/withdraw",{
            username,
        amount
        },{withCredentials:true })
    } 

    static history(){
        return axios.get(baseUrl+"/users/transactionhistory",            
        {withCredentials:true })
    }

    static getUsers(){
        return axios.get(baseUrl+"/users",{withCredentials:true })
    }
    
    static deleteUser(){
        return axios.get(baseUrl+"/users/delete",{withCredentials:true })
    }
    
    /*
    static currentUser="";
    static getUsers(){
      
        return data;
    }
    static saveData(){
        localStorage.setItem("data",JSON.stringify(data));
    }
   static getAccountDetails(){
        
        return data;
    }
    static setCurrentUser(username){
        localStorage.setItem("currentUser",username);    
    }

    static getCurrentUser(){
        return localStorage.getItem("currentUser");
              
    }
    static addUser(username,password,acno){
        data[username] = {username,password,acno,history:[],balance:0};
        Bank.saveData();
    }
    static getHistory(){
        return data[Bank.getCurrentUser()].history;
    }
   static deleteUser(username)
   {
       delete data[username];
   }
   */

}

export default Bank;