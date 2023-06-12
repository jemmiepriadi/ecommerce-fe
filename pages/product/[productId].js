import React, { Component } from 'react'
import Navigation from '../../components/nav/navigation'
import styles from '../../styles/Home.module.css'
import productStyle from './product.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';
import LoginModal from '../../components/auth/loginModal';
import RegisterModal from '../../components/auth/registerModal';
import AccountModal from '../../components/account';
import Router  from 'next/router';
import * as productApi from '../../constant/apis/product'
import * as shoppingCartApi from '../../constant/apis/shoppingCart'

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cartCount: 1,
        cart: {},
        isSignedIn: false,
        showLoginModal: false,
        showRegisterModal:false,
        product: {},
        user: {}
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

  componentDidMount =async () => {
    const productId = Router.query.productId
    if(localStorage){
      let user = localStorage.getItem("user")
      this.setState({
        user: user,
      })
    }
    try{
      let promise = await productApi.getAllProducts({id: productId})
      let response = promise.data.data.data[0]
      this.setState({
        product: response
      })
    }catch(e){

    }
  }
  onSubmit = async() =>{
    try{
      let cart = {
        ID: 1,
        Quantity: 1,
        ConsumerID: this.state.user ? this.state.user.Consumer.ID : null ,
        Quantity: this.state.cartCount,
        Product:this.state.product
      }
      if(localStorage){
        localStorage.setItem("cart", cart)
      }
      if(this.state?.user && this.state?.user?.Consumer?.ID){
        let promise = await shoppingCartApi.addShoppingCart(cart,{consumerID: this.state.user.consumer.ID})
        let response = promise?.data
      }
    }catch(e){

    }
  }
  render() {
    return (
      <div className={styles.container}>
        {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div>
          <div className={productStyle.app}>
            <div className={productStyle.details} >
              <div className={productStyle.big_img}>
                <img src={this.state.product.Image} alt=""/>
              </div>
              <div className={productStyle.box}>
                <div className={productStyle.row}>
                  <h2>{this.state.product.Name}</h2>
                </div>
                <h3>$ {this.state.product.Price}</h3>
                {/* <Colors colors={item.colors} /> */}
                <div className={productStyle.p}>{this.state.product.Description}</div>

                <ButtonGroup>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount - 1})
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input style={{width:'15%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})}/>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount+1})
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <div>
                  {this.state.cartCount == 0 && <p style={{color: 'red'}}>Minimum Item is 1!</p>}
                  {(!this.state?.user || this.state.user.UserType == "consumer") && <Button disabled={this.state.cartCount == 0} className={productStyle.cart} onClick={()=>{this.onSubmit}}>Add to cart</Button>}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
