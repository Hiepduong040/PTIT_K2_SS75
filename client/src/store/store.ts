
import product from "./reducers/productReducer"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
       
        product: product
    }
})

