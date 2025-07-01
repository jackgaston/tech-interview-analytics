export interface Tag {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy?: User;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'ACTIVE' | 'PROSPECT' | 'LOST';
  phone: string;
  tags: Tag[];
  notes: Note[];
  createdAt: string;
} 