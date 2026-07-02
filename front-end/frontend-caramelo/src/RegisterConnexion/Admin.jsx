import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import { useNavigate, Link } from "react-router";


function Admin() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const administrator = storedUser && storedUser.profile === "admin";


    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("http://localhost:3000/users", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data.users);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Erreur lors du chargement");
            } else {
                setError("Impossible de contacter le serveur");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm("Supprimer cet utilisateur définitivement ?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // On retire l'utilisateur supprimé de la liste affichée, sans tout recharger
            setUsers(users.filter((u) => u._id !== userId));
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Erreur lors de la suppression");
            } else {
                setError("Impossible de contacter le serveur");
            }
        }
    };
    if (!administrator) {
        return (
            <section className="admin-container">
                <p className="access-denied">Accès réservé aux administrateurs.</p>
                <Link to="/welcome" className="go-back-to-welcome">
                    Retour à l'accueil
                </Link>
            </section>
        );
    }
    if (loading) return <p>Chargement...</p>;
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/welcome");
    };
    return (
        <section className="admin-container">      
            <Link to="/account" className="go-back-to-account">
                Retour à l'accueil
            </Link>
            <h2>Gestion des utilisateurs</h2>

            {error && <p className="error-message">{error}</p>}

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Profil</th>
                        <th>Action</th>
                        <th>Dernière connexion</th>

                        <button onClick={handleLogout} className="logout-button">
                            Se déconnecter
                        </button>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.firstname || "—"}</td>
                            <td>{user.surname || "—"}</td>
                            <td>{user.email || "—"}</td>
                            <td>{user.profile}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                            <td>{user.lastConnection ? new Date(user.lastConnection).toLocaleString('fr-FR') : "Jamais"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Admin;