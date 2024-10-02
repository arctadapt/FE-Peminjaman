import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser, reset } from '../features/AuthSlice';
import AuthForm from '../components/AuthForm';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const handleLogin = (email, password) => {
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div>
      {isError && <p className="error">{message}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AuthForm isLogin={true} onSubmit={handleLogin} />
      )}
    </div>
  );
};

export default Login;