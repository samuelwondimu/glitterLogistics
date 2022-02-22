import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/DashboardLayout';
import Commodity from './pages/Commodity';
import Customer from './pages/Customer';
import Expense from './pages/Expense';
import Port from './pages/Port';
import Invoice from './pages/Invoice';
import Operations from './pages/Operations';
import { ThemeContext } from './theme/useTheme';
import ServiceProvider from './pages/ServiceProvider';
import Users from './pages/Users';

const queryClient = new QueryClient()

export default function App() {
  return <>
    <AuthProvider>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <ThemeContext>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<DashboardLayout />} >
                  {/* dashboard protected route components goes here */}
                  <Route path='' element={<Dashboard />} />
                  <Route path='commodity' element={<Commodity />} />
                  <Route path='customers' element={<Customer />} />
                  <Route path='expense' element={<Expense />} />
                  <Route path='port' element={<Port />} />
                  <Route path='invoice' element={<Invoice />} />
                  <Route path='operations' element={<Operations />} />
                  <Route path='service-provider' element={<ServiceProvider />} />
                  <Route path='users' elemenet={<Users />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeContext>
        </QueryClientProvider>
      </SnackbarProvider>
    </AuthProvider>
  </>;
}

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (user, callback) => {
    setUser(user);
    console.log(user)
    return callback();
  };

  let signout = (callback) => {
    setUser(null);
    return callback();
  };

  let value = { user, signin, signout };



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}


