import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

async function getTeams() {
  const teams = await prisma.team.findMany({
    include: {
      league: true,
    },
  });
  return teams;
}

export default async function NewMatchPage() {
  const teams = await getTeams();

  async function createMatch(formData: FormData) {
    'use server';

    const homeTeamId = formData.get('homeTeamId') as string;
    const awayTeamId = formData.get('awayTeamId') as string;
    const matchDate = new Date(formData.get('matchDate') as string);
    const venue = formData.get('venue') as string;

    await prisma.match.create({
      data: {
        homeTeamId,
        awayTeamId,
        matchDate,
        venue,
        status: 'SCHEDULED',
      },
    });

    redirect('/matches');
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">New Match</h1>

      <Card className="p-6">
        <form action={createMatch} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Home Team</Label>
              <Select name="homeTeamId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select home team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name} ({team.league?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Away Team</Label>
              <Select name="awayTeamId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select away team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name} ({team.league?.name})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Match Date</Label>
              <Input
                type="datetime-local"
                name="matchDate"
                required
              />
            </div>

            <div>
              <Label>Venue</Label>
              <Input
                type="text"
                name="venue"
                placeholder="Enter venue"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancel
            </Button>
            <Button type="submit">Create Match</Button>
          </div>
        </form>
      </Card>
    </div>
  );
} 