import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import Navigation from '../../components/nav/navigation';
import AccountModal from '../../components/account';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';

export default class index extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: [{}],
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false,
            showAccountModal: false,
            checkoutInput: {
                firstname: '',
                lastname: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zipcode: '',
            },
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
    
      closeAccountModal = () => {
        this.setState({
          showAccountModal: false
        })
      }
      
      handleChange(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
      }
    
  render() {
    return (
        <div className={styles.container}>
            {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <br />
        <div className="row">

        <div className="col-md-7">
            <div className="card">
                <div className="card-header">
                    <h4>Basic Information</h4>
                </div>
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> First Name</label>
                                <input type="text" name="firstname" onChange={() => {}} value={this.state.checkoutInput?.firstname} className="form-control" />
                                <small className="text-danger">{'error.firstname'}</small>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Last Name</label>
                                <input type="text" name="lastname" onChange={() => {}} value={this.state.checkoutInput?.lastname} className="form-control" />
                                <small className="text-danger">{"error.lastname"}</small>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">   
                                <label> Phone Number</label>
                                <input type="number" name="phone" onChange={() => {}} value={this.state.checkoutInput?.phone} className="form-control" />
                                <small className="text-danger">{'error.phone'}</small>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Email Address</label>
                                <input type="email" name="email" onChange={() => {}} value={this.statecheckoutInput?.email} className="form-control" />
                                <small className="text-danger">{'error.email'}</small>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label> Full Address</label>
                                <textarea rows="3" name="address" onChange={() => {}} value={this.state.checkoutInput?.address} className="form-control"></textarea>
                                <small className="text-danger">{'error.address'}</small>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>City</label>
                                <input type="text" name="city" onChange={() => {}} value={this.state.checkoutInpu?.city} className="form-control" />
                                <small className="text-danger">{'error.city'}</small>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>State</label>
                                <input type="text" name="state" onChange={() => {}} value={this.state.checkoutInput?.state} className="form-control" />
                                <small className="text-danger">{'error.state'}</small>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>Zip Code</label>
                                <input type="text" name="zipcode" onChange={() => {}} value={this.state.checkoutInput?.zipcode} className="form-control" />
                                <small className="text-danger">{'error.zipcode'}</small>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group text-end">
                                <button type="button" className="btn btn-primary mx-1" onClick={ (e) => submitOrder(e, 'cod') }>Place Order</button>
                                <button type="button" className="btn btn-primary mx-1" onClick={ (e) => submitOrder(e, 'razorpay') }>Pay by Razorpay</button>
                                <button type="button" className="btn btn-warning mx-1" onClick={ (e) => submitOrder(e, 'payonline') }>Pay Online</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div className="col-md-5" >
            <table className="table table-bordered" style={{color:'#000', backgroundColor:'white'}}>
                <thead>
                    <tr>
                        <th width="50%">Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {cart.map( (item, idx) => { */}
                        {/* // totalCartPrice += item.product.selling_price * item.product_qty; */}
                        {/* return ( */}
                            <tr key={'idx'}>
                                <td>{'item.product.name'}</td>
                                <td>{'item.product.selling_price'}</td>
                                <td>{'0qty'}</td>
                                <td>{'Rp 1000000'}</td>
                            </tr>
                        {/* ) */}
                    {/* })} */}
                    <tr>
                        <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                        <td colSpan="2" className="text-end fw-bold">{'totalCartPrice'}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        </div>
    </div>
    )
  }
}
