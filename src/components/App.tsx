import store, { RootState } from 'Providers/Redux/Store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { StrictMode, useEffect, useState } from 'react'
import supabase from 'Providers/SupabaseProvider'
import { authSuccess, logout } from 'Providers/Redux/Slice'
import Loading from 'components/Utils/Loading'
import { UserProfile } from 'types/reduxStore'

// FrontPage and Login are the same
import FrontPage from 'routes/FrontPage'
// App to show for public
import PublicApp from 'routes/Service'
// Home for private logged users - Dashboard
import Dashboard from 'routes/Dashboard'
import NotFound from 'routes/404'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.counter.AuthInfo.isAuthenticated
  )
  return isLoggedIn ? children : <Navigate to="countspark/" />
}

function PublicRoute({ children }: { children: JSX.Element }) {
  // Implement App Logic for SaaS public access
  return children
}

function RoutesContainer() {
  return (
    <Routes>
      <Route path="countspark/" element={<FrontPage />} />
      <Route
        path="countspark/public/token"
        element={
          <PublicRoute>
            <PublicApp />
          </PublicRoute>
        }
      />
      <Route
        path="countspark/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function AppContainer() {
  return (
    <StrictMode>
      {/* TODO: Add supabase persistence and web id for configuration */}
      <Provider store={store}>
        <BrowserRouter>
          <SessionHandler>
            <RoutesContainer />
          </SessionHandler>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

function SessionHandler({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession()

        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileData) {
            const userProfile: UserProfile = {
              id: session.user.id,
              email: session.user.email || '',
              name: profileData.name || '',
              role: (profileData.role as 'user' | 'admin' | 'guest') || 'user'
            }
            dispatch(
              authSuccess({
                user: userProfile,
                token: session.access_token
              })
            )
          }
        }
      } catch (error) {
        console.error('Session initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Logic handled by initializeSession usually, but good for re-auth
        // We can duplicate logic or just rely on Redux state
      } else if (event === 'SIGNED_OUT') {
        dispatch(logout())
        navigate('/countspark/')
      }
    })

    return () => subscription.unsubscribe()
  }, [dispatch, navigate])

  if (isLoading) return <Loading />

  return children
}

export default AppContainer
