import Importer from "../../components/Importer/Importer";


export default function Invoices() {
  return (
    <Importer
      title="Upload Emirates ID"
      addLabel="Add Emirates ID"
      importLabel="Import"
      downloadLabel="Download Emirates ID"
      accept=".pdf,image/*"
    />
  );
}
