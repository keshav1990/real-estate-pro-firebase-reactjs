import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Content from '../sections/listing-details-v1/Content';
import ListingsDataService from "../../services/listings.service";

class Listingdetailsone extends Component {
	constructor(props) {
	    super(props);
        this.state = {
			items: [],
			currentListing:{
			key:0,
			id: 43,
			gridimg: "assets/img/listings/7.jpg",
			listimg:"assets/img/listings-list/8.jpg",
			title: "Theodore Lowe, Azusa New York 39531",
			authorimg: "assets/img/people/1.jpg",
			authorname: "Randy Blue",
			postdate: "March 3, 2020",
			monthlyprice: 3500,
			text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
			beds: 3,
			bathrooms: 2,
			area: 2499,
			star:true,
			sale:true,
			pending:false,
			rental:false,
			recent:false
			},
            showmore: false
        }
    }
	componentWillUnmount() {
	   let id = this.props.match.params.id;
		ListingsDataService.getSingle(id).off("value", function(listingFind){
			
		 this.setState({
			currentListing: listingFind.val(),
		});
	 });
  }

 
  componentDidMount() {
	  
	  let id = this.props.match.params.id;
	 ListingsDataService.getSingle(id).on("value", (listingFind)=>{
		 console.log(listingFind.val());
		 this.setState({
			currentListing: listingFind.val(),
		});
	 });
    };
    render() {
		        const {currentListing} = this.state;

        return (
            <Fragment>
                <MetaTags>
                    <title>Realestate Pro | Listing Details</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content dataLisitng={currentListing} />
                <Footer/>
            </Fragment>
        );
    }
}

export default Listingdetailsone;