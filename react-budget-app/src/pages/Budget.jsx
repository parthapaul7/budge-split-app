import React, { useEffect, useState } from "react";

import ExpenseList from "../components/ExpenseList";
import AddExpenseForm from "../components/AddExpenseForm";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../context/Requests";

const MainBudget = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const getDatas = async () => {
    const res = await getUsers();
    const data = res.map((user) => user.username);
    setUserList(data);
  };
  useEffect(() => {
    getDatas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    navigate("/login");
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-11">
          <h1 className="mt-3 ">My Budget Planner</h1>
        </div>
        <div className="col-1">
          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <hr />
      <div className="row ">
        <div className="col-5">
          <h3 className="mt-3">Add Expense</h3>
          <AddExpenseForm userList={userList} />
        </div>
        <div className="col-7">
          <h3 className="mt-3">Expenses</h3>
          <ExpenseList />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm"></div>
      </div>
    </div>
  );
};

export default MainBudget;
