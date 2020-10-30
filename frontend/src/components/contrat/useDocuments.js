import { useState, useEffect } from "react";
import ContratService from "../../service/ContratService";


const useDocuments = (props) => {

    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const [counter, setCounter] = useState(0);


    console.log(props)

    const doFetch = async ()=>{
        ContratService.getContrats().then((res) => setData(res.data) );
      
       
        setIsloading(false);
      }

    //console.log(data.data.id)

    useEffect(() => {
        doFetch();
        return () => {
        }
    }, [])

    return {
        response: data,
        isLoading,
        error,
        counter
    };

};
export default useDocuments;