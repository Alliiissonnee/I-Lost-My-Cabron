import { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./Login.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/users/forgot-password",
                { email }
            );
            setMessage(response.data.message);
        } catch (err) {
            setError("Impossible de contacter le serveur");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Mot de passe oublié</h2>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Envoi..." : "Envoyer le lien"}
                </button>

                <p className="login-link">
                    <Link to="/login">Retour à la connexion</Link>
                </p>
            </form>
        </section>
    );
}
export default ForgotPassword