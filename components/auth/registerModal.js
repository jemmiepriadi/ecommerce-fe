import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import style from './modal.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Form, Formik } from 'formik';
import * as authApi from '../../constant/apis/auth'
import Router from 'next/router';


export default class RegisterModal extends Component {
  render() {
    const { show, closeRegisterModal} = this.props;
    return (
      <Modal className={style.modal_overlay} show={show}  onHide={closeRegisterModal}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
            <h1 className="title-text">
                Register
            </h1>
            <button onClick={closeRegisterModal} className="btn btn-danger">x</button>
        </Modal.Header>
        <Modal.Body style={{alignItems:'center'}}>
            <Body />
        </Modal.Body>
      </Modal>
    )
  }
}


class Body extends Component {
    
    submit =  async({username, name, address, phoneNumber,userType,password}) => {
        let data = {
            username: username, 
            name: name, 
            address: address, 
            phoneNumber: phoneNumber,
            password: password,
            userType: userType
        }
        try{
            const register = await authApi.register(data)
            const  response= register.data
            Router.reload()
        }catch(e){
            console.error(e)
        }
    }
  render() {
    return (
        <div className={'d-flex flex-column'} >
                <h3 className={'align-self-center'} style={{'textAlign':'center'}}>Register</h3>
                <div className='align-self-center' style={{width:'300px'}}>
                    <Formik
                        initialValues={{username: '', name: '', address: '', phoneNumber: '', userType: 'consumer',password: ''}}
                        onSubmit={this.submit}
                        component={RegisterForm}
                    />
                </div>
        </div>
    )
  }
}

class RegisterForm extends Component {
    
    render(){
        return(
            <Form>
                <div className='form-group'>
                    <label>Username(must be unique)</label>
                    <Field
                        name='username'
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Name</label>
                    <Field
                        name='name'
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Address</label>
                    <Field
                        name='address'
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Phone Number</label>
                    <Field
                        name='phoneNumber'
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
                <div className='form-group'>
                    <label>User type</label>
                    <div>
                    <Field
                        name='userType'
                        as='select'
                        className='form-control'
                        style={{paddingRight:'2em'}}
                    >
                        <option value={'consumer'}>Pembeli</option>
                        <option value={'seller'}>Penjual</option>
                    </Field>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary'>Register</button>
            </Form>
        )
    }
}

