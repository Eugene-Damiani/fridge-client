import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { imageIndex } from '../../api/image'

class DisplayImage extends Component {
  constructor () {
    super()
    this.state = {
      uploads: []
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    imageIndex(this.state, user)
      .then(res => this.setState({ uploads: res.data.uploads }))
      .then(() => msgAlert({
        heading: 'Show Index Success',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Item index Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
  // const { name, quantity, price } = this.state
    const uploads = this.state.images.map(upload => (
      <li key={upload._id}>
        <Link to={`/image-index/${upload._id}`}>
          {upload.name}
        </Link>
      </li>
    ))
    return (
      <div>
        {uploads}
      </div>
    )
  }
}

export default withRouter(DisplayImage)
