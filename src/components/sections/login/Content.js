import React, { Component } from 'react';
import Slider from 'react-slick';
import firebase, { auth, provider } from '../../../firebase.js';
import {Redirect} from 'react-router-dom';

const images = [
    { img: 'assets/img/coming-soon/1.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/2.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    { img: 'assets/img/coming-soon/3.jpg', title: "Quote of the day", text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
];

class Content extends Component {

    constructor() {
        super();
        this.state = {
          username: '',
          password: '',
          user: null 
        };
        this.googleLogin = this.googleLogin.bind(this); // <-- add this line
    }
    googleLogin() {
        auth.signInWithPopup(provider) 
          .then((result) => {
            const user = result.user;
            this.setState({
              user
            });
          });
      }
      componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user });
          } 
        });
    };
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            dots: true,
            dotsClass: "d-flex slick-dots",
        }
        return   this.state.user ?  <Redirect to="/" /> :
          (
            <div className="acr-auth-container">
                <div className="acr-auth-content">
                    <form method="post">
                        <div className="auth-text">
                            <h3>Login / Signup Into Real Estate Pro</h3>
                         </div>
                       
                        <div className="social-login">
                            <button type="button" onClick={() => this.googleLogin()} className="acr-social-login google"><i className="fab fa-google" /> Continue with Google</button>
                        </div>
                       </form>
                </div>
                <div className="acr-auth-bg">
                    <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
                        {images.map((item, i) => (
                            <div key={i}>
                                <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} >
                                    <div className="acr-auth-quote">
                                        <h6>{item.title}</h6>
                                        <p>{item.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Content;