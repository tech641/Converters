import Importer from "../../components/Importer/Importer";


export default function Invoices() {
  return (
    <Importer
      title="Upload Invoices"
      addLabel="Add Invoices"
      importLabel="Import"
      downloadLabel="Download Invoice"
      accept=".pdf,image/*"
    />
  );
}
