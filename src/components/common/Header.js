import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { logout } from "../../actions/auth";

export class Header extends Component {
  
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  } 
  
  render() {
    const { isAuthenticated} = this.props.auth
        const authLinks = (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className='nav-item'>
                            <button onClick={this.props.logout} className='nav-link btn btn-sm'>Logout</button>

                        </li>
                    </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className='nav-item'>
                            <Link to='/register' className='nav-link'>
                                Register
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/login' className='nav-link'>
                                Login
                            </Link>

                        </li>
                    </ul>
        );
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <h5 className="navbar-brand">Floran Todo</h5>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {isAuthenticated ? authLinks : guestLinks}

                    </div>
                </div>
            </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Header)