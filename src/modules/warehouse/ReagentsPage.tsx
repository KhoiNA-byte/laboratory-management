import React, { useState } from 'react'

export const ReagentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [supplierFilter, setSupplierFilter] = useState('All Suppliers')

  // Mock data for demonstration
  const mockReagents = [
    {
      id: 'R001',
      name: 'CBC Reagent Kit',
      category: 'Hematology',
      lotNumber: 'CBC-2024-001',
      supplier: 'Sysmex Corporation',
      expiryDate: '15/06/2025',
      quantity: 45,
      unit: 'tests',
      minStock: 20,
      maxStock: 100,
      status: 'Good',
      lastRestocked: '10/01/2025',
      cost: '$2.50'
    },
    {
      id: 'R002',
      name: 'Glucose Reagent',
      category: 'Chemistry',
      lotNumber: 'GLU-2024-002',
      supplier: 'Roche Diagnostics',
      expiryDate: '20/05/2025',
      quantity: 12,
      unit: 'tests',
      minStock: 15,
      maxStock: 80,
      status: 'Low Stock',
      lastRestocked: '05/01/2025',
      cost: '$1.80'
    },
    {
      id: 'R003',
      name: 'Lipid Panel Reagent',
      category: 'Chemistry',
      lotNumber: 'LIP-2024-003',
      supplier: 'Abbott Laboratories',
      expiryDate: '30/07/2025',
      quantity: 78,
      unit: 'tests',
      minStock: 25,
      maxStock: 120,
      status: 'Good',
      lastRestocked: '12/01/2025',
      cost: '$3.20'
    },
    {
      id: 'R004',
      name: 'Thyroid Reagent Set',
      category: 'Immunoassay',
      lotNumber: 'THY-2024-004',
      supplier: 'Siemens Healthineers',
      expiryDate: '10/04/2025',
      quantity: 5,
      unit: 'tests',
      minStock: 10,
      maxStock: 60,
      status: 'Critical',
      lastRestocked: '08/01/2025',
      cost: '$4.50'
    },
    {
      id: 'R005',
      name: 'Urine Test Strips',
      category: 'Urinalysis',
      lotNumber: 'UR-2024-005',
      supplier: 'Arkray Inc.',
      expiryDate: '25/08/2025',
      quantity: 156,
      unit: 'strips',
      minStock: 50,
      maxStock: 200,
      status: 'Good',
      lastRestocked: '15/01/2025',
      cost: '$0.80'
    },
    {
      id: 'R006',
      name: 'Coagulation Reagent',
      category: 'Coagulation',
      lotNumber: 'COAG-2024-006',
      supplier: 'Stago Group',
      expiryDate: '18/03/2025',
      quantity: 8,
      unit: 'tests',
      minStock: 12,
      maxStock: 70,
      status: 'Low Stock',
      lastRestocked: '03/01/2025',
      cost: '$2.90'
    }
  ]

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-green-100 text-green-800'
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800'
      case 'Critical':
        return 'bg-red-100 text-red-800'
      case 'Expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStockLevelColor = (quantity: number, minStock: number) => {
    if (quantity <= minStock) return 'text-red-600'
    if (quantity <= minStock * 1.5) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Warehouse</h1>
        <p className="text-gray-600">Manage laboratory reagents and supplies inventory</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Items Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Items</p>
              <p className="text-3xl font-bold text-gray-900">156</p>
              <p className="text-sm text-gray-500 mt-1">All reagents</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Low Stock Items Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Low Stock Items</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-yellow-600 mt-1">Need restocking</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Critical Items Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Critical Items</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-red-600 mt-1">Urgent attention</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expiring Soon Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Expiring Soon</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-orange-600 mt-1">Next 30 days</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center">
              <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* All Reagents Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">All Reagents</h3>
              <p className="text-sm text-gray-600">View and manage all laboratory reagents and supplies</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All Status">All Status</option>
                  <option value="Good">Good</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Critical">Critical</option>
                  <option value="Expired">Expired</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Immunoassay">Immunoassay</option>
                  <option value="Urinalysis">Urinalysis</option>
                  <option value="Coagulation">Coagulation</option>
                  <option value="Microbiology">Microbiology</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Supplier Filter */}
              <div className="relative">
                <select
                  value={supplierFilter}
                  onChange={(e) => setSupplierFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All Suppliers">All Suppliers</option>
                  <option value="Sysmex Corporation">Sysmex Corporation</option>
                  <option value="Roche Diagnostics">Roche Diagnostics</option>
                  <option value="Abbott Laboratories">Abbott Laboratories</option>
                  <option value="Siemens Healthineers">Siemens Healthineers</option>
                  <option value="Arkray Inc.">Arkray Inc.</option>
                  <option value="Stago Group">Stago Group</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reagents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* New Reagent Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Reagent
              </button>
            </div>
          </div>
      </div>

        {/* Reagents Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reagent ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lot Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
            </tr>
          </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockReagents.map((reagent) => (
                <tr key={reagent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-blue-600">{reagent.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{reagent.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reagent.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reagent.lotNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reagent.supplier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className={`font-medium ${getStockLevelColor(reagent.quantity, reagent.minStock)}`}>
                        {reagent.quantity} {reagent.unit}
                      </div>
                      <div className="text-xs text-gray-500">
                        Min: {reagent.minStock} | Max: {reagent.maxStock}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(reagent.status)}`}>
                      {reagent.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reagent.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {reagent.cost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}
