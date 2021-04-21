import { setState } from 'react';
export default function Salary(props) {
	return (
		<section>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					adjustSalary();
				}}
			>
				<input type="number" placeholder="paycheck amount"></input>
				<input type="date" placeholder="last paid"></input>
				<input type="number" placeholder="weeks between each paycheck"></input>
			</form>
		</section>
	);
}
