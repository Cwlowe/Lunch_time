import { Grid } from '@material-ui/core';
import styles from '../styles/AffordLunch.module.css';
import Expense from './Expenses';
import Image from 'next/image'

export default function AffordLunch(props) {
	let total = parseInt(props.curr.funds);
	const foods = Expense() || [];

	
	for (let i = 0; i < props.expenses.length; i++) {
		total -= props.expenses[i].Price__C;
	}
	let afford = foods.length
		? foods.filter((each) => each.Price__C <= total)
		: [];
	let randomFood = afford.length
		? afford[Math.floor(Math.random() * afford.length)]
		: null;

	return (
		<Grid container justify="center" alignItems="center">
			<Grid item xs={6}>
				<h2>Can I afford lunch today?</h2>
				<p className={styles.total}>{total > 0 ? 'Yes!' : 'No'}</p>
			</Grid>
			<Grid item xs={6}>
				<h2>Remaining funds before next paycheck?</h2>
				<p className={styles.total}>
					${Math.round(100 * parseFloat(total)) / 100}
				</p>
				
			</Grid>
			<Grid item xs={12}>
				<Grid container justify="center" alignItems="center">
				{randomFood(
					<>
						<Grid item xs={12}>
						<h2 className={styles.total}>{`That's ${Math.floor(
								total / randomFood.Price__C
							)} ${randomFood.Food__A}s. ${randomFood.Desc__B}`}</h2>
						</Grid>
						

						<Grid item xs={4}>
						
						<img
							className={styles.image}
							src={`${randomFood.Url__D}`} 
							alt="Food Picture"
							width={500}
        					height={500}
						/>
						</Grid>
					</>
				) : null}
				</Grid>
			</Grid>
		</Grid>
	);
}
