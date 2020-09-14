import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { businessCreate } from '../../api/business'
// import { index } from '../../api/business'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'

class BusinessCreate extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      address: '',
      state: '',
      zipCode: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onBusinessCreate = event => {
    event.preventDefault()

    const { msgAlert, user } = this.props

    businessCreate(this.state, user)
      .then(() => msgAlert({
        heading: 'Added to your contacts!',
        message: messages.businessCreateSuccess,
        variant: 'success'
      }))
      .then(() => this.setState({ name: '', address: '', state: '', zipCode: '' }))
      .catch(error => {
        this.setState({ name: '', address: '', state: '', zipCode: '' })
        msgAlert({
          heading: 'Couldn\'t add this to your contacts. ' + error.message,
          message: messages.businessCreationFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    const { name, address, state, zipCode } = this.state

    return (
      <Layout>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Business Create</h3>
            <Form onSubmit={this.onBusinessCreate}>
              <Form.Group controlId="name">
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter Name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  required
                  name="address"
                  value={address}
                  type="text"
                  placeholder="Address"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control
                  required
                  name="state"
                  value={state}
                  type="text"
                  placeholder="State"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  required
                  name="zipCode"
                  value={zipCode}
                  type="text"
                  placeholder="zipCode"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(BusinessCreate)
