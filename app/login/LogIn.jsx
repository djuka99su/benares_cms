"use client";

import React from "react";
import bgImage from "../../public/images/bgImage_03.jpg";
import Image from "next/image";
import styles from "./styles.module.css";
import { Toaster, toast } from "sonner";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const notifyEmail = () => {
    toast.info("admin@gmail.com");
  };
  const notifyPassword = () => {
    toast.info("R#9aLp2qFv$5sJ8");
  };

  const notify = () => {
    notifyEmail();
    notifyPassword();
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });

    return () => {
      listen();
    };
  }, []);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.body}>
      <Image src={bgImage} alt="Loading..." className={styles.bgImageLogin} />
      <div className={styles.container}>
        <h2 className="text-orange-600 text-center text-6xl mb-5 p-4 font-bold">
          Logg inn
        </h2>
        <button className="text-white hover:text-orange-600" onClick={notify}>
          Klikk her for å se admin user
        </button>
        <form
          onSubmit={signIn}
          className="flex flex-col gap-6 mb-6 rounded p-10"
        >
          <div className="flex flex-col gap-1 text-center">
            <label htmlFor="email" className="text-white font-bold text-lg">
              Email
            </label>

            <input
              type="text"
              id="email"
              name="emailA"
              className="rounded p-2 mt-1 focus:ring-4 focus:outline-none focus:ring-orange-600"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <label htmlFor="password" className="text-white font-bold text-lg">
              Passord
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded p-2 mt-1 focus:ring-4 focus:outline-none focus:ring-orange-600"
              placeholder="Passord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-orange-600 rounded p-2 w-24 m-auto"
          >
            Logg inn
          </button>
        </form>
        <div className="flex gap-2">
          <a
            href="/reset-password"
            className="text-white hover:text-orange-600  p-4"
          >
            Glemt passord?
          </a>
          <a
            href="/registration"
            className="text-white hover:text-orange-600 underline  p-4"
          >
            Opprett en konto
          </a>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LogIn;
