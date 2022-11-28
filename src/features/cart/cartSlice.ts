import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Product } from '../../types/product'
import { fetchCart } from './cartAPI';
type CartItem = {
    product: Product,
    quantity: number,
}


// Define a type for the slice state
interface CartState {
    items: CartItem[],
    total: number,
}

// Define the initial state using that type
const initialState: CartState = {
    items: [],
    total: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action : PayloadAction<Product>) => {
            const item = state.items.find(item => item.product.id === action.payload.id);
            if (item) {
                item.quantity++;
            } else {
                state.items.push({
                    product: action.payload,
                    quantity: 1,
                });
            }
            state.total += action.payload.price;
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const item = state.items.find(item => item.product.id === action.payload.id);
            if (item) {
                item.quantity--;
                state.total -= action.payload.price;
                if (item.quantity === 0) {
                    state.items = state.items.filter(item => item.product.id !== action.payload.id);
                }
            }
        }
    },
});

export const { addProduct, removeProduct } = cartSlice.actions
export const selectItems = (state: RootState) => state.cart.items
export default cartSlice.reducer


