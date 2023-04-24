import React from "react";
import styles from "./styles/OrderConfirmation.module.css";

function OrderConfirmation({ order }) {
  return (
    <div className={styles.mainCointainer}>
      <h1 className={styles.header}>Thank you for your order</h1>
      <div className={styles.info}>
        <p>Name: {order.name}</p>
        <p>Address: {order.address}</p>
        <p>Phone: {order.phone}</p>
        <p>Order ID: {order.id}</p>
      </div>
      <h2>Items Ordered:</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.item.id}>
            {item.item.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderConfirmation;
