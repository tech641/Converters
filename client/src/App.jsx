import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import routes from "./routes";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                {routes.map((r) => (
                    <Route key={r.path} path={r.path} element={<r.element />} />
                ))}
            </Route>
            
            {/* 404 */}
            {routes.find((r) => r.path === "*") ? null : (
                <Route path="*" element={<div>Not found</div>} />
            )}
        </Routes>
    );
}
