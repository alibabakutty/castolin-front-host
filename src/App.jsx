import { Route, Routes } from 'react-router-dom';
import Unauthorized from './components/Unauthorized';
import ProtectedRoutes from './context/ProtectedRoutes';
import AdminDashboard from './components/dashboard/AdminDashboard';
import CustomerMaster from './redux/master-forms/CustomerMaster';
import MainPage from './components/MainPage';
import AdminAuthForm from './components/login-forms/AdminAuthForm';
import StockItemMaster from './redux/master-forms/StockItemMaster';
import ViewFetchMaster from './components/fetch-page/ViewFetchMaster';
import DistributorMaster from './redux/master-forms/DistributorMaster';
import CorporateMaster from './redux/master-forms/CorporateMaster';
import DistributorAuthForm from './components/login-forms/DistributorAuthForm';
import CorporateAuthForm from './components/login-forms/CorporateAuthForm';
import DistributorDashboard from './components/dashboard/DistributorDashboard';
import CorporateDashboard from './components/dashboard/CorporateDashboard';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin-login" element={<AdminAuthForm />} />
          <Route path='/distributor-login' element={<DistributorAuthForm />} />
          <Route path='/corporate-login' element={<CorporateAuthForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* Admin Routes */}
          <Route path='/admin' element={
            <ProtectedRoutes roles={['admin']} >
              <AdminDashboard />
            </ProtectedRoutes>
          } />
          <Route path='/distributor' element={
            <ProtectedRoutes roles={['distributor']}>
              <DistributorDashboard />
            </ProtectedRoutes>
          } />
          <Route path='/corporate' element={
            <ProtectedRoutes roles={['direct']}>
              <CorporateDashboard />
            </ProtectedRoutes>
          } />
          {/* Master Page Routes */}
          <Route path='/inventory-master' element={
            <ProtectedRoutes roles={['admin']}>
              <StockItemMaster />
            </ProtectedRoutes>
          } />
          <Route path='/customer-master' element={
            <ProtectedRoutes roles={['admin']}>
              <CustomerMaster />
            </ProtectedRoutes>
          } />
          <Route path='/distributor-master' element={
            <ProtectedRoutes roles={['admin']}>
              <DistributorMaster />
            </ProtectedRoutes>
          } />
          <Route path='/corporate-master' element={
            <ProtectedRoutes roles={['admin']}>
              <CorporateMaster />
            </ProtectedRoutes>
          } />
        {/* For fetch for view */}
        <Route path='/fetch-view-master/:type' element={
          <ProtectedRoutes roles={['admin']}>
            <ViewFetchMaster />
          </ProtectedRoutes>
        } />
           {/* For View */}
        <Route path='/inventory-view/:id' element={
          <ProtectedRoutes roles={['admin']}>
            <StockItemMaster />
          </ProtectedRoutes>
        } />
        <Route path='/customer-view/:id' element={
          <ProtectedRoutes roles={['admin']}>
            <CustomerMaster />
          </ProtectedRoutes>
        } />
        <Route path='/distributor-view/:customer_code' element={
          <ProtectedRoutes roles={['admin']}>
            <DistributorMaster />
          </ProtectedRoutes>
        } />
        <Route path='/corporate-view/:customer_code' element={
          <ProtectedRoutes roles={['admin']}>
            <CorporateMaster />
          </ProtectedRoutes>
        } />
        {/* For Alter Master route */}
        <Route path='/inventory-alter' element={
          <ProtectedRoutes roles={['admin']}>
            <StockItemMaster />
          </ProtectedRoutes>
        } />
        <Route path='/customer-alter' element={
          <ProtectedRoutes roles={['admin']}>
            <CustomerMaster />
          </ProtectedRoutes>
        } />
        <Route path='/distributor-alter/:usercode' element={
          <ProtectedRoutes roles={['admin']}>
            <DistributorMaster />
          </ProtectedRoutes>
        } />
        
        
        </Routes>
      </div>
    </>
  );
}

export default App;
