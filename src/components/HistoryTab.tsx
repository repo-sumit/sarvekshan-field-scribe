
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, School, Globe } from 'lucide-react';

interface HistoryRecord {
  id: string;
  surveyName: string;
  surveyId: string;
  udise?: string;
  dateFilled: string;
  isInSchool: boolean;
}

interface HistoryTabProps {
  onViewResponse: (record: HistoryRecord) => void;
}

const HistoryTab = ({ onViewResponse }: HistoryTabProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const historyRecords: HistoryRecord[] = [
    {
      id: 'h1',
      surveyName: 'School Infrastructure Assessment',
      surveyId: 'EDU001',
      udise: '12345678901',
      dateFilled: '2024-01-15',
      isInSchool: true,
    },
    {
      id: 'h2',
      surveyName: 'Community Health Survey',
      surveyId: 'PUB001',
      dateFilled: '2024-01-12',
      isInSchool: false,
    },
    {
      id: 'h3',
      surveyName: 'Digital Literacy Assessment',
      surveyId: 'PUB002',
      dateFilled: '2024-01-10',
      isInSchool: false,
    },
    {
      id: 'h4',
      surveyName: 'Teacher Training Effectiveness',
      surveyId: 'EDU003',
      udise: '12345678902',
      dateFilled: '2024-01-08',
      isInSchool: true,
    },
  ];

  // Generate calendar data for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const surveyDates = new Set(historyRecords.map(record => record.dateFilled));
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      days.push({
        date: date.getDate(),
        dateStr,
        isCurrentMonth: date.getMonth() === currentMonth,
        hasSurvey: surveyDates.has(dateStr),
        isToday: dateStr === today.toISOString().split('T')[0],
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = monthNames[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  const filteredRecords = selectedDate 
    ? historyRecords.filter(record => record.dateFilled === selectedDate)
    : historyRecords;

  return (
    <div className="pb-20 px-4">
      <div className="pt-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Survey History</h1>
        
        {/* Calendar View */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {currentMonth} {currentYear}
            </CardTitle>
            <CardDescription>
              Green dots indicate days with completed surveys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day.hasSurvey ? day.dateStr : null)}
                  className={`
                    relative h-10 text-sm rounded-lg transition-colors
                    ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                    ${day.isToday ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                    ${day.hasSurvey ? 'hover:bg-green-50' : 'hover:bg-gray-50'}
                    ${selectedDate === day.dateStr ? 'bg-green-100 text-green-700' : ''}
                  `}
                  disabled={!day.hasSurvey}
                >
                  {day.date}
                  {day.hasSurvey && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
            {selectedDate && (
              <div className="mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedDate(null)}
                >
                  Show All Surveys
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Survey History Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedDate ? `Surveys on ${new Date(selectedDate).toLocaleDateString()}` : 'All Completed Surveys'}
        </h2>
        
        {filteredRecords.map((record) => (
          <Card key={record.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {record.surveyId}
                    </span>
                    {record.isInSchool ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <School className="w-3 h-3 mr-1" />
                        In-School
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{record.surveyName}</CardTitle>
                  {record.udise && (
                    <CardDescription className="text-sm">
                      UDISE: {record.udise}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Completed on {new Date(record.dateFilled).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <Button 
                  onClick={() => onViewResponse(record)}
                  size="sm"
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Response
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {selectedDate ? 'No surveys completed on this date' : 'No completed surveys'}
          </h3>
          <p className="text-gray-500">
            {selectedDate ? 'Try selecting a different date' : 'Complete some surveys to see them here'}
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
