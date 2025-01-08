import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Auth_Screen/Signup';
import Signin from '../pages/Auth_Screen/Signin';
import Dashboard from '../pages/Dashboard';
import Homepage from '../pages/Homepage';
import { AuthProvider } from '../Auth_Services/userAuth';  
import ProtectedRoute from './ProtectedRoute';  
import ClassPlane from '../pages/planeClasesPage';
import Trainer from '../pages/Trainer';
import Member from '../pages/Members';

import Memberdashboard from '../pages/Memberdashboard';
import Trainerdashboard from '../pages/Trainerdashboard';

const ReactRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ClassPlane"
            element={ 
              <ProtectedRoute>
                <ClassPlane />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainer"
            element={ 
              <ProtectedRoute>
                <Trainer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Member"
            element={ 
              <ProtectedRoute>
                <Member />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Memberdashboard/:id"
            element={ 
              <ProtectedRoute>
                <Memberdashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Trainerdashboard/:id"
            element={ 
              <ProtectedRoute>
                <Trainerdashboard />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default ReactRouter;
