import Importer from "../../components/Importer/Importer";


export default function Invoices() {
  return (
    <Importer
      title="Upload Visa"
      addLabel="Add Visa"
      importLabel="Import"
      downloadLabel="Download Visa"
      accept=".pdf,image/*"
    />
  );
}
