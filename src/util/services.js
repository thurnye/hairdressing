import http from './http-commons';

class StuffDataService {

  // ====== USER API ========

  // signup
  createUser(data) {
    return http.post("/api/user", data);
  }
  // login
  postLogin(data) {
    return http.post(`/api/user/login`, data);
  }

  // update User
  postEdit(id, data) {
    return http.post(`/api/user/edit/${id}`, data);
  }

  // Delete
  deleteAccount(id) {
    return http.post(`/api/user/delete/${id}`);
  }
  //findOne
  findUser(type, value) { //the type is either email or id
    return http.get(`/api/user/${type}/${value}`);
  }



  // ======= PRODUCTS API ========

  // get products by page
  find(page, itemsPerPage, data) {
    return http.post(`/api/products/${page}/${itemsPerPage}/`, data);
  }
  
  // Get Filter
  filter(page, itemsPerPage, data) {
    return http.post(`/api/filter/${page}/${itemsPerPage}`, data);
  }

  // Single Product
  findById(id) {
    return http.get(`/api/product/${id}`);
  }


  getCategories() {
    return http.get(`/api/categories`);
  }


  // ==== CART=======

  //updateRecipe
  postUpdatedRecipe(id, data) {
    return http.post(`/api/recipe/update/${id}`, data);
  }

  // remove Recipe
  removeRecipe(id) {
    return http.post(`/api/removeRecipe/${id}`);
  }


  // ------------------------------------
 

  
  
  findOne(id) {
    return http.get(`/edit/${id}`);
  }

  // postEdit(id, data) {
  //   return http.post(`/edit/${id}`, data);
  // }

  remove(id) {
    return http.post(`/api/${id}`);
  }

  deleteAll() {
    return http.delete(`/api`);
  }

  findByTitle(title) {
    return http.get(`/api?title=${title}`);
  }
}

export default new StuffDataService();