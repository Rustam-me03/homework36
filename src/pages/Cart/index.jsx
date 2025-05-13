import React from "react";
import { useCart } from "../../hooks/useCart";
import "./Cart.scss";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.items.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>Quantity: {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
