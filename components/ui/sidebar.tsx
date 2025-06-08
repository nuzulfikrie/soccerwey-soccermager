'use client';

import { Home, LogOut, Menu, Shield } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { Sheet, SheetContent, SheetTrigger } from './sheet';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, adminOnly: false },
  { href: '/users', label: 'Users', icon: Shield, adminOnly: true },
  // Add other navigation items here
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const renderNavLinks = () => {
    return navItems
      .filter(item => !item.adminOnly || (item.adminOnly && session?.user?.role === 'ADMIN'))
      .map(item => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${pathname === item.href
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-muted'
            }`}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </Link>
      ));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold">Soccermager</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">{renderNavLinks()}</nav>
        <div className="p-4 border-t">
          <div className="flex items-center mb-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={session?.user?.image ?? undefined} alt="User avatar" />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={() => signOut({ callbackUrl: '/login' })}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <header className="md:hidden flex items-center justify-between p-4 border-b bg-background">
        <h1 className="text-lg font-bold">Soccermager</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 flex flex-col">
            <div className="flex items-center justify-center h-16 border-b">
              <h1 className="text-xl font-bold">Soccermager</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">{renderNavLinks()}</nav>
            <div className="p-4 border-t">
              <div className="flex items-center mb-4">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session?.user?.image ?? undefined} alt="User avatar" />
                  <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={() => signOut({ callbackUrl: '/login' })}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
