import Head from 'next/head';
import HelloWorld from '../components/HelloWorld';
import styles from '../styles/Home.module.css';

import { useState } from 'react';
//material-ui
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

//components
import AffordLunch from '../components/AffordLunch';
import Salary from '../components/Salary';
import Team from '../components/Team';
import TechnologyUsed from '../components/TechnologyUsed';
import MintBeanShoutout from '../components/MintBeanShoutout';
import Explainer from '../components/Explainer';
import { Collapse, Container, Link } from '@material-ui/core';

export default function Home() {
	const transactions = HelloWorld() || [];
	const [submitted, setSubmit] = useState(false);
	const [hidden, setHidden] = useState(true);
	const [aboutusHidden, setAboutus] = useState(true);
	const [seeAll, setSeeAll] = useState(false);
	const [error, setError] = useState(false);
	const [state, setState] = useState({
		funds: 0,
		lastPaid: '2021-04-21',
		nextPay: '2021-05-05',
		cadence: 2,
		user: '',
	});
	const nameSet = new Set();
	nameSet.add('Josh').add('Lisa').add('Kathy');
	const handleChange = (e) => {
		setState({
			...state,
			user: e.target.value,
		});
		if (nameSet.has(state.user)) {
			setError(false);
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (nameSet.has(state.user)) {
			setSubmit(!submitted);
			setError(false);
		} else {
			setError(true);
		}
	};
	Date.prototype.addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};
	const handleBack = () => {
		setState({
			...state,
			user: '',
		});
		setSubmit(!submitted);
	};
	const toggleHidden = () => {
		setHidden(false);
	};
	const toggleAboutus = () => {
		setAboutus(!aboutusHidden);
	};
	const toggleFilter = () => {
		setSeeAll(!seeAll);
	};
	let total = state.funds;
	let nextNextPaycheck = state.nextPay;
	return (
		<div className={styles.container}>
			<Head>
				<title>Lunch Time</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1 className={styles.title}>Lunch Time</h1>
				{!submitted ? (
					<Container maxWidth="sm">
						<form className={styles.form} onSubmit={handleSubmit}>
							What is your name?
							<TextField
								error={error}
								onChange={handleChange}
								className={styles.text}
								id="standard-basic"
								label="Name"
								helperText="Please input a value of Josh, Kathy, or Lisa"
							/>
							<Button
								onClick={handleSubmit}
								className={styles.button}
								variant="contained"
								color="primary"
							>
								Submit
							</Button>
						</form>
						<Link href="#" onClick={toggleAboutus}>
							{aboutusHidden ? 'Show less' : 'Learn about our goals'}
						</Link>
						<Collapse in={aboutusHidden}>
							<Explainer />
							<MintBeanShoutout />
						</Collapse>
					</Container>
				) : (
					<>
						<Grow in={submitted} {...(submitted ? { timeout: 1000 } : {})}>
							<Paper elevation={4} className={styles.paper}>
								<Salary
									adjustSalary={({ funds, lastPaid, nextPay, cadence }) =>
										setState((prev) => ({
											...prev,
											funds,
											lastPaid,
											nextPay,
											cadence,
										}))
									}
									curr={state}
									toggleHidden={toggleHidden}
								/>
								{hidden ? null : (
									<AffordLunch
										curr={state}
										expenses={transactions.filter(
											(each) =>
												new Date(each.Date__E) > new Date(state.lastPaid) &&
												each.User__F === state.user &&
												new Date(each.Date__E) <= new Date(state.nextPay)
										)}
									/>
								)}

								<div className={styles.code}>
									<h2>Transactions</h2>
									<Button
										className={styles.button}
										variant="contained"
										onClick={toggleFilter}
										color="primary"
									>
										{seeAll ? 'See Less' : 'See All'}
									</Button>
									{transactions
										.filter((each) =>
											seeAll
												? new Date(each.Date__E) > new Date(state.lastPaid) &&
												  each.User__F === state.user
												: new Date(each.Date__E) > new Date(state.lastPaid) &&
												  each.User__F === state.user &&
												  new Date(each.Date__E) <= new Date(state.nextPay)
										)
										.map((item, idx) => {
											if (
												new Date(item.Date__E) >= new Date(nextNextPaycheck)
											) {
												total += state.funds;
												let payDate = new Date(nextNextPaycheck);
												let temp = payDate.addDays(14);
												nextNextPaycheck = `${temp.getFullYear()}-${
													temp.getMonth() + 1
												}-${temp.getDate() + 1}`;
											}
											total -= Number(item.Price__C);
											return (
												<div key={idx}>
													<p style={total > 0 ? null : { color: 'red' }}>
														{item.Purchase__B} - {item.Tag__D}: {item.Price__C}{' '}
														| {item.Date__E} | {item.User__F}
													</p>
												</div>
											);
										})}
								</div>
								<Button
									className={styles.button}
									variant="contained"
									onClick={handleBack}
									color="primary"
								>
									{`< back`}
								</Button>
							</Paper>
						</Grow>
					</>
				)}
			</main>

			<footer className={styles.footer}>
				<Team />
				<TechnologyUsed />
			</footer>
		</div>
	);
}
