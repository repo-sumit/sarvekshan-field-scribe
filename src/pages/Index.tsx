
import React, { useState } from 'react';
import AuthPage from '@/components/AuthPage';
import BottomNavigation from '@/components/BottomNavigation';
import SurveyTab from '@/components/SurveyTab';
import SurveyForm from '@/components/SurveyForm';
import HistoryTab from '@/components/HistoryTab';
import ProfileTab from '@/components/ProfileTab';
import ResponseView from '@/components/ResponseView';

type AppState = 
  | { page: 'auth' }
  | { page: 'main'; activeTab: 'survey' | 'history' | 'profile' }
  | { page: 'survey-form'; survey: any }
  | { page: 'response-view'; record: any };

const Index = () => {
  const [appState, setAppState] = useState<AppState>({ page: 'auth' });

  const handleLogin = () => {
    setAppState({ page: 'main', activeTab: 'survey' });
  };

  const handleLogout = () => {
    setAppState({ page: 'auth' });
  };

  const handleTabChange = (tab: 'survey' | 'history' | 'profile') => {
    setAppState({ page: 'main', activeTab: tab });
  };

  const handleStartSurvey = (survey: any) => {
    setAppState({ page: 'survey-form', survey });
  };

  const handleBackToMain = () => {
    setAppState({ page: 'main', activeTab: 'survey' });
  };

  const handleSurveySubmit = () => {
    // Here you would typically save the survey data
    console.log('Survey submitted successfully!');
    setAppState({ page: 'main', activeTab: 'history' });
  };

  const handleViewResponse = (record: any) => {
    setAppState({ page: 'response-view', record });
  };

  const handleBackToHistory = () => {
    setAppState({ page: 'main', activeTab: 'history' });
  };

  if (appState.page === 'auth') {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (appState.page === 'survey-form') {
    return (
      <SurveyForm 
        survey={appState.survey}
        onBack={handleBackToMain}
        onSubmit={handleSurveySubmit}
      />
    );
  }

  if (appState.page === 'response-view') {
    return (
      <ResponseView 
        record={appState.record}
        onBack={handleBackToHistory}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {appState.activeTab === 'survey' && (
        <SurveyTab onStartSurvey={handleStartSurvey} />
      )}
      {appState.activeTab === 'history' && (
        <HistoryTab onViewResponse={handleViewResponse} />
      )}
      {appState.activeTab === 'profile' && (
        <ProfileTab onLogout={handleLogout} />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={appState.activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  );
};

export default Index;
