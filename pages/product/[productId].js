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
    console.log(productId)
    console.log(Router.query)
    if(localStorage){
      let user = JSON.parse(localStorage.getItem("user"))
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
      let product = this.state.product
      product.Quantity = this.state.cartCount

      let cartData
      let totalCart = 0;
      if(localStorage && JSON.parse(localStorage.getItem("cart"))){
        cartData = JSON.parse(localStorage.getItem("cart"))
        if(cartData){
          // for(let i = 0; i<cartData.Product;i++){
          //   if(cartData[i].ID==product.ID){
              
          //   }
          // }
          let index = cartData.Product.findIndex(element=> element.ID == product.ID)
          if(index>-1){
            cartData.Product[index].Quantity += this.state.cartCount 
          }else{
            cartData.Product.push(product)
          }
        }
        // if(!cartData.Quantity)totalCart = this.state.cartCount
        for(let i = 0; i<cartData.Product.length; i++){

          totalCart+=cartData.Product[i].Quantity
        }
      }else{
        totalCart = this.state.cartCount
      }
      let cart = {
        consumerID: this.state.user ? this.state.user.Consumer.ID : null ,
        Quantity: totalCart,
        Product:[this.state.product]
      }
      if(localStorage){
        localStorage.setItem("cart", JSON.stringify(cartData))
      }
      if(this.state?.user && this.state?.user?.Consumer?.ID){
        await shoppingCartApi.addShoppingCart(cart, {consumerID: this.state?.user?.Consumer?.ID}).then(
          Router.push('/shopping-cart')

        )
        let response = promise?.data
      }

    }catch(e){
      console.log(e)
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
                  {(!this.state?.user || this.state.user.UserType == "consumer") && <Button disabled={this.state.cartCount == 0} className={productStyle.cart} onClick={()=>{this.onSubmit()}}>Add to cart</Button>}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}
