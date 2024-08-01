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
      { name: 'Meta Platforms Inc.', value: 2.0 },
      { name: 'Tesla Inc.', value: 1.8 },
      { name: 'Berkshire Hathaway Inc.', value: 1.7 },
      { name: 'UnitedHealth Group Inc.', value: 1.3 },
      { name: 'Johnson & Johnson', value: 1.2 },
      { name: 'Other', value: 61.7 },
    ],
  };
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed'];

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
        <div className="flex flex-col md:flex-row">
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {etf.holdings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 md:mt-0 md:ml-4">
            <h3 className="text-lg font-semibold mb-2">Top Holdings</h3>
            <ul className="list-disc pl-5">
              {etf.holdings.map((holding, index) => (
                <li key={index} className="mb-1">
                  <span className="font-medium">{holding.name}:</span> {holding.value.toFixed(1)}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFDetail;
