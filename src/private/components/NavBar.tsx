import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../../store/globalStore';
import toast from 'react-hot-toast';
import useScrollDirection from '../hooks/useScrollDirection';
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { LuUserRound } from "react-icons/lu";

/* Este componente es para la barra de navegación que podemos observar que se usa el hook useScrollDirection para identificar si el usuario está haciendo scroll hacia arriba o hacia abajo y si la barra de navegación está en el top cero. luego también extraemos el email del usuario y la función logOut del global store. la última función nombrada sirve para cerrar la sesión y reiniciar los datos y toda la aplicación.  */

export const NavBar: React.FC = () => {
    const { scrollDirection, isAtTop } = useScrollDirection();
    const { userEmail, logOut } = useGlobalStore((state) => state)
    const navigate = useNavigate()

    const closeOut = () => {
        toast(`Se cerró la sesion de ${userEmail}`)
        navigate('/')
        logOut()
    }   

    return (
        <div className={`fixed top-0 w-full h-12 bg-myBlack flex items-center justify-between px-4 border-b-2 border-green-300 rounded-b-2xl z-40  transition-all duration-300 ${
          scrollDirection === 'down' ? '-translate-y-[105%]' : 'translate-y-0'} ${!isAtTop ? 'backdrop-blur-sm' : ''}`}>
            <a href='#'>
                <svg
                    fill="#000000"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-12 h-12'
                    style={{ fill: '#d1d5dc'}}
                >
                    <path d="M798.071 357.531c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zm93.628 92.093c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zm-189.305 0c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zm95.677 95.164c-16.527 24.259-51.62 24.259-68.147 0-9.185-13.476-9.185-32.01 0-45.486 16.527-24.259 51.62-24.259 68.147 0 9.185 13.476 9.185 32.01 0 45.486zM360.192 428.417c0-53.017-42.983-96-96-96s-96 42.983-96 96 42.983 96 96 96 96-42.983 96-96zm40.96 0c0 75.638-61.322 136.96-136.96 136.96s-136.96-61.322-136.96-136.96 61.322-136.96 136.96-136.96 136.96 61.322 136.96 136.96z" />
                    <path d="M983.038 727.533c-.352 61.995-50.737 112.151-112.843 112.151-39.998 0-76.347-20.949-96.661-54.546-5.852-9.679-18.443-12.782-28.122-6.929s-12.782 18.443-6.929 28.122c27.659 45.746 77.229 74.314 131.712 74.314 84.943 0 153.805-68.844 153.805-153.764l-1.254-19.506-40.634-281.277c-23.484-162.304-162.639-282.733-326.691-282.733H467.343c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48h188.078c143.699 0 265.584 105.483 286.153 247.638l40.355 278.923 1.109 16.649z" />
                    <path d="M511.904 687.705c90.526 0 173.645 43.889 225.067 116.315 6.548 9.223 19.333 11.391 28.555 4.843s11.391-19.333 4.843-28.555c-59.025-83.133-154.528-133.562-258.465-133.562-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48zM42.071 710.884l40.355-278.923c20.569-142.154 142.454-247.638 286.153-247.638h188.078c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48H368.579c-164.052 0-303.207 120.429-326.691 282.733L1.419 705.802.045 725.519C0 811.8 68.862 880.644 153.805 880.644c54.483 0 104.053-28.568 131.712-74.314 5.852-9.679 2.75-22.27-6.929-28.122s-22.27-2.75-28.122 6.929c-20.314 33.598-56.663 54.546-96.661 54.546-62.105 0-112.491-50.155-112.843-112.151l1.109-16.649z" />
                    <path d="M512.096 646.745c-103.937 0-199.44 50.429-258.465 133.562-6.548 9.223-4.38 22.007 4.843 28.555s22.007 4.38 28.555-4.843c51.423-72.425 134.541-116.315 225.067-116.315 11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48z" />
                </svg>
            </a>
            <div className='flex items-center space-x-4'>
                <div className='flex items-center gap-x-2'>
                    <LuUserRound />
                    <span>{userEmail}</span>
                </div>
                <button className='flex justify-center items-center gap-x-2 bg-green-300 hover:bg-green-400 active:bg-green-500 hover:cursor-pointer text-myBlack px-4 py-0.5 rounded-xl' onClick={closeOut}>
                    <MdOutlinePowerSettingsNew size={20} />
                    <span>Cerrar sesion</span>
                </button>
            </div>
        </div>
    )
}
export default NavBar;