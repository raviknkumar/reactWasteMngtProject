import React from 'react'
import * as Yup from 'yup';
import {withFormik, Form, Field, ErrorMessage} from 'formik';
import {Button} from 'react-bootstrap'
import Nav from "../components/Nav";
import {validateEmailUrl, createUserUrl} from "../api/EndPoints"
import User from './User.js';
import "./Signup.css"
import axios from "axios";
import {NavLink} from "react-router-dom";

async function validateEmail(email) {

    return axios.post(validateEmailUrl(), {
        email:email
    });/*.then(response =>{
        return response.data;
    }).catch(err=>{console.log(err)});*/
};

function signUp(User){
    axios.post(createUserUrl(),User).then(res=> {
        console.log("Created User..");
    });
}

function Signup(props) {
    let {isSubmitting /*,errors*/} = props;
    return (
        <div>
            <Nav/>
            <div className="white container vertical-center horizontal-center">
                <h4 className={"center"} style={{fontFamily: "Acme",color:"blue"}}>Don't Have An Account, Create One</h4>

                <Form className={"form"}>
                    <div className="input-field col s6">
                        <ErrorMessage name="email" component="div" className="red-text center"/>
                        <i className="material-icons prefix">email</i>
                        <Field id="form_email" name="email" placeholder="Email" type="email" className="autocomplete"/>
                    </div>
                    <div className="row" style={{marginLeft: "5px"}}>
                        <div className="input-field col s6 m6">
                            <ErrorMessage name="first_name" component="div" className="red-text center"/>
                            <i className="material-icons prefix">person</i>
                            <Field id="form_first_name" placeholder="First name" name="first_name" type="text"/>
                        </div>
                        <div className="input-field col s5 m6">
                            <ErrorMessage name="last_name" component="div" className="red-text center"/>
                            <i className="material-icons prefix">person</i>
                            <Field placeholder="Last Name" id="form_last_name" placeholder="Last name" name="last_name" type="text"/>
                        </div>
                    </div>
                    <div className="input-field col s6">
                        <ErrorMessage name="password" component="div" className="red-text center"/>
                        <i className="material-icons prefix">lock</i>
                        <Field id="form_password" name="password" placeholder="Password" type="password"/>
                    </div>
                    <div className="input-field col s6">
                        <i className="material-icons prefix">lock_outline</i>
                        <Field id="form_confirm_password" name="confirm_password" placeholder="Conform Password"  type="password"/>
                    </div>
                    <div className={"center"}>
                        <Button size="small" type="submit" className="roundedSubmit" disabled={isSubmitting}>
                            <i className="material-icons right">send</i> Sign Up
                        </Button>
                    </div>
                </Form>
                <div className={"center"}>
                    <h4 ><NavLink className="blue-text" to={"/login"}> LogIn </NavLink>
                        If you already have an account!
                    </h4>
                </div>
            </div>
        </div>
    )
}

const formikApp = withFormik({
        mapPropsToValues({email, password, first_name, last_name, history}) {
            return {
                email: email || ' ',
                password: '',
                confirm_password: '',
                first_name: first_name || '',
                last_name: last_name || '',
                history: history
            }
        },
        handleSubmit(values, {resetForm, setErrors, setSubmitting}) {

            if (values.password !== values.confirm_password) {
                setErrors({
                    password: 'please confirm your password Again!'
                });
            }
            else
            {
                validateEmail(values.email).then(function (res)
                {
                    if(res.data===false)
                    {
                        setErrors({
                            email: 'emailId already exists!'
                        });
                        console.log(res.data);
                    }
                    else
                    {
                        var user = new User();
                        user.email=values.email;
                        user.firstName = values.first_name
                        user.lastName = values.last_name
                        user.password = values.password
                        user.confirmPassword = values.confirm_password;
                        signUp(user);
                        resetForm(); //data succesfully submitted
                        localStorage.setItem("userName",values.email);
                        values.history.push('/home/index');
                    }
                });
            }
            setSubmitting(false);
        },
    validationSchema:
Yup.object().shape({
    email: Yup.string('email is invalid').required('email is required'),
    password: Yup.string().min(4, 'password must be atleast 4 characters').required('password is required'),
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required')
})
})(Signup);

export default formikApp;
