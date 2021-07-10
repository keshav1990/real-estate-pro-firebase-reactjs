import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Userbreadcrumb extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            logoutbutton: props.logoutbutton
        }
    }
	
    componentWillReceiveProps({user,logoutbutton}) {
    this.setState({...this.state,user});
    this.setState({...this.state,logoutbutton});
    // popup();
    }
    render() {
        return (
            <div className="subheader subheader-2 user-subheader bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/subheader-2.jpg)" }}>
                <div className="container">
                    <div className="media">
                        <img src={this.state.user.photoURL} alt="agent" />
                        <div className="media-body">
                            <h3 className="text-white">{this.state.user.displayName}</h3>
                            <span className="user-email">{this.state.user.email}</span>
                        </div>
                        <Link to="/submit-listing" className="btn-custom secondary mr-0">Submit Listing <i className="fas mr-0 fa-plus" /> </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Userbreadcrumb;