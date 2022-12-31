import React, { useContext, useEffect,useState} from "react";
import { AppContext } from "../context/AppContext";
import { Form } from "react-bootstrap";

const AddExpenseForm = (props) => {
  const [form, setform] = useState({});
  const [usernames, setUsernames] = useState([]);
  const [userList, setUserList] = useState(props.userList);

  useEffect(() => {
    setUserList(props.userList);
    return () => {
    }
  }, [props])
  

  const handleUsernames = (e) => {
    if (e.target.name === "usernames") {
      setUsernames([...usernames, e.target.value] );
      setUserList(userList.filter((user) => user !== e.target.value));
    }

    console.log(form);
  };

  const handleForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const { dispatch } = useContext(AppContext);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_EXPENSE",
      payload: "",
    });
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
        <Form.Label htmlFor="cost">Cost</Form.Label>
        <Form.Control
          required="required"
          type="number"
          className="form-control"
          id="cost"
          name="amount"
          value={form.amount}
          onChange={handleForm}
        />
      </div>
      <div className="col-11">
        <Form.Group className="my-1">
          <Form.Label htmlFor="disabledSelect" className="form">
            Select user
          </Form.Label>
          <Form.Select
            id="disabledSelect"
            onChange={handleUsernames}
            name="usernames"
            className="form-control w-50"
          >
            <option>select</option>
            {userList.map((user) => {
              return <option key={user}>{user}</option>;
            })}
          </Form.Select>
        </Form.Group>
      </div>
      {usernames.map((user, index) => {
        return (
          <div className="row mx-1">
            <div className="col-6" key={index}>
              <Form.Group className="">
                <Form.Label htmlFor="disabledSelect"></Form.Label>
                <Form.Control
                  id="disabledSelect"
                  disabled
                  value={user}
                  name="singleSplit"
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="">
                <Form.Label htmlFor="disabledSelect"></Form.Label>
                <Form.Control id="disabledSelect" name="singleSplit" />
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
