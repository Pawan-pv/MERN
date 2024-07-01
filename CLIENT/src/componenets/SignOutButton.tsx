
import { useMutation , useQueryClient} from "react-query"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api-client"


function SignOutButton() {
const querryClient = useQueryClient();
const { showToast }  = useAppContext();

const mutation = useMutation(apiClient.signOut, {
    onSuccess: async ()=>{
        await querryClient.invalidateQueries("validateToken")
        showToast({ message: "Sign Out!!", type: "SUCCESS"})
    },
    onError: (error: Error)=>{
        showToast({ message: error.message, type: "ERROR"})   
    }
})

const handleClick =()=> {
    mutation.mutate();
}

  return (
   <button onClick={ handleClick }
   className="text-blue-600 bg-white px-3 fonnt-bold hover:bg-gray-100">
   SignOut
   </button>
  
)
}

export default SignOutButton