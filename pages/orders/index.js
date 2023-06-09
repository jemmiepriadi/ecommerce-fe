import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import style from './order.module.css'
import Navigation from '../../components/nav/navigation';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';

export default class Order extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: {},
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false
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
          <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div className={style.app}>
            <div className={style.details} >
            <div className='row'>
                <div className='col'>
                    sasknsknas
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className={style.big_img}>
                        <img src={'https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg'} alt=""/>
                    </div>
                </div>
               <div className='col'>
                <div className={style.box}>
                    <div className={style.row}>
                    <h2>asncjscas</h2>
                    <span>acs saksac</span>
                    </div>
                    <h3>$</h3>
                    {/* <Colors colors={item.colors} /> */}
                    <p>ascbasbisabasisac</p>
                    <p>csaknscaknsaiks</p>
                    {/* <DetailsThumb images={item.src} tab={this.handleTab} myRef={this.myRef} /> */}
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
                    <Button disabled={this.state.cartCount == 0} className={style.cart} onClick={()=>{}}>Add to cart</Button>
                    </div>
                </div>
               </div>
                
                </div>
            </div>
        </div>
      </div>
    )
  }
}