import BankStatement from "../pages/BankStatement/BankStatement";
import Invoices from "../pages/Invoices/Invoices";
import Bills from "../pages/Bills/Bills";
import EmiratesId from "../pages/EmiratesId/EmiratesId";
import Passport from "../pages/Passport/Passport";
import Visa from "../pages/Visa/Visa";
import TradeLiscense from "../pages/TradeLiscense/TradeLiscense";
import NotFound from "../pages/NotFound/NotFound";

// Only the Converts submenu pages are routed.
const routes = [
    { path: "/", element: BankStatement }, // default to Bank Statement
    { path: "/converts/bank-statement", element: BankStatement },
    { path: "/converts/invoices", element: Invoices },
    { path: "/converts/bills", element: Bills },
    { path: "/converts/emiratesid", element: EmiratesId },
    { path: "/converts/passport", element: Passport },
    { path: "/converts/visa", element: Visa },
    { path: "/converts/tradelicense", element: TradeLiscense },
    { path: "*", element: NotFound },
];

export default routes;
