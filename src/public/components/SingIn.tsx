import { useState } from "react"
import { useGlobalStore } from "../../store/globalStore"
import { LOCAL_STORAGE } from "../constants/publicConstants"
import { useNavigate } from "react-router";
import { HiOutlineEye, HiOutlineEyeOff  } from "react-icons/hi";
import toast from "react-hot-toast";

// En este componente verificamos si el email y el password es el mismo que está registrado en LocalStorage Y si coinciden se podrá ingresar a la aplicación. También está la opción de poder cambiar la contraseña 

interface RegisterProps {
    toggle: () => void;
}

export const SingIn: React.FC<RegisterProps> = ({ toggle }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [eyesPass, setEyesPass] = useState<boolean>(false)
    const { userGetInSuccess, setUserEmail } = useGlobalStore()
    const navigate = useNavigate()
    
    const getIn = () => {
        if(!localStorage.getItem(LOCAL_STORAGE)){
            toast.error('Primero create una cuenta !')
            return
        }
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE) || '')
        if (user.email !== email) {
            toast.error('Email incorrecto')
            return
        }
        if (user.password !== password) {
            toast.error('Contraseña incorrecta')
            return
        }
        if (user.email === email && user.password === password) {
            setUserEmail(email)
            userGetInSuccess()
            toast.success(`Hola ${user.email} te extrañábamos !`)
            setEmail('')
            setPassword('')
            navigate('/home')
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            getIn()
        }
    }
    
    const handleChange = () => {
        if(!localStorage.getItem(LOCAL_STORAGE)){
            toast.error('Necesitas tener una cuenta')
            return
        }
        navigate('/changePass')
    }
    return(
        <section className="min-h-[600px] min-w-[300px] border-green-300 border-2 shadow-[-3px_5px_90px_-7px_#52fd6d] rounded-lg flex flex-col items-center justify-center ">
           <h2 className="text-5xl mb-24">Ingresar</h2>
           <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-9">
                <input
                    name="email"
                    required
                    aria-invalid="false"
                    placeholder=""
                    spellCheck="false"
                    autoComplete="off"
                    id="email"
                    type="email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}

                    className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <label
                    className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                    htmlFor="email"
                >
                    Email
                </label>
                
            </div>
            <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-4">
                <input
                    name="password"
                    required
                    aria-invalid="false"
                    placeholder=""
                    spellCheck="false"
                    autoComplete="off"
                    id="password"
                    type={eyesPass ? "text" : "password"}
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                />
                <div className="absolute right-2 cursor-pointer" onClick={() => setEyesPass(!eyesPass)}>
                    {!eyesPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </div>
                <label
                    className="cursor-text  inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                    htmlFor="email"
                >
                    Contraseña
                </label>
            </div>
            <div>
                <button className="text-sm text-gray-400 mt-2 hover:cursor-pointer" onClick={handleChange}>Olvidaste tu contraseña? <br /> Hace click <span className="text-green-300">aquí</span> </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 w-full mt-14">
                <button className="bg-green-300 hover:bg-green-400 active:bg-green-500 transition-all duration-300 text-myBlack rounded-lg py-2 block w-1/2 cursor-pointer" onClick={getIn}>Ingresar</button>
                <button className="bg-myGray text-green-300 transition-all duration-300 rounded-lg px-4 py-2 cursor-pointer" onClick={()=>toggle()}>Registrarse</button>
            </div>
    </section>
    )
}

export default SingIn
