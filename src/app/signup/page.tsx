import AuthForm from '@/components/auth/AuthForm';

const SignUp = () => {
  return (
    <div className="flex justify-center items-center w-full my-20">
      <AuthForm mode={'signup'} />
    </div>
  );
};

export default SignUp;
