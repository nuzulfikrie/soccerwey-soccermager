// pages/api/auth/[...nextauth].ts
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import NextAuth, { AdapterUser, NextAuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

// Constants
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

// Type definitions
interface CustomUser extends User {
  id: string;
  role: string;
}

interface CustomToken extends JWT {
  role?: string;
  id?: string;
}

// Validate environment variables
const validateEnv = () => {
  const required = ['NEXTAUTH_SECRET']; // Only NEXTAUTH_SECRET is truly required
  required.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is missing`);
    }
  });
};

// Extracted authorize function
async function authorizeCredentials(credentials: Record<'email' | 'password', string> | undefined) {
  try {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Email and password are required');
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user || !user.hashedPassword) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,  // Add this line to include the role
    };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error instanceof Error ? error : new Error('Authentication failed');
  }
}

// Configure providers dynamically
const providers: NextAuthOptions['providers'] = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: authorizeCredentials,  // It's used here
  }),
];

// Add GoogleProvider only if client ID and secret are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        console.log('Google user:', user);

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: profile.name,
              role: 'USER',
            },
          });
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    })
  );
}

// NextAuth configuration
export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE,
  },
  jwt: {
    maxAge: SESSION_MAX_AGE,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'development'
          ? 'next-auth.session-token'
          : '__Secure-next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};

// Validate environment variables before initializing
validateEnv();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
