import { gql, useQuery } from '@apollo/client';

const GET_STEPZEN = gql`
	query transactions {
		transactions(q: "") {
			Purchase__B
			Price__C
			Tag__D
			Date__E
			ID__A
		}
	}
`;

function HelloWorld() {
	const { loading, error, data } = useQuery(GET_STEPZEN);

	if (error) return JSON.stringify(error);
	if (loading) return [`Loading ...`];

	return data.transactions;
}

export default HelloWorld;
