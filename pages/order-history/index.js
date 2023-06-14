import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import style from './history.module.css'
import Navigation from '../../components/nav/navigation';
import RegisterModal from '../../components/auth/registerModal';
import LoginModal from '../../components/auth/loginModal';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, ButtonGroup } from '@mui/material';
import AccountModal from '../../components/account';
import InfiniteScroll from 'react-infinite-scroll-component';
import Router from 'next/router';
import * as orderApi from '../../constant/apis/orders'
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';
import ProductModalOrder from '../../components/productOrderList/productModalOrder';
export default class index extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            cart: {},
            isSignedIn: false,
            showLoginModal: false,
            showRegisterModal:false,
            showAccountModal: false,
            page:1,
            user:{},
            orders:[],
            status:"",
            totalPage: 1,
            product:{},
            totalRows:1,
            currentProduct:{},
            showProductOrderModal: false
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

      closeProductModalOrder = () => {
        this.setState({
          showProductOrderModal: false
        })
      }
      
      handleChange(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
      }

      componentDidMount = async () => {
        let consumerID
        if(localStorage){
          let user = JSON.parse(localStorage.getItem("user"))
          if(user){
            this.setState({
              user: user,
            })
            if(user?.UserType == "seller")Router.push('/')
            consumerID = user?.Consumer.ID
            try{
              let promise = await orderApi.getOrders({consumerID: consumerID})
              let response = promise.data.data.data
              this.setState({
                orders: response,
                page: promise.data.data.page,
                totalPage: promise.data.data.total_pages,
                totalRows: promise.data.data.total_rows
              })
            }catch(e){
        
            }
          }else if(!getCookie('auth_token')||(getCookie('auth_token') && (jwtDecode(getCookie("auth_token")).exp * 1000 )- 60000 <= Date.now())){
            let orders = localStorage.getItem('orders')
            this.setState({
              orders:orders,
              isSignedIn: false,
            })
          }
        }
      }

      fetchData = async () =>{
        try{
          console.log(this.state.page)
          let page = this.state.page+1
          console.log(page)
          if(page>this.state.totalPage)return
          const promise = await orderApi.getOrders({
            consumerID: this.state.user.Consumer.ID,
            page:page
          })
          this.setState({
            page: page
          })
          
          console.log(promise.data.data)
          const data = promise.data.data?.data
          
          let orders = this.state.orders
          orders = orders.concat(data)
          this.setState({
            orders:orders
          })
        }
        catch(e){
    
        }
      }

  render() {
    return (
        <div className={styles.container}>
        {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal user={this.state.user} show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        {this.state.showProductOrderModal &&  <ProductModalOrder user={this.state.user} product={this.state.product} order={this.state.status} show={this.state.showProductOrderModal} closeProductModalOrder={this.closeProductModalOrder}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div className={style.app}>
            <InfiniteScroll
                    dataLength={this.state.isSignedIn ? this.state.totalRows :this.state.orders.length}
                    next={this.fetchData}
                    hasMore={this.state.page<this.state.totalPage}
                    loader={<p style={{textAlign:'center'}}>Loading...</p>}
                    endMessage={<p style={{textAlign:'center'}}>No more data to load.</p>}
                    >
        <table className="table table-borderless table-shopping-cart" >
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope="col">Product</th>
              <th scope="col" className="text-right" width="200">Status</th>
                <th scope="col" className="text-right" >
                  Date
                </th>
              
            </tr>
          </thead>
          <tbody style={{cursor:'pointer'}}>
            {this.state.orders.map(order=>{
              let date = new Date(order.CreatedAt)
              date = date.toDateString()
              return(
                <tr style={{borderTop:'1px solid #eaeaea'}} onClick={()=>{
                  this.handleChange('showProductOrderModal', true)
                  this.handleChange('product', order.Product)
                  this.handleChange("status", order.Status)
                  }}> 
                    <td >
                        <figure className="itemside">
                            <div className="aside"><img src={order.Product[0].Image} style={{maxWidth: '100px'}} className="img-sm" /></div>
                            <figcaption className="info">
                                <p href="#" style={{color:'white'}} className="title ">{order.Name}</p>
                                <p className="text-muted small"> <br /> </p>
                            </figcaption>
                        </figure>
                    </td>
                    <td> 
                      <p className="text-right text-light">{order.Status == "" ? 'pending' : order.Status == true ? 'accepted' : 'rejected'}</p>
                    </td>
                    <td>
                      <p className="text-right text-light">{date}</p>
                    </td>
                </tr>
              )
            })}
          
          
          </tbody>
        </table>
        </InfiniteScroll>
        </div>
      </div>
    )
  }
}
