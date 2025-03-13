import { prisma } from '@/lib/prisma'
import { teamFormSchema } from '@/lib/validations/team'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get('name') as string
    const logo = formData.get('logo') as File | null
    const mainKit = JSON.parse(formData.get('mainKit') as string)
    const secondKit = JSON.parse(formData.get('secondKit') as string)
    const thirdKit = JSON.parse(formData.get('thirdKit') as string)

    // Validate the data
    const validatedData = teamFormSchema.parse({
      name,
      logo,
      mainKit,
      secondKit,
      thirdKit,
    })

    // TODO: Upload logo to cloud storage (e.g., S3, Cloudinary)
    let logoUrl = null
    if (logo) {
      // Implement file upload here
      // logoUrl = await uploadFile(logo)
    }

    // Create team and kits in a transaction
    const team = await prisma.$transaction(async (tx: PrismaClient) => {
      // Create team
      const team = await tx.team.create({
        data: {
          name: validatedData.name,
          logoUrl,
          userId: session.user.id,
        },
      })

      // Create kits
      await tx.kit.createMany({
        data: [
          {
            teamId: team.id,
            type: 'MAIN',
            jersey: mainKit.jersey,
            pants: mainKit.pants,
            socks: mainKit.socks,
          },
          {
            teamId: team.id,
            type: 'SECOND',
            jersey: secondKit.jersey,
            pants: secondKit.pants,
            socks: secondKit.socks,
          },
          {
            teamId: team.id,
            type: 'THIRD',
            jersey: thirdKit.jersey,
            pants: thirdKit.pants,
            socks: thirdKit.socks,
          },
        ],
      })

      return team
    })

    return NextResponse.json(team)
  } catch (error) {
    console.error('Error creating team:', error)
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const teams = await prisma.team.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        kits: true,
      },
    })

    return NextResponse.json(teams)
  } catch (error) {
    console.error('Error fetching teams:', error)
    return NextResponse.json(
      { error: 'Failed to fetch teams' },
      { status: 500 }
    )
  }
} 