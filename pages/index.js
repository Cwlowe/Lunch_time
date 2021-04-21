import Head from 'next/head';
import HelloWorld from '../components/HelloWorld';
import styles from '../styles/Home.module.css';

import { useState } from 'react';
//material-ui
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

//components
import AffordLunch from '../components/AffordLunch';
import Salary from '../components/Salary';
import Team from '../components/Team';
import TechnologyUsed from '../components/TechnologyUsed';
import MintBeanShoutout from '../components/MintBeanShoutout';

const useStyles = makeStyles(() => ({
	form: {
	  	margin:"5%"
	},
	text:{
		width:"100%"
	},
	button:{
		width:"100%",
		marginTop:"10%"
	}

}));

export default function Home() {
	const transactions = HelloWorld() || [];
	const classes = useStyles();
	const [submitted, setSubmit] = useState(false)
	const [state, setState] = useState({
		funds: 0,
		lastPaid: '2021-04-21',
		nextPay: '2021-05-05',
		cadence: 2,
		user: 'Josh',
	});
	const handleChange = (e)=>{
		setState({
			...state, 
			user:e.target.value
		})
		console.log(state)
	}
	const handleSubmit =(e)=>{
		
		setSubmit(!submitted)
	}

	const handleBack=()=>{
		setSubmit(!submitted)
	}
	return (
		<div className={styles.container}>
			<Head>
				<title>Lunch Time</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			
			<main className={styles.main}>
				<h1 className={styles.title}>
					Lunch Time
				</h1>
				{!submitted?
				<form className={classes.form}>
					What is your name?
					<TextField onChange={handleChange} className={classes.text} id="standard-basic" label="Name" />
					<Button onClick={handleSubmit} className={classes.button} variant="contained" color="primary">Submit</Button>
				</form>
				:
				<>
				<AffordLunch
					curr={state}
					expenses={transactions.filter(
						(each) =>
							new Date(each.Date__E) > new Date(state.lastPaid) &&
							each.User__F === state.user &&
							new Date(each.Date__E) <= new Date(state.nextPay)
					)}
				/>
				<Salary
					adjustSalary={({ funds, lastPaid, nextPay, cadence }) =>
						setState((prev) => ({ ...prev, funds, lastPaid, nextPay, cadence }))
					}
					curr={state}
				/>
				<div className={styles.code}>
					{transactions
						.filter(
							(each) =>
								new Date(each.Date__E) > new Date(state.lastPaid) &&
								each.User__F === state.user &&
								new Date(each.Date__E) <= new Date(state.nextPay)
						)
						.map((item, idx) => {
							return (
								<div key={idx}>
									<p>
										{item.Tag__D} - {item.Price__C} - {item.Date__E}
									</p>
								</div>
							);
						})}
				</div>
				<Button
					variant="contained"
				 	onClick={handleBack}
					color="primary"
				>{`< back`}
				</Button>
				</>
				}
				
				
			</main>

			<footer className={styles.footer}>
				<Team />
				<TechnologyUsed />
				<MintBeanShoutout />
			</footer>
		</div>
	);
}
