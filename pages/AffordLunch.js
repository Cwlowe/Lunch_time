export default function AffordLunch(props) {
	let total = parseInt(props.curr.funds);

	for (let i = 0; i < props.expenses.length; i++) {
		total -= props.expenses[i].Price__C;
	}
	return (
		<section>
			<title>Can I Afford Lunch?</title>
			<h1>Can I afford Lunch today?</h1>
			<p>{total > 0 ? 'Yes!' : 'No'}</p>
			<h2>Remaining funds before next paycheck?</h2>
			<p>total: ${Math.round(100 * parseFloat(total)) / 100}</p>
		</section>
	);
}
