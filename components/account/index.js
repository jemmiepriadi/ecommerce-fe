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
            <table className="table table-borderless table-shopping-cart" >
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope="col">Product</th>
              <th scope="col" className="text-right" width="200">Status</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(order=>{
              return(
                <tr style={{borderTop:'1px solid #eaeaea'}}> 
                    <td>
                        <figure className="itemside">
                            <div className="aside"><img src="https://b2912710.smushcdn.com/2912710/wp-content/uploads/2021/11/IMAG_12_cover-1024x687.jpg?lossy=1&strip=1&webp=1" style={{maxWidth: '100px'}} className="img-sm" /></div>
                            <figcaption className="info">
                                <p href="#" style={{color:'white'}} className="title ">Some name of item goes here nice</p>
                                <p className="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p>
                            </figcaption>
                        </figure>
                    </td>
                    <td> 
                      <p className="text-right text-light">arrived</p>
                    </td>
                </tr>
              )
            })}
          
          <tr style={{borderTop:'1px solid #eaeaea'}}>
              <td>
                  <figure className="itemside">
                      <div className="aside"><img src="https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg" style={{maxWidth:"100px"}} className="img-sm" /></div>
                      <figcaption className="info">
                          <a href="#" className="title text-dark">Product name  goes here nice</a>
                          <p className="text-muted small">Quantity: XL, Color: blue, <br /> Brand: Gucci</p>
                      </figcaption>
                  </figure>
              </td>
              <td> 
              <ButtonGroup>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount - 1})
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input style={{width:'100%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})}/>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount+1})
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </td>
              <td> 
                  <div className="price-wrap"> 
                      <var className="price">$</var> 
                      <small  className="text-muted"> $ each </small>  
                  </div> 
              </td>
              <td className="text-right"> 
              <a href="" className="btn btn-light btn-round"> Remove</a>
              </td>
          </tr>
          <tr>
              <td>
                  <figure className="itemside">
                      <div className="aside"><img src="assets/images/items/3.jpg" className="img-sm" /></div>
                      <figcaption className="info">
                          <a href="#" className="title text-dark">Another name of some product goes just here</a>
                          <p className="small text-muted">Size: XL, Color: blue,  Brand: Tissot</p>
                      </figcaption>
                  </figure>
              </td>
              <td> 
                {/* //total */}
                <ButtonGroup>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount - 1})
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input style={{width:'100%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})}/>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount+1})
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </td>
              <td> 
                  <div className="price-wrap"> 
                      <var className="price">$</var> 
                      <small className="text-muted"> $ each</small> 
                  </div> 
              </td>
              <td className="text-right"> 
                  <a href="" className="btn btn-light btn-round"> Remove</a>
              </td>
          </tr>
          </tbody>
        </table>
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