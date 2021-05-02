import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";
import "../../styles/screens/productListScreen/productListScreen.css";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const {
    loading: productListLoading,
    error: productListError,
    products,
  } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: productDeleteLoading,
    error: productDeleteError,
    success: productDeleteSuccess,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: productCreateLoading,
    error: productCreateError,
    success: productCreateSuccess,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else if (productCreateSuccess) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    productCreateSuccess,
    productDeleteSuccess,
    createdProduct,
  ]);

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure want to delete product?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="productList">
      <h1 className="productList__title">Products</h1>
      <button className="productList__create" onClick={createProductHandler}>
        Create new product
      </button>
      {productDeleteLoading && (
        <h3 className="productList__loading">Loading...</h3>
      )}
      {productDeleteError && (
        <h3 className="productList__error">{productDeleteError}</h3>
      )}
      {productCreateLoading && (
        <h3 className="productList__loading">Loading...</h3>
      )}
      {productCreateError && (
        <h3 className="productList__error">{productCreateError}</h3>
      )}
      {productListLoading ? (
        <h3 className="productList__loading">Loading...</h3>
      ) : productListError ? (
        <h3 className="productList__error">{productListError}</h3>
      ) : (
        <div className="productList__products">
          {products.map((product, index) => (
            <div key={product._id} className="productList__product">
              <div className="product__index">{index + 1}</div>
              <div className="product__id">{product._id}</div>
              <div className="product__name">{product.name}</div>
              <div className="product__price">${product.price}</div>
              <div className="product__category">{product.category}</div>
              <div className="product__brand">{product.brand}</div>
              <Link
                className="product__update"
                to={`/admin/product/${product._id}/edit`}
              >
                🛠
              </Link>
              <button
                className="product__delete"
                onClick={() => deleteProductHandler(product._id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
