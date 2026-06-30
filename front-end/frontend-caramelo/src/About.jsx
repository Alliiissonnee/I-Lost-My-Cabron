import Welcome from "./welcome";
import logoCaramelo from './assets/logo_cabron.jpg';

function About() {
   return (<>
      <div>
         <header>
            <img src={logoCaramelo} alt="Logo Cabron" />
         </header>

         <h1> I Lost My Cabron</h1> <br />

         <h2>Fun fact :</h2> Ce site à vu le jour pendant notre premier projet de groupe durant notre formation en développement-web, le nom à été trouver pendant une farce lorsque j'ai entendu mon ami <br />
         Brésilien, appelé le chien d'une collègue de la formation. Ce nom peut sembler vulgaire mais il à une autre conotation amicale <br />
         en langue hispanique cela peut se traduire : "mon pote", "mon copain", etc.<br />


         <br />

         <h2>– Retrouvons nos compagnons ensemble</h2><br />

         Chaque année, des milliers d'animaux de compagnie disparaissent. <br /> Qu'il s'agisse d'un chien qui s'échappe lors d'une promenade, d'un chat qui ne rentre pas à la maison <br /> ou d'un animal trouvé errant dans la rue, les propriétaires se retrouvent souvent démunis et les personnes qui les recueillent ne savent pas toujours comment retrouver leur famille. <br />
         <br />
         <h4>I Lost My Cabron</h4> est une application mobile conçue pour faciliter la recherche et le signalement d'animaux perdus ou trouvés en France. <br />

         L'objectif est simple : créer une communauté nationale solidaire permettant de réunir plus rapidement les animaux et leurs propriétaires. <br />
         <br />

         <h2> Comment ça fonctionne ?</h2><br />

         <h3> Vous avez perdu votre animal ?</h3>

         En quelques minutes, vous pouvez créer une annonce contenant : <br />

         * Une photo de l'animal <br />
         * Son nom <br />
         * Son espèce (chien, chat, lapin, oiseau, etc.) <br />
         * Sa race <br />
         * Son âge <br />
         * Son état de vaccination <br />
         * Son identification par puce électronique <br />
         * Le lieu, la date et l'heure de sa disparition <br />
         * Une description complémentaire <p>
            <br />

            L'annonce est ensuite visible par l'ensemble des utilisateurs de l'application.</p>
         <br />
         <h3> Vous avez trouvé un animal ?</h3>

         Vous pouvez également publier un signalement en indiquant : <p> <br />

            * Une photo de l'animal trouvé</p>
         * Son espèce et sa race estimée <br />
         * Le lieu où il a été aperçu ou recueilli <br />
         * La date de découverte <br />
         * Si vous avez pu le récupérer <br />
         * Si un vétérinaire a vérifié la présence d'une puce électronique <br />
         * Les informations d'identification retrouvées <p> <br />

            <h2>Une recherche simplifiée</h2></p>

         <br />

         L'application met automatiquement en relation les signalements similaires. <br />

         Par exemple, lorsqu'un chat est déclaré perdu dans une commune et qu'un chat ressemblant est signalé trouvé à proximité quelques jours plus tard, les utilisateurs concernés peuvent être alertés. <br />

         Cette fonctionnalité permet de gagner un temps précieux dans les recherches. <br />

         <h3> Une carte interactive</h3> <br />

         Tous les signalements sont affichés sur une carte afin de visualiser rapidement les zones où des animaux ont été perdus ou trouvés.<br />

         Les utilisateurs peuvent filtrer les résultats par :<br />
         <br />

         * Type d'animal <br />
         * Date <br />
         * Localisation <br />
         * Statut du signalement <br />

         <h3> Une solution locale et solidaire </h3><br />

         I Lost My Cabron souhaite rassembler propriétaires, citoyens, vétérinaires, refuges et associations autour d'un même objectif : réduire le temps de séparation entre un animal et sa famille. <br />

         En favorisant le partage rapide d'informations et la géolocalisation des signalements, l'application contribue à améliorer considérablement les chances de retrouver un animal disparu. <br />
         <br />

         <h2> Notre ambition</h2> <br />

         À terme, nous souhaitons intégrer : <br />

         * Des notifications intelligentes selon votre localisation <br />
         * Une reconnaissance d'image assistée par intelligence artificielle <br />
         * Une collaboration renforcée avec les vétérinaires et refuges <br />
         * Le partage automatique sur les réseaux sociaux <br />
         * Une couverture étendue à l'ensemble du territoire français <br />

         Parce qu'un animal perdu n'est jamais un simple animal, mais un membre de la famille, <br />
         I Lost My Cabron met la technologie au service du lien qui nous unit à nos compagnons. <p>

            <br />
         </p>

      </div>
   </>)

}

export default About;