import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedAdminRoute = ({children}) => {
    const {isAuthenticated,loading,user} = useSelector((state) => state.user);
    
    if(loading === false){
        if(!isAuthenticated) {
            return <Navigate to={`/login`} replace></Navigate>
        }else if(user.role !== "admin"){
            return <Navigate to='/' replace></Navigate>
        }
    }
    return children
}

export default ProtectedAdminRoute;