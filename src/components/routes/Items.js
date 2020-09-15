import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { index } from '../../api/item'
import messages from '../AutoDismissAlert/messages'
import Layout from '../../components/Layout'
// import QRCode from 'react-qrcode-generator'

class Items extends Component {
  constructor () {
    super()
    this.state = {
      items: []
    }
  }
  // handleChange = event => setState({
  //   [event.target.name]: event.target.value
  // })
  componentDidMount () {
    const { user, msgAlert } = this.props
    index(this.state, user)
      .then(res => this.setState({ items: res.data.items }))
      .then(() => msgAlert({
        heading: 'Here\'s your entire inventory!',
        message: messages.itemIndexSuccess,
        variant: 'success'
      }))
      // .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t see your inventory.' + error.message,
          message: messages.itemIndexFailure,
          variant: 'danger'
        })
      })
  }

  render () {
  // const { name, quantity, price } = this.state
    const items = this.state.items.map(item => (
      <tr key={item._id}>
        <td><Link to={`/items/${item._id}`}>{item.name}</Link></td>
      </tr>
    ))
    return (
      <Layout>
        <table>
          <tbody>
            <tr>
              <th scope="col">Items</th>
            </tr>
            {items}
          </tbody>
        </table>
      </Layout>
    )
  }
}

export default withRouter(Items)
