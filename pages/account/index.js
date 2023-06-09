import React, { Component } from 'react'
import style from '../../styles/Home.module.css'
import styles from './account.module.css'
import { Modal } from 'react-bootstrap';
import Navigation from '../../components/nav/navigation';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import { Field, Form, Formik } from 'formik';

export default class Account extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: {},
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false
          }
      }
      closeLoginModal = () => {
        this.setState({
          showLoginModal: false
        })
      }
    
      closeRegisterModal = () => {
        this.setState({
          showRegisterModal: false
        })
      }
      
      handleChange(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
      }
  render() {
    return (
        <div className={style.container}>
          {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
          {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
          <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
            <div className={`${style.main} ${styles.app}`} style={{color:'#000'}}>
                <Body />
            </div>
            {/* <Modal show={true}></Modal> */}
        </div>
    )
  }
}


class Body extends Component {
  render() {
    return (
        <div className={'d-flex flex-column'} >
                <h3 className={'align-self-center'} style={{'textAlign':'center'}}>Account</h3>
                <div className='align-self-center' style={{width:'500px', justifyContent:'center'}}>
                    <Formik
                        initialValues={{name: '',address: ''}}
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
                <div className='form-group '>
                    <label>Name</label>
                    <Field
                        name='name'
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='form-group'>
                    <label>Phone Number</label> 
                    <div>
                    <Field
                        name='phoneNumber'
                        type={'text'}
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