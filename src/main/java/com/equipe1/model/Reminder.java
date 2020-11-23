package com.equipe1.model;

public interface Reminder {

    enum EtudiantReminder implements Reminder {
        PAS_DE_CV, PAS_DE_CANDIDATURE_SUR_UN_STAGE, SIGNATURE_MANQUANTE_SUR_UN_CONTRAT, PAS_ENREGISTRE_CETTE_SESSION, FREQUENTATION_DE_STAGE_PAS_CONFIRMEE
    }

    enum EmployeurReminder implements Reminder {
        UN_STAGE_ENCORS_OUVERT_A_DES_CANDIDATURES, SIGNATURE_MANQUANTE_SUR_UN_CONTRAT, PAS_DE_STAGE_OUVERT_CETTE_SESSION
    }

    enum GestionaireReminder implements Reminder {
        CV_SANS_VETO, STAGE_SANS_VETO, CONTRAT_PRET_A_ETRE_GENERE, NOUVELLE_SESSION_IMINENTE
    }
}
