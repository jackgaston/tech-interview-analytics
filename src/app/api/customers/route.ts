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
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  try {
    // Verify authentication
    const session = await getServerSession();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch customers with related data
    const customers = await prisma.customer.findMany({
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
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
    // Verify authentication and get user
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Parse and validate request data
    const data = await request.json();
    const { name, email, phone, company, status, tags } = data;

    // Create customer with associated tags
    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        company,
        status,
        userId: user.id,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 