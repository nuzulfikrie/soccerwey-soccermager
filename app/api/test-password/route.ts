import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const password = 'Admin123!';
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the admin user's password
    const updatedUser = await prisma.user.update({
      where: {
        email: 'admin@soccerwey.com'
      },
      data: {
        hashedPassword: hashedPassword
      }
    });

    return NextResponse.json({
      message: 'Password updated',
      hash: hashedPassword,
      success: true
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      message: 'Error updating password',
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false
    }, { status: 500 });
  }
} 