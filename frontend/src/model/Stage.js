import Employeur from './Employeur'
export default class Stage{
    id;
    titre = "";
    description = "";
    exigences= "";
    dateDebut= "";
    dateFin= "";
    nbHeuresParSemaine= "";
    salaire= "";
    nbAdmis= "";
    isOuvert;
    isApprouve;
    dateLimiteCandidature= "";
    programme= "";
    ville ="";
    employeur= new Employeur();
}