import { useEffect, useState } from "react"
import { LOCAL_STORAGE } from "../../public/constants/publicConstants"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

//  En este componente te brinda la posibilidad de hacer el cambio de contraseña de tu cuenta.

interface userData {
    email: string,
    password: string
}

export const ChangePass: React.FC = () => {
    const [lastPass, setLastPass] = useState<string>('')
    const [newPass, setNewPass] = useState<string>('')
    const [repeatNewPass, setRepeatNewPass] = useState<string>('')
    const navigator = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem(LOCAL_STORAGE)) {
            navigator('/')  
            toast.error('Necesitás tener una cuenta')
            return
        }
    }, [])
    
    const hanlerChangePass = () => {            
        const user:userData = JSON.parse(localStorage.getItem(LOCAL_STORAGE) || '{}')

        if (user.password !== lastPass) {
            toast.error('La contraseña actual es incorrecta')
            return
        }
        if (newPass !== repeatNewPass) {
            toast.error('Las nuevas contraseñas no coinciden')
            return
        }
        if (newPass.length < 8) {
            toast.error('La nueva contraseña debe tener al menos 8 caracteres')
            return
        }
        if (newPass === lastPass) {
            toast.error('La nueva contraseña no puede ser igual a la actual')
            return
        }
        if (user.password === lastPass && newPass === repeatNewPass) {
            localStorage.setItem(LOCAL_STORAGE, JSON.stringify({ ...user, password: newPass }))
            toast.success(`Contraseña cambiada de ${user.email} con éxito`)
            navigator('/')
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            hanlerChangePass()
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-myBlack text-gray-300">
           <motion.div 
            key="change"
            initial={{ opacity: 0, x: 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
           className="min-h-[600px] min-w-[300px] border-green-300 border-2 shadow-[-3px_5px_90px_-7px_#52fd6d] rounded-lg flex flex-col items-center justify-center ">
             <h2 className="text-5xl mb-24 text-center">Cambiar <br /> contraseña</h2>
             <div className="flex flex-col items-center justify-center gap-4">
                <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-8">
                    <input
                        name="lastPassword"
                        required
                        aria-invalid="false"
                        placeholder=""
                        spellCheck="false"
                        autoComplete="off"
                        id="lastPassword"
                        type="text"
                        defaultValue={lastPass}
                        onChange={(e) => setLastPass(e.target.value)}
                        onKeyDown={handleKeyDown}

                        className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                    />
                    <label
                        className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                        htmlFor="lastPassword"
                    >
                        Ingresa tu contraseña actual
                    </label>
                </div>
                <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-9">
                    <input
                        name="password"
                        required
                        aria-invalid="false"
                        placeholder=""
                        spellCheck="false"
                        autoComplete="off"
                        id="password"
                        type="text"
                        defaultValue={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                    />

                    <label
                        className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                        htmlFor="email"
                    >
                        Nueva contraseña
                    </label>
                </div>
                <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-9">
                    <input
                        name="password"
                        required
                        aria-invalid="false"
                        placeholder=""
                        spellCheck="false"
                        autoComplete="off"
                        id="password"
                        type="text"
                        defaultValue={repeatNewPass}
                        onChange={(e) => setRepeatNewPass(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                    />
                    <label
                        className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                        htmlFor="email"
                    >
                        Repite la nueva contraseña
                    </label>
                </div>
              <button className="bg-green-300 text-black rounded-lg px-4 py-2 hover:bg-green-400 transition duration-300 ease-in-out" onClick={hanlerChangePass}>Cambiar contraseña</button>
                <button className="hover:cursor-pointer" onClick={() => navigator('/')}>Cancelar</button>
             </div>
           </motion.div>
        </div>
    )
}
export default ChangePass