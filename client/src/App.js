import {Route,Routes} from 'react-router-dom'
import './App.css';
import HomePage from './page/HomePage';
import Login from './page/Auth/Login';
import SignUp from './page/Auth/SignUp';
import Dashboard from './page/user/Dashboard';
import PrivateRoute from './components/Layout/Route/Private';
import ForgotPassword from './page/Auth/ForgotPassword';
import AdminRoute from './components/Layout/Route/AdminRoute';
import AdminDashboard from './page/Admin/AdminDashboard';

function App() {
  return (
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/dashboard' element={<PrivateRoute/>}>
    <Route path='user' element={<Dashboard/>}/>
    </Route>
    <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
    </Route>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  );
}

export default App;
