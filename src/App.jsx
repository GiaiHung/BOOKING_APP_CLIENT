import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/home/Home'
import Hotel from './pages/hotel/Hotel'
import List from './pages/list/List'
import Login from './pages/auth/Login'
import ProtectedRoutes from './components/Helper/ProtectedRoutes'
import Users from './pages/admin/Users'
import Hotels from './pages/admin/Hotels'
import Rooms from './pages/admin/Rooms'
import Admin from './pages/admin/Admin'
import UserProfile from './pages/admin/UserProfile'
import NewUser from './components/Admin/Admin CRUD/USER/NewUser'

import { userRegisterInputs, userEditInputs } from './assets/constants/formSource'
import NewHotel from './components/Admin/Admin CRUD/HOTEL/NewHotel'
import NewRoom from './components/Admin/Admin CRUD/ROOM/NewRoom'

function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hotels" element={<List />} />
      <Route path="/hotels/:id" element={<Hotel />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <NewUser inputs={userRegisterInputs} title="Register" />}
      />
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Users />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="rooms" element={<Rooms />} />
        </Route>
        <Route path="/admin/userProfile/:id" element={<UserProfile />} />
        <Route
          path="/admin/user/edit/:id"
          element={<NewUser inputs={userEditInputs} title="Edit" />}
        />
        <Route path='/admin/hotel/new' element={<NewHotel />} />
        <Route path='/admin/room/new' element={<NewRoom />} />
      </Route>
    </Routes>
  )
}

export default App
