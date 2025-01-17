import React from "react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      date: "2025-01-01",
      type: "Blood Test",
      link: "/reports/blood-test-2025-01-01.pdf",
    },
    {
      id: 2,
      date: "2025-01-05",
      type: "X-Ray",
      link: "/reports/x-ray-2025-01-05.pdf",
    },
    {
      id: 3,
      date: "2025-01-08",
      type: "MRI",
      link: "/reports/mri-2025-01-08.pdf",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold text-gray-700">Health Reports</h1>
      </header>
      <main className="p-8">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Reports</h2>
          <p className="text-gray-600 mt-2">
            Below is the list of your medical reports. Click the download button to save the report.
          </p>
          <table className="mt-6 w-full table-auto border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Report Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{report.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{report.type}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <a
                      href={report.link}
                      download
                      className="text-blue-500 hover:underline"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Reports;
