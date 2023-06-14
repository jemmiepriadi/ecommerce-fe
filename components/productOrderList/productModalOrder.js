import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import style from './productModal.module.css'
import { Field, Form, Formik } from 'formik';
import * as productApi from '../../constant/apis/product'
import Router from 'next/router';
import { ButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default class ProductModalOrder extends Component {
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

      componentDidMount = () =>{
      }
  render() {
    const { show, closeProductModalOrder, createOrUpdate, product, user} = this.props;
    return (
      <Modal className={style.modal_overlay} show={show}  onHide={closeProductModalOrder}>
        <Modal.Header className="d-flex justify-content-between align-items-center">
            <h1 className="title-text">
                Product Order list
            </h1>
            <button onClick={closeProductModalOrder} className="btn btn-danger">x</button>
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
              <table className="table table-borderless table-shopping-cart" >
          <thead className="text-muted">
            <tr className="small text-uppercase">
              <th scope="col">Product</th>
              <th scope="col" className="text-right" width="200">Status</th>
              <th scope="col" className="text-right" width="200">Price</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.state.} */}
            {this.props.product?.map(productData=>{
                return(
                    <tr style={{borderTop:'1px solid #eaeaea'}}> 
                        <td>
                            <figure className="itemside">
                                <div className="aside"><img src={productData.Image} style={{maxWidth: '100px'}} className="img-sm" /></div>
                                <figcaption className="info">
                                    <p href="#"  className="title ">{productData.Name}</p>
                                    <p className="text-muted small"> Quantity: {productData.Quantity} pcs <br /> </p>
                                </figcaption>
                            </figure>
                        </td>
                        <td> 
                            <p className="text-right ">arrived</p>
                        </td>
                        <td> 
                            <p className="text-right ">${productData.Price}</p>
                        </td>
                        <td> 
                            {/* <p className="text-right ">arrived</p> */}
                        </td>
                    </tr>
                )
            })}
          
          </tbody>
        </table>
        </div>
      )
    }
  }

