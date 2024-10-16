'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { refresh } = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
      <h2>에러 발생!</h2>
      <h3>에러 메세지: {error.message}</h3>
      <button
        onClick={() => {
          refresh();
          reset();
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
