import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const fetchETFDetails = async (id) => {
  // This would be replaced with an actual API call
  return {
    id,
    name: 'SPY',
    description: 'SPDR S&P 500 ETF Trust',
    holdings: [
      { name: 'Apple Inc.', value: 7.1 },
      { name: 'Microsoft Corp.', value: 6.9 },
      { name: 'Amazon.com Inc.', value: 3.4 },
      { name: 'NVIDIA Corp.', value: 2.8 },
      { name: 'Alphabet Inc. Class A', value: 2.1 },
      { name: 'Other', value: 77.7 },
    ],
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const ETFDetail = () => {
  const { id } = useParams();
  const { data: etf, isLoading, error } = useQuery({ 
    queryKey: ['etf', id], 
    queryFn: () => fetchETFDetails(id)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{etf.name} - {etf.description}</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Holdings</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={etf.holdings}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {etf.holdings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ETFDetail;
