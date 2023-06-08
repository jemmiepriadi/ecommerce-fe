import React, { Component } from 'react'
// import { Nav } from 'react-bootstrap'  
import style from './navigation.module.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Badge } from '@mui/material';
import { NavLink } from 'react-bootstrap';
// import { NavLink } from 'react-bootstrap';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HistoryIcon from '@mui/icons-material/History';

export default class Navigation extends Component {
  render() {
    return (
      <div className={style.header}>
      
      {/* <img
      //   className={style.header__logo}
      //   src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
      // /> */}
    
    <h1 className={` ${style.title}`} style={{marginRight:'10px', color:'#3366CC'}}>
    <a href="/">E-SHOP</a>
    </h1>

    <div className={style.header__search}>
      <input className={style.header__searchInput} type="text" />
      <SearchIcon className={style.header__searchIcon} />
    </div>

    <nav className={style.header__nav}>
      
        <NavLink className={style.header__option}>
          <span className={style.header__optionLineOne}>Hello Guest</span>
          <span className={style.header__optionLineTwo}>Sign In</span>
        </NavLink>
      

      
        <NavLink className={style.header__option}>
          <span className={style.header__optionLineOne}><HistoryIcon /></span>
          <span className={style.header__optionLineTwo}>Orders</span>
        </NavLink>
      
      

      <NavLink className={style.header__option}>
        <span className={style.header__optionLineOne}><PersonAddIcon /></span>
        <span className={style.header__optionLineTwo}>Sign Up</span>
      </NavLink>

      
        <NavLink className={style.header__optionBasket}>
          <Badge badgeContent={2} color='secondary'>
            <ShoppingBasketIcon />
          </Badge>
        </NavLink>
      
    </nav>
  </div>
    )
  }
}
