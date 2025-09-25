// import "./BankStatement.css";
import Importer from "../../components/Importer/Importer";

export default function BankStatement() {
   return (
       <Importer
         title="Upload Bank Statements"
         addLabel="Add Bank Statements"
         importLabel="Import"
         downloadLabel="Download Bank Statements"
         accept=".pdf,image/*"
       />
     );
}
