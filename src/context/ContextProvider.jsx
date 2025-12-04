import { useEffect, useState } from 'react';
import api from '../services/api';
import { auth } from '../auth/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { AuthContext } from './authConstants';

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      // Skip auth state processing during signup
      if (isSigningUp) {
        console.log('Skipping auth state change during signup');
        return;
      }

      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        let userData = null;

        try {
          // Use only /me-admin endpoint
          const res = await api.get('/api/me-admin', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.data && res.data[0]) {
            userData = res.data[0];

          }

          // Set user and role states
          setUser({
            ...firebaseUser,
            role: userData?.role || null,
            username: userData?.username || null,
            customer_name: userData?.customer_name || null,
          });

          setRole(userData?.role || null);
        } catch (err) {
          console.error('Auth state fetch failed:', err);
          setUser(firebaseUser);
          setRole(null);
        }
      } else {
        localStorage.removeItem('userType');
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isSigningUp]);

  const login = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);

      const firebaseUser = credential.user;
      const token = await firebaseUser.getIdToken();

      // Use only /me-admin endpoint
      const res = await api.get('/api/me-admin', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const role = res.data[0]?.role || null;

      // Immediately sync to context
      setUser({ ...firebaseUser, role });
      setRole(role);

      // Return consistent response structure
      return {
        success: true,
        role,
        user: firebaseUser,
      };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  // REMOVED: loginDistributor, loginCorporate functions

  const signup = async (username, email, password, userType = 'admin', mobileNumber) => {
    setIsSigningUp(true);
    try {
      // 1. Create Firebase user
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = credential.user;
      const token = await firebaseUser.getIdToken();

      // 2. Create user in appropriate MySQL table
      const endpoint = userType === 'admin' ? '/signup-admin' : 'undefine-signup';

      const res = await api.post(
        endpoint,
        {
          username,
          email,
          mobile_number: mobileNumber,
          firebaseUid: firebaseUser.uid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return {
        success: true,
        role: res.data?.role || userType,
        userType: userType,
        message: res.data?.message,
      };
    } catch (error) {
      console.error('Signup failed:', error);

      // If Firebase user was created but MySQL failed, delete Firebase user
      if (auth.currentUser) {
        try {
          await auth.currentUser.delete();
        } catch (deleteError) {
          console.error('Error cleaning up Firebase user:', deleteError);
        }
      }

      throw {
        success: false,
        message: error.response?.data?.error || error.message || 'Signup failed',
      };
    } finally {
      setIsSigningUp(false);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        role,
        user,
        signup,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;