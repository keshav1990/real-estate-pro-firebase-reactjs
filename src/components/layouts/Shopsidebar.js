import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
class Shopsidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            open2: true,
            open3: true,
        }
    }
    render() {
        const { open } = this.state;
        const { open2 } = this.state;
        const { open3 } = this.state;
        return (
            <div className="sidebar sidebar-left">
                <div className="sidebar-widget">
                    <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => this.setState({ open: !open })}>
                        <h5>Filter Listings</h5>
                        <div className="acr-custom-chevron">
                            <span />
                            <span />
                        </div>
                    </div>
                    <Collapse in={this.state.open}>
                        <div className="acr-collapsable">
                            <div className="acr-filter-form">
                                <form>
                                   
                                    <div className=" form-group">
                                       

                                            <select className="form-control" required name="status" onChange={this.props.onChangeStatus}>
                                                    <option value="Any Status">Any Status</option>
                                                    <option value="For Rent">For Rent</option>
                                                    <option value="Featured">Featured</option>
                                                    <option value="For Sale">For Sale</option>
                                                    <option value="Leased">Leased</option>
                                                    <option value="New Addition">New Addition</option>
                                                    <option value="Sold">Sold</option>
                                                    <option value="Rental">Rental</option>
                                                    <option value="Reduced">Reduced</option>
                                                    <option value="Special Offer">Special Offer</option>
                                                </select>
                                    </div>
                                   
                                    <div className="form-group">
                                      
                                    <select className="form-control" required name="bed" onChange={this.props.onChangeBed}>
                                                    <option value="Any amount">No of Beds</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                </select>
                                      
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" required name="bathrooms" onChange={this.props.onChangeBathrooms}>
                                                    <option value="Any amount">No of Bathrooms</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                </select>
                                       
                                    </div>
                                    <div className="form-group">
                                       
                                        <select required className="form-control" name="type" onChange={this.props.onChangeType}>
                                                    <option value="Any Type">Any Type</option>
                                                    <option value="House">House</option>
                                                    <option value="Apartment">Apartment</option>
                                                    <option value="Condo">Condo</option>
                                                    <option value="Townhome">Townhome</option>
                                                    <option value="Villa">Villa</option>
                                                    <option value="Duplex">Duplex</option>
                                                </select>
                                    </div>
                                    <button type="button" onClick={this.props.doFilterData} className="btn-block btn-custom" name="button">Apply filters</button>
                                </form>
                            </div>
                        </div>
                    </Collapse>
                </div>
              
            </div>
        );
    }
}

export default Shopsidebar;