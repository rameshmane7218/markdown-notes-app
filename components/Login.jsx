import { useContext } from 'react';
import Image from 'next/image';

// Context
import { UserContext } from '../contexts/UserContext';

// Firebase
import { signInWithGoogle, signUserOut } from '../firebase/firebase-utils';

// Assets
import loginIcon from '../assets/icon-login.svg';
import logoutIcon from '../assets/icon-logout.svg';

export default function Login() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {!currentUser ? (
        <button
          type="button"
          className="flex w-36 items-center justify-center gap-2 rounded bg-orange-primary p-1 text-xs text-white md:w-max md:p-2 md:px-3 md:text-base"
          onClick={signInWithGoogle}
        >
          Login with Google
          <Image
            src={loginIcon}
            alt="login"
            width={22}
            height={22}
            layout="fixed"
          />
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center justify-center rounded bg-orange-secondary p-1.5 md:flex-wrap md:gap-2"
          onClick={signUserOut}
        >
          <Image
            src={logoutIcon}
            alt="logout"
            width={26}
            height={26}
            layout="fixed"
          />
          <span className="hidden text-white md:inline-block">Log out</span>
        </button>
      )}
    </div>
  );
}
