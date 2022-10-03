import http from './http-commons';

class StuffDataService {

  // USE-ASPECT

  // signup
  create(data) {
    return http.post("/api", data);
  }

  // update user
  postEdit(id, data) {
    return http.post(`/edit/${id}`, data);
  }

  // login
  postLogin(data) {
    return http.post(`/api/user/login`, data);
  }



  //============PRODUCTS ROUTES==============

  // get all PRODUCTS
  find(page) {
    return http.get(`/api/products/${page}`);
  }

  // get one Product
  findById(id) {
    return http.get(`/api/product/${id}`);
  }

  //Post Search Page
  findSearch(data, page) {
    return http.post(`/api/products/${page}`, data);
  }


  // ==============CART ===============
  // Get Cart
  getCart() {
    return http.get(`/api/cart`);
  }

  //Add to Cart
  addToCart(data) {
    return http.post(`/api/cart`, data);
  }

  //remove from cart
  updateCartItem(id){
    return http.post(`/api/removeRecipe/${id}`);
  }
  //remove from cart
  removeFromCart(id){
    return http.post(`/api/removeRecipe/${id}`);
  }
}

export default new StuffDataService();