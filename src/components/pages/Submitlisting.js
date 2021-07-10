import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Breadcrumb from '../layouts/Breadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/submit-listing/Content';
import  { auth } from '../../firebase.js';
import {Redirect} from 'react-router-dom';
import Loader from '../layouts/Loader';

class Submitlisting extends Component {
    constructor() {
        super();
        this.state = {
        user:auth.currentUser,
        isRediredt:0
 
        };
      
    };

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } else{
            this.setState({
                isRediredt: 1
            });
          }
        });
    };
    componentWillUnmount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } else{
            this.setState({
                isRediredt: 1
            })
          }
        });
    };

    render() {
        const {user,isRediredt} = this.state;
        return   isRediredt==0 ?  
         (
            user ?  
            <Fragment>
                <MetaTags>
                    <title>Realestate Pro | Submit Listing</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb breadcrumb={{pagename:'Submit Listing'}} />
                <Content user={this.state.user}/>
                <Footer/>
            </Fragment>
       : <Loader/>
       ) : <Redirect to="/login" /> ;
    }
}

export default Submitlisting;