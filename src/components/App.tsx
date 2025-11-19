import store, { RootState } from 'Providers/Redux/Store'
import { Provider, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { StrictMode } from 'react'
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
      <Route path="countspark/auth" element={<FrontPage />} />
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
          <RoutesContainer />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  )
}

export default AppContainer
