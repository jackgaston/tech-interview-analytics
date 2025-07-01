import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const problem = await prisma.problem.findUnique({ where: { id: params.id } });
  if (!problem || problem.userId !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json(problem);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const problem = await prisma.problem.findUnique({ where: { id: params.id } });
  if (!problem || problem.userId !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const { title, description, category, status, dateSolved } = await req.json();
  const updated = await prisma.problem.update({
    where: { id: params.id },
    data: {
      title,
      description,
      category,
      status,
      dateSolved: dateSolved ? new Date(dateSolved) : undefined,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const problem = await prisma.problem.findUnique({ where: { id: params.id } });
  if (!problem || problem.userId !== user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  await prisma.problem.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
} 