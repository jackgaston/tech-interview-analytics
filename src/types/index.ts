/**
 * Core Type Definitions
 * 
 * This module contains all the core type definitions used throughout the CRM dashboard.
 * These types are designed to match the Prisma schema and provide type safety across
 * the entire application.
 */

/**
 * User role enumeration
 * ADMIN: Full access to all features including user management
 * SALES_REP: Limited access to customer management features
 */
export type UserRole = 'ADMIN' | 'SALES_REP';

/**
 * Customer status enumeration
 * PROSPECT: Potential customer, not yet converted
 * ACTIVE: Current paying customer
 * LOST: Former customer or lost opportunity
 */
export type CustomerStatus = 'PROSPECT' | 'ACTIVE' | 'LOST';

/**
 * User entity interface
 * Represents a user of the CRM system with role-based access
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Tag entity interface
 * Represents a label that can be attached to customers
 * for categorization and filtering
 */
export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
}

/**
 * Customer entity interface
 * Represents a customer or potential customer in the CRM system
 * Contains all relevant customer information and relationships
 */
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;        // Optional phone number
  company?: string;      // Optional company name
  status: CustomerStatus;
  userId: string;        // Reference to the assigned sales rep
  tags: Tag[];          // Associated tags for categorization
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Note entity interface
 * Represents a note or comment attached to a customer
 * Used for tracking interactions and maintaining customer history
 */
export interface Note {
  id: string;
  content: string;      // The note content
  customerId: string;   // Reference to the customer
  userId: string;       // Reference to the note creator
  createdBy: User;      // Populated user who created the note
  createdAt: Date;
  updatedAt: Date;
} 