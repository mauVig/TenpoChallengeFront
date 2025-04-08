import { useEffect, useState } from "react";
import axios from 'axios'
import { API_URL, API_URL_MORE } from "../constants/privateConstants";


interface HomeData {
    homeData: {
        id: number;
        title: string;
        thumbnail: string;
    }
}

export const useReadApi = () => {
    const [data, setData] = useState<HomeData[]>([])
    const [lastIndex, setLastIndex] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            axios.get(API_URL)
            .then((response) => {
                // if (response.headers['token']) { 

                    setData(response.data.homeData)
                    setLastIndex(response.data.myIndex)
                // }
            })
            .catch((error) => {
                console.error(error)
            })
        };
        fetchData()

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