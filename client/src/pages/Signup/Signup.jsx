import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { registerUser } from "../../helper/helper";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
    const navigate = useNavigate();
    const [showPwd, setShowPwd] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [msg, setMsg] = useState({ type: "", text: "" });
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: "", text: "" });

        if (!form.name || !form.email || !form.password) {
            return setMsg({ type: "error", text: "All fields are required." });
        }

        try {
            setLoading(true);
            const { token, user } = await registerUser(form);
            login(token, user);
            setMsg({ type: "success", text: "Account created successfully." });
            navigate("/", { replace: true });
        } catch (err) {
            setMsg({ type: "error", text: err.message || "Signup failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-card">

                <h2 className="title">Create your account</h2>

                {msg.text && (
                    <div className={`alert ${msg.type === "error" ? "error" : "success"}`}>
                        {msg.text}
                    </div>
                )}

                <form className="signup-form" onSubmit={onSubmit} noValidate>
                    <label htmlFor="name">Full name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={onChange}
                        required
                    />

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
                            placeholder="Create a password"
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
                        {loading ? "Creating..." : "Create Account"}
                    </button>
                </form>

                <hr className="divider" />

                <div className="switch">
                    Already have an account?{" "}
                    <span className="link-btn" onClick={() => navigate("/login")}>
                        Sign in
                    </span>
                </div>

            </div>
        </div>
    );
}
