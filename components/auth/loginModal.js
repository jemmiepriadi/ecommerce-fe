import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import style from './modal.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Field, Form, Formik } from 'formik';


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
  render() {
    return (
        <div className={'d-flex flex-column'} >
                <h3 className={'align-self-center'} style={{'textAlign':'center'}}>Login</h3>
                <div className='align-self-center' style={{width:'300px'}}>
                    <Formik
                        initialValues={{email: '',password: ''}}
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
                    <label>Email</label>
                    <Field
                        name='email'
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

