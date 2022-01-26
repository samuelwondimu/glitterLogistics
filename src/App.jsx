import React from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout';
import Commodity from './pages/Commodity';
import Customer from './pages/Customer';
import Expense from './pages/Expense';
import Port from './pages/Port';
import Invoice from './pages/Invoice';
import Operations from './pages/Operations';
import { fakeAuthProvider } from './auth';
import { ThemeContext } from './theme/useTheme';

export default function App() {
  return <>
    <ThemeContext>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<RequireAuth><DashboardLayout /></RequireAuth>} >
              {/* dashboard protected route components goes here */}
              <Route path='' element={<Dashboard />} />
              <Route path='commodity' element={<Commodity />} />
              <Route path='customers' element={<Customer />} />
              <Route path='expense' element={<Expense />} />
              <Route path='port' element={<Port />} />
              <Route path='invoice' element={<Invoice />} />
              <Route path='operations' element={<Operations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeContext>
  </>;
}

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    return fakeAuthProvider.signIn(() => {
      setUser(newUser);
      console.log(newUser)
      callback();
    });
  };

  let signout = (callback) => {
    return fakeAuthProvider.signOut(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

