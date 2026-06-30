import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card, Accordion, Button, Badge } from "react-bootstrap";


function AnimalCard({ animal }) {
    const [expanded, setExpanded] = useState(false);
    const isLong = animal.Description.length > 50;
    const displayText = expanded || !isLong
        ? animal.Description
        : animal.Description.slice(0, 50) + '...';

    return (
        <Card>
            <Card.Img variant="top" src={animal.Photo} />
            <span className={`status-badge ${animal.Status === 'perdu' ? 'status-perdu' : 'status-trouve'}`}>
                {animal.Status}
            </span>
            <Card.Body>
                <Card.Title>{animal.Name}</Card.Title>
                <p className="description-text">
                    {displayText}
                    {isLong && (
                        <button
                            className="see-more-btn"
                            onClick={() => setExpanded(!expanded)}
                        >
                            {expanded ? ' voir moins' : ' voir plus'}
                        </button>
                    )}
                </p>
                <Button className="btn" variant="success">Voir les options</Button>
            </Card.Body>
        </Card>
    );
}

function Cards() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/pets')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then((data) => {
                setAnimals(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    if (loading) return <p>Chargement des animaux...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className="cards-row">
            {animals.map((animal) => (
                <AnimalCard key={animal._id} animal={animal} />
            ))}
        </div>
    );
}


export default Cards