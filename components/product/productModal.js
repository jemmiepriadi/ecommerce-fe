import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import style from './productModal.module.css'
import { Field, Form, Formik } from 'formik';
import * as productApi from '../../constant/apis/product'
import Router from 'next/router';

export default class ProductModal extends Component {
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
    const { show, closeProductModal, createOrUpdate, product, user} = this.props;
    return (
      <Modal className={style.modal_overlay} show={show}  onHide={closeProductModal}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
            <h1 className="title-text">
                {product.ID !=null ?"Update product" : 'Create Product'}
            </h1>
            <button onClick={closeProductModal} className="btn btn-danger">x</button>
        </Modal.Header>
        <Modal.Body>
            <Body user={user} product={product}/>
        </Modal.Body>
      </Modal>
    )
  }
}

class Body extends Component {
    render() {
      return (
        <div className={'d-flex flex-column'} style={{color: '#000'}} >
              <h3 className={'align-self-center'} style={{'textAlign':'center'}}>{this.props.product.ID !=null ?"Update product" : 'Create Product'}</h3>
              <div className='align-self-center' style={{width:'300px'}}>
                  <ProductForm user={this.props.user} product={this.props.product} handleChange={(fn, vl)=>{this.handleChange(fn, vl)}} submit={()=>{this.submit()}}/>
              </div>
        </div>
      )
    }
  }

class ProductForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name: this.props.product.Name,
        description: this.props.product.Description, 
        price: this.props.product.Price,
        image:''
      }
  }

  handleChange(fieldName, value) {
    this.setState({
        [fieldName]: value,
    })
  }
  
   getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object') formData.append(key, object[key])
      else formData.append(key, JSON.stringify(object[key]))
    })
    return formData;
}
  submit= async(e)=>{
    try{
      let data = {
        name: this.state.name,
        description: this.state.description,
        price: parseInt(this.state.price),
        sellerID: this.props.user.Seller.ID
      }
      const formData = new FormData()
        formData.append("name", this.state.name)
        formData.append("description", this.state.description)
        formData.append("price",  parseInt(this.state.price)),
        formData.append('sellerID', this.props.user.Seller.ID)
        formData.append('image', this.state.image)
      //update
      if(this.props.product.ID){
        await productApi.updateProduct(formData,{id: this.props.product.ID})
      }else{
        await productApi.uploadProduct(formData)
      }
    }catch(e){
      console.log(e)
    }
  }
    render(){
        return(
            <form action={'/api/product/create'} method="POST" encType="multipart/form-data">
                <div className='form-group '>
                    <label>Product Name</label>
                    <input
                        value={this.state.name}
                        name='name'
                        type='text'
                        className='form-control'
                        onChange={e=>this.handleChange("name",e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Description</label> 
                    <div>
                    <input
                        name='description'
                        type={'text'}
                        value={this.state.description}
                        className='form-control'
                        style={{paddingRight:'2em'}}
                        onChange={e=>this.handleChange("description",e.target.value)}
                    />
                    </div>
                </div>
                <div className='form-group'>
                    <label>Price</label> 
                    <div>
                    <input
                        name='price'
                        type={'text'}
                        value={this.state.price}
                        className='form-control'
                        style={{paddingRight:'2em'}}
                        onChange={e=>this.handleChange("price",e.target.value)}
                    />
                    </div>
                </div>
                <div className='form-group'>
                    <label>Image</label> 
                    <div>
                    <input
                        name='image'
                        type={'file'}
                        className='form-control'
                        style={{paddingRight:'2em'}}
                        onChange={e=>this.handleChange("image",e.currentTarget.files[0])}
                    />
                    </div>
                </div>
                <Button disabled={!this.state.price || !this.state.description || !this.state.name || !this.state.image}  className='btn btn-primary' onClick={()=>{
                  this.submit()
                  Router.reload()
                }}>Submit</Button>
            </form>
        )
    }
}


