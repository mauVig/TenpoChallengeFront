import { useEffect } from 'react'
import { GamesContainers } from '../components/homeGames/GamesContainers'
import { useGlobalStore } from '../../store/globalStore'
import { useNavigate } from "react-router";
import NavBar from '../components/NavBar'
import toast from 'react-hot-toast'

export const Home: React.FC = () => {
    const { isLogin } = useGlobalStore(state => state)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!isLogin) {
            toast.error('Debes iniciar sesion para acceder a esta pagina', {
                position: 'top-center',
                duration: 2000,
                style: {
                    background: '#1B1B1B',
                    color: '#fff',
                },
            })
            navigate('/')
        }
    }, [isLogin])

    return (
        <div className='w-full min-h-screen bg-myBlack text-gray-300'>
            <div className='bg-[url("/back-pc.webp")] bg-cover bg-no-repeat bg-center  h-[600px] mid:h-[700px] md:h-[800px] lg:h-[830px] after:absolute after:inset-0 after:bg-gradient-to-t after:from-myBlack'>
                <NavBar />
                <div className='max-w-screen-2xl mx-auto px-4 relative z-30'>
                    <main className='mt-20 lg:my-20'>
                        <h1 className='text-4xl w-[260px] mid:text-5xl/13 mid:w-[400px] md:text-6xl/18 lg:text-8xl/24 lg:w-[700px] uppercase title-font mt-8 block'>
                            <span className="text-green-300 title-font">Juegos</span> para todas las plataformas
                        </h1>
                        <p className='text-sm/5 w-[260px] mid:text-xl mid:w-[350px] md:text-2xl md:w-[430px] lg:text-3xl lg:w-[600px] block mt-2 font-semibold '>Encontrá lo último en juegos de Shooter, Estrategia, Deportes, Mundo Abierto y mucho más.</p>
                    </main>
                </div>
           </div>
           <div className='max-w-screen-2xl mx-auto px-4 -mt-54'>
                <GamesContainers />
           </div>
        </div>
    )
}