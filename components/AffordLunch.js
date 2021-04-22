import { Grid } from '@material-ui/core';
import styles from '../styles/AffordLunch.module.css';
import FoodQuery from './FoodQuery';

export default function AffordLunch(props) {
	let total = parseInt(props.curr.funds);
	const foods = FoodQuery() || [];
	let afford = foods.filter((each) => each.Price__C < total);
	let randomFood = afford[Math.floor(Math.random() * afford.length)];
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
				<p className={styles.total}>{`That's ${Math.min(
					total / randomFood.Price__C
				)} ${randomFood.Food__A}s. ${randomFood.Desc__B}`}</p>
				<img url={randomFood.Url__D} />
			</Grid>
		</Grid>
	);
}
