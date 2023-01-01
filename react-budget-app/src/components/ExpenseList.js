import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import { getTransactions } from '../context/Requests';

const ExpenseList = () => {
	const { expenses , dispatch } = useContext(AppContext);

	const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

	const setTrnasactions = async () => {
		const data = await getTransactions();
		setfilteredExpenses(data.transactions);
		// setfilteredExpenses(expenses);
	};
	
	
	useEffect(() => {
		setTrnasactions();
		// setfilteredExpenses(expenses);
		dispatch({
			type: 'ADD_EXPENSE',
			payload: filteredExpenses,
		})
	}, [expenses]);

	const handleChange = (event) => {
		const searchResults = expenses.filter((filteredExpense) =>
			filteredExpense?.transactions?.name.toLowerCase().includes(event.target.value)
		);
		setfilteredExpenses(searchResults);
	};

	return (
		<>
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Type to search...'
				onChange={handleChange}
			/>
			<ul className='list-group mt-3 mb-3'>
				{filteredExpenses.length && filteredExpenses.map((expense) => (
					<ExpenseItem
						key={expense.pKey}
						id={expense?.transactions?.id}
						name={expense?.transactions?.name}
						cost={expense.paid}
						amount={expense?.transactions?.amount}
						date={expense?.transactions?.date}
						category={expense?.transactions?.category}
					/>
				))}
			</ul>
		</>
	);
};

export default ExpenseList;
