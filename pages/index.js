import Head from 'next/head';
import HelloWorld from '../components/HelloWorld';
import styles from '../styles/Home.module.css';
import Salary from './Salary';
import { useState } from 'react';
import Team from './Team';
import TechnologyUsed from './TechnologyUsed';
import MintBeanShoutout from './MintBeanShoutout';
import AffordLunch from './AffordLunch';
import Team from './Team';

export default function Home() {
	const transactions = HelloWorld() || [];
	const [state, setState] = useState({
		funds: 0,
		lastPaid: '2021-04-21',
		nextPay: '2021-05-05',
		cadence: 2,
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
