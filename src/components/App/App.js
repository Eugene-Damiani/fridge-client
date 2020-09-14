import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import Home from '../routes/Home.js'
import ItemCreate from '../routes/ItemCreate'
import ItemEditBootstrapForm from '../routes/ItemEditBootstrapForm.js'
import Items from '../routes/Items'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Item from '../routes/Item'
import BusinessCreate from '../routes/BusinessCreate'
import BusinessIndex from '../routes/BusinessIndex'
import Business from '../routes/Business'
import BusinessEdit from '../routes/BusinessEdit.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">

          {/* Add a home page */}
          {/* 'exact' keeps Home on separate 'page' */}
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/item-create' render={() => (
            <ItemCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id/edit' render={(navProps) => (
            <ItemEditBootstrapForm {...navProps} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items/:id' render={(navProps) => (
            <Item {...navProps} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/items' render={() => (
            <Items msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/business-create' render={() => (
            <BusinessCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/businesses-index' render={() => (
            <BusinessIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/businesses-index/:id/edit' render={(navProps) => (
            <BusinessEdit {...navProps} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/businesses-index/:id' render={(navProps) => (
            <Business {...navProps} msgAlert={this.msgAlert} user={user} />
          )} />

        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
