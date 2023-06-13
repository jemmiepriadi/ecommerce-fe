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
         user = JSON.parse(localStorage.getItem("user"))
        this.setState({
          user: user,
        })

        let cart = JSON.parse(localStorage.getItem("cart"))
        this.setState({
          cart: cart,
          product:cart.Product
        })
      }
      try{
        if(localStorage && !JSON.parse(localStorage.getItem("cart"))){
          let promise = await shoppingCartApi.getShoppingCart({consumerID: user.Consumer.ID})
          let response = promise.data.data.data[0]
          console.log(response)
          this.setState({
            cart: response,
            product:response.Product
          })
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
        <div className={style.app}>
          <Button onClick={()=>{console.log(this.state.product)}} style={{backgroundColor:'transparent', color:'white', marginBottom: '15px'}} className="btn btn-light"> <ShoppingCartCheckoutIcon /> Checkout</Button>
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
                                console.log(this.state.product)
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
                                console.log(this.state.product)
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </Button>
                          </ButtonGroup>
                        </td>
                        <td> 
                            <div className="price-wrap"> 
                                <var className="price">$</var> 
                                <small className="text-muted"> $ </small> 
                            </div> 
                        </td>
                        <td className="text-right"> 
                          <Button style={{backgroundColor:'transparent', color:'white'}} className="btn btn-light"> <DeleteIcon /></Button>
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
