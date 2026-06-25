import photoCabron from './assets/Photo_i_lost_my_cabron.jpg';
import animalWorld from './assets/world-animal-day.png'
import { Link } from 'react-router';
import React, { useState, useEffect } from 'react';
import logoCarameloDrk from './assets/logoCarameloDark.png';


function Account() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const [isDark, setIsDark] = useState(
        window.matchMedia('(prefers-color-scheme : dark)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme : dark)');

        const handleChange = (e) => setIsDark(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);

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


                <ul className={`dropside-menu ${menuOpen ? "open" : ""}`}>
                    <li>
                        Voir les animaux trouvés
                    </li>
                    <li>
                        Voir les animaux perdus
                    </li>
                    <li>
                        Poster une annonce
                    </li>
                    <li>
                        Modifier une annonce
                    </li>
                </ul>

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
                        Se <br />
                        déconnecter
                    </li>
                    <li>
                        Supprimer <br />
                        mon compte
                    </li>

                </ul>
            </aside>
        </div>
    </>
    )

}

export default Account