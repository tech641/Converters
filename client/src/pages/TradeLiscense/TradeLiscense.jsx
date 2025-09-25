import Importer from "../../components/Importer/Importer";


export default function Invoices() {
  return (
    <Importer
      title="Upload Trade Liscense"
      addLabel="Add Trade Liscense"
      importLabel="Import"
      downloadLabel="Download Trade Liscense"
      accept=".pdf,image/*"
    />
  );
}
