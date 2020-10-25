import React, {useState,useEffect} from 'react';

const useCreationContrat =(data) =>{

    const [isLoading, setIsLoading] = useState(true);
    const [employeur, setEmployeur] = useState(null);
    const [error, setError] = useState(true);

    return{
        employeur, 
        error, 
        isLoading
    };
};

export default useCreationContrat;