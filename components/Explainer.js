import React from "react";

export default function Explainer() {
	return (
		<div>
			<h2>About Lunch Time</h2>
			<p>
				Lunch time is an application that tells you if you can afford to buy lunch
				today. To use the app, start by entering the profile name you wish to
				use. Currently we have three user profiles built for you. Josh, Lisa and Kathy. Each profile pays different
				amounts for rent, groceries and bills. In the future we would like to
				allow users to set up their own profiles for use. Then enter the amount
				and date of your most recent paycheck along with how often you get paid.
				The application then makes a call to a google sheet using StepZen and
				GraphQL and returns all the bills you will have to pay between your last
				paycheck and your next paycheck. Calculating the differences, Lunch time will inform you if you can afford to buy lunch today and still
				pay all of your bills.
			</p>
		</div>
	);
}
