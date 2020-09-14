// import React, { Component } from 'react'
// import axios from 'axios'
//
// class DisplayImage extends Component {
//   constructor () {
//     super()
//     this.state = {
//       upload: []
//     }
//   }
//
//   formHandler = e => {
//     e.preventDefault()
//     const filename = document.querySelector('#filename').value
//     const generateGetUrl = 'http://localhost:4741/generate-get-url'
//     const options = {
//       params: {
//         Key: filename,
//         ContentType: 'image/jpeg'
//       }
//     }
//     axios.get(generateGetUrl, options).then(res => {
//       const { data: getURL } = res
//       this.setState({ getURL })
//     })
//   };
//
//   handleImageLoaded = () => {
//     this.setState({ message: 'Done' })
//   }
//
//   handleImageError = () => {
//     this.setState({ message: 'Sorry, something went wrong. Please check if the remote file exists.' })
//   }
//
//   render () {
//     const { getURL, message } = this.state
//     return (
//       <React.Fragment>
//         <h1>Retrieve Image from AWS S3 Bucket</h1>
//         <form onSubmit={this.formHandler}>
//           <label> Image name:</label>
//           <input id='filename' />
//           <p>
//             <i>Image name must include the extension, eg. cat.jpeg</i>
//           </p>
//           <button>Load</button>
//         </form>
//         <p>{message}</p>
//         <div>
//           {getURL && (
//             <React.Fragment>
//               <div>
//                 <img
//                   id='show-picture'
//                   src={getURL}
//                   alt='File stored in AWS S3'
//                   onLoad={this.handleImageLoaded}
//                   onError={this.handleImageError}
//                 />
//               </div>
//             </React.Fragment>
//           )}
//         </div>
//       </React.Fragment>
//     )
//   }
// }
//
// export default DisplayImage

// import React, { useState, useEffect } from 'react'
// import Layout from '../Layout'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
//
// const Image = props => {
//   const [upload, setUpload] = useState(null)
//
//   useEffect(() => {
//     axios(`${apiUrl}/uploads/${props.match.params.id}`)
//       .then(res => setUpload(res.data.upload))
//       .catch(console.error)
//   }, [])
//
// return (
//     <Layout>
//       <Link to={`/uploads/${this.props.match.params.id}`}>
//       </Link>
//     </Layout>
//   )
// }
//
// export default Image
