import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const currentItem = action.payload;
      const isItemExist = state.cartItems.find(
        (item) => item.productId === currentItem.productId
      );
      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.productId === isItemExist.productId ? currentItem : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, currentItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
    default:
      return state;
  }
};
