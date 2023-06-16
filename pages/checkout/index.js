import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import Navigation from '../../components/nav/navigation';
import AccountModal from '../../components/account';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import * as shoppingCartApi from '../../constant/apis/shoppingCart'
import * as orderApi from '../../constant/apis/orders'
import Select from 'react-select';
import Router from 'next/router';
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';

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
            paymentInfo:'',
            payment: '',
            totalPrice:0,
            sellers:[],
            arrData:[],
            checkoutInput: {
                name: '',
                phoneNumber: '',
                email: '',
                address: '',
                city: '',
                state: '',
                zipcode: '',
                payment:'',
                paymentInfo:'',
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
        let sellers=[]
        let arrData = []
        if((getCookie("auth_token") && getCookie("auth_token")!="") && !((jwtDecode(getCookie("auth_token")).exp * 1000 )- 60000 <= Date.now())){
            this.setState({
              isSignedIn:true
            })
          }
          else{
            this.setState({
              isSignedIn:false
            })
        }
        if(localStorage){
            user = JSON.parse(localStorage.getItem("user"))
            if(user?.UserType == "seller"){
                Router.push('/')
            }
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
                    if(!sellers.includes(element.SellerID)){
                        sellers.push(element.SellerID)
                    }
                });

                for(let i = 0; i<sellers.length; i++){
                    arrData.push(cart.Product?.filter(a=>a.SellerID == sellers[i]))
                }
                this.setState({
                    sellers:sellers,
                    cart: cart,
                    product:cart.Product,
                    totalPrice: totalPrice,
                    arrData: arrData
                })
            }
        }

        try{
            if(localStorage && !JSON.parse(localStorage.getItem("cart"))){
                let promise = await shoppingCartApi.getShoppingCart({consumerID: user.Consumer.ID})
                let response = promise.data.data.data[0]
                let product = response.Product
                let totalPrice = 0
                product?.forEach(element => {
                    let price = element.Price * element.Quantity
                    totalPrice+=price
                    if(!sellers.includes(element.SellerID)){
                        sellers.push(element.SellerID)
                    }
                });
                for(let i = 0; i<sellers.length; i++){
                    arrData.push(cart.Product?.filter(a=>a.ID == sellers[i]))
                }
                this.setState({
                    sellers: se,
                    cart: response,
                    product:product,
                    totalPrice: totalPrice,
                    arrData: arrData
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
      
      submitOrder = async () =>{
        let input=[];
        let data = this.state.checkoutInput
        data.name = this.state.name
        data.address = this.state.address
        data.email = this.state.email
        data.city = this.state.city
        data.zipcode = parseInt(this.state.zipcode)
        data.state = this.state.state
        data.status = ""
        data.phoneNumber = this.state.phoneNumber
        data.paymentInfo = parseInt(this.state.paymentInfo)
        data.payment = this.state.payment?.value
        data.consumerID = this.state.user?.Consumer?.ID
        data.Product = []
        let arrData = this.state.arrData

        for(let i = 0; i<arrData.length; i++){
            data.SellerID = arrData[i][0].SellerID
            for(let j = 0; j<arrData[i].length; j++){
                data.Product.push(arrData[i][j])
            }
            input.push(data)
        }
        try{
            const promise = await orderApi.addOrder(input)
            if(localStorage){
                if(JSON.parse(localStorage.getItem("orders"))){
                    input = input.concat(JSON.parse(localStorage.getItem("orders")))
                }
                localStorage.setItem("orders", JSON.stringify(input))
                localStorage.removeItem("cart")
            }
            Router.push('/order-history')
        }catch(e){
            
        }
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
                                    <input type="text" name="name" onChange={(e)=>this.handleChange("name", e.target.value)} value={this.state.name} className="form-control" />
                                    {/* <small className="text-danger">{"error.lastname"}</small> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">   
                                    <label> Phone Number</label>
                                    <input type="number" name="phone" onChange={(e) => {this.handleChange("phoneNumber", e.target.value)}} value={this.state.phoneNumber} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label> Email Address</label>
                                    <input type="email" name="email" onChange={(e) => {this.handleChange("email", e.target.value)}} value={this.state.email} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mb-3">
                                    <label> Full Address</label>
                                    <textarea rows="3" name="address" onChange={(e) => {this.handleChange("address", e.target.value)}} value={this.state.address} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={(e) => {this.handleChange("city", e.target.value)}} value={this.state.city} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>State</label>
                                    <input type="text" name="state" onChange={(e) => {this.handleChange("state", e.target.value)}} value={this.state.state} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group mb-3">
                                    <label>Zip Code</label>
                                    <input type="text" name="zipcode" onChange={(e) => {this.handleChange("zipcode", e.target.value)}} value={this.state.zipcode} className="form-control" />
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
                                <div className="form-group mb-5">
                                    <label>Payment Info(cc number/ gopay/ debit)</label>
                                    <input type="text" name="zipcode" onChange={(e) => {this.handleChange("paymentInfo", e.target.value)}} value={this.state.paymentInfo} className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group text-end">
                                    <button type="button" className="btn btn-primary mx-1" onClick={ () => this.submitOrder() }>Place Order</button>
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
