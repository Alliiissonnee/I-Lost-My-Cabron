import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import "./Guest.css";

function Guest() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleGuestLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/users/guest");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/welcome");
        } catch (err) {
            setError("Impossible de créer un compte invité");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="guest-container">

            <div className="guest-box">
                <h2>Continuer en tant qu'invité</h2>
                <p>
                    Tu pourras poster des annonces de façon anonyme, sans créer de compte.
                </p>

                {error && <p className="error-message">{error}</p>}

                <button onClick={handleGuestLogin} disabled={loading}>
                    {loading ? "Création..." : "Continuer en invité"}
                </button>

                <p className="login-link">
                    Tu préfères un vrai compte ? <Link to="/register">S'inscrire</Link>
                </p>
                <Link to="/welcome" className="link_to_welcome">
                    Retour à l'accueil
                </Link>
            </div>
        </section>
    );
}

export default Guest;
