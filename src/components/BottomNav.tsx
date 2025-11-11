import { Home, Activity, TrendingUp, Crown, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-screen-lg mx-auto px-2">
        <NavLink
          to="/"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary font-medium"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs">Início</span>
        </NavLink>
        
        <NavLink
          to="/registro"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary font-medium"
        >
          <Activity className="h-5 w-5" />
          <span className="text-xs">Registro</span>
        </NavLink>
        
        <NavLink
          to="/historico"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary font-medium"
        >
          <TrendingUp className="h-5 w-5" />
          <span className="text-xs">Histórico</span>
        </NavLink>
        
        <NavLink
          to="/premium"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-premium transition-colors"
          activeClassName="text-premium font-medium"
        >
          <Crown className="h-5 w-5" />
          <span className="text-xs">Premium</span>
        </NavLink>
        
        <NavLink
          to="/perfil"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-primary transition-colors"
          activeClassName="text-primary font-medium"
        >
          <User className="h-5 w-5" />
          <span className="text-xs">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
};
