import { Router, Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import InteractiveRoadmap from './pages/InteractiveRoadmap';
import AuthPages from './pages/AuthPages';
import ProfilePage from './pages/ProfilePage';
import MissionPage from './pages/MissionPage';
import DonatePage from './pages/DonatePage';
import LearnPage from './pages/LearnPage';
import EventsPage from './pages/EventsPage';
import ChessGame from './components/ChessGame';
import SubscriptionUpgradeBanner from './components/SubscriptionUpgradeBanner';
import AIAssistant from './components/AIAssistant';
import FreeUserNotification from './components/FreeUserNotification';
import ChessAnalysis from './components/ChessAnalysis';
import SplashScreen from './components/SplashScreen';
import { useState, useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url] = queryKey;
        const response = await fetch(url as string);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
    },
  },
});

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        <Router>
          <div className="min-h-screen bg-gray-50">
            <FreeUserNotification />
            <Navigation />
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/roadmap" component={InteractiveRoadmap} />
              <Route path="/login" component={() => <AuthPages type="login" />} />
              <Route path="/register" component={() => <AuthPages type="register" />} />
              <Route path="/volunteer" component={() => <AuthPages type="volunteer" />} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/mission" component={MissionPage} />
              <Route path="/donate" component={DonatePage} />
              <Route path="/learn" component={LearnPage} />
              <Route path="/events" component={EventsPage} />
              <Route path="/chess" component={ChessGame} />
              <Route path="/analysis" component={() => (
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <ChessAnalysis />
                </div>
              )} />
              <Route>
                <HomePage />
              </Route>
            </Switch>
            <SubscriptionUpgradeBanner />
            <AIAssistant />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;