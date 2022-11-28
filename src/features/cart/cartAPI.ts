export function fetchCart() {
//   return fetch("https://fakestoreapi.com/carts/1")
//     .then((response) => response.json())
//     .then((data) => {
//       return data;
//     });
    return {
        items: [
            {
                product: {
                    id: "1",
                    name: "Coffee",
                    image: "https://images.unsplash.com/photo-1593642532972-7d3a1b3d4b72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    price: 10,
                },
                quantity: 1,
            },
            {
                product: {
                    id: "2",
                    name: "Tea",
                    image: "https://images.unsplash.com/photo-1593642532972-7d3a1b3d4b72?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29mZmVlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                    price: 10,
                },
                quantity: 1,
            },
        ],
        total: 20,
    };
}