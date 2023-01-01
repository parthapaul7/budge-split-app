import React, { createContext, useReducer } from "react";
import { deleteTransaction, getTransactions } from "./Requests";

// 5. The reduceer - update the state, based on the action
export const AppReducer = async (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
		console.log(action.payload);
      return {
        ...state,
        expenses: action.payload,
      };
    case "DELETE_EXPENSE":
		try {
			await deleteTransaction(action.payload);
			const data = await getTransactions();
			return {
			  ...state,
			  expenses: data.transactions
			}
		} catch (error) {
			console.log(error);
			return{
				...state,
			}	
		};

    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.payload,
      };

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  budget: 2000,
  expenses: [
    {
      pKey: "1@1",
      paid: "500.00",
      transaction_id: 1,
      transactions: {
        id: 1,
        name: "movie avatar2",
        amount: "1000.00",
        date: "2022-12-31",
        category: "faltu",
      },
    },
  ],
  isLoggedIn: "",
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // 5. Returns our context. Pass in the values we want to expose
  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
