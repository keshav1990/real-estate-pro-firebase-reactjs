import React, { Component } from 'react';
import { Link, useParams, withRouter   } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import $ from 'jquery';
import 'magnific-popup'
import classNames from 'classnames';


const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Beds
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Bathrooms
    </Tooltip>
);
const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);


class Listingwrapper extends Component {
    constructor(props) {
        super(props);
		//console.log(props.dataLisitng);
        this.state = {
			items: [],
			currentListing:props.dataLisitng,
            showmore: false
        }
        this.showmoretoggle = this.showmoretoggle.bind(this)
    }
    showmoretoggle() {
        this.setState({
            showmore: !this.state.showmore
        })
    }



componentWillReceiveProps({dataLisitng}) {
	function popup() {
        if($('.gallery-thumb').length){
          $('.gallery-thumb').magnificPopup({
              type: 'image',
              gallery: {
                  enabled: true
              },
          });
      }
      }
	this.setState({
            currentListing: dataLisitng
        })
  //this.setState({...this.state,dataLisitng});
   popup();
}
 
  componentDidMount() {
	  function popup() {
          if($('.gallery-thumb').length){
            $('.gallery-thumb').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        }
        }
	  let id = this.props.match.params.id;
        popup()
    };
    render() {
		const { currentListing } = this.state;

        return (
            <div className="section listing-wrapper">
                <div className="container">
                    <div className="row">
                        {/* Listings Start */}
                        <div className="col-lg-12">
                            {/* Content Start */}
                            <div className="listing-content">
                                <h4>Property Overview</h4>
                                <p>{currentListing.text} </p>
                                <div className="row">
                                    {currentListing.listinggallery && currentListing.listinggallery.map((item, i) => (
                                        <div key={i} class="col-md-6 mb-3">
                                            <a href={item} external class="gallery-thumb">
                                                <img src={item} alt="post" />
                                            </a>
                                        </div>
                                    ))}
                                </div>
                               
                            </div>
                            {/* Content End */}
                            
                            <div className="section section-padding pt-0 acr-listing-features">
                                <h4>Features</h4>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="listing-feature-wrapper">
                                            <div className="listing-feature">
                                                <i className="flaticon-picture" />
                                                <h6 className="listing-feature-label">Propery Type</h6>
                                                <span className="listing-feature-value">{currentListing.type}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-bone" />
                                                <h6 className="listing-feature-label">Pet Friendly</h6>
                                                <span className="listing-feature-value">{currentListing.pet_friendly}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-chair" />
                                                <h6 className="listing-feature-label">Furnished</h6>
                                                <span className="listing-feature-value">{currentListing.furnished}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-fan" />
                                                <h6 className="listing-feature-label">Cooling</h6>
                                                <span className="listing-feature-value">{currentListing.cooling}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="listing-feature-wrapper">
                                            <div className="listing-feature">
                                                <i className="flaticon-bathroom" />
                                                <h6 className="listing-feature-label">Bathrooms</h6>
                                                <span className="listing-feature-value">{currentListing.bathrooms}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-pillow" />
                                                <h6 className="listing-feature-label">Bed Rooms</h6>
                                                <span className="listing-feature-value">{currentListing.beds}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-mailbox" />
                                                <h6 className="listing-feature-label">Mail box</h6>
                                                <span className="listing-feature-value">{currentListing.mailbox}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Property Size</h6>
                                                <span className="listing-feature-value">{currentListing.space}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="button" className={classNames("load-more-features btn-custom-2 light-grey btn-block", { "d-none": this.state.showmore })} onClick={this.showmoretoggle}>Show More</button>
                                <div className={classNames("hidden-listing-features", { "d-block": this.state.showmore })}>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-key" />
                                                <h6 className="listing-feature-label">Property Id</h6>
                                                <span className="listing-feature-value">{currentListing.id}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-garage" />
                                                <h6 className="listing-feature-label">Parking</h6>
                                                <span className="listing-feature-value">{currentListing.parking}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-history" />
                                                <h6 className="listing-feature-label">Year Built</h6>
                                                <span className="listing-feature-value">{currentListing.built}</span>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="listing-feature">
                                                <i className="flaticon-new" />
                                                <h6 className="listing-feature-label">Condition</h6>
                                                <span className="listing-feature-value">{currentListing.condition}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-ruler" />
                                                <h6 className="listing-feature-label">Lot Size</h6>
                                                <span className="listing-feature-value">{currentListing.space}</span>
                                            </div>
                                            <div className="listing-feature">
                                                <i className="flaticon-eye" />
                                                <h6 className="listing-feature-label">View</h6>
                                                <span className="listing-feature-value">{currentListing.city_view}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                           
                        </div>
                        {/* Listings End */}
                       
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Listingwrapper);