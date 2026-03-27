import { useState, useMemo } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";

const TYPES = ["Cash in", "Cash out", "Adjustment", "Top up"];
const STATUSES = ["Pending", "Success", "Failed", "Closed"];

const TYPE_STYLES = {
  "Cash in":    "bg-blue-100 text-blue-700",
  "Cash out":   "bg-green-100 text-green-700",
  "Adjustment": "bg-yellow-100 text-yellow-700",
  "Top up":     "bg-red-100 text-red-700",
};

const STATUS_STYLES = {
  "Pending": "bg-yellow-100 text-yellow-700",
  "Success": "bg-green-100 text-green-700",
  "Failed":  "bg-red-100 text-red-700",
  "Closed":  "bg-gray-100 text-gray-600",
};

const generateData = (count = 680) =>
  Array.from({ length: count }, (_, i) => ({
    id: "5era68-uy42365-s26",
    clientRef: "5684236526",
    instapayRef: "5684236526",
    providerRef: "5684236526",
    merchant: "Lorem ipsum dolor sit amet",
    provider: "Lorem ipsum dolor sit amet",
    type: TYPES[i % TYPES.length],
    status: STATUSES[i % STATUSES.length],
    amount: "₱ 790.00",
    fees: "₱ 10.00",
    error: "N/A",
    paidDate: "01/09/2026",
    createdDate: "01/09/2026",
  }));

const ALL_DATA = generateData();
const PER_PAGE = 10;

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_DATA.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.clientRef.includes(q) ||
        r.instapayRef.includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.status.toLowerCase().includes(q)
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const pageData = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (col) => {
    if (sortCol === col) setSortAsc((prev) => !prev);
    else { setSortCol(col); setSortAsc(true); }
  };

  const goPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  const getPaginationPages = () => {
    const pages = new Set([
      1, 2, 3,
      totalPages - 1, totalPages,
      currentPage - 1, currentPage, currentPage + 1,
    ]);
    return [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
  };

  const SortIcon = ({ col }) => (
    <span className="ml-1 opacity-50 text-xs">
      {sortCol === col ? (sortAsc ? "▲" : "▼") : "⇅"}
    </span>
  );

  const columns = [
    { label: "ID",                   col: "id",          className: "w-[180px] min-w-[180px]" },
    { label: "CLIENT REFERENCE",     col: "clientRef",   className: "w-[150px] min-w-[150px]" },
    { label: "INSTAPAY REFERENCE",   col: "instapayRef", className: "w-[170px] min-w-[170px]" },
    { label: "PROVIDER REFERENCE",   col: "providerRef", className: "w-[170px] min-w-[170px]" },
    { label: "MERCHANT",             col: null,          className: "w-[160px] min-w-[160px]" },
    { label: "PROVIDER",             col: null,          className: "w-[160px] min-w-[160px]" },
    { label: "TYPE",                 col: "type",        className: "w-[120px] min-w-[120px]" },
    { label: "STATUS",               col: "status",      className: "w-[110px] min-w-[110px]" },
    { label: "AMOUNT",               col: null,          className: "w-[100px] min-w-[100px]" },
    { label: "FEES",                 col: null,          className: "w-[80px]  min-w-[80px]"  },
    { label: "ERROR",                col: null,          className: "w-[80px]  min-w-[80px]"  },
    { label: "PAID DATE",            col: null,          className: "w-[110px] min-w-[110px]" },
    { label: "CREATED DATE",         col: null,          className: "w-[120px] min-w-[120px]" },
    { label: "ACTIONS",              col: null,          className: "w-[180px] min-w-[180px]" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-[#F9FAFC] w-full p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold">
          PulseTech Performance Report
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <IoSearchSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="ID, Client Reference, Instapay..."
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64 outline-none focus:border-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-600 hover:scale-105">
            <FaFilter className="text-gray-400" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-primary rounded-lg hover:bg-gray-800">
            <FiDownload className="text-primary" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="m-6 border border-gray-200 rounded-xl overflow-auto">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="bg-[#F9FAFC] border-b border-gray-200">
              {columns.map(({ label, col, className }) => (
                <th
                  key={label}
                  onClick={() => col && handleSort(col)}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wide whitespace-nowrap
                    ${col ? "cursor-pointer hover:text-gray-800" : ""}
                    ${className}`}
                >
                  {label}
                  {col && <SortIcon col={col} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-gray-100 last:border-none
                  ${i % 2 === 0 ? "bg-white" : "bg-[#F9FAFC]"}`}
              >
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.id}</td>
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.clientRef}</td>
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.instapayRef}</td>
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.providerRef}</td>
                <td className="px-4 py-3 text-gray-500 truncate">{row.merchant}</td>
                <td className="px-4 py-3 text-gray-500 truncate">{row.provider}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${TYPE_STYLES[row.type]}`}>
                    {row.type}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800 tabular-nums whitespace-nowrap">{row.amount}</td>
                <td className="px-4 py-3 text-gray-800 tabular-nums whitespace-nowrap">{row.fees}</td>
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.error}</td>
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.paidDate}</td>
                <td className="px-4 py-3 text-gray-800 whitespace-nowrap">{row.createdDate}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
                      Details
                    </button>
                    <button className="px-3 py-1 text-xs bg-primary text-btn-text rounded-md hover:bg-dark-primary">
                      Resend Webhook
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-5 mb-5">
        <button
          onClick={() => goPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {getPaginationPages().reduce((acc, page, idx, arr) => {
          if (idx > 0 && page - arr[idx - 1] > 1) {
            acc.push(
              <span key={`ellipsis-${page}`} className="px-1 text-gray-400">...</span>
            );
          }
          acc.push(
            <button
              key={page}
              onClick={() => goPage(page)}
              className={`w-9 h-9 text-sm rounded-lg border
                ${currentPage === page
                  ? "bg-primary text-btn-text border-primary"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          );
          return acc;
        }, [])}

        <button
          onClick={() => goPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-primary hover:text-btn-text disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}