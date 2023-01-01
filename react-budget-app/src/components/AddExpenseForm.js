import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Form } from "react-bootstrap";
import { getFormattedData } from "../context/utils";
import { getTransactions, postTransaction } from "../context/Requests";

const AddExpenseForm = (props) => {
  const [form, setform] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [userList, setUserList] = useState(props.userList);

  useEffect(() => {
    setUserList(props.userList);
    return () => {};
  }, [props]);

  const handleUsernames = (e) => {
    if (e.target.name === "usernames") {
      setUsernames([...usernames, { [e.target.value]: null }]);
      setUserList(userList.filter((user) => user !== e.target.value));

      console.log(usernames);
    }

    if (e.target.name === "singleSplit") {
      console.log(e.target, e.target.value);
      setUsernames(
        usernames.map((user) => {
          if (Object.keys(user)[0] === e.target.id) {
          return { [e.target.id]: e.target.value };
          }
          return user;
        })
      );
    }

    console.log(usernames);
  };

  const handleForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const { dispatch } = useContext(AppContext);

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log(getFormattedData(usernames));
    try {
      const payloadData = {
        ...form,
        ...getFormattedData(usernames),
      };

      const data = await postTransaction(payloadData);
      // emplty the form 
      if (data) {
        setform({
          name: "",
          category: "",
          amount: "",
        });
        setUsernames([]);
      }

      dispatch({
        type: "ADD_EXPENSE",
        payload: await getTransactions(),
      })

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="col-11">
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          required="required"
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={form.name}
          onChange={handleForm}
        />
      </Form.Group>
      <div className="col-11">
        <Form.Label htmlFor="cost">Total Amount</Form.Label>
        <Form.Control
          required="required"
          type="number"
          className="form-control"
          id="amount"
          name="amount"
          value={form.amount}
          onChange={handleForm}
        />
      </div>
      <div className="col-11">
        <Form.Label htmlFor="cost">Category</Form.Label>
        <Form.Control
          required="required"
          type="text"
          className="form-control"
          id="category"
          name="category"
          value={form.category}
          onChange={handleForm}
        />
      </div>
      <div className="col-11">
        <Form.Group className="my-1">
          <Form.Label htmlFor="disabledSelect" className="form">
            Select Friends to divide (* have to select atleast one)
          </Form.Label>
          <Form.Select
            id="disabledSelect"
            onChange={handleUsernames}
            name="usernames"
            className="form-control w-50"
            required
          >
            <option>select</option>
            {userList.map((user) => {
              return <option key={user}>{user}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </div>
      {usernames.map((user, index) => {
        const username = Object.keys(user)[0];
        return (
          <div className="row mx-1" key={index} >
            <div className="col-6" >
              <Form.Group className="">
                <Form.Label htmlFor="disabledSelect"></Form.Label>
                <Form.Control id="disabledSelect" disabled value={username} />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="">
                <Form.Label htmlFor="disabledSelect"></Form.Label>
                <Form.Control
                  id={username}
                  name="singleSplit"
                  value={null}
                  onChange={handleUsernames}
                />
              </Form.Group>
            </div>
          </div>
        );
      })}
      <div className="row my-5 mx-1">
        <div className="col-sm">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </Form>
  );
};

export default AddExpenseForm;
