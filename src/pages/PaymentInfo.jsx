import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Cleave from "cleave.js/react";
import Navbar from "../components/Navbar";
// import "animate.css";
import "./PaymentInfo.css";
import { updateUser, addOrder } from "../redux/apiCalls";

export default function PaymentInfo() {
  const [inputs, setInputs] = useState({});
  const [order, setOrder] = useState({});
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.persist();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handlePay = async (e) => {
    e.preventDefault();
    if (currentUser.accountNumber == inputs.accountNumber) {
      if (currentUser.account >= cart.total) {
        const ammount = currentUser.account - cart.total;
        const formData = new FormData();
        formData.append("account", ammount);
        try {
          const a = await updateUser(currentUser._id, formData, dispatch);
          order.userId = currentUser._id;
          order.products = cart.products;
          order.address = inputs.address;
          order.total = cart.total;
          console.log(order);
          addOrder(order)
        } catch { }
      } else {
        console.log("no money");
      }
    } else {
      console.log("incorrect acc no");
    }
  };
  console.log(inputs);

  return (
    <div className="container">
      <Navbar />
      <form id="form">
        <div className="input-container">
          <h4>Payer: </h4>
          <text>
            {currentUser.firstName} {currentUser.lastName}
          </text>
        </div>
        <div className="input-container">
          <h4>Account Number</h4>
          <input
            name="accountNumber"
            onChange={handleChange}
            type="text"
            placeholder="Enter Account Number"
          />
        </div>
        <div className="input-container">
          <h4>Address</h4>
          <input
            name="address"
            onChange={handleChange}
            type="text"
            placeholder="Enter Address"
          />
        </div>

        <div className="input-grp"></div>
        <div className="input-container">
          <h4>Money Amount</h4>
          <text style={{ fontWeight: "bold", fontsize: "2rem" }}>
            ETB {cart.total}
          </text>
        </div>
        <button onClick={handlePay}>pay</button>
      </form>
    </div>
  );
}
