import Head from 'next/head';
import HelloWorld from '../components/HelloWorld';
import styles from '../styles/Home.module.css';

import { useState } from 'react';
//material-ui
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

//components
import AffordLunch from '../components/AffordLunch';
import Salary from '../components/Salary';
import Team from '../components/Team';
import TechnologyUsed from '../components/TechnologyUsed';
import MintBeanShoutout from '../components/MintBeanShoutout';
import Explainer from '../components/Explainer';

const useStyles = makeStyles(() => ({
	root:{
		width:"50%"
	},
	form: {
	  	margin:"10%"
	},
	text:{
		marginTop:"5%",
		width:"100%"
	},
	button:{
		width:"100%",
		marginTop:"10%"
	},
	paper:{
		padding:"10%",
		marginTop:"5%"
	},
	transactions:{
		marginTop:"5%",
		borderRadius: "5px",
		fontSize: "1.1rem",
		fontFamily: "Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace"
	}


}));

export default function Home() {
	const transactions = HelloWorld() || [];
	const classes = useStyles();
	const [submitted, setSubmit] = useState(false)
	const [error,setError] = useState(false)
	const [state, setState] = useState({
		funds: 0,
		lastPaid: '2021-04-21',
		nextPay: '2021-05-05',
		cadence: 2,
		user: '',
	});
	const nameSet = new Set()
	nameSet.add("Josh").add("Lisa").add("Kathy")


	const handleChange = (e)=>{
		setState({
			...state, 
			user:e.target.value
		})
		if(nameSet.has(state.user)){
			setError(false)
		}
	}
	const handleSubmit =(e)=>{
		if(nameSet.has(state.user)){

			setSubmit(!submitted)
			setError(false)
		}else{
			setError(true)
		}
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
				{!submitted ?
				<div className={classes.root}>
				<form className={classes.form}>
					What is your name?
					<TextField 
						error={error} 
						onChange={handleChange} 
						className={classes.text} 
						id="standard-basic" 
						label="Name" 
						helperText="Please input a value of Josh, Kathy, or Lisa"
					/>
					<Button onClick={handleSubmit} className={classes.button} variant="contained" color="primary">Submit</Button>
				</form>
					<Explainer />
				<MintBeanShoutout />
				</div>
				:
				<>
				<Grow in={submitted} {...(submitted ? { timeout: 1000 } : {})}>
				<Paper elevation={4} className={classes.paper}>
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
					<div className={classes.transactions}>
						<h2>Transactions</h2>
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
											{item.Tag__D} - {item.Price__C} - {item.Date__E} - {item.User__F}
										</p>
									</div>
								);
							})}
					</div>
					<Button
						className={classes.button}
						variant="contained"
						onClick={handleBack}
						color="primary"
					>{`< back`}
					</Button>
					</Paper>
				</Grow>
				
				</>
				}
				
				
			</main>

			<footer className={styles.footer}>
				<Team />
				<TechnologyUsed />
				
			</footer>
		</div>
	);
}
