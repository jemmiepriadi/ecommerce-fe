import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import style from './cart.module.css'
import Navigation from '../../components/nav/navigation';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountModal from '../../components/account';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import * as productApi from '../../constant/apis/product'
import * as shoppingCartApi from '../../constant/apis/shoppingCart'
import Router from 'next/router';

export default class index extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cartCount: 1,
        cart: {},
        user:{},
        isSignedIn: false,
        showLoginModal: false,
        showRegisterModal:false,
        showAccountModal: false,
        product:[]
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
      let user
      if(localStorage){
         user = localStorage.getItem("user")!=null ? JSON.parse(localStorage.getItem("user")): null
        this.setState({
          user: user,
        })

        if(user){
          if(user.UserType == "seller"){
            Router.push('/')
          }
        }

        let cart = localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")) : null
        if(cart){
          this.setState({
            cart: cart,
            product:cart.Product
          })
        }
      }
      try{
        if(localStorage && !JSON.parse(localStorage.getItem("cart"))){
          let promise = await shoppingCartApi.getShoppingCart({consumerID: user.Consumer.ID})
          let response = promise.data.data.data[0]
          this.setState({
            cart: response,
            product:response.Product
          })
        }
        
      }catch(e){
        console.log(e)
      }
    }

    updateCart = async() => {
      let cartData = this.state.cart
      if(cartData){
        let quantity = 0
        cartData.Product.forEach(product => {
          quantity+=product.Quantity
        });
        cartData.Quantity = quantity
        if(localStorage){
          localStorage.setItem("cart", JSON.stringify(cartData))
        }
        if(this.state.user && this.state.user?.UserType == "consumer"){
          let promise = await shoppingCartApi.addShoppingCart(cartData, {consumerID: this.state?.user?.Consumer?.ID})
          let response = promise.data
        }
      }
    }
    
    deleteProduct = async(product) =>{
      if(window && window.confirm("are you sure you want to delete this")){
        try{
          let cart=this.state.cart;
          let promise = await shoppingCartApi.deleteProductCart({id: product.ID})
          let response = promise.data
          if(localStorage){
            let index = cart.Product.findIndex(element=> element.ID==product.ID)
            if(index>-1){
              cart.Quantity-=cart.Product[index].Quantity
              cart.Product.splice(index, 1)
            }
  
            localStorage.setItem("cart",JSON.stringify(cart))
            Router.reload()
          }
        }catch(e){
          console.log(e)
        }
      }
    }

    // checkout = async() => {
    //   let cartData = this.state.cart
    //   try{

    //   }catch(e){

    //   }
    // }
  
  render() {
    return (
      <div className={styles.container}>
        {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal user={this.state.user} show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div className={style.app}>
          <Button onClick={()=>{Router.push('/checkout')}} style={{backgroundColor:'transparent', color:'white', marginBottom: '15px'}} className="btn btn-light"> <ShoppingCartCheckoutIcon /> Checkout</Button>
            <div className={style.box}>
            <table className="table table-borderless table-shopping-cart" >
              <thead className="text-muted">
                <tr className="small text-uppercase">
                  <th scope="col">Product</th>
                  <th scope="col" width="120">Quantity</th>
                  <th scope="col" width="120">Price</th>
                  <th scope="col" className="text-right" width="200"> </th>
                </tr>
              </thead>
              <tbody>
              {this.state.product.map(product =>{
                  return (
                    <tr style={{borderTop:'1px solid #eaeaea'}}> 
                        <td>
                            <figure className="itemside">
                                <div className="aside"><img src={product.Image} style={{maxWidth: '100px'}} className="img-sm" /></div>
                                <figcaption className="info">
                                    <a href="#" className="title text-light">{product.Name}</a>
                                    <p className="text-muted small">Quantity: {product.Quantity}, Color: blue, <br /> Brand: Gucci</p>
                                </figcaption>
                            </figure>
                        </td>
                        <td> 
                        <ButtonGroup>
                            <Button
                              disabled={product.Quantity == 1}
                              aria-label="increase"
                              onClick={() => {
                                this.setState({cartCount: this.state.cartCount - 1})
                                product.Quantity-=1
                                this.updateCart()
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </Button>
                            <input style={{width:'100%', textAlign:'center'}} value={product.Quantity} type="text" class="form-control" onChange={event =>
                               {this.setState({cartCount: event.target.value.replace(/\D/,'')})
                               product.Quantity =  event.target.value.replace(/\D/,'')
                              }
                               }/>
                            <Button
                              aria-label="increase"
                              onClick={() => {
                                
                                this.setState({cartCount: this.state.cartCount+1})
                                product.Quantity+=1
                                this.updateCart()
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </td>
                        <td> 
                            <div className="price-wrap"> 
                                <div className="price text-light">$ {product.Quantity * product.Price}</div> 
                                <small className="text-muted"> $ {product.Price} each </small> 
                            </div> 
                        </td>
                        <td className="text-right"> 
                          <Button style={{backgroundColor:'transparent', color:'white'}} onClick={()=>this.deleteProduct(product)} className="btn btn-light"> <DeleteIcon /></Button>
                          <figcaption className="info">
                          </figcaption>
                        </td>
                    </tr>
                  )
               })
              }
              
              </tbody>
            </table>
            </div>
        
        </div>
      </div>
    )
  }
}
