import React from 'react';
import { ArrowLeft, Info, Users, Cog, BarChart, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const AboutPage: React.FC = () => {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <div className="p-3 bg-indigo-500 rounded-xl">
              <Info className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">About IMD-Care</h1>
          </div>

          <div className="bg-white shadow-sm rounded-xl overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-indigo-100">
                IMD-Care is dedicated to revolutionizing internal medicine department management through innovative digital solutions. 
                Our platform streamlines patient care, enhances communication between healthcare providers, and ensures efficient 
                department operations.
              </p>
            </div>

            {/* Features Grid */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                  <Users className="h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Patient Management</h3>
                  <p className="text-gray-600">Comprehensive patient tracking and management system with real-time updates</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <Cog className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Appointment Scheduling</h3>
                  <p className="text-gray-600">Efficient clinic appointment booking and management system</p>
                </div>
                <div className="p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <Shield className="h-8 w-8 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Medical Records</h3>
                  <p className="text-gray-600">Secure and comprehensive electronic medical record management</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                  <BarChart className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Department Analytics</h3>
                  <p className="text-gray-600">Real-time insights and department performance metrics</p>
                </div>
              </div>
            </div>

            {/* Development Team */}
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Development Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Project Supervisor</h3>
                      <p className="text-gray-600">Dr. Saad Mashbab Al-Qahtani</p>
                      <p className="text-sm text-gray-500">Head of Internal Medicine Departments</p>
                      <p className="text-sm text-gray-500">Armed Forces Hospital in the South</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Cog className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Technical Lead</h3>
                      <p className="text-gray-600">Dr. Mohammed Ayed Al-Shahri</p>
                      <p className="text-sm text-gray-500">Technical Development and Implementation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;