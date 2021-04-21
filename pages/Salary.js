import { useState } from 'react';
export default function Salary(props) {
	const [state, setState] = useState({
		funds: props.curr.funds,
		lastPaid: props.curr.lastPaid,
		cadence: props.curr.cadence,
		edit: false,
	});
	return (
		<section>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					props.adjustSalary(state.funds, state.lastPaid, state.cadence);
				}}
			>
				<input
					type="number"
					placeholder="paycheck amount"
					value={state.funds}
					name="funds"
					onChange={(event) => {
						const { name, value } = event.target;
						setState((prev) => ({ ...prev, [name]: value }));
					}}
				></input>
				<input
					type="date"
					name="lastPaid"
					placeholder="last paid"
					value={state.lastPaid}
					onChange={(event) => {
						const { name, value } = event.target;
						setState((prev) => ({ ...prev, [name]: value }));
					}}
				></input>
				<input
					type="number"
					name="cadence"
					placeholder="weeks between each paycheck"
					value={state.cadence}
					onChange={(event) => {
						const { name, value } = event.target;
						setState((prev) => ({ ...prev, [name]: value }));
					}}
				></input>
				<input className="save-button" type="submit" value="Save"></input>
			</form>
		</section>
	);
}
