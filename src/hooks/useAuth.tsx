'use client';

import {
  createContext,
  useContext,
  useState,
} from 'react';

import { Alert } from 'react-native';

import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
  User,
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';


interface AuthContextProps {
  userLogged: boolean;
  loading: boolean;
  user: User | null;
  signUp: (userData: UserData) => void;
  signIn: (userData: UserSignIn) => void;
  signOutUser: () => void;
  resetPassword: (email: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  password: string;
  type: "user" | "admin";
  address: [];
}

interface UserSignIn {
  email: string;
  password: string;
}

interface UserDatabase extends UserData {
  id: string;
  emailVerified: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, user => {
    setUser(user);

    if (user) {
      setUserLogged(true);
    } else {
      setUserLogged(false);
    }
  });

  async function signUp(userData: UserData) {
    try {
      setLoading(true);
      const createUser = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const userCredential = createUser.user;

      const dataDatabase = {
        id: userCredential.uid,
        name: userData.name,
        email: userCredential.email,
        phone: userData.phone,
        password: userData.password,
        emailVerified: userCredential.emailVerified,
        type: "user",
        address: [],
      } as UserDatabase;

      sendEmailConfirmation(userCredential);
      addDataUserInDatabase(dataDatabase);
    } catch (error) {
      const errorCode = error as FirebaseError;

      if (errorCode.code === "auth/email-already-in-use") {
        Alert.alert("O e-mail fornecido já está em uso por outro usuário.");
        return;
      }
      setLoading(false);
      setUser(null);
    }
  }

  async function sendEmailConfirmation(userCredential: User) {
    try {
      await sendEmailVerification(userCredential);
      Alert.alert("Você recebeu um e-mail de confirmação de conta.");
    } catch {
      Alert.alert("Houve um erro ao cadastrar sua conta, tente novamente mais tarde.");
      return;
    }
  };

  async function addDataUserInDatabase(userDatabase: UserDatabase) {
    try {
      setLoading(true);
      await setDoc(doc(db, "users", userDatabase.id), userDatabase)
    } catch {
      setLoading(false);
      return;
    } finally {
      setLoading(false);
    }
  }

  async function signIn(userData: UserSignIn) {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
    } catch (error) {
      setLoading(false);
      setUser(null);

      const errorCode = error as FirebaseError;

      if (errorCode.code === "auth/invalid-login-credentials") {
        Alert.alert("E-mail ou senha inválidos.");
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  async function signOutUser() {
    try {
      signOut(auth);
    } catch (error) {
      setUser(null);
    }
  }

  async function resetPassword(email: string) {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Um e-mail foi enviado para recuperar sua senha.");
    } catch {
      Alert.alert("Ouve um erro, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      userLogged,
      loading,
      user,
      signUp,
      signIn,
      signOutUser,
      resetPassword,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}