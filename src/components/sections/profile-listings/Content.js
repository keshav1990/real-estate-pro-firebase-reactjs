import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import ListingsDataService from "../../../services/listings.service";
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
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
class Content extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: props.user,
            myListing: [],
            logoutbutton: props.logoutbutton,
            currentPage: 1,
            itemsPerPage: 6,
            loading: false,
            currentListing: null,
			currentIndex: -1
    
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        var paginationContent = event.target.closest('.pagination-content');

        if (paginationContent) {
            paginationContent.scrollIntoView();
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                currentPage: Number(event.target.getAttribute('data-page')),
                loading: false
            });
        }, 2000);

    }
    onDataChange= (listingsData)=>{
        let listing = [];
      
        listingsData.forEach((item) => {
          let key = item.key;
          let data = item.val();
          data.key = key;
         // data.push({key: key});
         
          listing.push(data);
        });
    
        this.setState({
            myListing: listing,
        });
      }
	componentDidMount() {
       // console.log(this.state.user);
        let id = this.state.user.email;
         ListingsDataService.getSingle(id,'user_id').on("value",this.onDataChange);
   }

   componentWillUnmount() {
        let id = this.state.user.email;
         ListingsDataService.getSingle(id,'user_id').on("value", this.onDataChange);
  }
 
    componentWillReceiveProps({user,logoutbutton}) {
    this.setState({...this.state,user});
    this.setState({...this.state,logoutbutton});
    // popup();
    }
    render() {
        
        const {logoutbutton,user,myListing} = this.state;
        const { currentPage, itemsPerPage } = this.state;

        // Logic for displaying items
        const indexOfLastitem = currentPage * itemsPerPage;
        const indexOfFirstitem = indexOfLastitem - itemsPerPage;
        const currentitems = myListing.slice(indexOfFirstitem, indexOfLastitem);

        const renderitems = currentitems.map((item, i) => {
            return    <div key={item.key} className="listing listing-list">
            <div className="listing-thumbnail">
                <Link to={"/listing-details/"+item.key}><img src={item.listimg} alt="listing" /></Link>
                <div className="listing-badges">
                    {
                        item.star === true ? <span className="listing-badge featured"> <i className="fas fa-star" /> </span> : ''
                    }
                    {
                        item.sale === true ? <span className="listing-badge sale">On Sale</span> : ''
                    }
                    {
                        item.pending === true ? <span className="listing-badge pending"> Pending</span> : ''
                    }
                    {
                        item.rental === true ? <span className="listing-badge rent"> Rental</span> : ''
                    }
                </div>
                <div className="listing-controls">
                    <Link to="#" className="favorite"><i className="far fa-heart" /></Link>
                    <Link to="#" className="compare"><i className="fas fa-sync-alt" /></Link>
                    <Link to="#" className="edit"><i className="fas fa-edit" /></Link>
                </div>
            </div>
            <div className="listing-body">
                <div className="listing-author">
                    <img src={this.state.user.photoURL} alt="author" />
                    <div className="listing-author-body">
                        <p> <Link to="#">{this.state.user.displayName}</Link> </p>
                        <span className="listing-date">{item.postdate}</span>
                    </div>
                    <Dropdown className="options-dropdown">
                        <Dropdown.Toggle as={NavLink}><i className="fas fa-ellipsis-v" /></Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-right">
                            <ul>
                                <li> <Link to="tel:+123456789"> <i className="fas fa-phone" /> Call Agent</Link> </li>
                                <li> <Link to="mailto:+123456789"> <i className="fas fa-envelope" /> Send Message</Link> </li>
                                <li> <Link to={"/listing-details/"+item.key}> <i className="fas fa-bookmark" /> Book Tour</Link> </li>
                            </ul>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h5 className="listing-title"> <Link to={"/listing-details/"+item.key} title={item.title}>{item.title}</Link> </h5>
                <span className="listing-price">{new Intl.NumberFormat().format((item.monthlyprice))}$ <span>/month</span> </span>
                <p className="listing-text">{item.text}</p>
                <div className="acr-listing-icons">
                    <OverlayTrigger overlay={bedstip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-bedroom" />
                            <span className="acr-listing-icon-value">{item.beds}</span>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={bathstip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-bathroom" />
                            <span className="acr-listing-icon-value">{item.bathrooms}</span>
                        </div>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={areatip}>
                        <div className="acr-listing-icon">
                            <i className="flaticon-ruler" />
                            <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.area))}</span>
                        </div>
                    </OverlayTrigger>
                </div>
                <div className="listing-gallery-wrapper">
                    <Link to={"/listing-details/"+item.key} className="btn-custom btn-sm secondary">View Details</Link>
                    <OverlayTrigger overlay={gallerytip}>
                        <Link to="#" className="listing-gallery"> <i className="fas fa-camera" /> </Link>
                    </OverlayTrigger>
                </div>
            </div>
        </div>
        });
           // Logic for displaying page numbers
           const pageNumbers = [];
           for (let i = 1; i <= Math.ceil(myListing.length / itemsPerPage); i++) {
               pageNumbers.push(i);
           }
           const renderPagination = pageNumbers.map(number => {
               const activeCondition = this.state.currentPage === number ? 'active' : ''
               return (
                   <Fragment key={number}>
                       {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                           <Link className="page-link" to="#" data-page={number} onClick={this.handleClick}>{number}</Link>
                       </li> : ''}
                   </Fragment>
               );
           });
        return (
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="sidebar sticky-sidebar user-nav sidebar-left">
                                <ul>
                                    <li> <Link className="active" to="/profile">My Listings</Link> </li>
                                    <li> <Link className="logout" onClick={logoutbutton}><i className="flaticon-shut-down-button" /> Logout</Link> </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-8 pagination-content">
                           <div className="row">
                            {/* Listing Start */}
                            {this.state.loading === false ? renderitems : <Loader />}

                            {/* Listing End */}
                            </div>
                            <div className="row">{/* Pagination Start */}
                            {pageNumbers.length > 1 ?
                                <ul className="pagination">
                                    {/* Prev */}
                                    {/* to show previous, we need to be on the 2nd or more page */}
                                    {pageNumbers.length > 1 && this.state.currentPage !== 1 ?
                                        <li className="page-item">
                                            <Link className="page-link" to="#" data-page={this.state.currentPage - 1} onClick={this.handleClick}>
                                                <i className="fas fa-chevron-left" />
                                            </Link>
                                        </li>
                                        : ''}
                                    {/* Prev */}
                                    {renderPagination}
                                    {/* Next */}
                                    {/* to show next, we should not be on the last page */}
                                    {pageNumbers.length > 1 && this.state.currentPage !== pageNumbers.length ? <li className="page-item">
                                        <Link className="page-link" to="#" data-page={parseInt(this.state.currentPage + 1)} onClick={this.handleClick}>
                                            <i className="fas fa-chevron-right" />
                                        </Link>
                                    </li>
                                        : ''}
                                    {/* Next */}
                                </ul> : ''}
                            {/* Pagination End */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;