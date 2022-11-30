const initialState = {
  loading: false,
  cartItem: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addToCart":
      const itemInCart = state.cartItem.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cartItem.push({ ...action.payload });
      }
      return {
        ...state,

      };

    case "updateCart":
      return {
        ...state,
        cartItem: state.cartItem.map((item) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "deletefromCart":
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};
