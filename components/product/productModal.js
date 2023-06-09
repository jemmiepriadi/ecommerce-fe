import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'

export default class ProductModal extends Component {
  render() {
    return (
      <Modal>
        <Modal.Header className="d-flex justify-content-between align-items-center">
            <h1 className="title-text">
                Login
            </h1>
            <button onClick={closeLoginModal} className="btn btn-danger">x</button>
        </Modal.Header>
      </Modal>
    )
  }
}
