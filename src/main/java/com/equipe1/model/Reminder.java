package com.equipe1.model;

public interface Reminder {

    enum EtudiantReminder implements Reminder {
        NO_CV, NO_CANDIDATURE_ON_STAGE, SIGNATURE_MISSING_ON_CONTRAT, NOT_REGISTERED_THIS_SESSION, STAGE_FREQUENTATION_NOT_CONFIRMED
    }

    enum EmployeurReminder implements Reminder {
        OPEN_STAGE_HAS_CANDIDATURES, SIGNATURE_MISSING_ON_CONTRAT, NO_OPEN_STAGE_THIS_SESSION
    }

    enum GestionaireReminder implements Reminder {
        UNREVIEWED_CVS, UNREVIEWED_STAGES, CONTRAT_READY_TO_BE_GENERATED, NEW_SESSION_SOON
    }
}
