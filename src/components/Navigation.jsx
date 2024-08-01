import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { navItems } from "@/nav-items";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-secondary p-4">
      <ul className="flex space-x-4 justify-center">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.to ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
