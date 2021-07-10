import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Listingwrapper from './Listingwrapper';

class Content extends Component {
	constructor(props){
        super(props);
        this.state = {
            dataLisitng: props.dataLisitng
        }
    }
	
componentWillReceiveProps({dataLisitng}) {
  this.setState({...this.state,dataLisitng});
  // popup();
}
    render() {
		const  {dataLisitng} = this.state;
        return (
            <Fragment>
                <Banner dataLisitng={dataLisitng}/>
                <Listingwrapper dataLisitng={dataLisitng}/>
            </Fragment>
        );
    }
}

export default Content;