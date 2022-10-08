import http from './http-commons';

class StuffDataService {

  // ====== USER API ========

  // signup
  create(data) {
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



  // ======= PRODUCTS API ========

  // get products by page
  find(page) {
    return http.get(`/api/products/${page}`);
  }
  
  // Get Filter
  filter(page, data) {
    return http.post(`/api/filter/${page}`, data);
  }

  // Single Product
  findById(id) {
    return http.get(`/api/product/${id}`);
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