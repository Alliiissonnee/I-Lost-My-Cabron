import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import "./Guest.css";

function GuestLogin() {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/users/guest-login", { code });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/account");
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
        <section className="guest-container">
            <form className="guest-box" onSubmit={handleSubmit}>
                <h2>Retrouver mes annonces</h2>

                {error && <p className="error-message">{error}</p>}

                <input
                    type="text"
                    placeholder="Code de suivi (5 chiffres)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={5}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Connexion..." : "Continuer"}
                </button>

                <p className="login-link">
                    <Link to="/guest">Pas encore de code ? Créer un compte invité</Link>
                </p>
            </form>
        </section>
    );
}

export default GuestLogin;