import React, { useContext } from "react";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";

const ExpenseItem = (props) => {
  const { dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    alert("Are you sure you want to delete this expense?");
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.id,
    });
    window.location.reload();
  };

  return (
    <li className="list-group-item ">
      <div className="d-block d-flex justify-content-between align-items-center">
        <h5>{props.name}</h5>
        <div>
          Your Split :-{" "}
          <span className="badge badge-primary badge-pill mr-3 ">
            ₹{props.cost}
          </span>
          <TiDelete size="1.5em" onClick={handleDeleteExpense} />
        </div>
      </div>
      <div className="d-block d-flex justify-content-between my-2">
        <div>Catagory:-- {props?.category}</div>
        <div className="">Date:-- {props?.date}</div>
        <div className="mr-3">
          Toal Amout:{" "}
          <span className="badge badge-primary badge-pill mr-3 ">
            ₹{props.amount}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ExpenseItem;
