import Importer from "../../components/Importer/Importer";


export default function Invoices() {
  return (
    <Importer
      title="Upload Bills"
      addLabel="Add Bills"
      importLabel="Import"
      downloadLabel="Download Bills"
      accept=".pdf,image/*"
    />
  );
}
