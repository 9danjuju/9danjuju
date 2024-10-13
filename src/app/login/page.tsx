import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="flex justify-center items-center">
      <AuthForm mode={'login'} />
    </div>
  );
};

export default Login;
