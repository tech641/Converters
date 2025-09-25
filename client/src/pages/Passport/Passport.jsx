import Importer from "../../components/Importer/Importer";


export default function Invoices() {
  return (
    <Importer
      title="Upload Passport"
      addLabel="Add Passport"
      importLabel="Import"
      downloadLabel="Download Passport"
      accept=".pdf,image/*"
    />
  );
}
