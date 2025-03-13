import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);  // Pass authOptions here
  {
/**
if user is not logged in, redirect to login page
 */}
  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session.user.name || 'User'}!</h2>
          <p className="text-muted-foreground">
            You are logged in as: {session.user.email}

            {JSON.stringify(session)}
          </p>
          <p className="text-muted-foreground mt-2">
            {/**
             * get user role from db and display it
             *  
             */}
            Role: {session.user.role}
          </p>
        </div>

        {/* Add more dashboard widgets here */}
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">Total Matches: Loading...</p>
            <p className="text-muted-foreground">Active Players: Loading...</p>
            <p className="text-muted-foreground">Recent Updates: Loading...</p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  )
} 