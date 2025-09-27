import BankStatement from "../pages/BankStatement/BankStatement";
import Invoices from "../pages/Invoices/Invoices";
import Bills from "../pages/Bills/Bills";
import EmiratesId from "../pages/EmiratesId/EmiratesId";
import Passport from "../pages/Passport/Passport";
import Visa from "../pages/Visa/Visa";
import TradeLiscense from "../pages/TradeLiscense/TradeLiscense";
import Project from "../pages/Project/Project";
import TableResultPage from "../pages/TableResultPage/TableResultPage"
import NotFound from "../pages/NotFound/NotFound";

// Only the Converts submenu pages are routed.
const routes = [
    { path: "/", element: Project }, // default to Bank Statement
    { path: "/converts/bank-statement", element: BankStatement },
    { path: "/converts/bank-statement/tableresult", element: TableResultPage },
    { path: "/converts/invoices", element: Invoices },
    { path: "/converts/invoices/tableresult", element: TableResultPage },
    { path: "/converts/bills", element: Bills },
    { path: "/converts/bills/tableresult", element: TableResultPage },
    { path: "/converts/emiratesid", element: EmiratesId },
    { path: "/converts/emiratesid/tableresult", element: TableResultPage },
    { path: "/converts/passport", element: Passport },
    { path: "/converts/passport/tableresult", element: TableResultPage },
    { path: "/converts/visa", element: Visa },
    { path: "/converts/visa/tableresult", element: TableResultPage },
    { path: "/converts/tradelicense", element: TradeLiscense },
    { path: "/converts/tradelicense/tableresult", element: TableResultPage },
    { path: "*", element: NotFound },
];

export default routes;
