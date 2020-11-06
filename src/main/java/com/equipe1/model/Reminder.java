package com.equipe1.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

//@Entity
//@AllArgsConstructor
//@NoArgsConstructor
@Data
@Builder

public class Reminder {

//    SHOULD NOT BE AN ENTITY
//    @Id
//    private Long id;

    private String title;
    private String message;

}
