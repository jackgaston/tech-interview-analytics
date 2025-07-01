import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const problems = await prisma.problem.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(problems);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const { title, description, category, status, dateSolved } = await req.json();
  if (!title || !description || !category) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const problem = await prisma.problem.create({
    data: {
      title,
      description,
      category,
      status: status || 'UNSOLVED',
      dateSolved: dateSolved ? new Date(dateSolved) : undefined,
      userId: user.id,
    },
  });
  return NextResponse.json(problem);
} 