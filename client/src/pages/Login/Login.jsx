import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { loginUser } from "../../helper/helper";
import { useAuth } from "../../context/AuthContext"

export default function Login() {
    const navigate = useNavigate();
    const [showPwd, setShowPwd] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        if (!form.email || !form.password) {
            return setMsg({ type: "error", text: "Email and password are required." });
        }

        try {
            setLoading(true);
            const { token, user } = await loginUser(form);
            login(token, user);
            setMsg({ type: "success", text: "Signed in successfully." });
            navigate("/", { replace: true });
        } catch (err) {
            setMsg({ type: "error", text: err.message || "Login failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h2 className="title">Welcome back</h2>

                {msg.text && (
                    <div className={`alert ${msg.type === "error" ? "error" : "success"}`}>
                        {msg.text}
                    </div>
                )}

                <form className="login-form" onSubmit={onSubmit} noValidate>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={onChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            id="password"
                            name="password"
                            type={showPwd ? "text" : "password"}
                            placeholder="••••••••"
                            value={form.password}
                            onChange={onChange}
                            required
                        />
                        <button
                            type="button"
                            className="toggle"
                            onClick={() => setShowPwd((s) => !s)}
                        >
                            {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button className="btn-primary" type="submit" disabled={loading} onClick={() => navigate("/")}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <hr className="divider" />

                <div className="switch">
                    Don’t have an account?{" "}
                    <span className="link-btn" onClick={() => navigate("/signup")}>
                        Create an account
                    </span>
                </div>

            </div>
        </div>
    );
}
