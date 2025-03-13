import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SoccerWey - Live Soccer Match Experience',
  description: 'Experience live soccer matches with real-time updates, statistics, and interactive features.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-full bg-gradient-to-b from-green-50 to-white")}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
              <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <span className="text-xl font-bold text-green-600">SoccerWey</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                  <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Features</a>
                  <a href="#matches" className="text-gray-600 hover:text-green-600 transition-colors">Live Matches</a>
                  <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">About</a>
                  <a href="/login" className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors">
                    Sign In
                  </a>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center">
                        <span className="text-white font-bold">S</span>
                      </div>
                      <span className="text-xl font-bold">SoccerWey</span>
                    </div>
                    <p className="text-gray-400">Experience the future of live soccer matches.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                      <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                      <li><a href="#matches" className="text-gray-400 hover:text-white transition-colors">Live Matches</a></li>
                      <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Connect</h3>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                      <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                  <p>&copy; {new Date().getFullYear()} SoccerWey. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
