import { createSlice } from "@reduxjs/toolkit";

interface CartItem {
	pizzaId: number;
	name: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
}

interface CartState {
	cart: CartItem[];
}

const initialState: CartState = {
	cart: []
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			state.cart.push(action.payload)
		},
		deleteItem(state, action) {
			state.cart = state.cart.filter((item) => item.pizzaId !== action.payload)
		},
		increaseItemQuantity(state, action) {
			const item = state.cart.find((item) => item.pizzaId === action.payload)
			if(item) {
				item.quantity++
				item.totalPrice = item.quantity * item.unitPrice
			}
		},
		decreaseItemQuantity(state, action) {
			const item = state.cart.find((item) => item.pizzaId === action.payload)
			if(item) {
				item.quantity--
				item.totalPrice = item.quantity * item.unitPrice

				if(item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action)
			}
		},
		clearCart(state) {
			state.cart = []
		}
	}
})

export const {addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart} = cartSlice.actions;

export const getCart = (state) => state.cart.cart
export const getTotalCartQuantity = (state) => state.cart.cart.reduce((sum: number, item: CartItem) => sum + item.quantity ,0)
export const getTotalCartPrice = (state) => state.cart.cart.reduce((sum: number, item: CartItem) => sum + item.totalPrice ,0)
export const getCurrentQuantityById = (id: number) => (state) => state.cart.cart.find((item) => item.pizzaId === id)?.quantity || 0

export default cartSlice.reducer;

