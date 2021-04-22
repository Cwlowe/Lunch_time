import { useState } from 'react';
//material-ui
import TextField from '@material-ui/core/TextField';

//css
import styles from '../styles/Salary.module.css';
import { Button, Grid } from '@material-ui/core';

export default function Salary(props) {
	const [state, setState] = useState({
		funds: props.curr.funds,
		lastPaid: props.curr.lastPaid,
		cadence: props.curr.cadence,
		nextPay: props.curr.nextPay,
		edit: false,
	});
	Date.prototype.addDays = function (days) {
		const date = new Date(this.valueOf());
		date.setDate(date.getDate() + days);
		return date;
	};
	return (
		<section>
			<form
				className={styles.form}
				onSubmit={(event) => {
					event.preventDefault();
					props.adjustSalary(state);
				}}
			>
				<Grid container className={styles.form}>
					<Grid item xs={6}>
						<label>
							<p>Enter your last paycheck amount:</p>
							<TextField
								min={0}
								type="number"
								placeholder="Paycheck Amount"
								value={state.funds}
								name="funds"
								onChange={(event) => {
									const { name, value } = event.target;
									setState((prev) => ({ ...prev, [name]: Number(value) }));
								}}
							></TextField>
						</label>
					</Grid>
					<Grid item xs={6}>
						<label>
							<p>Last Paid Date:</p>
							<TextField
								max={new Date().toJSON().slice(0, 10)}
								type="date"
								name="lastPaid"
								placeholder="last paid"
								value={state.lastPaid}
								onChange={(event) => {
									const { name, value } = event.target;
									let lastPaid = new Date(value);
									let next = lastPaid.addDays(7 * state.cadence);
									setState((prev) => ({
										...prev,
										[name]: value,
										nextPay: `${next.getFullYear()}-${next.getMonth() + 1}-${
											next.getDate() + 1
										}`,
									}));
								}}
							></TextField>
						</label>
					</Grid>
					<Grid item xs={6}>
						<label>
							<p>Weeks between paycheck:</p>
							<TextField
								min={0}
								max={51}
								type="number"
								name="cadence"
								placeholder="weeks between each paycheck"
								value={state.cadence}
								onChange={(event) => {
									const { name, value } = event.target;

									let lastPaid = new Date(state.lastPaid);
									let next = lastPaid.addDays(7 * value);

									setState((prev) => ({
										...prev,
										[name]: value ? parseInt(value) : 0,
										nextPay: `${next.getFullYear()}-${next.getMonth() + 1}-${
											next.getDate() + 1
										}`,
									}));
								}}
							></TextField>
						</label>
					</Grid>
				</Grid>

				<Button
					className={styles.button}
					variant="contained"
					color="primary"
					onClick={props.toggleHidden}
					type="submit"
				>
					Enter
				</Button>
			</form>
		</section>
	);
}
