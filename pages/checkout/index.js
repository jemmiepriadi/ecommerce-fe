import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import Navigation from '../../components/nav/navigation';
import AccountModal from '../../components/account';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import * as shoppingCartApi from '../../constant/apis/shoppingCart'
import Select from 'react-select';

export default class index extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: {},
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false,
            showAccountModal: false,
            name:'',
            phoneNumber:'',
            email:'',
            address:'',
            city:'',
            state:'',
            zipcode:'',
            totalPrice:0,
            checkoutInput: {
                name: '',
                phone: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zipcode: '',
            },
            user: {},
            product:[],
            payment: ''
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

      componentDidMount = async () => {
        let user
      if(localStorage){
         user = JSON.parse(localStorage.getItem("user"))
        this.setState({
          user: user,
        })

        if(user){
            this.setState({
                name:user.Name,
                phoneNumber:user.PhoneNumber,
                email:user.Email,
                address:user.Address,
            })
        }

        let cart = JSON.parse(localStorage.getItem("cart"))
        let totalPrice = 0
        if(cart){
            cart.Product?.forEach(element => {
                let price = element.Price * element.Quantity
                totalPrice +=price
                console.log(totalPrice)
            });
          this.setState({
            cart: cart,
            product:cart.Product,
            totalPrice: totalPrice
          })
        }
      }

      try{
        if(localStorage && !JSON.parse(localStorage.getItem("cart"))){
          let promise = await shoppingCartApi.getShoppingCart({consumerID: user.Consumer.ID})
          let response = promise.data.data.data[0]
          let product = response.Product
          let totalPrice
          product?.forEach(element => {
            let price = element.Price * element.Quantity
            totalPrice+=price
        });
          this.setState({
            cart: response,
            product:product,
            totalPrice: totalPrice
          })
        }
        
      }catch(e){
        console.log(e)
      }
      }

      handleOptionChange = (data) => {
        this.setState({
            payment: data
        })
      }
      
    
  render() {
    const options = [
        { value: 'debit', label: 'Debit Card' },
        { value: 'credit', label: 'Credit Card' },
        { value: 'gopay', label: 'Gopay' }
    ]
    return (
        <div className={styles.container}>
            {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal user={this.state.user} show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <br />
        <div className="row">

        <div className="col-md-7">
            <div className="card text-dark">
                <div className="card-header">
                    <h4>Basic Information</h4>
                </div>
                <div className="card-body">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label> Name</label>
                                <input type="text" name="name" onChange={(e) => {(e)=>this.handleChange("name", e.target.value)}} value={this.state.name} className="form-control" />
                                {/* <small className="text-danger">{"error.lastname"}</small> */}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">   
                                <label> Phone Number</label>
                                <input type="number" name="phone" onChange={() => {this.handleChange("phoneNumber", e.target.value)}} value={this.state.phoneNumber} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-3">
                                <label> Email Address</label>
                                <input type="email" name="email" onChange={() => {this.handleChange("email", e.target.value)}} value={this.state.email} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label> Full Address</label>
                                <textarea rows="3" name="address" onChange={() => {this.handleChange("address", e.target.value)}} value={this.state.address} className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>City</label>
                                <input type="text" name="city" onChange={() => {this.handleChange("city", e.target.value)}} value={this.state.city} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>State</label>
                                <input type="text" name="state" onChange={() => {this.handleChange("state", e.target.value)}} value={this.state.state} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group mb-3">
                                <label>Zip Code</label>
                                <input type="text" name="zipcode" onChange={() => {this.handleChange("zipcode", e.target.value)}} value={this.state.zipcode} className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group mb-3">
                                <label>Paymant</label>
                                <Select
                                    options={options}
                                    onChange={(e)=>this.handleOptionChange(e)}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group text-end">
                                <button type="button" className="btn btn-primary mx-1" onClick={ (e) => submitOrder(e, 'cod') }>Place Order</button>
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
                    {this.state.product.map(product=>{
                        return(
                            <tr key={product.ID}>
                                <td>{product.Name}</td>
                                <td>{product.Price}</td>
                                <td>{product.Quantity}</td>
                                <td>{product.Price * product.Quantity}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td colSpan="2" className="text-end fw-bold">Grand Total</td>
                        <td colSpan="2" className="text-end fw-bold">$ {this.state.totalPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        </div>
    </div>
    )
  }
}
