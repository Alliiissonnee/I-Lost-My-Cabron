import photoCabron from './assets/Photo_i_lost_my_cabron.jpg';
import animalWorld from './assets/world-animal-day.png'
import { Link, useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';
import logoCarameloDrk from './assets/logoCarameloDark.png';
import "./Account.css";


function Account() {
     const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
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

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme : dark)');
        const handleChange = (e) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);

    }, []);

   {/*modification bien valide */}

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
                    <li>
                         <button  className="logout"> Voir tous les animaux trouvés </button>
                    </li>
                    <li>
                       <button  className="logout"> Voir tous les animaux perdus</button>
                    </li>

                    <li style={{position: "relative"}}>
                    <button  className="logout" onClick={() => setOpen(!open)} > Poster une annonce </button>
                    </li>
                    { open && (
                    <ul style={{position: "absolute", left:"100%", top:100, listStyle: "none", display: "flex", flexDirection:"column", gap: "8px"}}>   
                      <li>
                      <button className="logout" onClick={() => navigate("/FormPerdu")}>Pet perdu</button> 
                     </li>
                     <hr style={{ width:"100%"}}/>
                      <li>
                      <button className="logout" onClick={() => navigate("/FormTrouve")}>Pet trouvé</button> 
                      </li>
                    </ul>
                    )}
                </ul>
                   {/*modification */}
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
        </div>
    </>
    )
}

export default Account