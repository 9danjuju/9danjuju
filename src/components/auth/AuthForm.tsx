'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { z } from 'zod';

type PageType = {
  mode: 'login' | 'signup';
};

type SignUpType = {
  email: string;
  password: string;
  nickname: string;
};

type LoginType = Omit<SignUpType, 'nickname'>;

const signUpSchema = z.object({
  email: z.string().email({ message: '이메일을 입력해주세요.' }).min(1, {
    message: '이메일을 입력해주세요.'
  }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이어야합니다.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: '비밀번호는 최소 8자, 문자, 숫자, 특수기호가 포함되어야합니다.'
    }),
  nickname: z.string().min(2, { message: '구단주명은 최소 두 글자 이상이어야합니다.' })
});

const loginSchema = signUpSchema.omit({ nickname: true });

const AuthForm = ({ mode }: PageType) => {
  const router = useRouter();
  const clientClient = createClient();
  const schema = mode === 'signup' ? signUpSchema : loginSchema;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: mode === 'signup' ? { email: '', password: '', nickname: '' } : { email: '', password: '' },
    resolver: zodResolver(schema)
  });

  const onSubmit = async (formData: LoginType | SignUpType) => {
    switch (mode) {
      case 'signup': {
        const { data, error } = await clientClient.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { nickname: (formData as SignUpType).nickname } }
        });
        console.log(data, error);
        if (error) {
          return window.alert('회원가입 실패');
        }
        router.push('/');
        return;
      }
      case 'login': {
        const { data, error } = await clientClient.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });
        console.log(data);
        if (error) {
          return window.alert('로그인 실패');
        }
        router.push('/');
        return;
      }
      default:
        return;
    }
  };

  const handleAskAccountLink = () => {
    if (mode === 'signup') {
      router.push('/login');
    } else {
      router.push('/signup');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center container">
      <span className="font-bold text-3xl">{mode === 'login' ? '로그인' : '회원가입'}</span>
      <div className="flex w-1/2 flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="email">이메일</label>
            <input className="w-full h-12 px-5 border-2" type="text" {...register('email')} placeholder="이메일" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
          </div>
          <div className="mb-5">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              className="w-full h-12 p-5 border-2"
              {...register('password')}
              placeholder="비밀번호"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message as string}</p>}
          </div>

          {mode === 'signup' && (
            <div className="mb-5">
              <label htmlFor="nickname">닉네임</label>
              <input
                className="w-full h-12 p-5 border-2"
                type="text"
                {...register('nickname')}
                placeholder="닉네임(구단주명)"
              />
              {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message as string}</p>}
            </div>
          )}
          <button type="submit" className="flex justify-center items-center border-2 w-full h-12">
            {mode === 'login' ? '로그인' : '회원가입'}
          </button>
        </form>
        <span className="text-sm my-5 text-black flex justify-center">
          {mode === 'signup' ? '이미 구단주주총회의 주주이신가요? ' : '아직 구단주주총회의 주주가 아니신가요? '}
          <span className="font-bold cursor-pointer ml-2" onClick={handleAskAccountLink}>
            {mode === 'signup' ? '로그인' : '회원가입'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
