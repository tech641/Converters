import BankStatement from "../pages/BankStatement/BankStatement";
import Invoices from "../pages/Invoices/Invoices";
import NotFound from "../pages/NotFound/NotFound";

// Only the Converts submenu pages are routed.
const routes = [
    { path: "/", element: BankStatement }, // default to Bank Statement
    { path: "/converts/bank-statement", element: BankStatement },
    { path: "/converts/invoices", element: Invoices },
    { path: "*", element: NotFound },
];

export default routes;
