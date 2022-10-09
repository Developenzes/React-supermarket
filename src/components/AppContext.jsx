import { createContext } from "react";
import { useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider(props) {
    const [cart, setCart] = useState(() => {
        let savedCart = [];
        try {
          savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        } catch (error) {
          savedCart = [];
        }
        return savedCart;
    });
    
    useEffect(() => {
        if (cart) {
          localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);
    

    const handleProductAdd = (newProduct) => {
        const existingProduct = cart.find(product => product?.id.integerValue === newProduct?.id.integerValue);

        if(existingProduct) {
            const updatedQuantity = cart.map(product => {
                if(product?.id.integerValue === newProduct?.id.integerValue ) {
                    return {
                    ...newProduct, quantity: product.quantity + 1
                    }
                }
                return product;
            });
            setCart(updatedQuantity)
        } else {
            setCart([...cart, {...newProduct, quantity: 1}]);
        }
    }

    const handleProductDelete = (id) => {
        const updatedQuantity = cart.filter(product => product.id.integerValue !== id)
        setCart(updatedQuantity);
    }

    const value = {
        cart,
        onProductAdd: handleProductAdd,
        onProductDelete: handleProductDelete
    }
     
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

