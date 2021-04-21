import { useState } from 'react';

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
				onSubmit={(event) => {
					event.preventDefault();
					props.adjustSalary(state);
				}}
			>
				<label>
					Paycheck Amt:
					<input
						min={0}
						type="number"
						placeholder="paycheck amount"
						value={state.funds}
						name="funds"
						onChange={(event) => {
							const { name, value } = event.target;
							setState((prev) => ({ ...prev, [name]: value }));
						}}
					></input>
				</label>
				<label>
					Last Paid Date:
					<input
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
					></input>
				</label>
				<label>
					Weeks between paycheck:
					<input
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
					></input>
				</label>
				<input className="save-button" type="submit" value="Save"></input>
			</form>
		</section>
	);
}
