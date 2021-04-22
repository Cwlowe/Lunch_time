import { gql, useQuery } from '@apollo/client';

const GET_QUERY = gql`
	query MyQuery {
		expenses(q: "") {
			Desc__B
			Price__C
			Url__D
			Food__A
		}
	}
`;

function Expenses() {
	const { loading, error, data } = useQuery(GET_QUERY);

	if (loading) return <p>Loading ...</p>;

	if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

	return data.expenses;
}

export default Expenses;
