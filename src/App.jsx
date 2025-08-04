import { useState } from 'react';
import { StartupQuestionnaire } from './components/StartupQuestionnaire';
import { PreRegistration } from './components/PreRegistration';
import './App.css';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handlePreRegistrationComplete = (userData) => {
    setUserInfo(userData);
  };

  const handleRestart = () => {
    setUserInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!userInfo ? (
        <PreRegistration onComplete={handlePreRegistrationComplete} />
      ) : (
        <StartupQuestionnaire 
          userInfo={userInfo} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;

