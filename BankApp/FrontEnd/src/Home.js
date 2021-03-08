import React from 'react';
import swal from 'sweetalert';
import Bank from './Bank';
import { Link } from 'react-router-dom';
import {Formik,Form,Field} from 'formik';
import *as Yup from 'yup';

const depositSchema=Yup.object().shape({
    dpusername:Yup.string()
            .min(2,'Tooo  short')
            .max(10,'Too long')
            .required('Required')
})

const withdrawalSchema=Yup.object().shape({
    wdusername:Yup.string()
            .min(2,'Tooo  short')
            .max(10,'Too long')
            .required('Required')
})

class Home extends React.Component {
    state = {
        dpusername: "",
        dpamount: "",
        wdusername: "",
        wdamount: "",
        balance: ""
    }

    dpUsernameChange = (event) => {
        this.setState({ dpusername: event.target.value });
    }
    dpAmountChange = (event) => {
        this.setState({ dpamount: event.target.value });
    }
    wdUsernameChange = (event) => {
        this.setState({ wdusername: event.target.value });
    }
    wdAmountChange = (event) => {
        this.setState({ wdamount: event.target.value });
    }

    onDeposit = (values) => {
        let uname=values.dpusername;
        let amt=Number(values.dpamount);
        Bank.deposit(uname,amt)
            .then(response=>{
                this.setState({balance:response.data.balance})
                swal("success","Deposit successfull","success")
            })
            .catch(err=>{
                swal("Deposit Failed","U provide invalid Deposit data","error")
            })

    }
    onWithdraw = (values) => {
        let uname = values.wdusername;
        let amt = Number(values.wdamount);
        Bank.withdraw(uname,amt)
        .then(response=>{
            this.setState({balance:response.data.balance})
            swal("success","withdraw successfull","success")
        })
        .catch(err=>{
            swal("withdraw failed","U provide invalid Withdraw data","error")
        })
    }

    render() {
        return (
            <div className="container">
                <h1> Balance:{this.state.balance}</h1>
                <Link to="/history">History</Link>
                <div className="row">
                    <div className="col-6" >
                        {/* <button type="button">Logout</button> */}
                        <div className="jumbotron" >
                            <h3 >DEPOSIT</h3>
                            <Formik
                            initialValues={{
                                dpusername:"",
                                dpamount:""
                            }}
                            validationSchema={depositSchema}
                            onSubmit={this.onDeposit}
                        >
                            {({errors,touched})=>(
                            <Form>
                                <div className="jumbotron" >
                                    <div className="form-group">
                                        <label for="">UserName</label>
                                            <Field name="dpusername" />
                                                {errors.dpusername?<div>{errors.dpusername}</div>:null}
                                    </div>
                                    <div className="form-group">
                                        <label for="">Deposit Amount</label>
                                        <Field name="dpamount"/>
                                        {errors.dpamount?<div>{errors.dpamount}</div>:null}
                                    </div>
                                    <div className="form-group">
										<button type="submit" className="btn btn-success">Deposit</button>
                                    </div>
                                </div>
                            </Form>
                            )}

                        </Formik>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="jumbotron" >
                            <h3 >WITHDRAW</h3>
                            <Formik
                            initialValues={{
                                wdusername:"",
                                wdamount:""
                            }}
                            validationSchema={withdrawalSchema}
                            onSubmit={this.onWithdraw}
                        >
                            {({errors,touched})=>(
                            <Form>
                                <div className="jumbotron" >
                                    <div className="form-group">
                                        <label for="">UserName</label>
                                            <Field name="wdusername" />
                                                {errors.wdusername?<div>{errors.wdusername}</div>:null}
                                    </div>
                                    <div className="form-group">
                                        <label for="">Withdrawal Amount</label>
                                        <Field name="wdamount"/>
                                        {errors.wdamount?<div>{errors.wdamount}</div>:null}
                                    </div>
                                    <div className="form-group">
										<button type="submit" id="log" className="btn btn-success">Withdraw</button>
                                    </div>
                                </div>
                            </Form>
                            )}

                        </Formik>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
