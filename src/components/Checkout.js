import React, { useContext } from "react";
import { CartContext } from "..";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { products } from "../backend/db/products";
export const Checkout = () => {
  const { addAddress, updateAddress, deleteAddress, selectAddress } =
    useContext(CartContext);
  const { cart, removeFromCart } = useContext(CartContext);
  const { productId } = useParams();
  console.log(productId);

  const product = products.find((product) => product._id === productId);

  const handleAddAddress = () => {
    const address = {
      id: Math.random(),
      name: "Home",
      address: "123, Home Street, Home City",
      phone: "1234567890",
      pincode: "123456",
      state: "Home State",
      country: "Home Country",
    };
    addAddress(address);
  };

  const handleUpdateAddress = () => {
    const address = {
      id: 1,
      name: "Home",
      address: "123, Home Street, Home City",
      phone: "1234567890",
      pincode: "123456",
      state: "Home State",
      country: "Home Country",
    };
    updateAddress(address);
  };

  const handleDeleteAddress = () => {
    deleteAddress(1);
  };

  const handleSelectAddress = () => {
    selectAddress(1);
  };

  console.log(product);

  return (
    <div>
    <li key={product._id} style={styles.cartItem}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <h4>{product.price}</h4>
      <h5>{product.dealer}</h5>
      <button onClick={() => handleSelectAddress()}>Select Address</button>
      <NavLink to={"/thankyou"}>
        <button>Place Order</button>
      </NavLink>
  
      <button onClick={() => removeFromCart(product._id)}>Remove</button>
      
      
    </li>
  </div>
  
  );
};

const styles = {
  cartItem: {
    marginBottom: '20px', // Adjust the value as needed to create space between items
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

