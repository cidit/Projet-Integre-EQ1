import React from 'react'

export default function useListeContrats(id) {
    const {_id} = id;
    const [contrats, setContrats] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isEmployeur, setIsEmployeur] = useState(false);
    const [isEtudiant, setIsEtudiant] = useState(false);



    const getAllContrats = async () => {
        ContratService.getContrats().then((res) => setContrats(res.data));
        setIsloading(false);
    }

    useEffect(() => {
        getAllContrats();
        return () => {
        }
    }, [contrats])


    const getById = async (_id) => {
        ContratService.getById(id).then((res) => {
            setContrats(res.data);

            //if(res.data.){}
        
        
        
        });
        setIsloading(false);
    }

    useEffect(() => {
        getById();
        return () => {
        }
    }, [contrats])


    return (
        contratsList,
        error,
        isLoading,
        isEmployeur,
        isEtudiant
    )
}
