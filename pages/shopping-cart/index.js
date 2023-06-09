import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import style from './cart.module.css'
import Navigation from '../../components/nav/navigation';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';

export default class index extends Component {
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
          <tr style={{borderTop:'1px solid #eaeaea'}}> 
              <td>
                  <figure className="itemside">
                      <div className="aside"><img src="https://b2912710.smushcdn.com/2912710/wp-content/uploads/2021/11/IMAG_12_cover-1024x687.jpg?lossy=1&strip=1&webp=1" style={{maxWidth: '100px'}} className="img-sm" /></div>
                      <figcaption className="info">
                          <a href="#" className="title text-dark">Some name of item goes here nice</a>
                          <p className="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p>
                      </figcaption>
                  </figure>
              </td>
              <td> 
              <ButtonGroup>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount - 1})
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input style={{width:'100%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})}/>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount+1})
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
              <a href="" className="btn btn-light"> Remove</a>
              </td>
          </tr>
          <tr style={{borderTop:'1px solid #eaeaea'}}>
              <td>
                  <figure className="itemside">
                      <div className="aside"><img src="https://www.imagdisplays.co.uk/wp-content/uploads/2021/04/PHOTO-2020-08-13-16-07-05.jpg" style={{maxWidth:"100px"}} className="img-sm" /></div>
                      <figcaption className="info">
                          <a href="#" className="title text-dark">Product name  goes here nice</a>
                          <p className="text-muted small">Size: XL, Color: blue, <br /> Brand: Gucci</p>
                      </figcaption>
                  </figure>
              </td>
              <td> 
              <ButtonGroup>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount - 1})
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input style={{width:'100%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})}/>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount+1})
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </td>
              <td> 
                  <div className="price-wrap"> 
                      <var className="price">$</var> 
                      <small  className="text-muted"> $ each </small>  
                  </div> 
              </td>
              <td className="text-right"> 
              <a href="" className="btn btn-light btn-round"> Remove</a>
              </td>
          </tr>
          <tr>
              <td>
                  <figure className="itemside">
                      <div className="aside"><img src="assets/images/items/3.jpg" className="img-sm" /></div>
                      <figcaption className="info">
                          <a href="#" className="title text-dark">Another name of some product goes just here</a>
                          <p className="small text-muted">Size: XL, Color: blue,  Brand: Tissot</p>
                      </figcaption>
                  </figure>
              </td>
              <td> 
                {/* //total */}
                <ButtonGroup>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount - 1})
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <input style={{width:'100%', textAlign:'center'}} value={this.state.cartCount} type="text" class="form-control" onChange={event => this.setState({cartCount: event.target.value.replace(/\D/,'')})}/>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      this.setState({cartCount: this.state.cartCount+1})
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </td>
              <td> 
                  <div className="price-wrap"> 
                      <var className="price">$</var> 
                      <small className="text-muted"> $ each</small> 
                  </div> 
              </td>
              <td className="text-right"> 
                  <a href="" className="btn btn-light btn-round"> Remove</a>
              </td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}
