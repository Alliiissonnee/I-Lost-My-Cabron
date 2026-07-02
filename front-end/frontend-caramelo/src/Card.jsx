import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Card, Accordion, Button, Badge } from "react-bootstrap";
import { Autocomplete, FormControl, FormLabel, ChipDelete, Chip } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';


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

    const [filters, setFilters] = useState([]);

    // Construit les options à partir de ton state animals
    const searchOptions = animals.flatMap((animal) => [
        { label: animal.Name, type: 'Nom', value: animal.Name },
        { label: animal.Status, type: 'Statut', value: animal.Status },
        { label: animal.Species, type: 'Espèce', value: animal.Species },
        { label: animal.Breed, type: 'Race', value: animal.Breed },
        { label: animal.Description, type: 'Description', value:animal.Description},
    ]).filter((opt, index, self) =>
        index === self.findIndex((o) => o.label === opt.label && o.type === opt.type)
    );

    const filteredAnimals = filters.length === 0 ? animals : animals.filter((animal) =>
        filters.every((f) => {
            if (f.type === 'Nom') return animal.Name === f.value;
            if (f.type === 'Statut') return animal.Status === f.value;
            if (f.type === 'Espèce') return animal.Species === f.value;
            if (f.type === 'Race') return animal.Breed === f.value;
            if (f.type === 'Description') return animal.Description === f.value;
            return true;
        })
    );

    if (loading) return <p>Chargement des animaux...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (

        <CssVarsProvider>
            <div className="cards-layout">
                <div className="search-bar">
                    <FormControl id="multiple-limit-tags">
                        <FormLabel>Rechercher un animal</FormLabel>
                        <Autocomplete
                            multiple
                            placeholder="Ex: Nom, statut, espèce,..."
                            options={searchOptions}
                            getOptionLabel={(option) => option.label}
                            groupBy={(option) => option.type}
                            value={filters}
                            onChange={(event, newValue) => setFilters(newValue)}
                            isOptionEqualToValue={(option, value) =>
                                option.label === value.label && option.type === value.type
                            }
                            sx={{ width: '500px' }}
                        />
                    </FormControl>
                </div>
                <div className='cards-row'>
                    {filteredAnimals.map((animal) => (
                        <AnimalCard key={animal._id} animal={animal} />
                    ))}
                </div>
            </div>
        </CssVarsProvider>


    );
}


export default Cards