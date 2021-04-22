import { Grid } from "@material-ui/core";
import styles from "../styles/AffordLunch.module.css"
export default function AffordLunch(props) {
	let total = parseInt(props.curr.funds);

	for (let i = 0; i < props.expenses.length; i++) {
		total -= props.expenses[i].Price__C;
	}
	return (
		<Grid container justify="center" alignItems="center">
			<Grid item xs={5}>
			<h2>Can I afford Lunch today?</h2>
			<p className={styles.total}>{total > 0 ? 'Yes!' : 'No'}</p>
			</Grid>
			<Grid item xs={5}>
				<h2>Remaining funds before next paycheck?</h2>
				<p className={styles.total}>${Math.round(100 * parseFloat(total)) / 100}</p>
			</Grid>
		</Grid>
	);
}
