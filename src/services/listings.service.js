import firebase from "../firebase";

const db = firebase.ref("/listings");

class ListingsDataService {
  getAll() {
    return db;
  }

  create(listings) {
    return db.push(listings);
    return db.push(listings).getKey();
  }
  getSingle(value,key=""){
	  
	  return key=='' ? db.child(value) : db.orderByChild(key).equalTo(value);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new ListingsDataService();
