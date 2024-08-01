import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const fetchETFs = async () => {
  // This would be replaced with an actual API call
  return [
    { id: 1, name: 'SPY', description: 'SPDR S&P 500 ETF Trust' },
    { id: 2, name: 'QQQ', description: 'Invesco QQQ Trust' },
    { id: 3, name: 'VTI', description: 'Vanguard Total Stock Market ETF' },
  ];
};

const ETFList = () => {
  const [search, setSearch] = useState('');
  const { data: etfs, isLoading, error } = useQuery({ queryKey: ['etfs'], queryFn: fetchETFs });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const filteredETFs = etfs.filter(etf => 
    etf.name.toLowerCase().includes(search.toLowerCase()) || 
    etf.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ETF List</h1>
      <Input
        type="text"
        placeholder="Search ETFs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredETFs.map((etf) => (
            <TableRow key={etf.id}>
              <TableCell>{etf.name}</TableCell>
              <TableCell>{etf.description}</TableCell>
              <TableCell>
                <Link to={`/etf/${etf.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ETFList;
