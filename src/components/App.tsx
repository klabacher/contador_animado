import store, { RootState } from 'Providers/Redux/Store'
import { Provider, useSelector } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

import { StrictMode } from 'react'
// FrontPage and Login are the same
import FrontPage from 'routes/Login'
// App to show for public
import PublicApp from 'routes/Service'
// Home for private logged users - Dashboard
import Dashboard from 'routes/Dashboard'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useSelector(
    (state: RootState) => state.counter.AuthInfo.isAuthenticated
  )
  return isLoggedIn ? children : <Navigate to="/login" />
}

function PublicRoute({ children }: { children: JSX.Element }) {
  // Implement App Logic for SaaS public access
  return children
}

function RoutesContainer() {
  return (
    <>
      <Route path="/" element={<FrontPage />} />
      <Route
        path="/app/public/token"
        element={
          <PublicRoute>
            <PublicApp />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </>
  )
}

function AppContainer() {
  return (
    <StrictMode>
      {/* TODO: Add supabase persistence and web id for configuration */}
      <Provider store={store}>
        <RoutesContainer />
      </Provider>
    </StrictMode>
  )
}

export default AppContainer
