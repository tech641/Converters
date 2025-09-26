// BankStatement.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  Trash2,
  FileText,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import PdfViewer from "../../components/PdfViewer/PdfViewer";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import "./BankStatement.css"; // reuse your page styles
import { useNavigate } from "react-router-dom";

export default function BankStatement() {
  return <ImporterBank />;
}

/* -------- Page-local Importer (Bank) -------- */
function ImporterBank() {
  const title = "Upload Bank Statements";
  const addLabel = "Add Bank Statements";
  const importLabel = "Import";
  const downloadLabel = "Download Bank Excel";
  const accept = ".pdf,image/*";
  const resultsTitle = "Bank Statement Results";
  const downloadFileName = "bank_statements.xlsx";

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [phase, setPhase] = useState("files"); // "files" | "results"
  const [queue, setQueue] = useState([]); // uploading with progress
  const [files, setFiles] = useState([]); // finished files: {id,name,size,url,type,file}
  const [selectedId, setSelectedId] = useState(null);

  const [importing, setImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);

  const [resColumns, setResColumns] = useState([]);
  const [resRows, setResRows] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const selected = useMemo(
    () => files.find((f) => f.id === selectedId) || null,
    [files, selectedId]
  );

  function openPicker() {
    fileInputRef.current?.click();
  }

  function onPick(e) {
    const picked = Array.from(e.target.files || []);
    if (!picked.length) return;
    picked.forEach(readWithProgress);
    e.target.value = "";
  }

  // ---- per-file progress while reading ----
  function readWithProgress(file) {
    const id = crypto.randomUUID();
    setQueue((prev) => [
      ...prev,
      { id, name: file.name, size: file.size, percent: 0 },
    ]);

    const reader = new FileReader();

    reader.onprogress = (ev) => {
      if (!ev.lengthComputable) return;
      const percent = Math.min(100, Math.round((ev.loaded / ev.total) * 100));
      setQueue((prev) =>
        prev.map((it) => (it.id === id ? { ...it, percent } : it))
      );
    };

    reader.onload = () => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith("image/")
        ? "image"
        : file.type === "application/pdf" ||
          file.name.toLowerCase().endsWith(".pdf")
        ? "pdf"
        : "other";

      // move from queue -> files when complete
      setQueue((prev) => prev.filter((it) => it.id !== id));
      setFiles((prev) => {
        const next = [
          ...prev,
          { id, name: file.name, size: file.size, url, type, file },
        ];
        if (!selectedId) setSelectedId(id);
        return next;
      });
    };

    reader.onerror = () =>
      setQueue((prev) => prev.filter((it) => it.id !== id));

    reader.readAsArrayBuffer(file); // used for progress only
  }

  function removeFile(id) {
    setFiles((prev) => {
      const idx = prev.findIndex((f) => f.id === id);
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.url);
      const next = prev.filter((f) => f.id !== id);
      if (selectedId === id) {
        const neighbor = next[idx] || next[idx - 1] || null;
        setSelectedId(neighbor?.id || null);
      }
      return next;
    });
  }

  useEffect(() => {
    if (files.length && !files.some((f) => f.id === selectedId)) {
      setSelectedId(files[0].id);
    }
  }, [files, selectedId]);

  async function handleImport() {
    if (!files.length || importing) return;
    setImporting(true);
    setImportProgress(0);

    let timer;
    try {
      timer = animateProgress(setImportProgress);

      // ✅ FRONTEND-ONLY: build dummy data and navigate to results page
      const columns = [
        { key: "date", label: "Date" },
        { key: "description", label: "Description" },
        { key: "debit", label: "Debit" },
        { key: "credit", label: "Credit" },
        { key: "balance", label: "Balance" },
      ];
      const rows = [
        {
          date: "2025-09-01",
          description: "ATM Withdrawal",
          debit: "500.00",
          credit: "",
          balance: "9,500.00",
        },
        {
          date: "2025-09-03",
          description: "Salary Credit",
          debit: "",
          credit: "7,500",
          balance: "17,000.00",
        },
        {
          date: "2025-09-07",
          description: "POS - Grocery",
          debit: "230.50",
          credit: "",
          balance: "16,769.50",
        },
      ];

      navigate("/converts/bank-statement/tableresult", {
        state: {
          title: "Bank Statement Results",
          subtitle: "Sample parsed output (dummy)",
          columns,
          rows,
          downloadLabel: "Download Bank Statement",
          downloadFileName: "bank_statements.csv",
        },
      });
    } finally {
      clearInterval(timer);
      setTimeout(() => setImporting(false), 220);
    }
  }

  function animateProgress(setter) {
    let p = 0;
    return setInterval(() => {
      const step = p < 70 ? 7 : p < 90 ? 2 : 0.5;
      p = Math.min(98, +(p + step).toFixed(1));
      setter(p);
    }, 100);
  }

  function handleDownload() {
    if (downloadUrl) {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = downloadFileName || "results.xlsx";
      a.click();
      return;
    }
    const target = selected || files[0];
    if (!target) return;
    const a = document.createElement("a");
    a.href = target.url;
    a.download = target.name || "document";
    a.click();
  }

  // revoke blobs on unmount
  const filesRef = useRef([]);
  useEffect(() => {
    filesRef.current = files;
  }, [files]);
  useEffect(
    () => () => filesRef.current.forEach((f) => URL.revokeObjectURL(f.url)),
    []
  );

  return (
    <section className="imp2">
      <header className="imp2-header">
        <h2>{title}</h2>
        {phase === "files" ? (
          <button
            className="btn primary"
            onClick={handleImport}
            disabled={!files.length || importing}
            title={!files.length ? "Select files first" : ""}
          >
            {importing ? "Importing…" : importLabel}
          </button>
        ) : (
          <button className="btn primary" onClick={handleDownload}>
            <Download size={1} /> {downloadLabel}
          </button>
        )}
      </header>

      {phase === "files" && (
        <div className="imp2-grid">
          {/* LEFT */}
          <div className="pane-left">
            <div className="upload-card">
              <div className="upload-title">Upload</div>
              <p className="upload-sub">
                Choose PDF or image files and import.
              </p>
              <div className="upload-actions">
                <button
                  className="btn soft"
                  onClick={openPicker}
                  aria-label={addLabel}
                >
                  <Upload size={16} /> {addLabel}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={accept}
                  onChange={onPick}
                  hidden
                />
              </div>
            </div>

            {/* Uploading with progress */}
            {queue.length > 0 && (
              <div className="block">
                <div className="block-title">Uploading</div>
                <ul className="queue-list">
                  {queue.map((q) => (
                    <li key={q.id} className="queue-item">
                      <div className="qi-top">
                        <span className="qi-name" title={q.name}>
                          {q.name}
                        </span>
                        <span className="qi-percent">{q.percent}%</span>
                      </div>
                      <div className="progress">
                        <div
                          className="bar"
                          style={{ width: `${q.percent}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Uploaded files */}
            <div className="block">
              <div className="block-title">Uploaded files</div>
              {files.length === 0 ? (
                <div className="muted small">No files yet.</div>
              ) : (
                <ul className="file-list">
                  {files.map((f) => (
                    <li
                      key={f.id}
                      className={`file-item ${
                        selectedId === f.id ? "active" : ""
                      }`}
                    >
                      <button
                        className="file-main"
                        onClick={() => setSelectedId(f.id)}
                        title={f.name}
                      >
                        <span className="icon">
                          {f.type === "image" ? (
                            <ImageIcon size={16} />
                          ) : (
                            <FileText size={16} />
                          )}
                        </span>
                        <span className="name">{f.name}</span>
                      </button>
                      <button
                        className="icon-btn danger"
                        onClick={() => removeFile(f.id)}
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="pane-right">
            {!selected && (
              <div className="preview-empty">Select a file to preview</div>
            )}

            {selected && selected.type === "image" && (
              <ImageViewer
                key={selected.id}
                src={selected.url}
                alt={selected.name}
                initialScale={1}
                minScale={0.4}
                maxScale={5}
                step={0.2}
              />
            )}

            {selected && selected.type === "pdf" && (
              <PdfViewer
                key={selected.id}
                fileUrl={selected.url}
                controls={{
                  prev: <ChevronLeft size={16} />,
                  next: <ChevronRight size={16} />,
                }}
              />
            )}
          </div>
        </div>
      )}

      {phase === "results" && (
        <div className="imp-results">
          <h3>{resultsTitle}</h3>
          <TableResult columns={resColumns} rows={resRows} />
        </div>
      )}

      {/* Import overlay */}
      {importing && (
        <div className="import-overlay" role="status" aria-live="polite">
          <div className="import-card">
            <div className="ring">
              <svg viewBox="0 0 44 44">
                <circle className="track" cx="22" cy="22" r="20" />
                <circle
                  className="fill"
                  cx="22"
                  cy="22"
                  r="20"
                  style={{
                    strokeDasharray: 125.6,
                    strokeDashoffset: 125.6 * (1 - importProgress / 100),
                  }}
                />
              </svg>
              <div className="ring-label">{Math.round(importProgress)}%</div>
            </div>
            <div className="import-text">Importing… Please wait</div>
          </div>
        </div>
      )}
    </section>
  );
}
