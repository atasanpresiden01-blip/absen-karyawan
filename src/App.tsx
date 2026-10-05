import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CheckInScreen } from './screens/CheckInScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { SupervisorScreen } from './screens/SupervisorScreen';
import { BottomNav } from './components/BottomNav';
import { LeaveRequestModal } from './components/LeaveRequestModal';

const MainNavigator: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'checkin':
        return <CheckInScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'schedule':
        return <ScheduleScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'supervisor':
        return <SupervisorScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen shadow-2xl relative flex flex-col">
        {renderScreen()}
        <BottomNav />
        <LeaveRequestModal />
      </div>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}

export default App;
