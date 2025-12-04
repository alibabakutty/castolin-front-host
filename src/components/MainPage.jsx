import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';  // Add this

const MainPage = () => {
  const navigate = useNavigate();

  // ✅ Correct: Use useEffect for API calls
  useEffect(() => {
    // This runs once when component mounts
    console.log('Current API URL:', import.meta.env.VITE_API_URL);
    
    // Test backend connection
    fetch('https://castolin-backend-host.vercel.app/api/health')
      .then(res => res.json())
      .then(data => console.log('Backend response:', data))
      .catch(err => console.error('Error:', err));
  }, []); // Empty dependency array = runs once on mount

  const handleAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 font-amasis">
      <div className="max-w-sm w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-3">Welcome</h1>
          <p className="text-white/60 font-amasis">Please choose your access level</p>
        </div>

        {/* Buttons */}
        <div className="space-y-4 ">
          <button
            onClick={handleAdminLogin}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-medium text-lg transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;