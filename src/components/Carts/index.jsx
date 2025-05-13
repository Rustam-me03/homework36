import React from "react";
import { useCart } from "../../hooks/useCart";
import "./Cart.scss";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.items.map(item => (
            <li key={item.id}>
              {item.title} x {item.quantity} - ${item.price.toFixed(2)}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      {cart.items.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
};

export default Cart;
