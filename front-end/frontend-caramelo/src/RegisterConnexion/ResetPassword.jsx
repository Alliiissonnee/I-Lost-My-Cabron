import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import axios from "axios";
import "./Login.css";

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:3000/users/reset-password/${token}`,
                { password }
            );
            setSuccess(response.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Impossible de contacter le serveur");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Nouveau mot de passe</h2>

                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}

                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Réinitialisation..." : "Réinitialiser"}
                </button>

                <p className="login-link">
                    <Link to="/login">Retour à la connexion</Link>
                </p>
            </form>
        </section>
    );
}
export default ResetPassword