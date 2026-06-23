import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase.config'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  const loginWithEmail = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const loginWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  const logout = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let role = 'Tenant'
        try {
          const jwtResponse = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
            email: currentUser.email,
          })
          if (jwtResponse.data?.token) {
            localStorage.setItem('token', jwtResponse.data.token)
          }
          const roleResponse = await axios.get(`${import.meta.env.VITE_API_URL}/users/role/${currentUser.email}`)
          if (roleResponse.data?.role) {
            role = roleResponse.data.role
          }
        } catch (error) {
          role = 'Tenant'
        }
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
          role,
        })
      } else {
        localStorage.removeItem('token')
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    createUser,
    updateUserProfile,
    loginWithEmail,
    loginWithGoogle,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
