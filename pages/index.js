import { useState, useEffect } from 'react';

// Firebase
import { auth, db } from '../firebase/firebase-config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import Head from 'next/head';
import Image from 'next/image';

// components
import Login from '../components/Login';
import Markdown from '../components/Markdown';
import ThemeToggler from '../components/ThemeToggler';

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [markdowns, setMarkdowns] = useState([]);

  const [ID, setID] = useState(null);

  const postsCollectionRef = collection(db, 'posts');
  const q = query(postsCollectionRef, orderBy('createdAt'));

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);

        setUser({
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  useEffect(() => {
    onSnapshot(q, (data) => {
      setMarkdowns(
        data.docs.reverse().map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, [ID]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeToggler />

      <Login isAuth={isAuth} setIsAuth={setIsAuth} />

      {isAuth && (
        <>
          <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <img src={user.photoURL} alt="" />
          </div>

          <main className="flex ">
            <div>
              {markdowns &&
                markdowns.map((markdown) => (
                  <p
                    key={markdown.id}
                    className={`text-lg text-red-500 ${
                      ID === markdown.id && 'text-green-500'
                    }`}
                    onClick={() => setID(markdown.id)}
                  >
                    {markdown.title}
                  </p>
                ))}
            </div>
            <Markdown ID={ID} />
          </main>
        </>
      )}
    </div>
  );
}
