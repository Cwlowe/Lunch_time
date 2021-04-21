import Head from 'next/head';
import HelloWorld from '../components/HelloWorld';
import styles from '../styles/Home.module.css';
import Salary from './Salary';
import { useState } from 'react';

export default function Home() {
	const transactions = HelloWorld() || [];
	const [state, setState] = useState({ funds: 0, lastPaid: '', cadence: 0 });
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
				<Salary
					adjustSalary={(newSal, date, cadence) =>
						setState({ funds: newSal, lastPaid: date, cadence: cadence })
					}
				/>
				<div className={styles.code}>
					{transactions.map((item) => {
						return (
							<div key={item.ID__A || 0}>
								<p>{item.Purchase__B}</p>
								<p>{item.Price__C}</p>
							</div>
						);
						// <p key={item.ID__A || 0}>{item.Purchase__B}</p>
					})}
				</div>
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
