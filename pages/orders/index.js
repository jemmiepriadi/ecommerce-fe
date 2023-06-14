import React, { Component } from 'react'
import styles from '../../styles/Home.module.css'
import style from './orders.module.css'
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ThumbDown } from '@mui/icons-material';

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
        let sellerID
        if(localStorage){
          let user = JSON.parse(localStorage.getItem("user"))
          if(user){
            this.setState({
              user: user,
            })
            if(user?.UserType != "seller")Router.push('/')
            sellerID = user?.Seller.ID
            try{
              let promise = await orderApi.getOrders({sellerID: sellerID})
              let response = promise.data.data.data
              console.log(response)
              this.setState({
                orders: response,
                page: promise.data.data.page,
                totalPage: promise.data.data.total_pages,
                totalRows: promise.data.data.total_rows
              })
            }catch(e){
        
            }
          }else if((jwtDecode(getCookie("auth_token")).exp * 1000 )- 60000 <= Date.now()){
            // let 
          }
        }
      }

      fetchData = async () =>{
        try{
          console.log
          let page = this.state.page+1
          if(page>this.state.totalPage)return
          const promise = await orderApi.getOrders({
            sellerID: this.state.user.Seller.ID,
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

      updateStatus = async (status, id) => {
        let data = {
          status: status
        }
        try{
          await orderApi.updateOrder(data, {id: id})
        }catch(e){

        }
      }

  render() {
    return (
        <div className={styles.container}>
        {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal user={this.state.user} show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        {this.state.showProductOrderModal &&  <ProductModalOrder user={this.state.user} product={this.state.product} show={this.state.showProductOrderModal}  status={this.state.status} closeProductModalOrder={this.closeProductModalOrder}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div className={style.app}>
            <InfiniteScroll
                    dataLength={this.state.totalRows}
                    next={this.fetchData}
                    hasMore={this.state.page<this.state.totalPage}
                    loader={<p style={{textAlign:'center'}}>Loading...</p>}
                    endMessage={<p style={{textAlign:'center'}}>No more data to load.</p>}
                    >
        <table className="table table-borderless table-shopping-cart" >
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope='col'>ID</th>
              <th scope="col">Product</th>
              <th scope="col" className="text-right" width="200">Status</th>
              <th scope='col' className="text-right">
                Date
              </th>
              <th scope="col" className="text-right" >
                Action
              </th>
            </tr>
          </thead>
          <tbody style={{cursor:'pointer'}}>
            {this.state.orders.map(order=>{
              let date = new Date(order.CreatedAt)
              date = date.toDateString()
              return(
                <tr style={{borderTop:'1px solid #eaeaea'}} > 
                <td style={{color:'white'}}>
                  {order.ID}
                </td>
                <td onClick={()=>{
                this.handleChange('showProductOrderModal', true)
                this.handleChange('product', order.Product)
                this.handleChange("status", order.Status)
                }}>
                      <figure className="itemside">
                          <div className="aside"><img src={order.Product[0].Image} style={{maxWidth: '100px'}} className="img-sm" /></div>
                          <figcaption className="info">
                              <p href="#" style={{color:'white'}} className="title ">{order.Name}</p>
                              <p className="text-muted small" style={{color:'white'}}> Address: {order.Address} <br /> </p>
                          </figcaption>
                      </figure>
                  </td>
                  <td onClick={()=>{
                this.handleChange('showProductOrderModal', true)
                this.handleChange('product', order.Product)
                this.handleChange("status", order.Status)
                }}> 
                    <p className="text-right text-light">{order.Status == "" ? 'pending' : order.Status == "accept" ? 'accepted' : 'rejected'}</p>
                  </td>
                  <td> 
                    <p className="text-right text-light">{date}</p>
                  </td>
                  
                  <td scope="col" className="text-right">
                        <Button style={{backgroundColor:'transparent', color:'white'}} onClick={()=>this.updateStatus("accept",order.ID)} className="btn btn-light"> <ThumbUpIcon /> Accept</Button>
                  </td>
                  <td scope="col" className="text-right">
                        <Button style={{backgroundColor:'transparent', borderColor:'red', color:'white'}} onClick={()=>this.deleteProduct("reject",order.ID)} className="btn btn-light"> <ThumbDown /> Reject</Button>
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
