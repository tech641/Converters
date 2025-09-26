import { useLocation } from "react-router-dom";
import "./TableResultPage.css";

export default function TableResultPage() {
  const { state } = useLocation() || {};

  const title = state?.title || "Results";
  const subtitle = state?.subtitle || "";
  const columns = state?.columns || [
    { key: "col1", label: "Column 1" },
    { key: "col2", label: "Column 2" },
  ];
  const rows = state?.rows || [
    { col1: "Sample A1", col2: "Sample A2" },
    { col1: "Sample B1", col2: "Sample B2" },
  ];

  // Optional from navigation state; fallback sensible defaults
  const downloadLabel =
    state?.downloadLabel || (title.toLowerCase().includes("invoice")
      ? "Download Invoice"
      : title.toLowerCase().includes("bank")
      ? "Download Bank Statement"
      : "Download CSV");

  const downloadFileName =
    state?.downloadFileName ||
    (title.toLowerCase().includes("invoice")
      ? "invoices.csv"
      : title.toLowerCase().includes("bank")
      ? "bank_statements.csv"
      : "results.csv");

  const downloadUrl = state?.downloadUrl || null;

  function csvEscape(val) {
    const s = val == null ? "" : String(val);
    const needsQuotes = /[",\n]/.test(s);
    const escaped = s.replace(/"/g, '""');
    return needsQuotes ? `"${escaped}"` : escaped;
  }

  function handleDownload() {
    // If backend gave us a URL, use that
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = downloadFileName;
      a.click();
      return;
    }

    // Frontend-only CSV generation from columns/rows
    const keys = columns.map((c) => c.key || c);          // column keys
    const header = columns.map((c) => csvEscape(c.label || c)).join(",");
    const lines = rows.map((r) => keys.map((k) => csvEscape(r[k])).join(","));
    const csv = [header, ...lines].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = downloadFileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="result-page">
      <header className="result-head">
        <div>
          <h2>{title}</h2>
          {subtitle && <div className="muted">{subtitle}</div>}
        </div>
        <button className="btn primary btn-sm" onClick={handleDownload}>
          {downloadLabel}
        </button>
      </header>

      <div className="result-card">
        {/* Inline table (copied from TableResult.jsx) */}
        {!columns.length ? (
          <div className="muted">No results.</div>
        ) : (
          <div className="tbl-wrap">
            <table className="tbl">
              <thead>
                <tr>
                  {columns.map((c) => (
                    <th key={c.key || c}>{c.label || c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr key={idx}>
                    {columns.map((c) => (
                      <td key={c.key || c}>{r[c.key || c] ?? ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
