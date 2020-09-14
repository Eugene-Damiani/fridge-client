import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

// import { editItem } from '../../api/item'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'
import ItemForm from '../../components/ItemForm'
import Layout from '../../components/Layout'

class ItemEdit extends Component {
  constructor () {
    super()

    this.state = {
      item: {
        name: '',
        quantity: '',
        price: ''
      },
      // Initially, the item has not been updated, we will redirect when it has been updated:
      updated: false
    }
  }

  componentDidMount () {
    axios(`${apiUrl}/items/${this.props.match.params.id}`)
      .then(res => this.setState({ item: res.data.item }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedItem = Object.assign({}, prevState.item, updatedField)

      return { item: editedItem }
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { msgAlert } = this.props

    axios({
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      url: `${apiUrl}/items/${this.props.match.params.id}`,
      method: 'PATCH',
      data: { item: this.state.item }
    })
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Item updated!',
        message: messages.itemEditSuccess,
        variant: 'success'
      }))
      .catch(error => {
        this.setState({ name: '', quantity: '', price: '' })
        msgAlert({
          heading: 'Item hasn\'t changed! ' + error.message,
          message: messages.ItemEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { item, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/items/${this.props.match.params.id}`} />
    }

    return (
      <Layout>
        <ItemForm
          item={item}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/items/${this.props.match.params.id}`}
        />
      </Layout>
    )
  }
}

export default withRouter(ItemEdit)
