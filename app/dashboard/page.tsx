/**
 * Dashboard Home Page Component
 * 
 * This is the main dashboard view that displays the customer list with search functionality.
 * It provides a comprehensive interface for managing customer data with the following features:
 * - Real-time search filtering
 * - Customer status visualization
 * - Add new customer functionality
 * - Responsive table layout
 * - Error handling and loading states
 * 
 * The component uses client-side data fetching and filtering for optimal performance
 * and real-time search capabilities.
 */

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Problem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  dateSolved?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  
  // State management for customer data and UI
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [problems, setProblems] = useState<Problem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalProblem, setModalProblem] = useState<Problem | null>(null);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        setError('Error loading customers');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch problems
  useEffect(() => {
    fetchProblems();
  }, []);

  async function fetchProblems() {
    setLoading(true);
    const res = await fetch("/api/problems");
    if (res.ok) {
      setProblems(await res.json());
    } else {
      setError("Failed to load problems");
    }
    setLoading(false);
  }

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function openAddModal() {
    setModalProblem(null);
    setShowModal(true);
  }

  function openEditModal(problem: Problem) {
    setModalProblem(problem);
    setShowModal(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this problem?")) return;
    const res = await fetch(`/api/problems/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProblems(problems.filter(p => p.id !== id));
    } else {
      setError("Failed to delete problem");
    }
  }

  function closeModal() {
    setShowModal(false);
    setModalProblem(null);
  }

  async function handleModalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    let res;
    if (modalProblem) {
      // Edit
      res = await fetch(`/api/problems/${modalProblem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      // Add
      res = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    if (res.ok) {
      fetchProblems();
      closeModal();
    } else {
      setError("Failed to save problem");
    }
  }

  // Analytics calculations (placeholder)
  const solvedCount = problems.filter(p => p.status === "SOLVED").length;
  const unsolvedCount = problems.filter(p => p.status === "UNSOLVED").length;
  const reviewCount = problems.filter(p => p.status === "REVIEW").length;
  const categories = Array.from(new Set(problems.map(p => p.category)));
  const solvedByCategory = categories.map(cat => ({
    category: cat,
    count: problems.filter(p => p.category === cat && p.status === "SOLVED").length,
  }));

  // Loading state UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium">{error}</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all customers in your account including their name, email, company, and status.
          </p>
        </div>
        {/* Add Customer Button */}
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => router.push('/dashboard/customers/new')}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add customer
          </button>
        </div>
      </div>

      {/* Search and Table Section */}
      <div className="mt-8">
        {/* Search Input */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  {/* Table Header */}
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Company
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {customer.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {customer.company || '-'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[customer.status as CustomerStatus]}`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/dashboard/customers/${customer.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View<span className="sr-only">, {customer.name}</span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                    {/* Empty State */}
                    {filteredCustomers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-3 py-4 text-sm text-gray-500 text-center">
                          No customers found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tech Interview Prep Dashboard</h1>
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-semibold">Analytics</div>
            <div className="flex gap-6 mt-2">
              <div className="bg-green-100 px-4 py-2 rounded">Solved: {solvedCount}</div>
              <div className="bg-yellow-100 px-4 py-2 rounded">Review: {reviewCount}</div>
              <div className="bg-red-100 px-4 py-2 rounded">Unsolved: {unsolvedCount}</div>
            </div>
            <div className="mt-4">
              <div className="font-medium mb-1">Solved by Category</div>
              <div className="flex flex-wrap gap-2">
                {solvedByCategory.map(c => (
                  <div key={c.category} className="bg-blue-100 px-3 py-1 rounded text-sm">
                    {c.category}: {c.count}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 italic text-gray-500">[Streaks and charts coming soon]</div>
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={openAddModal}
          >
            + Add Problem
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date Solved</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
              ) : problems.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8">No problems yet.</td></tr>
              ) : problems.map(problem => (
                <tr key={problem.id} className="border-t">
                  <td className="px-4 py-2">{problem.title}</td>
                  <td className="px-4 py-2">{problem.category}</td>
                  <td className="px-4 py-2">{problem.status}</td>
                  <td className="px-4 py-2">{problem.dateSolved ? new Date(problem.dateSolved).toLocaleDateString() : '-'}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-blue-600 underline" onClick={() => openEditModal(problem)}>Edit</button>
                    <button className="text-red-600 underline" onClick={() => handleDelete(problem.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={closeModal}>&times;</button>
            <h2 className="text-xl font-bold mb-4">{modalProblem ? "Edit Problem" : "Add Problem"}</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input name="title" defaultValue={modalProblem?.title || ""} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block mb-1">Description</label>
                <textarea name="description" defaultValue={modalProblem?.description || ""} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block mb-1">Category</label>
                <input name="category" defaultValue={modalProblem?.category || ""} className="w-full border px-3 py-2 rounded" required />
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select name="status" defaultValue={modalProblem?.status || "UNSOLVED"} className="w-full border px-3 py-2 rounded">
                  <option value="UNSOLVED">Unsolved</option>
                  <option value="SOLVED">Solved</option>
                  <option value="REVIEW">Review</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Date Solved</label>
                <input name="dateSolved" type="date" defaultValue={modalProblem?.dateSolved ? modalProblem.dateSolved.slice(0,10) : ""} className="w-full border px-3 py-2 rounded" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">{modalProblem ? "Save Changes" : "Add Problem"}</button>
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 