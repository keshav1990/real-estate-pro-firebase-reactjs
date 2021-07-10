import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Loader from '../layouts/Loader';

import Breadcrumb from '../layouts/Userbreadcrumb';
import Footer from '../layouts/Footer';
import Content from '../sections/profile-listings/Content';
import  { auth } from '../../firebase.js';
import {Redirect} from 'react-router-dom';

class Profilelistings extends Component {
    constructor() {
        super();
        this.state = {
        logoutbutton: ()=>{},
        user:auth.currentUser,
        isRediredt:0
 
        };
       this.state.logoutbutton =  this.logout = this.logout.bind(this); // <-- add this line
    };
    logout() {
        auth.signOut()
          .then(() => {
            this.setState({
              user: null
            });
          });
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
        const {user,logoutbutton,isRediredt} = this.state;
        return   isRediredt==0 ?  
         (
            this.state.user ?  
            <Fragment>
                <MetaTags>
                    <title>Realestate Pro | My Listings</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Breadcrumb logoutbutton={logoutbutton} user={user}/>
                <Content logoutbutton={logoutbutton} user={user} />
                <Footer/>
            </Fragment> : <Loader/>
        ) : <Redirect to="/login" /> ;
    }
}

export default Profilelistings;