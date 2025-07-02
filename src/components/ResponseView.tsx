
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, School, Globe, Calendar, FileText } from 'lucide-react';

interface ResponseViewProps {
  record: {
    id: string;
    surveyName: string;
    surveyId: string;
    udise?: string;
    dateFilled: string;
    isInSchool: boolean;
  };
  onBack: () => void;
}

const ResponseView = ({ record, onBack }: ResponseViewProps) => {
  // Mock response data
  const responses = [
    {
      question: 'How would you rate the overall infrastructure quality?',
      answer: 'Good',
      type: 'radio'
    },
    {
      question: 'Name of the principal/head teacher:',
      answer: 'Dr. Priya Sharma',
      type: 'text'
    },
    {
      question: 'Total number of students enrolled:',
      answer: '245',
      type: 'number'
    },
    {
      question: 'Are there adequate toilet facilities?',
      answer: 'Yes, separate for boys and girls',
      type: 'radio'
    },
    {
      question: 'Additional observations or comments:',
      answer: 'The school has excellent library facilities with over 2000 books. However, the playground needs some maintenance work. The computer lab is well-equipped with 20 computers, all in working condition.',
      type: 'textarea'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 bg-white border-b px-4 py-4 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">Survey Response</h1>
            <p className="text-sm text-gray-500">View submitted data</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Survey Info Card */}
        <Card>
          <CardHeader>
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
                <CardTitle className="text-lg leading-tight mb-2">{record.surveyName}</CardTitle>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(record.dateFilled).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  {record.udise && (
                    <div className="flex items-center gap-1">
                      <School className="w-4 h-4" />
                      UDISE: {record.udise}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Responses */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Survey Responses
          </h2>
          
          {responses.map((response, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-2">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded flex-shrink-0">
                    {index + 1}
                  </span>
                  <CardTitle className="text-base leading-tight text-gray-800">
                    {response.question}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`p-3 rounded-lg ${
                  response.type === 'textarea' 
                    ? 'bg-gray-50 border border-gray-200' 
                    : 'bg-blue-50 border border-blue-200'
                }`}>
                  <p className={`${
                    response.type === 'textarea' 
                      ? 'text-gray-700 leading-relaxed whitespace-pre-wrap' 
                      : 'text-blue-800 font-medium'
                  }`}>
                    {response.answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Survey Completed</h3>
              <p className="text-sm text-gray-600">
                All responses have been successfully recorded and cannot be modified.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponseView;
