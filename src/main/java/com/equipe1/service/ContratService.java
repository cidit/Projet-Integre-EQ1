package com.equipe1.service;

import com.equipe1.repository.ContratRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContratService {

    @Autowired
    private ContratRepository contratRepository;


}
