'use client';
import HomeView from '@/views/HomeView';
import { loggedState } from '@/recoil/logginState';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [logged, setLogged] = useRecoilState(loggedState);

  useEffect(() => {
    if (logged == false) {
      router.push('/login');
    }
  });

  return (
    <div className='min-h-screen md:p-16 p-8'>
      <HomeView />
    </div>
  );
}
