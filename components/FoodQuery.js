import { gql, useQuery } from '@apollo/client';

const GET_FOOD = gql`
	query expenses {
		expenses(q: "") {
			Food__A: String
			Desc__B: String
			Price__C: Float
			Url__D: String
		}
	}
`;

function FoodQuery() {
	const { loading, error, data } = useQuery(GET_FOOD);

	if (error) return JSON.stringify(error);
	if (loading) return [`Loading ...`];
	console.log(data);
	return data.expenses;
}

export default FoodQuery;
