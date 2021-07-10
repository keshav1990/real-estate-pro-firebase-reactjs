import React, { useEffect, useState } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import ListingsDataService from "../../../services/listings.service";
import  { Redirect } from 'react-router-dom'
import { storageRef } from '../../../firebase';

// Features
const features = [
    { id: 1, icon: 'bone',name:'pet_friendly', title: 'Pet Friendly' },
    { id: 2, icon: 'chair',name:'furnished', title: 'Furnished' },
    { id: 3, icon: 'fan',name:'cooling', title: 'Cooling' },
    { id: 4, icon: 'garage',name:'parking', title: 'Parking' },
    { id: 5, icon: 'mailbox',name:'mailbox', title: 'Mailbox' },
    { id: 6, icon: 'eye',name:'city_view', title: 'City View' },
];

function Content(props) {
    const [files, setFiles] = useState([]);
	const [text, setText] = useState('');
	const [loading, setLoading] = useState(false);
	const [iscreated, setIscreated] = useState(false);
  const [name,setName] = useState('');
  const [status,setStatus] = useState('');
  const [propertytype,setPropertytype] = useState('');
  const [price,setPrice] = useState('');
  const [period,setPeriod] = useState('');
  const [space,setSpace] = useState('');
  const [furnished,setFurnished] = useState('');
  const [cooling,setCooling] = useState('');
  const [parking,setParking] = useState('');
  const [mailbox,setMailbox] = useState('');
  const [city_view,setCity_view] = useState('');
  const [id,setId] = useState('');
  const [user,setUser] = useState(props.user);
  const [video,setVideo] = useState('');
  const [beds,setBeds] = useState('');
  const [bathrooms,setBathrooms] = useState('');
  const [condition,setCondition] = useState('');
  const [built,setBuilt] = useState('');
  const [neighborhood,setNeighborhood] = useState('');
  const [propertyThumbnail,setPropertyThumbnail] = useState('');
  const [pet_friendly,setPet_friendly] = useState('');
  const [authorimg,setAuthorimg] = useState(props.user.photoURL);
  const [authorname,setAuthourname] = useState(props.user.displayName);
  const[user_id,setUser_id] = useState(props.user.email);
  const[galleryImages,setGalleryImages] = useState([]);


  useEffect(() => {
    // console.log(props);
   setUser(props.user)
  }, [props]);

 
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setGalleryImages(acceptedFiles);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    })
	const handleChange =   (e) => {
  const { name, value } = e.target;
 
  switch (name) {
    case 'pet_friendly':
      setPet_friendly(value);
                
      break;
    case 'furnished':
	setFurnished(value);
      break;
    case 'cooling':
	setCooling(value);
      break;
    case 'parking':
      setParking(value);
                
      break;
    case 'mailbox':
      setMailbox(value);
                
      break; 
	  case 'city_view':
      setCity_view(value);
                
      break;
    default:
      break;
  }
}


	
const	handleSubmit = (event) => {
  event.preventDefault()
	let isfurnished = furnished? 'Yes' : 'No';
	let iscooling = cooling? 'Yes' : 'No';
	let isparking = parking? 'Yes' : 'No';
	let ismailbox = mailbox? 'Yes' : 'No';
	let iscity_view = city_view? 'Yes' : 'No';
	let ispet_friendly = pet_friendly? 'Yes' : 'No';
    let data = {
      text: text,
      title: name,
      authorimg:authorimg,
      authorname:authorname,
      type: propertytype,
      monthlyprice: price,
      period: period,
      space: space,
      furnished: isfurnished,
      cooling: iscooling,
      parking: isparking,
      mailbox: ismailbox,
      city_view: iscity_view,
      id: id,
      video: video,
      bathrooms: bathrooms,
      condition: condition,
      beds: beds,
      built: built,
      neighborhood: neighborhood,
      pet_friendly: ispet_friendly,
      status: status,
      user_id:user_id
    };
  
    setLoading(true);
   
       
	
    ListingsDataService.create(data)
      .then((data) => {
         // console.log(data);
          var uploadedLisitng = data.key;
        console.log("Created new item successfully!",uploadedLisitng);
        
        if(propertyThumbnail.target.files){
            setLoading(true);
            let thumImages = propertyThumbnail.target.files[0];
            //console.log(propertyThumbnail.target.files);
            const uploadTask = storageRef.ref('All_Files/').child(uploadedLisitng+thumImages.name).put(thumImages);
            uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log("error:-", error)
                    },
                    () => {
                       // const uniId = guidGenerator().toString();
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            let thumbData = {
                                listimg:downloadURL
                            };
                            ListingsDataService.update(uploadedLisitng, thumbData)
                            .then(() => {
                                setLoading(false);
                            console.log('Updated',uploadedLisitng,thumbData);
                            })
                            .catch((e) => {
                              console.log(e);
                            });
                        });
                    }
                );
            }
            //end of images
            
            ///this is used for the images for group images
            
            let galleryImagesURL = [];
            let totalGalleriesItems = 0;
            let lastItem = 0;
            if(totalGalleriesItems = galleryImages.length){
                
                galleryImages.map((thumImagesData, i) => {
                    lastItem++;
                   
                const uploadTaskGallery = storageRef.ref('galleryImages/').child(uploadedLisitng+thumImagesData.name).put(thumImagesData);
                uploadTaskGallery.on('state_changed',
                        (snapshot) => {
                            setLoading(true);
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                        },
                        (error) => {
                            // Handle unsuccessful uploads
                            console.log("error:-", error)
                        },
                        () => {
                           // const uniId = guidGenerator().toString();
                            // Handle successful uploads on complete
                            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                            uploadTaskGallery.snapshot.ref.getDownloadURL().then((downloadURL) => {
                               // console.log('File available at', downloadURL);
                               
                                galleryImagesURL.push(downloadURL);
                                if(lastItem==totalGalleriesItems){
                                let galleryData = {
                                    listinggallery:galleryImagesURL
                                };
                                ListingsDataService.update(uploadedLisitng, galleryData)
                                                .then(() => {
                                                   
                                                     console.log('gallery images uploaded successfully');
                                                })
                                                .catch((e) => {
                                                  console.log(e);
                                                });
                            }
                            });
                        }
                    );
                });
                
            };
                //end of images
      setTimeout(function(){
        setLoading(false);
	   setIscreated(true);
       alert('Listing Created Successfully');
      },6000)
        
      })
      .catch((e) => {
        console.log(e);
      });
	};

    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    alt="img"
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
	if(iscreated){
		<Redirect to="/" />
	}
    return (
        <div className="section">
		
			<div className={loading ? 'acr-preloader' : 'acr-preloader hidden'}>
                <div className="acr-preloader-inner">
                    <div className="lds-grid"><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
                </div>
            </div>
            <div className="container">
			
                <div className="row">
                    <Tab.Container defaultActiveKey="tab1">
                        {/* Tabs Start */}
                        <div className="col-md-4">
                            <Nav variant="tabs" className="nav nav-tabs tab-cards">
                                <Nav.Item>
                                    <Nav.Link eventKey="tab1"><span>01</span> Basic Information</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab2"><span>02</span> Gallery</Nav.Link>
                                </Nav.Item>
                                
                                <Nav.Item>
                                    <Nav.Link eventKey="tab4"><span>03</span> Features</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab5"><span>04</span> Details</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        {/* Tabs End */}
                        {/* Tab Content Start */}
                        <div className="col-md-8">
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="authorname" value={user.displayName} />
                                <input type="hidden" name="authorimg" value={user.photoURL} />
                                <input type="hidden" name="user_id" value={user.email} />
                                <Tab.Content className="m-0">
                                    <Tab.Pane eventKey="tab1">
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>Property Description</label>
                                                <textarea name="text" rows={4} className="form-control" onChange={e => setText(e.target.value)} placeholder="Property Description" value={text} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Name</label>
                                                <input type="text" required className="form-control" onChange={e => setName(e.target.value)} value={name} placeholder="Property Name" name="name" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Status</label>
                                                <select className="form-control" required name="status" onChange={e => setStatus(e.target.value)}>
                                                    <option {...status==='For Rent' ? 'selected' : ''} value="For Rent">For Rent</option>
                                                    <option {...status==='Featured' ? 'selected' : ''} value="Featured">Featured</option>
                                                    <option {...status==='For Sale' ? 'selected' : ''} value="For Sale">For Sale</option>
                                                    <option {...status==='Leased' ? 'selected' : ''} value="Leased">Leased</option>
                                                    <option {...status==='New Addition' ? 'selected' : ''} value="New Addition">New Addition</option>
                                                    <option {...status==='Sold' ? 'selected' : ''} value="Sold">Sold</option>
                                                    <option {...status==='Rental' ? 'selected' : ''} value="Rental">Rental</option>
                                                    <option {...status==='Reduced' ? 'selected' : ''}  value="Reduced">Reduced</option>
                                                    <option {...status==='Special Offer' ? 'selected' : ''} value="Special Offer">Special Offer</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Property Type</label>
                                                <select required className="form-control" name="propertytype" onChange={e => setPropertytype(e.target.value)}>
                                                    <option {...propertytype==='House' ? 'selected' : ''} value="House">House</option>
                                                    <option {...propertytype==='Apartment' ? 'selected' : ''} value="Apartment">Apartment</option>
                                                    <option {...propertytype==='Condo' ? 'selected' : ''} value="Condo">Condo</option>
                                                    <option {...propertytype==='Townhome' ? 'selected' : ''} value="Townhome">Townhome</option>
                                                    <option {...propertytype==='Villa' ? 'selected' : ''} value="Villa">Villa</option>
                                                    <option {...propertytype==='Duplex' ? 'selected' : ''} value="Duplex">Duplex</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Price</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">$</span>
                                                    </div>
                                                    <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} name="price" placeholder="Property Price" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Rental Period</label>
                                                <select className="form-control" onChange={e => setPeriod(e.target.value)} name="period">
                                                    <option {...period==='Monthly' ? 'selected' : ''} value="Monthly">Monthly</option>
                                                    <option {...period==='Yearly' ? 'selected' : ''} value="Yearly">Yearly</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Property Space (Sqft)</label>
                                                <input required type="text" className="form-control" onChange={e => setSpace(e.target.value)} value={space} placeholder="Property Space (Sqft)" name="space" />
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label>Property Video</label>
                                                <input type="text" className="form-control" onChange={e => setVideo(e.target.value)} value={video} placeholder="Property Video URL" name="video" />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <div className="form-group">
                                            <label>Property Thumbnail</label>
                                            <div className="custom-file">
                                                <input type="file" required className="custom-file-input" onChange={e  =>  setPropertyThumbnail(e)}  name="propertyThumbnail" id="propertyThumbnail" />
                                                <label className="custom-file-label" htmlFor="propertyThumbnail">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Property Gallery</label>
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()}   name="galleryImages[]"/>
                                                <div className="dropzone-msg dz-message needsclick">
                                                    <i className="fas fa-cloud-upload-alt" />
                                                    <h5 className="dropzone-msg-title">Drop files here or click to upload.</h5>
                                                    <span className="dropzone-msg-desc">Only JPG,PNG,GIF<strong> allowed</strong>to upload.</span>
                                                </div>
                                            </div>
                                            <aside className="thumbsContainer">
                                                {thumbs}
                                            </aside>
                                            <span className="acr-form-notice">*You can upload up to 5 images for your listing</span>
                                            <span className="acr-form-notice">*Listing images should be atleast 620x480 in dimensions</span>
                                        </div>
                                    </Tab.Pane>
                                   
                                    <Tab.Pane eventKey="tab4">
                                        <div className="row">
                                            {features.map((item, i) => (
                                                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                                                    <label className="acr-listing-feature">
                                                        <input type="checkbox" name={item.name} value="Yes" {...`${item.name}`==='Yes'? 'checked' : ''} onChange={handleChange} />
                                                        <i className="acr-feature-check fas fa-check" />
                                                        <i className={"acr-listing-feature-icon flaticon-" + item.icon + ""} />
                                                        {item.title}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab5">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>Property ID</label>
                                                <input type="text" className="form-control" placeholder="Property ID" onChange={e => setId(e.target.value)} name="id" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Beds</label>
                                                <input type="text" className="form-control" placeholder="Number of Beds" onChange={e => setBeds(e.target.value)} name="beds" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Bathrooms</label>
                                                <input type="text" className="form-control" placeholder="Number of Bathrooms" name="bathrooms" onChange={e => setBathrooms(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Condition</label>
                                                <input type="text" className="form-control" placeholder="Property Condition" name="condition"  onChange={e => setCondition(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Year Built</label>
                                                <input type="text" className="form-control" placeholder="Property Year Built" name="built"  onChange={e => setBuilt(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Neighborhood</label>
                                                <input type="text" className="form-control" placeholder="Property Neighborhood" name="neighborhood"  onChange={e => setNeighborhood(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" required className="custom-control-input" id="termsAndConditions" />
                                                <label className="custom-control-label" htmlFor="termsAndConditions">I Agree to the terms &amp; Conditions of Property Submission</label>
                                            </div>
                                        </div>
                                        <button type="submit"  className="btn-custom" name="submit">Submit Listing</button>
                                    </Tab.Pane>
                                </Tab.Content>
                            </form>
                        </div>
                    </Tab.Container>
                    {/* Tab Content End */}
                </div>
            </div>
        </div>
    );
}

export default Content;