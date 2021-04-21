import { setState } from 'react';
export default function Salary(props) {
	// const [state, setState] = useState({});
	return (
		<section>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					props.adjustSalary(event);
				}}
			>
				<input
					type="number"
					placeholder="paycheck amount"
					value={props.state.funds}
				></input>
				<input
					type="date"
					placeholder="last paid"
					value={props.state.lastPaid}
				></input>
				<input
					type="number"
					placeholder="weeks between each paycheck"
					value={props.state.cadence}
				></input>
			</form>
		</section>
	);
}
