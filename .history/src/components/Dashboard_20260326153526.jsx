import { useState, useMemo } from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";
import { RiSparkling2Fill } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";
import { TbReload } from "react-icons/tb";

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

function FilterModal({ onClose, onApply }) {
  const [startDate, setStartDate] = useState("02/18/2026");
  const [endDate, setEndDate] = useState("");
  const [merchant, setMerchant] = useState("All Merchant");
  const [provider, setProvider] = useState("All Provider");
  const [method, setMethod] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setMerchant("All Merchant");
    setProvider("All Provider");
    setMethod("");
    setType("");
    setStatus("");
  };

  const handleApply = () => {
    onApply({ startDate, endDate, merchant, provider, method, type, status });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F9FAFC] rounded-t-2xl border-b border-gray-200">
          <div className="flex items-center gap-2">
            <RiSparkling2Fill className="text-yellow-400 text-lg" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <IoClose className="text-xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-5">

          {/* Date Row */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Start Date", value: startDate, setter: setStartDate, placeholder: "MM/DD/YYYY" },
              { label: "End Date",   value: endDate,   setter: setEndDate,   placeholder: "MM/DD/YYYY" },
            ].map(({ label, value, setter, placeholder }) => (
              <div key={label} className="relative mt-2">
                <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-400 z-10">
                  {label}
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2.5 gap-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    placeholder={placeholder}
                    className="text-sm text-gray-700 outline-none w-full bg-transparent placeholder:text-gray-300"
                  />
                  <LuCalendar className="text-gray-500 text-base flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* Merchant & Provider */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Merchant", value: merchant, setter: setMerchant, options: ["All Merchant", "Merchant A", "Merchant B"] },
              { label: "Provider", value: provider, setter: setProvider, options: ["All Provider", "Provider A", "Provider B"] },
            ].map(({ label, value, setter, options }) => (
              <div key={label}>
                <label className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
                <div className="relative">
                  <select
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full appearance-none border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none bg-white cursor-pointer pr-8"
                  >
                    {options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
                </div>
              </div>
            ))}
          </div>

          {/* Method & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Method</label>
              <div className="relative">
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none bg-white cursor-pointer pr-8"
                >
                  <option value="">Select Merchant</option>
                  <option>Online</option>
                  <option>Offline</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Type</label>
              <div className="relative">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none border border-gray-300 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none bg-white cursor-pointer pr-8"
                >
                  <option value="">Select Type</option>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">Status</label>
            <div className="relative flex items-center border border-gray-300 rounded-xl px-3 py-2.5 gap-2">
              <TbReload className="text-gray-500 text-base flex-shrink-0" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none text-sm text-gray-700 outline-none bg-transparent cursor-pointer pr-6"
              >
                <option value="">Select Status</option>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▼</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl border border-dark-primary text-dark-primary text-sm font-medium hover:bg-green-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-3 rounded-xl bg-gray-900 text-primary text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

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
      {showFilter && (
        <FilterModal
          onClose={() => setShowFilter(false)}
          onApply={(filters) => console.log("Applied filters:", filters)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-[#F9FAFC] w-full p-4 border-b border-gray-200">
        <h1 className="text-lg lg:text-xl font-bold">PulseTech Performance Report</h1>
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
          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-600 hover:scale-105 transition-transform"
          >
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