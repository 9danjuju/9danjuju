import AuthForm from '@/components/auth/AuthForm';

const SignUp = () => {
  return (
    <div className="flex justify-center items-center min-h-max">
      <AuthForm mode={'signup'} />
    </div>
  );
};

export default SignUp;
