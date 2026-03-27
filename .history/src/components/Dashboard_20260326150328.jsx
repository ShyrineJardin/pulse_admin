import { useState, useMemo } from "react";

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-[#F9FAFC] w-full">
        <h1 className="text-xl font-bold ">
          PulseTech Performance Report
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="ID, Client Reference, Instapay..."
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg w-64 outline-none focus:border-gray-400"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            ▼ Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            ⬇ Download
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="m-6border border-gray-200 rounded-xl overflow-auto">
        <table className="w-full text-sm min-w-[1100px]">
          <thead>
            <tr className="border-b border-gray-200">
              {[
                { label: "ID", col: "id" },
                { label: "CLIENT REFERENCE", col: "clientRef" },
                { label: "INSTAPAY REFERENCE", col: "instapayRef" },
                { label: "PROVIDER REFERENCE", col: "providerRef" },
                { label: "MERCHANT", col: null },
                { label: "PROVIDER", col: null },
                { label: "TYPE", col: "type" },
                { label: "STATUS", col: "status" },
                { label: "AMOUNT", col: null },
                { label: "FEES", col: null },
                { label: "ERROR", col: null },
                { label: "PAID DATE", col: null },
                { label: "CREATED DATE", col: null },
                { label: "ACTIONS", col: null },
              ].map(({ label, col }) => (
                <th
                  key={label}
                  onClick={() => col && handleSort(col)}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wide whitespace-nowrap
                    ${col ? "cursor-pointer hover:text-gray-800" : ""}`}
                >
                  {label}
                  {col && <SortIcon col={col} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 last:border-none">
                <td className="px-4 py-3 text-gray-800">{row.id}</td>
                <td className="px-4 py-3 text-gray-800">{row.clientRef}</td>
                <td className="px-4 py-3 text-gray-800">{row.instapayRef}</td>
                <td className="px-4 py-3 text-gray-800">{row.providerRef}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{row.merchant}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{row.provider}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${TYPE_STYLES[row.type]}`}>
                    {row.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800 tabular-nums">{row.amount}</td>
                <td className="px-4 py-3 text-gray-800 tabular-nums">{row.fees}</td>
                <td className="px-4 py-3 text-gray-800">{row.error}</td>
                <td className="px-4 py-3 text-gray-800">{row.paidDate}</td>
                <td className="px-4 py-3 text-gray-800">{row.createdDate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs border border-gray-200 rounded-md hover:bg-gray-100">
                      Details
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-800">
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
      <div className="flex items-center justify-center gap-2 mt-5">
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
                  ? "bg-gray-900 text-white border-gray-900"
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
          className="flex items-center gap-1 px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}