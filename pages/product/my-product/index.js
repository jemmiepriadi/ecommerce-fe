import React, { Component } from 'react'
import Navigation from '../../../components/nav/navigation';
import RegisterModal from '../../../components/auth/registerModal';
import LoginModal from '../../../components/auth/loginModal';
import { Button, ButtonGroup } from '@mui/material';
import style from './my-product.module.css'
import styles from '../../../styles/Home.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountModal from '../../../components/account';
import ProductModal from '../../../components/product/productModal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as productApi from '../../../constant/apis/product'
import Router from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class MyProduct extends Component {
    constructor(props) {
        super(props);
          this.state = {
            cartCount: 1,
            product:[],
            isSignedIn: false,
            showLoginModal: false,
            showProductModal: false,
            showRegisterModal:false,
            showAccountModal: false,
            page:1,
            user:{},
            totalPage: 1,
            totalRows:1,
            currentProduct:{}
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

      closeProductModal = () => {
        this.setState({
          showProductModal: false
        })
      }
      
      handleChange(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
      }

      componentDidMount = async () =>{
        let sellerID
        if(localStorage){
          let user = JSON.parse(localStorage.getItem("user"))
          this.setState({
            user: user,
          })
          if(user?.UserType != "seller")Router.push('/')
          sellerID = user?.Seller.ID
        }
        try{
          let promise = await productApi .getAllProducts({sellerID: sellerID})
          let response = promise.data.data.data
          this.setState({
            product: response,
            page: promise.data.data.page,
            totalPage: promise.data.data.total_pages,
            totalRows: promise.data.data.total_rows
          })
        }catch(e){
    
        }
      }

      fetchData = async () =>{
        try{
          let page = this.state.page+1
          if(page>this.state.totalPage)return
          const promise = await productApi.getAllProducts({
            sellerID: this.state.user.Seller.ID,
            page:page
          })
          this.setState({
            page: page
          })
          
          const data = promise.data.data?.data
          
          let products = this.state.product
          products = products.concat(data)
          this.setState({
            product:products
          })
        }
        catch(e){
    
        }
      }

      sendProduct = (product) => {
        this.setState({
          currentProduct: product
        })
      }

      deleteProduct = async(product) =>{
        if(window && window.confirm("Are you sure you would like to delete this product?")){
          try{
            let promise = await productApi.deleteProduct({id: product.ID})
            let response = promise.data
            Router.reload()
          }catch(e){
            console.log(e)
          }
        }
      }

  render() {
    return (
        <div className={styles.container}>
        {this.state.showLoginModal &&  <LoginModal show={this.state.showLoginModal} closeLoginModal={this.closeLoginModal}/>}
        {this.state.showRegisterModal &&  <RegisterModal show={this.state.showRegisterModal} closeRegisterModal={this.closeRegisterModal}/>}
        {this.state.showAccountModal &&  <AccountModal user={this.state.user} show={this.state.showAccountModal} closeAccountModal={this.closeAccountModal}/>}
        {this.state.showProductModal &&  <ProductModal user={this.state.user} product={this.state.currentProduct} show={this.state.showProductModal} closeProductModal={this.closeProductModal}/>}
        <Navigation handleChange = {(field, value) => this.handleChange(field, value)} closeLoginModal={this.closeLoginModal}/>
        <div className={style.app}>
        <Button style={{backgroundColor:'transparent', color:'white', marginBottom: '15px'}} onClick={()=>{
          this.setState({
            showProductModal: true
          })
        }} className="btn btn-light"> <AddCircleIcon /> Add new item</Button>
          <div className={style.box}>
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
                    <th scope="col">Product</th>
                    <th scope="col" width="250">Description</th>
                    <th scope="col" width="120">Price</th>
                    <th scope="col" className="text-right" width="200"> </th>
                    
                  </tr>
                </thead>
                <tbody>
                
                {this.state.product?.map(product=>{
                  return(
                  
                      <tr style={{borderTop:'1px solid #eaeaea'}} > 
                        <td>
                            <figure className="itemside">
                                <div className="aside"><img src={product.Image} style={{maxWidth: '100px'}} className="img-sm" /></div>
                                <figcaption className="info">
                                    <p href="#"  style={{color: 'white'}} className="title ">{product.Name}</p>
                                </figcaption>
                            </figure>
                        </td>
                        <td> 
                          <p  style={{color: 'white'}}>{product.Description}</p>
                        </td>
                        <td> 
                            <div className="price-wrap"> 
                                <p style={{color: 'white'}} className="price">${product.Price}</p> 
                            </div> 
                        </td>
                        <td className="text-right"> 
                          <Button style={{backgroundColor:'transparent', color:'white'}} onClick={()=>{
                            this.sendProduct(product)
                            this.setState({
                              showProductModal: true
                            })
                            }} className="btn btn-light"> <EditIcon /></Button>
                        </td>
                        <td style={{color: 'white'}}>
                          <Button style={{backgroundColor:'transparent', color:'white'}} onClick={()=>this.deleteProduct(product)} className="btn btn-light"> <DeleteIcon /></Button>
                        </td>
                      </tr>
                    
                  )
                })}

                </tbody>
              </table>
            </InfiniteScroll>

          </div>
        
        </div>
      </div>
    )
  }
}
