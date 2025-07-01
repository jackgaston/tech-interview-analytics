import { NextResponse } from 'next/server';
import { Note } from '@/types';
import { demoCustomers } from '../../../data';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = demoCustomers.find(c => c.id === params.id);
    
    if (!customer) {
      return new NextResponse(null, { status: 404 });
    }

    const { content } = await request.json();
    
    if (!content) {
      return new NextResponse(null, { status: 400 });
    }

    const newNote: Note = {
      id: `note_${Date.now()}`,
      content,
      createdAt: new Date().toISOString()
    };

    customer.notes.push(newNote);
    
    return NextResponse.json(newNote);
  } catch (error) {
    console.error('Error adding note:', error);
    return new NextResponse(null, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = demoCustomers.find(c => c.id === params.id);
    
    if (!customer) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json(customer.notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return new NextResponse(null, { status: 500 });
  }
} 