import axios from 'axios';

export async function fetchAllProducts() {
    try {
        // const response = await axios.get(`${process.env.REACT_APP_BASEURL}/user/products`);
        // const data = await response.json();
        // return data;
        const products: Product[] = [
            { id: '1', image: '/assets/imgs/products/1.png', name: 'Capuchino', basePrice: 10000, description: 'A cappuccino is the perfect balance of espresso, steamed milk and foam. This coffee is all about the structure and the even splitting of all elements into equal thirds. An expertly made cappuccino should be rich, but not acidic and have a mildly sweet flavouring from the milk.' },
            { id: '2', image: '/assets/imgs/products/2.png', name: 'Expresso', basePrice: 20000, description: 'Ca phe expresso sieu ngon' },
            { id: '3', image: '/assets/imgs/products/3.png', name: 'Cà phê sữa', basePrice: 30000, description: 'Ca phe sua ngon' },
            { id: '4', image: '/assets/imgs/products/4.png', name: 'Cà phê đen', basePrice: 30000, description: 'Ca phe den ngon' },
            { id: '5', image: '/assets/imgs/products/5.png', name: 'Trà sữa', basePrice: 30000, description: 'Tra sua ngon' },
            { id: '6', image: '/assets/imgs/products/6.png', name: 'Trà đá', basePrice: 30000, description: 'Tra da ngon' },
            { id: '7', image: '/assets/imgs/products/7.png', name: 'Trà chanh', basePrice: 30000, description: 'Tra chanh ngon' },
            { id: '8', image: '/assets/imgs/products/8.png', name: 'Trà xanh', basePrice: 30000, description: 'Tra xanh ngon' },
            { id: '9', image: '/assets/imgs/products/9.png', name: 'Trà dâu', basePrice: 30000, description: 'Tra dau ngon' },
            { id: '10', image: '/assets/imgs/products/10.png', name: 'Trà đào', basePrice: 30000, description: 'Tra dao ngon' },
        ]
        return products;
    }
    catch (error) {
        console.log(error);
    }
}

export async function fetchProductById(id: string) {
    try {
        const products = await fetchAllProducts();
        if (products) {
            const product = products.find(product => product.id === id);
            if (product) {
                return product;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}