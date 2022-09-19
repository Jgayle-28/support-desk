import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../../hooks/useAuthStatus"
import Spinner from "../shared/Spinner"

const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }
  // Outlet is the route being passed in
  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
