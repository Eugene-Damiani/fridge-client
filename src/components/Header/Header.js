import React, { Fragment } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <NavDropdown title="Businesses" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#business-create">Add Business</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#businesses-index">Approved Businesses</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#items">Fridge Items</Nav.Link>
    <Nav.Link href="#item-create">Add Item</Nav.Link>
    <Nav.Link href="#upload-create"> Upload Image</Nav.Link>
    <NavDropdown title="Settings" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    { /* <NavDropdown title="Sign In" id="sign-in-dropdown">
          <form onSubmit={this.onSignIn} className="px-8 py-6">
          <div className="form-group">
             <label>Email address</label>
             <input type="email" className="form-control" placeholder="fridge@fridge.com"/>
          </div>
         <div className="form-group">
           <label>Password</label>
           <input type="password" className="form-control" placeholder="password"/>
         </div>
         <button type="submit" className="btn btn-primary">Sign In</button>
       </form>
     </NavDropdown> */}
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Navbar.Brand href="#">
      Home
    </Navbar.Brand>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="transparent" variant="light" expand="md">
    <Navbar.Brand href="#">
      Fridge
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
