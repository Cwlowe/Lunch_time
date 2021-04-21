import Head from 'next/head';
import HelloWorld from '../components/HelloWorld';
import styles from '../styles/Home.module.css';
import Salary from './Salary';
import { useState } from 'react';
import Team from './Team';
import TechnologyUsed from './TechnologyUsed';
import MintBeanShoutout from './MintBeanShoutout';
import AffordLunch from './AffordLunch';

export default function Home() {
	const transactions = HelloWorld() || [];
	const [state, setState] = useState({
		funds: 0,
		lastPaid: '2021-04-21',
		cadence: 0,
		user: 'Josh',
	});
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>

				<p className={styles.description}>
					Get started by editing{' '}
					<code className={styles.code}>pages/index.js</code>
				</p>
				<AffordLunch
					amount={state.funds}
					expenses={transactions.filter(
						(each) =>
							each.Date__E > state.lastPaid && each.User__F === state.user
					)}
					cadence={state.cadence}
				/>
				<Salary
					adjustSalary={(newSal, date, cadence) =>
						setState({ funds: newSal, lastPaid: date, cadence: cadence })
					}
					curr={state}
				/>
				<div className={styles.code}>
					{transactions
						.filter(
							(each) =>
								each.Date__E > state.lastPaid && each.User__F === state.user
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
				<Team />
				<TechnologyUsed />
				<MintBeanShoutout />
			</main>

			<footer className={styles.footer}>
				<a
					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Powered by{' '}
					<img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
				</a>
			</footer>
		</div>
	);
}
