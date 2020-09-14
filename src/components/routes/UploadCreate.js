import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { imageCreate } from '../../api/image'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UploadCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: null,
      loading: false,
      upload: ''
    }
  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  handleSubmit = (event, user) => {
    event.preventDefault()
    const { msgAlert } = this.props
    const data = new FormData()
    data.append('upload', this.state.selectedFile)
    imageCreate(this.props.match.params.id, user)
      .then(res => this.setState({ selectedFile: res.data.selectedFile }))
      .then(() => msgAlert({
        heading: 'Here you go!',
        message: messages.itemShowSuccess,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t seem to find that. ' + error.message,
          message: messages.itemShowFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    return (
      <div className="upload">
        {this.state.upload.url ? (<img className="display-image" alt={this.state.upload.url} src={this.state.upload.url}/>) : ''}
        {this.state.loading ? (<img alt="loading gif" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />) : ''}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.File id="upload-file-input" label="Upload File Here" onChange={this.handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">Upload</Button>
        </Form>
      </div>
    )
  }
}

export default withRouter(UploadCreate)
