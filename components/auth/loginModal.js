import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import style from './modal.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import * as authApi from '../../constant/apis/auth'
import  Router  from 'next/router';
import { setCookie } from 'cookies-next';

export default class LoginModal extends Component {
  render() {
    const { show, closeLoginModal} = this.props;
    return (
      <Modal className={style.modal_overlay} show={show}  onHide={closeLoginModal}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
            <h1 className="title-text">
                Login
            </h1>
            <button onClick={closeLoginModal} className="btn btn-danger">x</button>
        </Modal.Header>
        <Modal.Body style={{alignItems:'center'}}>
            <Body />
        </Modal.Body>
      </Modal>
    )
  }
}


class Body extends Component {
    constructor(props) {
        super(props);
          this.state = {
            PhoneNumber:"",
            Address:""
          }
      }
    submit = async ({username,password}) => {
        let data = {
            username: username,
            password: password  
        }
        try {
            const login = await authApi.login(data)
            const responseToken = login.data?.token
            const user = login?.data?.user;
            if(responseToken)setCookie('auth_token',responseToken);
            if (localStorage) {
                if(user){
                    localStorage.setItem('user',JSON.stringify(user))
                    localStorage.setItem('username', user.Username)
                }
                if(!localStorage.getItem("address") && (user.Address && user.Address != ""))localStorage.setItem('address', user.Address)
                if(!localStorage.getItem("phoneNumber") && (user.PhoneNumber && user.PhoneNumber != ""))localStorage.setItem('phoneNumber', user.PhoneNumber)
            }
            window.alert('Login successfull')
            Router.reload()
        } catch (e) {
             console.log(e)
        }
    }
  render() {
    return (
        <div className={'d-flex flex-column'} >
                <h3 className={'align-self-center'} style={{'textAlign':'center'}}>Login</h3>
                <div className='align-self-center' style={{width:'300px'}}>
                    <Formik
                        initialValues={{username: '',password: ''}}
                        onSubmit={this.submit}
                        component={LoginForm}
                    />
                </div>
        </div>
    )
  }
}

class LoginForm extends Component {
    render(){
        return(
            <Form>
                <div className='form-group'>
                    <label>Username</label>
                    <Field
                        name='username'
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <div>
                    <Field
                        name='password'
                        type={'password'}
                        className='form-control'
                        style={{paddingRight:'2em'}}
                    />
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>Login</button>
            </Form>
        )
    }
}

