import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../AutoDismissAlert/messages'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Upload = props => {
  const [selected, setSelected] = useState(null)
  const [upload, setUpload] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    console.log(event.target.files[0])
    setSelected(event.target.files[0])
  }

  const handleSubmit = (event, user) => {
    event.preventDefault()
    const { msgAlert } = { props }
    setLoading(true)
    const data = new FormData()
    data.append('upload', selected)
    axios({
      url: apiUrl + '/uploads',
      method: 'POST',
      data: data
    })
      .then(res => setUpload(res.data.upload))
      .then(() => setLoading(false))
      .then(() => msgAlert({
        heading: 'Picture Perfect!',
        message: messages.imageUploadSuccess,
        variant: 'success'
      }))
      .catch(console.error)
      .catch(error => {
        msgAlert({
          heading: 'Couldn\'t add this to your inventory. ' + error.message,
          message: messages.ItemCreationFailure,
          variant: 'danger'
        })
      })
  }

  return (
    <div className="upload">
      {upload.url ? (<img className="display-image" alt={upload.url} src={upload.url}/>) : ''}
      {loading ? (<img alt="loading gif" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />) : ''}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.File id="upload-file-input" label="Upload File Here" onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default Upload
