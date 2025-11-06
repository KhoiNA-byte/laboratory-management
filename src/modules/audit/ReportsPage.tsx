import React, { useState } from 'react'
import ReportPreviewModal from '../../components/Reports/ReportPreviewModal'

interface QuickReportItemProps {
    title: string
    icon: string
}

const QuickReportItem: React.FC<QuickReportItemProps> = ({ title, icon }) => {
    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">{title}</span>
            </div>
        </div>
    )
}

interface ScheduledReportItemProps {
    title: string
    schedule: string
}

const ScheduledReportItem: React.FC<ScheduledReportItemProps> = ({ title, schedule }) => {
    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div>
                <h4 className="text-sm font-medium text-gray-900">{title}</h4>
                <p className="text-xs text-gray-500">{schedule}</p>
            </div>
            <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                Configure
            </button>
        </div>
    )
}

export const ReportsPage = () => {
    const [reportType, setReportType] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [showPreviewModal, setShowPreviewModal] = useState(false)

    const quickReports = [
        { title: "Today's Test Orders", icon: "📋" },
        { title: "Pending Test Results", icon: "⏳" },
        { title: "Instrument Status Report", icon: "🔬" },
        { title: "Low Stock Reagents", icon: "🧪" },
        { title: "User Activity Log", icon: "👥" }
    ]

    const scheduledReports = [
        { title: "Daily Test Summary", schedule: "Sent every day at 6:00 PM" },
        { title: "Weekly Inventory Report", schedule: "Sent every Monday at 8:00 AM" },
        { title: "Monthly Performance Report", schedule: "Sent on the 1st of each month" }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
                    <p className="text-gray-500 mt-1">Generate and export laboratory reports</p>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Generate Report Card */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Generate Report</h2>
                        <p className="text-sm text-gray-500 mb-6">Select report type and date range</p>

                        <div className="space-y-4">
                            {/* Report Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                                <div className="relative">
                                    <select
                                        value={reportType}
                                        onChange={(e) => setReportType(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select report type</option>
                                        <option value="test-results">Test Results</option>
                                        <option value="instruments">Instrument Performance</option>
                                        <option value="quality">Quality Control</option>
                                        <option value="inventory">Inventory Report</option>
                                        <option value="financial">Financial Report</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={fromDate}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const digits = value.replace(/\D/g, '');
                                                let formatted = '';
                                                if (digits.length <= 2) {
                                                    formatted = digits;
                                                } else if (digits.length <= 4) {
                                                    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
                                                } else {
                                                    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
                                                }
                                                setFromDate(formatted);
                                            }}
                                            placeholder="dd/mm/yyyy"
                                            maxLength={10}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={toDate}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const digits = value.replace(/\D/g, '');
                                                let formatted = '';
                                                if (digits.length <= 2) {
                                                    formatted = digits;
                                                } else if (digits.length <= 4) {
                                                    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
                                                } else {
                                                    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
                                                }
                                                setToDate(formatted);
                                            }}
                                            placeholder="dd/mm/yyyy"
                                            maxLength={10}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <button
                                    onClick={() => setShowPreviewModal(true)}
                                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-sm font-medium">Export Excel</span>
                                </button>
                                <button
                                    onClick={() => setShowPreviewModal(true)}
                                    className="flex-1 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    <span className="text-sm font-medium">Print</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Reports Card */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Quick Reports</h2>
                        <p className="text-sm text-gray-500 mb-6">Generate commonly used reports</p>

                        <div className="space-y-1">
                            {quickReports.map((report, index) => (
                                <QuickReportItem
                                    key={index}
                                    title={report.title}
                                    icon={report.icon}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scheduled Reports Card */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Reports</h2>
                    <p className="text-sm text-gray-500 mb-6">Automatically generated reports sent via email</p>

                    <div className="space-y-1">
                        {scheduledReports.map((report, index) => (
                            <ScheduledReportItem
                                key={index}
                                title={report.title}
                                schedule={report.schedule}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Report Preview Modal */}
            <ReportPreviewModal
                show={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                onSave={() => {
                    setShowPreviewModal(false);
                    alert('Report exported successfully!');
                }}
            />
        </div>
    )
}
