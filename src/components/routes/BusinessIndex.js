import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { businessIndex } from '../../api/business'
import messages from '../AutoDismissAlert/messages'
import Layout from '../../components/Layout'

class Businesses extends Component {
  constructor () {
    super()
    this.state = {
      businesses: []
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    businessIndex(this.state, user)
      .then(res => this.setState({ businesses: res.data.businesses }))
      .then(() => msgAlert({
        heading: 'Business Show Success',
        message: messages.businessIndexSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Item index Failed with error: ' + error.message,
          message: messages.businessIndexFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const businesses = this.state.businesses.map(business => (
      <li key={business._id}>
        <Link to={`/businesses-index/${business._id}`}>
          {business.name}
        </Link>
      </li>
    ))
    return (
      <Layout>
        <h4>Businesses</h4>
        <ul>
          {businesses}
        </ul>
      </Layout>
    )
  }
}

export default withRouter(Businesses)
