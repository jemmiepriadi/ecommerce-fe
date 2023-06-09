import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import style from './order.module.css'
import Navigation from '../../components/nav/navigation';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import { Button, ButtonGroup } from '@mui/material';
import AccountModal from '../../components/account';

export default class Order extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: {},
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false,
            showAccountModal: false,
            accepted: false,
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
  render() {
    return (
      <div className={styles.container}>
        {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
          {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
          {this.state.showAccountModal &&  <AccountModal show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
          <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div className={style.app}>
            <div className={style.details} >
            <div className='row'>
                <div className='col'>
                    <h1>{this.state.accepted == false? 'New Order' : 'Order being proccesed'}</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className={style.big_img}>
                        <img src={'https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg'} alt=""/>
                    </div>
                </div>
               <div className='col'>
                <div className={style.box} style={{whiteSpace:'breakSpaces'}}>
                    <div className={style.row}>
                      <h2>asncjscas</h2>
                      <span>acs saksac</span>
                    </div>
                    <h3>$</h3>
                    <h5><strong>Address</strong></h5>
                    <div className={style.p}>Gang 4 Jalan Pademangan II A No.32, RT.11/RW.6, East Pademangan, North Jakarta City, Jakarta, Indonesia</div>
                    <input style={{width:'15%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})} readOnly/>
                    <div>
                      {this.state.cartCount == 0 && <p style={{color: 'red'}}>Minimum Item is 1!</p>}
                      <Button  className={`${style.cart} `} onClick={()=>{}}>Decline</Button>
                      <Button style={{float: 'right'}} className={style.cart} onClick={()=>{}}>Accept</Button>
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
