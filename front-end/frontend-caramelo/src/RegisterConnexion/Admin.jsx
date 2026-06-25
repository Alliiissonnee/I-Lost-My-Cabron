import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

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

    if (loading) return <p>Chargement...</p>;

    return (
        <section className="admin-container">
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Admin;