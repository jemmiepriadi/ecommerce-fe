import React, { Component } from 'react'
// import { Nav } from 'react-bootstrap'  
import style from './navigation.module.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge } from '@mui/material';
import { Button, NavLink } from 'react-bootstrap';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { FolderCopyTwoTone } from '@mui/icons-material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { deleteCookie, getCookie } from 'cookies-next';
import LogoutIcon from '@mui/icons-material/Logout';
import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import Search from '../../pages/search';
import { Navigate } from 'react-router-dom';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cartCount: 0,
        isSignedIn: false,
        showLoginModal: false,
        showRegisterModal:false,
        showAccountModal: false,
        name: "",
        user:{},
        cart:{}
      }
  }
  closeLoginModal = () => {
    this.setState({
      showLoginModal: false
    })
  }
  
  componentDidMount = () => {
    let token = getCookie("auth_token")
      if((token && token!="") && !((jwtDecode(getCookie("auth_token")).exp * 1000 )- 60000 <= Date.now())){

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
      if(localStorage.getItem("user")){
        let user = JSON.parse(localStorage.getItem("user"))
        this.setState({
          user: user
        })
      }
      
      if(localStorage.getItem("cart")){
        let cart = JSON.parse(localStorage.getItem("cart"))
        this.setState({
          cart: cart
        })
        if(cart){
          let quantity = 0
          cart.Product.forEach(product => {
            quantity+=product.Quantity
          });
          this.setState({
            cartCount: quantity
          })
        }
      }
    }
  }

  handleChange(fieldName, value) {
    this.setState({
        [fieldName]: value,
    })
  }

  logout = () => {
    if(window.confirm("Are you sure to logout?")){
      deleteCookie("auth_token")
      if(localStorage){
        localStorage.removeItem("user")
      }
    }
    Router.push('/')
    return
  }

  search = async() => {
        window.location.href='/search?name='+this.state.name
  }
  
  render() {
    return (
      <div style={{position: 'sticky', top: '0'}}>
        <div className={style.header}>
            <h1 className={` ${style.title}`} style={{marginRight:'10px', color:'#3366CC'}}>
              <a href="/">E-SHOP</a>
            </h1>
            <div className={style.header__search}>
              <input className={style.header__searchInput} type="text" onKeyDown={(event)=>{if(event.key=='Enter'){this.search()}}} onChange={e=>this.handleChange("name", e.target.value)} />
              <Button className={style.header__searchIcon} onClick={()=>this.search()}>
                <SearchIcon  />
              </Button>
            </div>

            <nav className={style.header__nav}>
              
              {!this.state.isSignedIn&& <NavLink className={style.header__option} onClick={() => this.props.handleChange("showLoginModal", true)}>
                <span className={style.header__optionLineOne}><AccountCircleIcon /></span>
                <span className={style.header__optionLineTwo}>Sign In</span>
              </NavLink>}
              
              {this.state.isSignedIn && this.state.user?.UserType == 'consumer' && <NavLink href='/order-history' className={style.header__option}>
                <span className={style.header__optionLineOne}><HistoryIcon /></span>
                <span className={style.header__optionLineTwo}>Order History</span>
              </NavLink>}

              {this.state.isSignedIn && this.state.user?.UserType == 'seller'  && <NavLink href='/orders' className={style.header__option}>
                <span className={style.header__optionLineOne}><AssignmentIcon /></span>
                <span className={style.header__optionLineTwo}>Orders</span>
              </NavLink>}
              
              {this.state.isSignedIn && this.state.user?.UserType == 'seller' && <NavLink href='/product/my-product' className={style.header__option} >
                <span className={style.header__optionLineOne}><InventoryIcon /></span>
                <span className={style.header__optionLineTwo}>My Products</span>
              </NavLink>}

              {!this.state.isSignedIn && <NavLink className={style.header__option} onClick={()=>this.props.handleChange("showRegisterModal", true)}>
                <span className={style.header__optionLineOne}><PersonAddIcon /></span>
                <span className={style.header__optionLineTwo}>Sign Up</span>
              </NavLink>}

              {this.state.isSignedIn && <NavLink  className={style.header__option} onClick={() => this.props.handleChange("showAccountModal", true)}>
                <span className={style.header__optionLineOne}><ManageAccountsIcon /></span>
                <span className={style.header__optionLineTwo}>Account</span>
              </NavLink>}
              
            
              { this.state.user?.UserType !='seller' && <NavLink href='/shopping-cart' className={style.header__optionBasket}>
                <Badge badgeContent={this.state.cartCount} color='secondary'>
                  <ShoppingBasketIcon />
                </Badge>
              </NavLink>}
              
              {this.state.isSignedIn && <NavLink  className={style.header__option} onClick={() => {this.logout()}}>
                <span className={style.header__optionLineOne}><LogoutIcon /></span>
                <span className={style.header__optionLineTwo}>Logout</span>
              </NavLink>}

            </nav>
          </div>
      </div>
      
    )
  }
}
