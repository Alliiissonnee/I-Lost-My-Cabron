import photoCabron from './assets/Photo_i_lost_my_cabron.jpg';
import animalWorld from './assets/world-animal-day.png'
import { Link } from 'react-router';
import React, { useState } from 'react';


function Welcome() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)



    return (<>
        <div className='Welcome'>
            <header className="Top">

                <img src={photoCabron} className="logo_cabron" alt="Logo Cabron" />

                <button type='button' className='menu' onClick={() => {
                    setMenuOpen(!menuOpen)
                }}>Menu</button>


                <ul className={`dropside-menu ${menuOpen ? "open" : ""}`}>
                    <li>
                        Animaux trouvés
                    </li>
                    <li>
                        Animaux perdus
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

                <ul className={`dropside-login ${loginOpen ? "open" : ""}`}>
                    <li>
                        Se connecter
                    </li>
                    <li>
                        S'inscrire
                    </li>
                    <li>
                        Compte invité
                    </li>
                </ul>
            </aside>
        </div>
    </>
    )

}

export default Welcome