import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  getUserFailure,
  getUserStart,
  getUserSuccess,
  followStart,
  followSuccess,
  followFailure,
  unfollowStart,
  unfollowSuccess,
  unfollowFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addCartStart,
  addCartSuccess,
  addCartFailure,
  removeCartStart,
  removeCartSuccess,
  removeCartFailure,
} from "./cartRedux";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  likeStart,
  likeSuccess,
  likeFailure,
  unlikeStart,
  unlikeSuccess,
  unlikeFailure,
} from "./productRedux";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//REGISTER
export const register = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const res = publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

//UPDATE USER
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    console.log(user, "upla");

    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
//ADD PRODUCT
export const addProduct = async (product, dispatch, user) => {
  dispatch(addProductStart());
  try {
    console.log(product, "product api");
    const res = await userRequest.post(`/products`, product, user);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// ADD TO CART
export const addCart = async (product, dispatch) => {
  dispatch(addCartStart());
  try {
    const res = await userRequest.post(`/carts`, product);
    dispatch(addCartSuccess(product));
  } catch (err) {
    dispatch(addCartFailure());
  }
};
// REMOVE CART
export const removeCartItem = async (product, dispatch) => {
  dispatch(removeCartStart());
  try {
    const res = await userRequest.delete(`/carts/${product._id}`);
    dispatch(removeCartSuccess(product));
  } catch (err) {
    dispatch(removeCartFailure());
  }
};
//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};
//DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
//UPDATE PEODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
//GET ALL USERS
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};
//FOLLOW USER
export const follow = async (folUser, userId, dispatch) => {
  dispatch(followStart());
  try {
    const res = await userRequest.put(`/users/follow/${userId}`, folUser);
    dispatch(followSuccess(res.data));
    console.log(res.data, "res");
  } catch (err) {
    dispatch(followFailure());
    console.log(err);
  }
};
//UNFOLLOW USER
export const unfollow = async (unfolUser, userId, dispatch) => {
  dispatch(unfollowStart());
  try {
    console.log(unfolUser, "unfolUser");
    const res = await userRequest.put(`/users/unfollow/${userId}`, unfolUser);
    dispatch(unfollowSuccess(res.data));
    // console.log(res.data,"res")
  } catch (err) {
    dispatch(unfollowFailure());
    console.log(err);
  }
};
//LIKE PRODUCT
export const likeItem = async (product, userId, dispatch) => {
  dispatch(likeStart());
  try {
    const res = await userRequest.put(`/products/like/${userId}`, product);
    dispatch(likeSuccess(res.data));
  } catch (err) {
    dispatch(likeFailure());
    console.log(err);
  }
};
//unlike PRODUCT
export const unlikeItem = async (product, userId, dispatch) => {
  dispatch(unlikeStart());
  try {
    const res = await userRequest.put(`/products/unlike/${userId}`, product);
    dispatch(unlikeSuccess(res.data));
  } catch (err) {
    dispatch(unlikeFailure());
    console.log(err);
  }
};
//
export const addOrder = async (product) => {
  try {
    const res = await userRequest.post(`/orders`, product);
  } catch (err) {
    console.log(err);
  }
};
