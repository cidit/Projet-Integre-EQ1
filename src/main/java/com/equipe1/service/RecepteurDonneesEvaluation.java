package com.equipe1.service;

import com.equipe1.model.Commentaire;
import com.equipe1.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecepteurDonneesEvaluation {
        private List<Question> questions;
        private Commentaire commentaires;
}
