import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  updateProduct,
} from "../redux/actions/productActions";
import { getUserProfile, updateUser } from "../redux/actions/userActions";
import { PRODUCT_UPDATE_RESET } from "../redux/constants/productConstants";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";
import "../styles/screens/productEditScreen/productEditScreen.css";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState("");

  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);
  const {
    loading: productDetailLoading,
    error: productDetailError,
    product,
  } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: productUpdateLoading,
    error: productUpdateError,
    success: productUpdateSuccess,
  } = productUpdate;

  useEffect(() => {
    if (productUpdateSuccess) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product._id || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, product, productId, productUpdateSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <div className="productUpdate">
      <h1 className="productUpdate__title">Edit Product</h1>
      {productUpdateLoading || productDetailLoading ? (
        <h3 className="productUpdate__loading">Loading...</h3>
      ) : productUpdateError || productDetailError ? (
        <h3 className="productUpdate__error">
          {productUpdateError || productDetailError}
        </h3>
      ) : (
        <form className="productUpdate__form" onSubmit={submitHandler}>
          <label className="productUpdate__form--label" htmlFor="name">
            Name
          </label>
          <input
            className="productUpdate__form--input"
            type="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="productUpdate__form--label" htmlFor="price">
            Price
          </label>
          <input
            className="productUpdate__form--input"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label className="productUpdate__form--label" htmlFor="image">
            Image
          </label>
          <input
            className="productUpdate__form--input"
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.checked)}
          />

          <label className="productUpdate__form--label" htmlFor="brand">
            Brand
          </label>
          <input
            className="productUpdate__form--input"
            type="brand"
            name="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <label className="productUpdate__form--label" htmlFor="countInStock">
            Count in stock
          </label>
          <input
            className="productUpdate__form--input"
            type="number"
            name="countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <label className="productUpdate__form--label" htmlFor="category">
            Category
          </label>
          <input
            className="productUpdate__form--input"
            type="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <label className="productUpdate__form--label" htmlFor="description">
            Description
          </label>
          <input
            className="productUpdate__form--input"
            type="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="productUpdate__form--submit" type="submit">
            Update product
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
