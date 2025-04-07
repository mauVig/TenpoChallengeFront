import { useEffect, useState } from "react";
import axios from 'axios'

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
            axios.get('http://localhost:3000/start')
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
        axios.get(`http://localhost:3000/more?lastIndex=${lastIndex}`)
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