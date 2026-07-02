import photoCabron from './assets/Photo_i_lost_my_cabron.jpg';
import animalWorld from './assets/world-animal-day.png'
import { Link, useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import logoCarameloDrk from './assets/logoCarameloDark.png';
import "./Account.css";
import axios from "axios";  
import Button from 'react-bootstrap/Button';
import Card from './Card';
import { CardImg } from 'react-bootstrap';

function Account() {
    const [listPets, setListPets] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [filtrePet, setFiltrePet] = useState("tous");
    const [displayCard, setDisplayCard] = useState(false);
    const [user, setUser] = useState(null);
    const [isDark, setIsDark] = useState(
        window.matchMedia('(prefers-color-scheme : dark)').matches
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/welcome");
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Êtes-vous sur de vouloir supprimer votre compte ? Cette action est irréversible.");
        if (!confirmed) return;
        try {
            const response = await fetch('http://localhost:3000/users/me', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();

            if (response.ok) {
                alert("Votre compte a été supprimé.");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/welcome");
            } else {
                alert("Erreur : " + data.message);
            }
        } catch (error) {
            alert("Une erreur est survenue.");
        }
    };

    // darkmode
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme : dark)');
        const handleChange = (e) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);

    }, []);

    useEffect(() => {
        const chercherPets = async () => {
            try {
            const token = localStorage.getItem("token");
               const response= await axios.get("http://localhost:3000/pets/mine", {
                headers: {
                Authorization: `Bearer ${token}`
                }
                });
                setListPets(response.data);
         } catch (error) {
            console.error("Erreur:", error.response?.data || error.message);
         }
        };
         chercherPets();
    }, []);
     
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);


    return (<>
        <div className='Welcome'>
            <header className="Top">

                {isDark ? (
                    <img src={logoCarameloDrk} className="logo_cabron_drk" alt="Logo Cabron dark" />
                ) : (
                    <img src={photoCabron} className="logo_cabron" alt="Logo Cabron" />
                )}

                <button type='button' className='menu' onClick={() => {
                    setMenuOpen(!menuOpen)
                }}>Menu</button>

                {/* Button pour donner acess aux deux formulaires perdu/trouve */}
                <ul className={`dropside-menu ${menuOpen ? "open" : ""}`}>
                    <li> <button
                        className="logout"
                        onClick={() => {
                            setDisplayCard(true);
                            setFiltrePet("tous");
                        }}
                    >
                        Voir tous les animaux
                    </button>
                    </li>
                    <li>
                        <button
                            className="logout"
                            onClick={() => {
                                setDisplayCard(true);
                                setFiltrePet("trouve");
                            }}
                        >
                            Voir tous les animaux trouvés
                        </button>
                    </li>
                    <li>
                        <button className="logout"
                            onClick={() => {
                                setDisplayCard(true);
                                setFiltrePet("perdu");
                            }}
                        > Voir tous les animaux perdus</button>
                    </li>

                    <li style={{ position: "relative" }}>
                        <button className="logout" onClick={() => setOpen(!open)} > Poster une annonce </button>
                    </li>
                    {open && (
                        <ul style={{ position: "absolute", left: "100%", top: 100, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <li>
                                <button className="logout" onClick={() => navigate("/FormPerdu")}>Pet perdu</button>
                            </li>
                            <hr style={{ width: "100%" }} />
                            <li>
                                <button className="logout" onClick={() => navigate("/FormTrouve")}>Pet trouvé</button>
                            </li>

                        </ul>
                    )}
                    <li>
                        <button className='logout' onClick={() => navigate("/account")}> Voir mes annonces</button>
                    </li>
                </ul>
                    <br/>
                <section>
                    <ul>
                        <li>
                            <Link to="/about">A propos de nous</Link>
                        </li>
                        <li>
                            <Link to="/services">Services</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </section>

                <input type="text" className='search' />

            </header>

            <aside>
                <img src={animalWorld} className="login" alt="Sign up / in" onClick={() => {
                    setLoginOpen(!loginOpen)
                }} />
                <ul className={`dropdown-login ${loginOpen ? "open" : ""}`}>
                    <li>
                        <button onClick={handleLogout} className="logout">Se deconnecter</button>
                    </li>
                    <li>
                        <button onClick={handleDeleteAccount} className="delete-account">Supprimer mon compte</button>
                    </li>
                </ul>
            </aside>
            {user && (
                <h1>
                    Bienvenue {user.firstname} !
                </h1>
            )}
            {displayCard ? (
                <Card filtre={filtrePet} />
            ) : (
                <p className="no-annonce"> Vous n'avez pas encore publié d'annonce..  </p>
            )}


        </div>
        
    </>
    )
}

export default Account