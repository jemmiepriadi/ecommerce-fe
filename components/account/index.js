import React, { Component } from 'react'
import style from '../../styles/Home.module.css'
import { Modal } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import * as authApi from '../../constant/apis/auth'

export default class AccountModal extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: {},
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false,
            user:{}
          }
      }

      componentDidMount = async () => {
        if(localStorage){
          let user = JSON.parse(localStorage.getItem("user"))
          console.log(user)
          this.setState({
            user: user
          })
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
    const { show, closeAccountModal} = this.props;
    return (
        <Modal className={style.modal_overlay} show={show}  onHide={closeAccountModal}>
          <Modal.Header className="d-flex justify-content-between align-items-center">
              <h1 className="title-text">
                  Edit Account
              </h1>
              <button onClick={closeAccountModal} className="btn btn-danger">x</button>
          </Modal.Header>
          <Modal.Body style={{alignItems:'center'}}>
              <Body  user={this.props.user}/>
          </Modal.Body>
        </Modal>
    )
  }
}


class Body extends Component {
  constructor(props) {
    super(props);
      this.state = {
        user:this.props.user
      }
  }

  componentDidMount = async() => {
  }
  submit = async ({username, name, address, phoneNumber, password}) =>{
    let user
    if(localStorage){
      user = JSON.parse(localStorage.getItem("user"))
      this.setState({
        user: user
      })
    }
    let data = {
      id: user.UserID,
      username: username, 
      name: name, 
      address: address, 
      phoneNumber: phoneNumber,
      password: password,
      user: user.UserType
    }
    
    try{
      await authApi.register(data)
    }catch(e){

    }
  }
  render() {
    const a = this.state.user.Username
    return (
      <div className={'d-flex flex-column'} style={{color: '#000'}} >
            <h3 className={'align-self-center'} style={{'textAlign':'center'}}>Login</h3>
            <div className='align-self-center' style={{width:'300px'}}>
                <Formik
                    initialValues={{username: a?.toString(), name: this.state.user.Name?.toString(), address: this.state.user.Address, phoneNumber: this.state.user.PhoneNumber,password: ''}}
                    onSubmit={this.submit}
                    component={AccountForm}
                />
            </div>
      </div>
    )
  }
}

class AccountForm extends Component {
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
                <button type='submit' className='btn btn-primary'>Edit Account</button>
            </Form>
        )
    }
}