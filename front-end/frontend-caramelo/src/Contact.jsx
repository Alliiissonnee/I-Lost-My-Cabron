import "./About.css";
import { useNavigate, Link } from "react-router";

function Contact() {
    return (
        <div className="about-container">

            <p> Page en cours de developpement..</p>
            <Link to="/welcome" className="go-back-to-welcome">
                Retour à l'accueil
            </Link>
        </div>
    )

}

export default Contact;