package com.equipe1.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Enseignant extends User {

    {
        this.desc = "Enseignant";
    }

    @JsonIgnore
    @OneToMany(mappedBy = "enseignant")
    protected List<EvaluationMilieuStage> evaluationMilieuStage;
}
