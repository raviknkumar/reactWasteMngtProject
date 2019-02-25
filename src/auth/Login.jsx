import React from 'react'
import * as Yup from 'yup';
import {withFormik, Form, Field, ErrorMessage} from 'formik';
import {NavLink, withRouter} from 'react-router-dom';
import './Login.css'
import Nav from "../components/Nav";
import {Button} from "react-bootstrap";
import { AppUser, createUserUrl} from "../api/EndPoints"
import axios from "axios"
import User from "./User";
import MappleToolTip from "reactjs-mappletooltip"

async function verifyPassword(user) {
    return axios.post(AppUser.baseURL + AppUser.verifyPassword, user);
}

class Login extends React.Component {
    state = {
        type: "password"
    };

    constructor() {
        super();
        this.changeType = this.changeType.bind(this)
    }

    changeType() {
        if (this.state.type === "password")
            this.setState({type: "text"});
        else if (this.state.type === "text")
            this.setState({type: "password"});
    }

    render() {
        let {isSubmitting} = this.props;

        return (
            <div>
                <Nav/>
                <div className="container vertical-center horizontal-center">
                    <h4 center style={{fontFamily: "Acme", color: "green"}}>Make Our Environment Clean And Green</h4>
                    <div className="white form">
                        <Form>
                            <div className="input-field col s6 text">
                                <ErrorMessage name="email" component="div" className="red-text center"/>
                                <i className="material-icons prefix">email</i>
                                <Field id="form_email" name="email" type="email" className="autocomplete col s5"/>
                                <label className={"floatingLabel"} htmlFor="form_email">Email</label>
                            </div>

                            <div className="col s6">
                                <ErrorMessage name="password" component="div" className="red-text center"/>
                                <i className="material-icons prefix">lock</i>
                                <Field style={{width: "90%",marginLeft:"20px"}} id="form_password" name="password"
                                       placeHolder="Enter Password" type={this.state.type}/>
                                <abbr title={"View Password"}>
                                        <i className="fas fa-eye fa-lg" style={{marginLeft: "10px"}} onClick={this.changeType}/>
                                </abbr>
                            </div>

                            <div className={"center"}>
                                <Button type="submit" variant={"outline-success"} disabled={isSubmitting} size="small"
                                        className={"roundedSubmit"}>
                                    <b>Login</b> <i className="fa fa-sign-in-alt"/>
                                </Button>
                            </div>
                        </Form>
                    </div>
                    <div className={"center"}>
                        <h4>Don't have an account?
                            <NavLink className="blue-text" to={"/signup"}> SignUp</NavLink>
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

const formikApp = withFormik({
    mapPropsToValues({email, password, history}) {
        return {
            email: email || ' ',
            password: password || '',
            history: history,
        }
    },
    handleSubmit(values, {resetForm, setErrors, setSubmitting}) {

        let user = new User();
        user.email = values.email;
        user.password = values.password;

        verifyPassword(user).then(function(res){
                if (res.data === false) {
                    setErrors({
                        email: 'emailId or Password is correct!'
                    });
                }
                else {
                    resetForm();
                    localStorage.setItem('userName', values.email);
                    values.history.push("/home");
                }
            })
        setSubmitting(false);
    },
            validationSchema
    :
        Yup.object().shape({
            email: Yup.string('email is invalid').required('email is required'),
            password: Yup.string().min(4, 'password must be atleast 4 characters').required('password is required')
        })
    })(Login);

export default withRouter(formikApp);
