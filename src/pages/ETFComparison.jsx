import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const fetchETFList = async () => {
  // This would be replaced with an actual API call
  return [
    { id: 1, name: 'SPY', description: 'SPDR S&P 500 ETF Trust' },
    { id: 2, name: 'QQQ', description: 'Invesco QQQ Trust' },
    { id: 3, name: 'VTI', description: 'Vanguard Total Stock Market ETF' },
    { id: 4, name: 'DFNG', description: 'Defiance Next Gen SPAC Derived ETF' },
  ];
};

const fetchETFPerformance = async (ids) => {
  // This would be replaced with an actual API call
  return [
    { year: '2019', SPY: 31.2, QQQ: 39.1, VTI: 30.8, DFNG: 15.3 },
    { year: '2020', SPY: 18.4, QQQ: 48.6, VTI: 21.0, DFNG: 22.7 },
    { year: '2021', SPY: 28.7, QQQ: 27.2, VTI: 25.7, DFNG: -3.2 },
    { year: '2022', SPY: -18.1, QQQ: -32.6, VTI: -19.5, DFNG: -28.9 },
  ];
};

const ETFComparison = () => {
  const [selectedETFs, setSelectedETFs] = useState([]);
  const { data: etfList } = useQuery({ queryKey: ['etfList'], queryFn: fetchETFList });
  const { data: performanceData } = useQuery({ 
    queryKey: ['etfPerformance', selectedETFs], 
    queryFn: () => fetchETFPerformance(selectedETFs),
    enabled: selectedETFs.length > 0
  });

  const handleETFSelect = (value) => {
    if (selectedETFs.includes(value)) {
      setSelectedETFs(selectedETFs.filter(etf => etf !== value));
    } else if (selectedETFs.length < 3) {
      setSelectedETFs([...selectedETFs, value]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ETF Comparison</h1>
      <div className="mb-4">
        <Select onValueChange={handleETFSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select ETF" />
          </SelectTrigger>
          <SelectContent>
            {etfList?.map(etf => (
              <SelectItem key={etf.id} value={etf.name}>
                {etf.name} - {etf.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        Selected ETFs: {selectedETFs.join(', ')}
      </div>
      {performanceData && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedETFs.map((etf, index) => (
              <Bar key={etf} dataKey={etf} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ETFComparison;
