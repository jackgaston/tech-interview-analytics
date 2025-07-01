import { NextResponse } from 'next/server';
import { demoCustomers } from '../../data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = demoCustomers.find(c => c.id === params.id);
    
    if (!customer) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    return new NextResponse(null, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const customerIndex = demoCustomers.findIndex(c => c.id === params.id);
    
    if (customerIndex === -1) {
      return new NextResponse(null, { status: 404 });
    }

    const updatedCustomer = {
      ...demoCustomers[customerIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
    };

    demoCustomers[customerIndex] = updatedCustomer;
    
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customerIndex = demoCustomers.findIndex(c => c.id === params.id);
    
    if (customerIndex === -1) {
      return new NextResponse(null, { status: 404 });
    }

    demoCustomers.splice(customerIndex, 1);
    
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Error deleting customer:', error);
    return new NextResponse(null, { status: 500 });
  }
} 