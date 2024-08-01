import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BarChart2, PieChart, ArrowLeftRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8">ETF Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/etfs">
          <Button className="w-full h-32 text-lg">
            <BarChart2 className="mr-2 h-6 w-6" />
            View ETF List
          </Button>
        </Link>
        <Link to="/etf/1">
          <Button className="w-full h-32 text-lg">
            <PieChart className="mr-2 h-6 w-6" />
            ETF Details
          </Button>
        </Link>
        <Link to="/compare">
          <Button className="w-full h-32 text-lg">
            <ArrowLeftRight className="mr-2 h-6 w-6" />
            Compare ETFs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
