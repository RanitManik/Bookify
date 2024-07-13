import { useState, useEffect } from "react";
import { CircleUser, Menu, Library, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { useFirebase } from "@/context/firebase.context.jsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";

const NavigationLink = ({ to, label, isSelected, onClick }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 transition-colors hover:text-foreground ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
    onClick={onClick}
  >
    {label && <span>{label}</span>}
  </Link>
);

export const NavigationComponent = () => {
  const { handleSignOut, user } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedNav, setSelectedNav] = useState(null);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Listing", to: "/list" },
    { label: "Products", to: "/products" },
    { label: "Setting", to: "/setting" },
    { label: "Support", to: "/support" },
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const matchingNavItem = navItems.find((item) => pathname === item.to);
    if (matchingNavItem) {
      setSelectedNav(matchingNavItem.label);
    } else {
      setSelectedNav(null); // Reset selectedNav if no match (optional)
    }
  }, [location.pathname, navItems]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 px-4 backdrop-blur-lg md:px-6">
      <div className="m-auto flex h-16 max-w-[1900px] items-center gap-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Library className="h-6 w-6" />
            <span className="mr-6">Bookify</span>
          </Link>
          {navItems.map(({ label, to }) => (
            <NavigationLink
              key={label}
              to={to}
              label={label}
              isSelected={selectedNav === label}
              onClick={() => setSelectedNav(label)}
            />
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
                onClick={() => setSelectedNav("Home")}
              >
                <Library className="h-6 w-6" />
                <span>Bookify</span>
              </Link>
              {navItems.map(({ label, to }) => (
                <NavigationLink
                  key={label}
                  to={to}
                  label={label}
                  isSelected={selectedNav === label}
                  onClick={() => setSelectedNav(label)}
                />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {user && user.displayName ? (
                  <Avatar>
                    <AvatarImage
                      src={user.photoURL}
                      alt={`@${user.displayName}`}
                    />
                    <AvatarFallback>
                      {user.displayName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <CircleUser />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/setting")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/support")}>
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
