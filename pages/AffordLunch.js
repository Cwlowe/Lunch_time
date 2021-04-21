export default function AffordLunch(props) {
	let total = props.amount;
	let nextPayDate = new Date();
	//  + 7 * props.cadence).slice(0, 10);
	console.log(nextPayDate);
	for (let i = 0; i < props.expenses.length; i++) {
		if (props.expenses.Date__E < nextPayDate) total += props.expenses.Price__C;
	}
	console.log(props.expenses, 'hi');
	return (
		<section>
			<title>Can I Afford Lunch?</title>
			{total > 0 ? 'Yes!' : 'No'}
			<p>Ending salary before next paycheck?</p>
			total: {total}
		</section>
	);
}
