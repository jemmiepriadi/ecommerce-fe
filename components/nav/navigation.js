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

export default class Navigation extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cartCount: 0,
        isSignedIn: false,
        showLoginModal: false,
        showRegisterModal:false,
        showAccountModal: false
      }
  }
  closeLoginModal = () => {
    this.setState({
      showLoginModal: false
    })
  }
  render() {
    return (
      <div style={{position: 'sticky', top: '0'}}>
        <div className={style.header}>
            <h1 className={` ${style.title}`} style={{marginRight:'10px', color:'#3366CC'}}>
              <a href="/">E-SHOP</a>
            </h1>
            <div className={style.header__search}>
              <input className={style.header__searchInput} type="text" />
              <Button className={style.header__searchIcon}>
                <SearchIcon  />
              </Button>
            </div>

            <nav className={style.header__nav}>
              
              <NavLink className={style.header__option} onClick={() => this.props.handleChange("showLoginModal", true)}>
                <span className={style.header__optionLineOne}><AccountCircleIcon /></span>
                <span className={style.header__optionLineTwo}>Sign In</span>
              </NavLink>
              
              <NavLink href='/order-history' className={style.header__option}>
                <span className={style.header__optionLineOne}><HistoryIcon /></span>
                <span className={style.header__optionLineTwo}>Order History</span>
              </NavLink>

              <NavLink href='/orders' className={style.header__option}>
                <span className={style.header__optionLineOne}><AssignmentIcon /></span>
                <span className={style.header__optionLineTwo}>Orders</span>
              </NavLink>
              
              <NavLink href='/product/my-product' className={style.header__option} >
                <span className={style.header__optionLineOne}><InventoryIcon /></span>
                <span className={style.header__optionLineTwo}>My Products</span>
              </NavLink>

              <NavLink className={style.header__option} onClick={()=>this.props.handleChange("showRegisterModal", true)}>
                <span className={style.header__optionLineOne}><PersonAddIcon /></span>
                <span className={style.header__optionLineTwo}>Sign Up</span>
              </NavLink>

              <NavLink  className={style.header__option} onClick={() => this.props.handleChange("showAccountModal", true)}>
                <span className={style.header__optionLineOne}><ManageAccountsIcon /></span>
                <span className={style.header__optionLineTwo}>Account</span>
              </NavLink>
              
            
              <NavLink href='/shopping-cart' className={style.header__optionBasket}>
                <Badge badgeContent={2} color='secondary'>
                  <ShoppingBasketIcon />
                </Badge>
              </NavLink>
              
            </nav>
          </div>
      </div>
      
    )
  }
}
