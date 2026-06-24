import Welcome from "./welcome";
import logoCaramelo from './assets/logo_cabron.jpg';

function About() {
   return (
    <div>
      <header>
         <img src={logoCaramelo} alt="Logo Cabron" />
      </header>
      
      <h1> I Lost My Cabron</h1> <br />
      <h2>– Retrouvons nos compagnons ensemble</h2>

Chaque année, des milliers d'animaux de compagnie disparaissent. Qu'il s'agisse d'un chien qui s'échappe lors d'une promenade, d'un chat qui ne rentre pas à la maison ou d'un animal trouvé errant dans la rue, les propriétaires se retrouvent souvent démunis et les personnes qui les recueillent ne savent pas toujours comment retrouver leur famille. <br />

**I Lost My Cabron** est une application mobile conçue pour faciliter la recherche et le signalement d'animaux perdus ou trouvés en Vendée.

L'objectif est simple : créer une communauté locale solidaire permettant de réunir plus rapidement les animaux et leurs propriétaires.

## Comment ça fonctionne ?

### Vous avez perdu votre animal ?

En quelques minutes, vous pouvez créer une annonce contenant :

* Une photo de l'animal
* Son nom
* Son espèce (chien, chat, lapin, oiseau, etc.)
* Sa race
* Son âge
* Son état de vaccination
* Son identification par puce électronique
* Le lieu, la date et l'heure de sa disparition
* Une description complémentaire

L'annonce est ensuite visible par l'ensemble des utilisateurs de l'application.

### Vous avez trouvé un animal ?

Vous pouvez également publier un signalement en indiquant :

* Une photo de l'animal trouvé
* Son espèce et sa race estimée
* Le lieu où il a été aperçu ou recueilli
* La date de découverte
* Si vous avez pu le récupérer
* Si un vétérinaire a vérifié la présence d'une puce électronique
* Les informations d'identification retrouvées

## Une recherche simplifiée

L'application met automatiquement en relation les signalements similaires.

Par exemple, lorsqu'un chat est déclaré perdu dans une commune et qu'un chat ressemblant est signalé trouvé à proximité quelques jours plus tard, les utilisateurs concernés peuvent être alertés.

Cette fonctionnalité permet de gagner un temps précieux dans les recherches.

## Une carte interactive

Tous les signalements sont affichés sur une carte afin de visualiser rapidement les zones où des animaux ont été perdus ou trouvés.

Les utilisateurs peuvent filtrer les résultats par :

* Type d'animal
* Date
* Localisation
* Statut du signalement

## Une solution locale et solidaire

I Lost My Cabron souhaite rassembler propriétaires, citoyens, vétérinaires, refuges et associations autour d'un même objectif : réduire le temps de séparation entre un animal et sa famille.

En favorisant le partage rapide d'informations et la géolocalisation des signalements, l'application contribue à améliorer considérablement les chances de retrouver un animal disparu.

## Notre ambition

À terme, nous souhaitons intégrer :

* Des notifications intelligentes selon votre localisation
* Une reconnaissance d'image assistée par intelligence artificielle
* Une collaboration renforcée avec les vétérinaires et refuges
* Le partage automatique sur les réseaux sociaux
* Une couverture étendue à l'ensemble du territoire français

Parce qu'un animal perdu n'est jamais un simple animal, mais un membre de la famille, I Lost My Cabron met la technologie au service du lien qui nous unit à nos compagnons.

    </div>
   )
    
}

export default About;