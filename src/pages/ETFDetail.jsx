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
      { name: 'JPMorgan Chase & Co.', value: 1.1 },
      { name: 'Visa Inc.', value: 1.0 },
      { name: 'Procter & Gamble Co.', value: 0.9 },
      { name: 'Exxon Mobil Corp.', value: 0.9 },
      { name: 'Mastercard Inc.', value: 0.8 },
      // ... add more companies as needed
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

  // Sort holdings by value in descending order
  const sortedHoldings = [...etf.holdings].sort((a, b) => b.value - a.value);
  const topHoldings = sortedHoldings.slice(0, 10);
  const otherHoldings = sortedHoldings.slice(10);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{etf.name} - {etf.description}</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Holdings</h2>
        <div className="flex flex-col md:flex-row">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={topHoldings}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
              >
                {topHoldings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">All Holdings</h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Company</th>
                    <th className="text-right">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHoldings.map((holding, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="py-1">{holding.name}</td>
                      <td className="text-right py-1">{holding.value.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFDetail;
