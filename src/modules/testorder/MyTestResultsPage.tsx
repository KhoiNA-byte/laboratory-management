import React, { useState, useEffect } from 'react';
import {
    DocumentTextIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
    BellIcon
} from '@heroicons/react/24/outline';

interface TestResult {
    id: string;
    testName: string;
    testCode: string;
    date: string;
    orderedBy: string;
    status: 'completed' | 'in-progress' | 'pending';
    results?: {
        parameter: string;
        value: string;
        unit: string;
        referenceRange: string;
        status: 'normal' | 'abnormal' | 'critical';
    }[];
}

const MyTestResultsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [testResults, setTestResults] = useState<TestResult[]>([
        {
            id: '1',
            testName: 'Kidney Function Test',
            testCode: 'TO-2025-005',
            date: '13/01/2025',
            orderedBy: 'Ordered by Dr. Sarah Johnson',
            status: 'in-progress'
        }
    ]);

    const [filteredResults, setFilteredResults] = useState<TestResult[]>(testResults);

    useEffect(() => {
        const filtered = testResults.filter(result =>
            result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.testCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredResults(filtered);
    }, [searchTerm, testResults]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Completed';
            case 'in-progress':
                return 'In Progress';
            case 'pending':
                return 'Pending';
            default:
                return 'Unknown';
        }
    };

    const totalTests = testResults.length;
    const pendingResults = testResults.filter(r => r.status === 'in-progress' || r.status === 'pending').length;
    const completed = testResults.filter(r => r.status === 'completed').length;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Test Results</h1>
                            <p className="text-gray-600 mt-1">View your laboratory test results</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="relative">
                                <BellIcon className="h-6 w-6 text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 py-6">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Tests Card */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Tests</p>
                                <p className="text-3xl font-bold text-gray-900">{totalTests}</p>
                                <p className="text-sm text-gray-500">All time</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Pending Results Card */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pending Results</p>
                                <p className="text-3xl font-bold text-gray-900">{pendingResults}</p>
                                <p className="text-sm text-gray-500">In progress</p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    {/* Completed Card */}
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-gray-900">{completed}</p>
                                <p className="text-sm text-gray-500">Available to view</p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Test Results List */}
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Test Results</h2>
                                <p className="text-sm text-gray-600">Your laboratory test history and results</p>
                            </div>
                            <div className="relative">
                                <MagnifyingGlassIcon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search tests..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {filteredResults.length === 0 ? (
                            <div className="text-center py-12">
                                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No test results found</h3>
                                <p className="text-gray-500">
                                    {searchTerm ? 'Try adjusting your search terms' : 'You don\'t have any test results yet'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredResults.map((result) => (
                                    <div key={result.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="p-2 bg-blue-100 rounded-lg">
                                                    <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{result.testName}</h3>
                                                    <p className="text-sm text-gray-600">Test Code: {result.testCode}</p>
                                                    <p className="text-sm text-gray-500">Date: {result.date}</p>
                                                    <p className="text-sm text-gray-500">{result.orderedBy}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                                                    {getStatusText(result.status)}
                                                </span>
                                                {result.status === 'completed' && (
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                        View Results
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTestResultsPage;
