
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Send, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Question {
  id: string;
  type: 'radio' | 'text' | 'textarea' | 'number';
  question: string;
  options?: string[];
  required: boolean;
}

interface SurveyFormProps {
  survey: {
    id: string;
    name: string;
    isInSchool: boolean;
  };
  onBack: () => void;
  onSubmit: () => void;
}

const SurveyForm = ({ survey, onBack, onSubmit }: SurveyFormProps) => {
  const [udiseCode, setUdiseCode] = useState('');
  const [showUdiseError, setShowUdiseError] = useState(false);
  const [currentStep, setCurrentStep] = useState(survey.isInSchool ? 'udise' : 'survey');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const questions: Question[] = [
    {
      id: 'q1',
      type: 'radio',
      question: 'How would you rate the overall infrastructure quality?',
      options: ['Excellent', 'Good', 'Average', 'Poor', 'Very Poor'],
      required: true,
    },
    {
      id: 'q2',
      type: 'text',
      question: 'Name of the principal/head teacher:',
      required: true,
    },
    {
      id: 'q3',
      type: 'number',
      question: 'Total number of students enrolled:',
      required: true,
    },
    {
      id: 'q4',
      type: 'radio',
      question: 'Are there adequate toilet facilities?',
      options: ['Yes, separate for boys and girls', 'Yes, but not separate', 'No'],
      required: true,
    },
    {
      id: 'q5',
      type: 'textarea',
      question: 'Additional observations or comments:',
      required: false,
    },
  ];

  const handleUdiseSubmit = () => {
    if (udiseCode.length !== 11) {
      setShowUdiseError(true);
      return;
    }
    setShowUdiseError(false);
    setCurrentStep('survey');
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setShowIncompleteWarning(false);
  };

  const handleSubmit = () => {
    const requiredQuestions = questions.filter(q => q.required);
    const answeredRequired = requiredQuestions.filter(q => answers[q.id]?.trim());
    
    if (answeredRequired.length < requiredQuestions.length) {
      setShowIncompleteWarning(true);
      return;
    }
    
    onSubmit();
  };

  const handleDiscard = () => {
    if (confirm('All survey data will be lost. Are you sure you want to discard?')) {
      onBack();
    }
  };

  const progress = (Object.keys(answers).length / questions.length) * 100;

  if (currentStep === 'udise') {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="sticky top-0 bg-white border-b px-4 py-4 z-10">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="font-semibold text-gray-900">{survey.name}</h1>
              <p className="text-sm text-gray-500">Survey ID: {survey.id}</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Enter UDISE Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="udise">UDISE Code (11 digits)</Label>
                <Input
                  id="udise"
                  type="text"
                  placeholder="Enter 11-digit UDISE code"
                  value={udiseCode}
                  onChange={(e) => setUdiseCode(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  className="h-12 text-lg text-center tracking-wider"
                  maxLength={11}
                />
              </div>

              {showUdiseError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Please enter a valid 11-digit UDISE code.
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleUdiseSubmit}
                disabled={udiseCode.length !== 11}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                Validate & Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 bg-white border-b px-4 py-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold text-gray-900">{survey.name}</h1>
            <p className="text-sm text-gray-500">Survey ID: {survey.id}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {showIncompleteWarning && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please complete all required questions before submitting.
            </AlertDescription>
          </Alert>
        )}

        {questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start gap-2">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <CardTitle className="text-base leading-tight">
                    {question.question}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={answers[question.id] || ''}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                      <Label htmlFor={`${question.id}-${option}`} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'text' && (
                <Input
                  placeholder="Enter your answer"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="h-10"
                />
              )}

              {question.type === 'number' && (
                <Input
                  type="number"
                  placeholder="Enter number"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="h-10"
                />
              )}

              {question.type === 'textarea' && (
                <Textarea
                  placeholder="Enter your detailed response"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleDiscard}
            className="flex-1 h-12"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Discard
          </Button>
          
          <Button
            onClick={handleSubmit}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Submit Survey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
