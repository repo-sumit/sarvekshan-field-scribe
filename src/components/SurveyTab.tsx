
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, School, Globe, Play, RotateCcw } from 'lucide-react';

interface Survey {
  id: string;
  name: string;
  description: string;
  languages: string[];
  isInSchool: boolean;
  isStarted: boolean;
  progress?: number;
}

interface SurveyTabProps {
  onStartSurvey: (survey: Survey) => void;
}

const SurveyTab = ({ onStartSurvey }: SurveyTabProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const surveys: Survey[] = [
    {
      id: 'EDU001',
      name: 'School Infrastructure Assessment',
      description: 'Comprehensive evaluation of school facilities, teaching resources, and infrastructure quality.',
      languages: ['Hindi', 'English', 'Telugu'],
      isInSchool: true,
      isStarted: false,
    },
    {
      id: 'EDU002',
      name: 'Student Enrollment Survey',
      description: 'Track student enrollment patterns and dropout rates across different demographics.',
      languages: ['Hindi', 'English'],
      isInSchool: true,
      isStarted: true,
      progress: 65,
    },
    {
      id: 'PUB001',
      name: 'Community Health Survey',
      description: 'Public health assessment focusing on sanitation, healthcare access, and nutrition.',
      languages: ['Hindi', 'English', 'Tamil', 'Bengali'],
      isInSchool: false,
      isStarted: false,
    },
    {
      id: 'PUB002',
      name: 'Digital Literacy Assessment',
      description: 'Evaluate digital literacy levels and technology adoption in rural communities.',
      languages: ['Hindi', 'English'],
      isInSchool: false,
      isStarted: true,
      progress: 20,
    },
    {
      id: 'EDU003',
      name: 'Teacher Training Effectiveness',
      description: 'Assess the impact of recent teacher training programs on education quality.',
      languages: ['Hindi', 'English', 'Marathi'],
      isInSchool: true,
      isStarted: false,
    },
  ];

  const filteredSurveys = surveys.filter(survey =>
    survey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    survey.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-20 px-4">
      <div className="sticky top-0 bg-white z-10 pb-4 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Available Surveys</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search surveys by name, ID, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredSurveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {survey.id}
                    </span>
                    {survey.isInSchool && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        <School className="w-3 h-3 mr-1" />
                        In-School
                      </Badge>
                    )}
                    {!survey.isInSchool && (
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-tight">{survey.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {survey.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1 flex-1">
                  {survey.languages.map((lang) => (
                    <Badge key={lang} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
                <div className="ml-4">
                  {survey.isStarted ? (
                    <div className="text-right">
                      <div className="text-xs text-gray-500 mb-1">
                        Progress: {survey.progress}%
                      </div>
                      <Button 
                        onClick={() => onStartSurvey(survey)}
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        Resume
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => onStartSurvey(survey)}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSurveys.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys found</h3>
          <p className="text-gray-500">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};

export default SurveyTab;
