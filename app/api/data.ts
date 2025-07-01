import { Customer } from '@/types';

// Demo data store
export const demoCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    phone: '(555) 123-4567',
    status: 'ACTIVE',
    notes: [],
    tags: [
      { id: '1', name: 'enterprise' },
      { id: '2', name: 'priority' }
    ],
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Tech Corp',
    phone: '(555) 987-6543',
    status: 'PROSPECT',
    notes: [],
    tags: [
      { id: '3', name: 'startup' }
    ],
    createdAt: new Date('2024-02-01').toISOString()
  }
]; 