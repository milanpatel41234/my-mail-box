import style from './App.module.css';
 import Login from './Components/Pages/Login';
 import CreateAccount from './Components/Pages/CreateAccount';
 import {Route , Routes , Navigate } from 'react-router-dom'
 import NavBar from './Components/Header/NavBar';
 import MailBox from './Components/Pages/MailBox';
 import { useSelector } from 'react-redux';


function App() {
  const Auth = useSelector(state => state.Auth)
  return (
    <div className={style.app}>
    <NavBar/>
    <Routes>
        <Route path="/" element={<Navigate to="/mailbox" />}/>
          <Route path="/mailbox" element={
            Auth.loginState ? <MailBox/> : <Navigate to="/login" />
          } />
          <Route path="/login" element={<Login/>} />
          <Route path="/createaccount" element={<CreateAccount/>} />
      </Routes>
    </div>
  );
}

export default App;
