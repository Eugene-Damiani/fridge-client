import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { editBusiness } from '../../api/business'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'

class BusinessEdit extends Component {
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

  onBusinessEdit = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    editBusiness(this.props.match.params.id, user, this.state)
      .then(() => msgAlert({
        heading: 'Updated!',
        message: messages.businessEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/businesses-index'))
      .catch(error => {
        this.setState({ name: '', address: '', state: '', zipCode: '' })
        msgAlert({
          heading: 'Business hasn\'t changed! ' + error.message,
          message: messages.BusinessEditFailure,
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
            <h3>Edit Business</h3>
            <Form onSubmit={this.onBusinessEdit}>
              <Form.Group controlId="name">
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter Business Name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address and City</Form.Label>
                <Form.Control
                  name="address"
                  value={address}
                  type="text"
                  placeholder="Address"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="state">
                <Form.Label>state</Form.Label>
                <Form.Control
                  name="state"
                  value={state}
                  type="text"
                  placeholder="State"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="zipCode">
                <Form.Label>ZIP Code</Form.Label>
                <Form.Control
                  name="zipCode"
                  value={zipCode}
                  type="text"
                  placeholder="Zip Code"
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

export default withRouter(BusinessEdit)
