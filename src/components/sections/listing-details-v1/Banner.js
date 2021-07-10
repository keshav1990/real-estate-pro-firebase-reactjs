import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';


class Banner extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
		this.state = {
            currentListing: props.dataLisitng
        };
    }
	
	
componentWillReceiveProps({dataLisitng}) {
	
	this.setState({
            currentListing: dataLisitng
        })
  //this.setState({...this.state,dataLisitng});
   //popup();
}
  
	
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
        }
		const {currentListing} = this.state;
        return (
		
            <div className="banner banner-2 slider-no-padding">
                <div className="banner-item">
                    <Slider className="banner-slider" ref={c => (this.slider = c)} {...settings}>
                        {currentListing.listinggallery ?  currentListing.listinggallery.map((item, i) => (
                            <div key={i}>
                                <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + item + ")" }} />
                            </div>
                        )) : 
                        <div>
                                <div className="banner-inner bg-cover bg-center dark-overlay" style={{ backgroundImage: "url(" + currentListing.listimg + ")" }} />
                            </div> 
                        }
                    </Slider>
                    <div className="acr-listing-details">
                        <div className="acr-listing-section">
                            <div className="acr-listing-nav">
                                <Link to="#" className="btn-custom secondary">Print Listing</Link>
                            </div>
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-section-price">
                                    <span>Price</span>
                                    <h3>${currentListing.monthlyprice}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <h4> {currentListing.title} </h4>
                                <div className="acr-listing-icons">
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-bedroom" />
                                        <span>Beds</span>
                                        <span className="acr-listing-icon-value">{currentListing.beds}</span>
                                    </div>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-bathroom" />
                                        <span>Baths</span>
                                        <span className="acr-listing-icon-value">{currentListing.bathrooms}</span>
                                    </div>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-ruler" />
                                        <span>Sqft</span>
                                        <span className="acr-listing-icon-value">{currentListing.space}</span>
                                    </div>
                                </div>
                                <p>
                                   {currentListing.text}
          </p>
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-controls">
                                <Link to="#" className="acr-listing-control">
                                    <i className="flaticon-share" />
                                </Link>
                                <Link to="#" className="acr-listing-control">
                                    <i className="flaticon-star" />
                                </Link>
                                <Link to="#" className="acr-schedule-tour acr-listing-control">
                                    <i className="flaticon-event" />
                                    <span>Schedule Link tour</span>
                                </Link>
                            </div>
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-meta">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Type</span>
                                                <p>{currentListing.type}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>City View</span>
                                                <p>{currentListing.city_view}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Size SQFT</span>
                                                <p>{currentListing.space}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-sm-3">
                                            <div className="acr-listing-meta-item">
                                                <span>Condition</span>
                                                <p>{currentListing.condition}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="acr-arrows">
                    <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                    <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                </div>
            </div>
        );
    }
}

export default Banner;