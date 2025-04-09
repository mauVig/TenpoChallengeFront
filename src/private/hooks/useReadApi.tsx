import { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL, API_URL_MORE } from "../constants/privateConstants";

/* Este hook sirve para hacer las llamadas al backend que a su vez hacen la llamada a la api. Primero encontramos el estado que contiene todos los datos, y luego también tenemos el estado del último index, que sirve para identificar cuál es la última posición en la cual quedó asentado en el backend en donde se terminó de extraer los ultimos elementos. Recordemos que se traen de a 10 elementos.  También tenemos que cuando se desmonta este hook se reinicia los datos y el index vuelve a cero. luego tenemos la función en la cual se van pidiendo de a 10 elementos y que se entrega a través de una query cuál es el último index en el cual se quedó.  */

export interface HomeData {
    homeData: {
        id: number;
        title: string;
        thumbnail: string;
        freetogame_profile_url: string;
    }
}

export const useReadApi = () => {
    const [data, setData] = useState<HomeData[]>([])
    const [lastIndex, setLastIndex] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            axios.get(API_URL)
            .then((response) => {
                setData(response.data.homeData)
                setLastIndex(response.data.myIndex)
            })
            .catch((error) => {
                console.error(error)
            })
        };
        fetchData()
        
        if(data.length === 0) {
            fetchData()
        }
        return () => {
            setData([]) 
            setLastIndex(0) 
        }
    },[])

    const getMoreData = async () => {
        axios.get(`${API_URL_MORE}?lastIndex=${lastIndex}`)
        .then((response) => {
            setData(prevData => [...prevData, ...response.data.homeData])
            setLastIndex(response.data.myIndex)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    
    return { data, lastIndex, getMoreData }
}