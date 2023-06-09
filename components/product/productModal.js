import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import style from './productModal.module.css'
import { Field, Form, Formik } from 'formik';

export default class ProductModal extends Component {
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
    const { show, closeProductModal} = this.props;
    return (
      <Modal className={style.modal_overlay} show={show}  onHide={closeProductModal}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
            <h1 className="title-text">
                Login
            </h1>
            <button onClick={closeProductModal} className="btn btn-danger">x</button>
        </Modal.Header>
        <Modal.Body>
            <Body />
        </Modal.Body>
      </Modal>
    )
  }
}

class Body extends Component {
    render() {
      return (
        <div className={'d-flex flex-column'} style={{color: '#000'}} >
              <h3 className={'align-self-center'} style={{'textAlign':'center'}}>Login</h3>
              <div className='align-self-center' style={{width:'300px'}}>
                  <Formik
                      initialValues={{email: '',password: ''}}
                      onSubmit={this.submit}
                      component={ProductForm}
                  />
              </div>
        </div>
      )
    }
  }

class ProductForm extends Component {
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


