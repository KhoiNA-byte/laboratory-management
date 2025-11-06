import React, { useState, useRef } from 'react';

interface ReportPreviewModalProps {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  show,
  onClose,
  onSave,
}) => {
  const [printer, setPrinter] = useState('Lưu dưới dạng PDF');
  const [pages, setPages] = useState('Tất cả');
  const [pagesPerSheet, setPagesPerSheet] = useState('1');
  const [margins, setMargins] = useState('Mặc định');
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [includeBackground, setIncludeBackground] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Test Result Report</title>
              <style>
                @media print {
                  body { margin: 0; padding: 20px; }
                  .no-print { display: none; }
                }
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                }
                .report-container {
                  max-width: 800px;
                  margin: 0 auto;
                  background: white;
                  padding: 40px;
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                }
                .logo {
                  width: 60px;
                  height: 60px;
                  background: #2563eb;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: bold;
                  margin: 0 auto 10px;
                }
                .company-name {
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 10px;
                }
                .address {
                  font-size: 12px;
                  color: #666;
                  margin-bottom: 5px;
                }
                .report-title {
                  text-align: center;
                  font-size: 20px;
                  font-weight: bold;
                  margin: 30px 0;
                  text-transform: uppercase;
                }
                .info-section {
                  margin-bottom: 20px;
                }
                .info-row {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 8px;
                  font-size: 12px;
                }
                .info-label {
                  font-weight: bold;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin: 20px 0;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                  font-size: 12px;
                }
                th {
                  background-color: #f3f4f6;
                  font-weight: bold;
                }
                .notes-section {
                  margin-top: 20px;
                }
                .signature-section {
                  margin-top: 40px;
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                }
                .signature-box {
                  width: 200px;
                  height: 60px;
                  border: 1px solid #000;
                  margin-top: 10px;
                }
                .page-number {
                  text-align: right;
                  margin-top: 20px;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              ${printRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    }
  };

  const handleSave = () => {
    if (printer === 'Lưu dưới dạng PDF') {
      // Export to PDF logic would go here
      alert('Exporting to PDF...');
    }
    onSave();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-900">In</h2>
            <span className="text-sm text-gray-500">1 trang</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Report Preview */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
            <div ref={printRef} className="bg-white shadow-lg max-w-4xl mx-auto p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  LAB
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Laboratory Management System
                </h1>
                <p className="text-xs text-gray-600 mb-1">
                  201/1 Victoria Grand Park, Long Binh Ward, Thu Duc City, Vietnam
                </p>
                <p className="text-xs text-gray-600">
                  Hotline: 0906 093 820 | Support: 0862 254 076
                </p>
              </div>

              {/* Report Title */}
              <div className="text-center my-8">
                <h2 className="text-xl font-bold text-gray-900 uppercase">
                  TEST RESULT REPORT
                </h2>
              </div>

              {/* Patient Information */}
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Patient Name:</span> John Doe
                    </div>
                    <div>
                      <span className="font-semibold">Birth Year:</span> 1985
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Address:</span> 123 Main St, New York, NY 10001
                    </div>
                    <div>
                      <span className="font-semibold">Gender:</span> Male
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Phone:</span> 0987 654 321
                    </div>
                    <div>
                      <span className="font-semibold">Age:</span> 40
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Order Number:</span> TD-2023-001
                    </div>
                    <div>
                      <span className="font-semibold">Ordered Date:</span> 08:30:00 18/1/2023
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <span className="font-semibold">Test Type:</span> Complete Blood Count (CBC)
                    </div>
                    <div>
                      <span className="font-semibold">Ordered By:</span> Dr. Sarah Johnson
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Results Table */}
              <div className="mb-6">
                <h3 className="font-semibold text-sm mb-3">Test Results</h3>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold">Code</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold">Test Name</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold">Result</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold">Normal Range</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold">Unit</th>
                      <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 text-xs">WBC</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">White Blood Cells</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">7.5</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">4.0-11.0</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">10^9/L</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Normal</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 text-xs">RBC</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Red Blood Cells</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">4.8</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">4.5-5.5</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">10^12/L</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Normal</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 text-xs">HGB</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Hemoglobin</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">14.2</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">13.5-17.5</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">g/dL</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Normal</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-3 py-2 text-xs">PLT</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Platelets</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">250</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">150-400</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">10^9/L</td>
                      <td className="border border-gray-300 px-3 py-2 text-xs">Normal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Doctor's Notes */}
              <div className="mb-6">
                <div className="text-xs">
                  <span className="font-semibold">Doctor's Notes:</span>
                  <div className="mt-1">Annual checkup</div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="mt-10">
                <div className="flex justify-between items-end">
                  <div className="text-xs">
                    <div>October 18, 2023</div>
                    <div className="font-semibold mt-2">LABORATORY</div>
                    <div className="w-48 h-16 border border-gray-900 mt-2"></div>
                    <div className="mt-2">Dr. Admin</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-4 italic">
                  This report is valid only with the signature and seal of the laboratory.
                </p>
              </div>

              {/* Page Number */}
              <div className="text-right text-xs mt-8">
                1/1
              </div>
            </div>
          </div>

          {/* Right: Print/Export Settings Panel */}
          <div className="w-80 bg-gray-800 text-white p-6 flex flex-col">
            <div className="flex-1 space-y-6">
              {/* Destination Printer */}
              <div>
                <label className="block text-sm font-medium mb-2">Máy in đích</label>
                <div className="relative">
                  <select
                    value={printer}
                    onChange={(e) => setPrinter(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm appearance-none pr-8"
                  >
                    <option value="Lưu dưới dạng PDF">Lưu dưới dạng PDF</option>
                    <option value="Print to PDF">Print to PDF</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pages */}
              <div>
                <label className="block text-sm font-medium mb-2">Trang</label>
                <div className="relative">
                  <select
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm appearance-none pr-8"
                  >
                    <option value="Tất cả">Tất cả</option>
                    <option value="Trang 1">Trang 1</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pages per sheet */}
              <div>
                <label className="block text-sm font-medium mb-2">Số trang mỗi trang in ra</label>
                <div className="relative">
                  <select
                    value={pagesPerSheet}
                    onChange={(e) => setPagesPerSheet(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm appearance-none pr-8"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Margins */}
              <div>
                <label className="block text-sm font-medium mb-2">Lề</label>
                <div className="relative">
                  <select
                    value={margins}
                    onChange={(e) => setMargins(e.target.value)}
                    className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 text-sm appearance-none pr-8"
                  >
                    <option value="Mặc định">Mặc định</option>
                    <option value="Tối thiểu">Tối thiểu</option>
                    <option value="Không">Không</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium mb-2">Tùy chọn</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeHeaders}
                      onChange={(e) => setIncludeHeaders(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Đầu trang và chân trang</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeBackground}
                      onChange={(e) => setIncludeBackground(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Đồ họa nền</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  if (printer === 'Lưu dưới dạng PDF') {
                    handleSave();
                  } else {
                    handlePrint();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreviewModal;

