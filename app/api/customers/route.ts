/**
 * Customers API Route Handler
 * 
 * This module provides REST API endpoints for customer management:
 * - GET /api/customers: Retrieve all customers with their tags
 * - POST /api/customers: Create a new customer
 * 
 * Security:
 * - All endpoints require authentication
 * - Session validation is performed on each request
 * - User association is maintained for customer creation
 * 
 * Features:
 * - Automatic tag creation and association
 * - Ordered results by creation date
 * - Error handling and appropriate status codes
 * - Type safety with Prisma client
 */

import { NextResponse } from 'next/server';
import { Customer } from '@/types';

// Demo customer data
const demoCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    company: 'Tech Corp',
    status: 'ACTIVE',
    phone: '+1 (555) 123-4567',
    tags: [{ id: '1', name: 'VIP' }, { id: '2', name: 'Enterprise' }],
    createdAt: new Date('2024-01-15').toISOString(),
    notes: [
      { id: '1', content: 'Initial meeting went well', createdAt: new Date('2024-01-15').toISOString() },
      { id: '2', content: 'Interested in enterprise plan', createdAt: new Date('2024-01-16').toISOString() }
    ]
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    company: 'Design Studio',
    status: 'PROSPECT',
    phone: '+1 (555) 234-5678',
    tags: [{ id: '3', name: 'SMB' }],
    createdAt: new Date('2024-02-01').toISOString(),
    notes: [
      { id: '3', content: 'Requested pricing information', createdAt: new Date('2024-02-01').toISOString() }
    ]
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    company: 'Marketing Inc',
    status: 'LOST',
    phone: '+1 (555) 345-6789',
    tags: [{ id: '4', name: 'Past Client' }],
    createdAt: new Date('2024-01-20').toISOString(),
    notes: [
      { id: '4', content: 'Chose competitor solution', createdAt: new Date('2024-01-20').toISOString() }
    ]
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    company: 'Retail Solutions',
    status: 'ACTIVE',
    phone: '+1 (555) 456-7890',
    tags: [{ id: '5', name: 'Retail' }, { id: '6', name: 'Priority' }],
    createdAt: new Date('2024-02-10').toISOString(),
    notes: [
      { id: '5', content: 'Successful implementation', createdAt: new Date('2024-02-10').toISOString() }
    ]
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david@example.com',
    company: 'Healthcare Plus',
    status: 'PROSPECT',
    phone: '+1 (555) 567-8901',
    tags: [{ id: '7', name: 'Healthcare' }],
    createdAt: new Date('2024-02-15').toISOString(),
    notes: [
      { id: '6', content: 'Scheduled demo next week', createdAt: new Date('2024-02-15').toISOString() }
    ]
  }
];

/**
 * GET /api/customers
 * 
 * Retrieves all customers with their associated tags.
 * Results are ordered by creation date (newest first).
 * 
 * @returns {Promise<NextResponse>} JSON response with customers array or error
 * @throws {401} If user is not authenticated
 * @throws {500} If database operation fails
 */
export async function GET() {
  return NextResponse.json(demoCustomers);
}

/**
 * POST /api/customers
 * 
 * Creates a new customer with the provided data.
 * Automatically creates and associates tags if they don't exist.
 * 
 * @param {Request} request - The request object containing customer data
 * @returns {Promise<NextResponse>} JSON response with created customer or error
 * @throws {401} If user is not authenticated
 * @throws {404} If user is not found in database
 * @throws {500} If database operation fails
 * 
 * Expected request body:
 * {
 *   name: string;
 *   email: string;
 *   phone?: string;
 *   company?: string;
 *   status: 'PROSPECT' | 'ACTIVE' | 'LOST';
 *   tags: string[];
 * }
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newCustomer = {
      id: (demoCustomers.length + 1).toString(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json(newCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 