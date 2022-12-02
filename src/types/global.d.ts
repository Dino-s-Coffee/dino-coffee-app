import { type } from "os";

export { };

declare global {
    interface Product {
        id: string,
        name: string,
        image: string,
        description: string,
        basePrice: number,
    }
    interface ProductInCart extends Product {
        quantity: number,
        sizes: {
            name: string,
            price: number
        }[],
        temps: {
            name: string,
            price: number
        }[],
        sugar: {
            name: string,
            price: number
        }[],
        maxToppings: number,
        toppings: {
            name: string,
            price: number
        }[]
        otherDemand: {
            name: string,
        }[]
    }
    interface UserState {
        id: string,
        name: string,
        email: string,
        token: string,
        isLoggedIn: boolean,
        loading: 'idle' | 'pending' | 'succeeded' | 'failed'
    }

}
