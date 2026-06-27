import Navbar from '../components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { IStore } from '../types/types';
import api from '../configs/api';
import { addUser } from '../utils/userSlice';

function Body() {
  const user = useSelector((store: IStore) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const user = await api.get('/profile/view');
      dispatch(addUser(user.data.data));
      navigate('/');
    } catch {
      navigate('/login');
    }
  }

  useEffect(() => {
    if(!user) fetchUser();
  }, []);
  
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
        <Toast />
    </div>
  )
}

export default Body;