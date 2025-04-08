import React, { useState } from "react"
import toast from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff  } from "react-icons/hi";
import { LOCAL_STORAGE } from "../constants/publicConstants";

/* En este componente se obtienen el email con el cual el usuario quiere registrarse en la aplicación y la contraseña que también se pide a repetir la contraseña para más seguridad. Como pueden observar también está la opción de poder ver la contraseña a través del icono del ojo. También están las validaciones necesarias como validar que el email sea un email que ambos password sean iguales, y en este caso como no usamos base de datos lo que estoy haciendo es registrar estos datos en LocalStorage, por ende hago una pequeña validación si ya han creado un usuario.  */

interface RegisterProps {
    toggle: () => void;
}

export const Register: React.FC<RegisterProps> = ({ toggle }) => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState("")
    const [copyPass, setCopyPass] = useState('')
    const [eyesPass, setEyesPass] = useState<boolean>(false)
    const [eyesPassCopy, setEyesPassCopy] = useState<boolean>(false)

    const registerAcount = () => {
        if (!email.includes('@')) {
            toast.error('Email no valido')
            return
        }
        if (typeof password === 'string' && password.length < 8) {
            toast.error('La contraseña debe tener al menos 8 caracteres')
            return
        }
        if (password !== copyPass) {
            toast.error('Las contraseñas no coinciden')
            return
        }
        if (localStorage.getItem(LOCAL_STORAGE)) {
            toast.error('Ya existe una cuenta con ese email')
            return
        }
        if (email && password && copyPass) {
            const user = { email, password }
            localStorage.setItem(LOCAL_STORAGE, JSON.stringify(user))
            toast.success('Usuario registrado')
            setEmail('')
            setPassword('')
            setCopyPass('')
            toggle()
        }
    }

    
       return(
           <section className="min-h-[600px] min-w-[300px] border-green-300 border-2 shadow-[-3px_5px_90px_-7px_#52fd6d] rounded-lg flex flex-col items-center justify-center ">
                <h2 className="text-5xl mb-14">Registrarse</h2>
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
                       className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                   />
                   <label
                       className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                       htmlFor="email"
                   >
                       Email
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
                       type={eyesPass ? 'text' : 'password'}
                       defaultValue={password}
                       onChange={(e) => setPassword(e.target.value)}
                       className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                   />
                   <div className="absolute right-2 cursor-pointer" onClick={() => setEyesPass(!eyesPass)}>
                       {!eyesPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                   </div>
                   <label
                       className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                       htmlFor="email"
                   >
                       Contraseña
                   </label>
               </div>
               
               <div className="[--clr:#1f1f1f] dark:[--clr:#999999] relative flex flex-row items-center mb-4">
                   <input
                       name="passwordCopy"
                       required
                       aria-invalid="false"
                       placeholder=""
                       spellCheck="false"
                       autoComplete="off"
                       id="password"
                       type={eyesPassCopy ? 'text' : 'password'}
                       defaultValue={copyPass}
                        onChange={(e) => setCopyPass(e.target.value)}
                       className="peer text-black dark:text-white pl-2 h-[40px] min-h-[40px] pr-[40px] leading-normal appearance-none resize-none box-border text-base w-full  block text-left border border-solid bg-white dark:bg-zinc-800 rounded-[10px] m-0 p-0 outline-0 focus-visible:outline-0 focus-visible:border-green-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#71717a2e] dark:focus-visible:ring-[#14b8a61a]"
                   />
                     <div className="absolute right-2 cursor-pointer" onClick={() => setEyesPassCopy(!eyesPassCopy)}>
                          {!eyesPassCopy ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                     </div>
                   <label
                       className="cursor-text text-[--clr] inline-block z-0 text-sm mb-px font-normal text-start select-none absolute duration-300 transform origin-[0] translate-x-[12px] peer-focus-visible:text-green-300 peer-focus-visible:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-focus-visible:translate-y-[-36px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
                       htmlFor="email"
                   >
                       Copiar contraseña
                   </label>
               </div>
   
               <div className="flex flex-col items-center justify-center gap-4 w-full mt-14">
                   <button className="bg-green-300 hover:bg-green-400 active:bg-green-500 transition-all duration-300 text-myBlack rounded-lg py-2 block w-1/2 cursor-pointer" onClick={registerAcount}>Registrarse</button>
                   <button className="bg-myGray text-green-300  rounded-lg px-4 py-2 cursor-pointer" onClick={()=>toggle()}>¿ Ya tenes una cuenta ?</button>
               </div>
       </section>
       )
}
export default Register