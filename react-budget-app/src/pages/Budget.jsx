import React,{useEffect,useState} from 'react';

import Budget from '../components/Budget';
import ExpenseTotal from '../components/ExpenseTotal';
import ExpenseList from '../components/ExpenseList';
import AddExpenseForm from '../components/AddExpenseForm';
import RemainingBudget from '../components/Remaining';

import { getUsers } from '../context/Requests';

const MainBudget= () => {
	const [userList, setUserList] = useState([])
	const getDatas = async () => { 
		const res = await getUsers()
		const data = res.map((user) => user.username)
		setUserList(data)
	}
	useEffect(() => {
		getDatas();
	}, []);

	return (
			<div className='container'>
				<h1 className='mt-3'>My Budget Planner</h1>
				<div className='row mt-3'>
					<div className='col-sm'>
						<Budget />
					</div>
					<div className='col-sm'>
						<RemainingBudget />
					</div>
					<div className='col-sm'>
						<ExpenseTotal />
					</div>
				</div>
				<div className='row '>
					<div className='col-5'>
				<h3 className='mt-3'>Expenses</h3>
						<AddExpenseForm userList={userList} />
					</div>
					<div className='col-7'>
				<h3 className='mt-3'>Add Expense</h3>
						<ExpenseList />
					</div>
				</div>
				<div className='row mt-3'>
					<div className='col-sm'>
					</div>
				</div>
			</div>
	);
};

export default MainBudget;