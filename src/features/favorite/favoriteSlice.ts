import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'


interface FavoriteState {
    products: Product[],
}

const initialState: FavoriteState = {
    products: [],
}
export const checkFavorite = (productsArray: Product[], product: string) => productsArray.find(p => p.id === product)

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        toggleProduct: (state, action: PayloadAction<Product>) => {
            if (checkFavorite(state.products, action.payload.id)) {
                state.products = state.products.filter(product => product.id !== action.payload.id);
            } else {
                state.products.push(action.payload);
            }
        }
    },
});

export const { toggleProduct } = favoriteSlice.actions
export const selectFavorite = (state: RootState) => state.favorite
export default favoriteSlice.reducer


