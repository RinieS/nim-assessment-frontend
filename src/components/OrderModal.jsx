import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [missingFields, setMissingFields] = useState([]);
  const [phoneError, setPhoneError] = useState("");
  const phonePattern = /^[\d()-]+$/;

  const formatPhone = (p) => {
    const digits = p.replace(/\D/g, "");
    return digits.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
  };

  const validatePhone = (p) => {
    if (!p) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phonePattern.test(p)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const placeOrder = async () => {
    const missing = [];
    if (!name) missing.push("Name");
    if (!phone) missing.push("Phone");
    if (!address) missing.push("Address");
    setMissingFields(missing);
    if (missing.length > 0) return;

    const validPhone = validatePhone(phone);
    if (!validPhone) return;
    const formattedPhone = formatPhone(phone);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone: formattedPhone,
        address,
        items: order
      })
    });
    const data = await response.json();
    const id = await data.id;
    if (response.status === 200) {
      navigate(`/order-confirmation/${id}`);
    }
  };

  const missingFieldsMessage =
    missingFields.length > 0
      ? `Please fill in the following fields: ${missingFields.join(", ")}`
      : null;

  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
                required
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        {missingFieldsMessage && (
          <p className={styles.errorMessage}>{missingFieldsMessage}</p>
        )}
        {phoneError && <p className={styles.errorMessage}>{phoneError}</p>}

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
