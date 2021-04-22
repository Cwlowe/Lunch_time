import { Grid } from '@material-ui/core';
import styles from '../styles/AffordLunch.module.css';
import Expense from './Expenses';

export default function AffordLunch(props) {
	let total = parseInt(props.curr.funds);
	const foods = Expense() || [];

	let afford = foods.length
		? foods.filter((each) => each.Price__C <= total)
		: [];
	let randomFood = afford.length
		? afford[Math.floor(Math.random() * afford.length)]
		: null;
	console.log(foods, afford, randomFood, 'hi');
	for (let i = 0; i < props.expenses.length; i++) {
		total -= props.expenses[i].Price__C;
	}

	return (
		<Grid container justify="center" alignItems="center">
			<Grid item xs={5}>
				<h2>Can I afford lunch today?</h2>
				<p className={styles.total}>{total > 0 ? 'Yes!' : 'No'}</p>
			</Grid>
			<Grid item xs={5}>
				<h2>Remaining funds before next paycheck?</h2>
				<p className={styles.total}>
					${Math.round(100 * parseFloat(total)) / 100}
				</p>
				{randomFood ? (
					<>
						<p className={styles.total}>{`That's ${Math.floor(
							total / randomFood.Price__C
						)} ${randomFood.Food__A}s. ${randomFood.Desc__B}`}</p>
						<img src={`${randomFood.Url__D}`} />{' '}
					</>
				) : null}
			</Grid>
		</Grid>
	);
}
