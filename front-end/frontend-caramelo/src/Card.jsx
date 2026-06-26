import { useState, useEffect } from "react";

function Cards() {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/ILostMyCabron')
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
      });
  }, []);

  if (loading) return <p>Chargement des animaux...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <section className="cards-container">
      {animals.map((animal) => (
        <div className="card" key={animal.id}>
          <img src={animal.photo} alt={animal.nom} />
          <h3>{animal.nom}</h3>
          <p>{animal.statut}</p>
        </div>
      ))}
    </section>
  );
}


export default Cards