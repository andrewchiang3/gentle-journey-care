
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSelector } from "@/components/LanguageSelector";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const language = location.state?.language || 'en';

  const menuItems = [
    { path: '/', label: language === 'en' ? 'Home' : 'Inicio' },
    { path: '/clinics', label: language === 'en' ? 'Find a Clinic' : 'Encontrar una Clínica' },
    { path: '/resources', label: language === 'en' ? 'Resources' : 'Recursos' },
  ];

  const handleNavigation = (path: string) => {
    // Preserve language when navigating, but don't carry other state to home page
    if (path === '/') {
      navigate(path, { state: { language } });
    } else {
      // For other pages, preserve all current state and update the path
      navigate(path, { 
        state: { ...location.state, language } 
      });
    }
  };

  const renderMenuItems = () => (
    <div className={isMobile ? "flex flex-col space-y-4" : "flex items-center gap-4"}>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          onClick={() => handleNavigation(item.path)}
          className={`${location.pathname === item.path ? 'bg-muted' : ''}`}
        >
          {item.label}
        </Button>
      ))}
      <div className="ml-2">
        <LanguageSelector
          currentLanguage={language}
          onLanguageChange={(lang) => navigate(location.pathname, { 
            state: { ...location.state, language: lang } 
          })}
        />
      </div>
    </div>
  );

  return (
    <nav className="bg-white border-b px-4 py-3 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/f4a6e110-504c-4780-b9c6-30bec6066142.png"
            alt="Logo"
            className="w-8 h-8 md:w-10 md:h-10"
            onClick={() => handleNavigation('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              {renderMenuItems()}
            </SheetContent>
          </Sheet>
        ) : (
          renderMenuItems()
        )}
      </div>
    </nav>
  );
};
