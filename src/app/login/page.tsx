import AuthForm from '@/components/auth/AuthForm';

const Login = () => {
  return (
    <div className="flex justify-center items-center my-20">
      <AuthForm mode={'login'} />
    </div>
  );
};

export default Login;
