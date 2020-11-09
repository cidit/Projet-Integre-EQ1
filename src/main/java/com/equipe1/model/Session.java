package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@Builder
public class Session {

    @Id
    private long id;
    private String name;
    private LocalDate startDate;
    private boolean isCurrent;

    public Session() {
        this.isCurrent = true;
    }
}
