import { createContext, useReducer } from "react";
import { produce } from "immer";

export const ProductContext = createContext({} as any);

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const productReducer = (state: any, action: any) => {
//   action: { type: "FETCH_PRODUCTS", payload: []}
  switch (action.type) {
    case "product/fetch":
      state.products = action.payload;
      return;
    case "product/add":
      state.products.push(action.payload);
      return;
    case "product/update":
      const product = action.payload;
      state.products = state.products.map((item: any) =>
        item.id === product.id ? product : item
      );
      return;
    case "product/delete":
      const id = action.payload;
      state.products = state.products.filter((item: any) => item.id !== id);
      return;
    default:
      return state;
  }
};

const ProductProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(produce(productReducer), initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
