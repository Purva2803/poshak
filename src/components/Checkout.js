import React, { useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { CartContext } from '../context/Cartcontext';
import { products } from '../backend/db/products';

export const Checkout = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { productId } = useParams();
  const product = products.find((product) => product._id === productId);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      address: '123, Home Street, Home City',
      phone: '1234567890',
      pincode: '123456',
      state: 'Home State',
      country: 'Home Country',
    },
    // Add more addresses here if needed
  ]);

  const addAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  const handleSelectAddress = (e) => {
    setSelectedAddress(e.target.value);
  };

  return (
    <div>
      <li key={product._id} style={styles.cartItem}>
        <img src={product.image} alt={product.name} height={'200'} width={'200'} />
        <h3>{product.name}</h3>
        <h4>price: {product.price}</h4>
        <h5>dealer: {product.dealer}</h5>
        <label>Select Address:</label>
        <select onChange={handleSelectAddress}>
          <option value="">Select an address</option>
          {addresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.name} - {address.address}
            </option>
          ))}
          <option value="add_new">Add New Address</option>
        </select>
        {selectedAddress === 'add_new' && (
          <div>
            <h4>Add New Address:</h4>
            {/* Add form fields to enter the new address details here */}
            <button>Add Address</button>
          </div>
        )}
        <button onClick={() => removeFromCart(product._id)}>Remove</button>
        <NavLink to={'/thankyou'}>
          <button>Place Order</button>
        </NavLink>
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




