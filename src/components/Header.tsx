import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Settings, Store, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,




  
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  const { user, signOut, loading } = useAuth();
  const { profile, isOwner } = useProfile();
  const { products } = useProducts();

  const handleSignOut = async () => {
    await signOut();
  };

  // Get all unique categories from actual products
  const categories = Array.from(new Set(products.map(p => p.category))).sort();

  return (
    <header className="bg-white shadow-sm border-b animate-slide-in-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center animate-bounce-in">
            <Link to="/" className="flex items-center bg-white p-2 rounded transform hover:scale-105 transition-all duration-300">
              <img 
                src="https://bonemart.wordpress.com/wp-content/uploads/2025/05/whatsapp-image-2025-05-17-at-6.50.36-pm-1.jpeg" 
                alt="Bonemart Logo" 
                className="h-16 w-auto object-contain bg-white animate-float"
                style={{ border: 'none', outline: 'none' }}
              />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 animate-fade-in-up">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-110 relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/products">
                    <NavigationMenuTrigger className="text-gray-700 hover:text-green-600 transition-all duration-300 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto p-0 font-normal transform hover:scale-110 relative group">
                      Products
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent className="animate-fade-in">
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <div className="col-span-2 animate-bounce-in">
                        <Link
                          to="/products"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transform hover:scale-105"
                        >
                          <div className="text-sm font-medium leading-none">All Products</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse our complete collection of products ({products.length} items)
                          </p>
                        </Link>
                      </div>
                      {categories.length > 0 ? (
                        categories.map((category, index) => {
                          const categoryCount = products.filter(p => p.category === category).length;
                          return (
                            <Link
                              key={category}
                              to={`/products?category=${encodeURIComponent(category)}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transform hover:scale-105 animate-fade-in-up"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div className="text-sm font-medium leading-none flex justify-between items-center">
                                <span>{category}</span>
                                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
                                  {categoryCount}
                                </span>
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <div className="col-span-2 p-3 text-center text-sm text-muted-foreground">
                          No categories available yet
                        </div>
                      )}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-110 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-110 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4 animate-slide-in-right">            
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-all duration-300 transform hover:scale-110 hover:animate-glow"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-in">
                    {cartItemCount}
                  </span>
                )}
              </button>
            

            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-2 transition-all duration-300 transform hover:scale-105">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">Account</span>                       
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="animate-fade-in">
                      <DropdownMenuItem disabled>
                        {user.email}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center transition-all duration-300 hover:translate-x-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="transition-all duration-300 hover:translate-x-1">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/auth">
                    <Button variant="outline" size="sm" className="transition-all duration-300 transform hover:scale-105 hover:animate-glow">
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
