import { Home, BarChart2, PieChart, ArrowLeftRight } from "lucide-react";
import Index from "./pages/Index.jsx";
import ETFList from "./pages/ETFList.jsx";
import ETFDetail from "./pages/ETFDetail.jsx";
import ETFComparison from "./pages/ETFComparison.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "ETF List",
    to: "/etfs",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <ETFList />,
  },
  {
    title: "ETF Detail",
    to: "/etf/:id",
    icon: <PieChart className="h-4 w-4" />,
    page: <ETFDetail />,
  },
  {
    title: "ETF Comparison",
    to: "/compare",
    icon: <ArrowLeftRight className="h-4 w-4" />,
    page: <ETFComparison />,
  },
];
