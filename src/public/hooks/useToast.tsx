import toast from "react-hot-toast"

export const useToast = () => {
    
    const getInAdvise = () => {
        toast.custom(() => (
            <div className="bg-myGreen text-myBlack p-4 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out">
                <h2>Create una cuenta !</h2>
            </div>
        ))
    }

    return { getInAdvise }


}
export default useToast