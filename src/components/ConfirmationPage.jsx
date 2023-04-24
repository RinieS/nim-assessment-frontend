import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  return order ? <OrderConfirmation order={order} /> : null;
}

export default ConfirmationPage;
