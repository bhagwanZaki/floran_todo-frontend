import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export class Profile extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
    }
    render() {
        const { user } = this.props.auth
        return (
            <div> 
                <h2>Your Profile</h2>  
                <div className="card border-danger mb-3">
                    <div className="card-body">
                        <h5 className="card-title"> {user.username} </h5>
                        <p className="card-text">Email : {user.email}</p>
                    </div>
                </div>
            </div>
                
            
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth,
  })
  
export default connect(mapStateToProps)(Profile)
