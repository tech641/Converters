import "./TableResult.css";

export default function TableResult({ columns = [], rows = [] }) {
  if (!columns.length) return <div className="muted">No results.</div>;
  return (
    <div className="tbl-wrap">
      <table className="tbl">
        <thead>
          <tr>{columns.map((c) => <th key={c.key || c}>{c.label || c}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx}>
              {columns.map((c) => <td key={c.key || c}>{r[c.key || c] ?? ""}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
