import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from '../Layout'
import messages from '../AutoDismissAlert/messages'
import { show } from '../../api/business'
import apiUrl from '../../apiConfig'
import axios from 'axios'

class Business extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)

    this.state = {
      // Initially, our business state will be null, until the API request finishes
      business: null,
      // initially this business has not been deleted yet
      deleted: false
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    show(this.props.match.params.id, user)
      .then(res => this.setState({ business: res.data.business }))
      .then(() => msgAlert({
        heading: 'Here you go!',
        message: messages.businessShowSuccess,
        variant: 'success'
      }))
      // .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t seem to find that. ' + error.message,
          message: messages.businessShowFailure,
          variant: 'danger'
        })
      })
  }

  destroyBusiness = (user) => {
    const { msgAlert } = this.props
    axios({
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      url: `${apiUrl}/businesses/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      // update their `deleted` state to be `true`
      // .then(res => this.setState({ business: res.data.business }))
      .then(() => msgAlert({
        heading: 'Business removed!',
        message: messages.businessDeleteSuccess,
        variant: 'success'
      }))
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
      .catch(error => {
        msgAlert({
          heading: 'Failed to remove business.' + error.message,
          message: messages.businessDeleteFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our business property out of state
    const { business, deleted } = this.state

    // if we don't have a business (business is null)
    if (!business) {
      return <p>Loading...</p>
    }

    // if the deleted state is true
    if (deleted) {
      // redirect to the home page
      return <Redirect to={{
        // Redirect to the home page ('/')
        pathname: '/businesses-index',
        // Pass along a message, in state, that we can show
        state: { message: 'Deleted business successfully' }
      }} />
    }

    return (
      <Layout>
        <h4>{business.name}</h4>
        <p>Business: {business.name}</p>
        <p>Address: {business.address}</p>
        <p>State: {business.state}</p>
        <p>ZIP Code: {business.zipCode}</p>
        <button onClick={this.destroyBusiness}>Delete Business</button>
        {/* Add a link to the edit business route when you click the edit button */}
        <Link to={`/businesses-index/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to='/businesses-index'>Back to all businesss</Link>
      </Layout>
    )
  }
}

export default Business
