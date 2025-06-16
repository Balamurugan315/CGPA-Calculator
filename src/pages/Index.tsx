
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, GraduationCap, TrendingUp } from "lucide-react";
import CourseGPACalculator from "@/components/CourseGPACalculator";
import CGPACalculator from "@/components/CGPACalculator";
import GPAConverter from "@/components/GPAConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Academic Ace Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your GPA, CGPA, and convert grades to percentages with our comprehensive academic tools
          </p>
        </div>

        {/* Main Calculator Tabs */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="course-gpa" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="course-gpa" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Course GPA
              </TabsTrigger>
              <TabsTrigger value="cgpa" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                CGPA Calculator
              </TabsTrigger>
              <TabsTrigger value="converter" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                GPA Converter
              </TabsTrigger>
            </TabsList>

            <TabsContent value="course-gpa">
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">Course-wise GPA Calculator</CardTitle>
                  <CardDescription>
                    Add your courses and calculate your semester GPA in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CourseGPACalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cgpa">
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">CGPA Calculator</CardTitle>
                  <CardDescription>
                    Calculate your cumulative GPA across multiple semesters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CGPACalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="converter">
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">GPA to Percentage Converter</CardTitle>
                  <CardDescription>
                    Convert your GPA or CGPA to percentage using different formulas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GPAConverter />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p>© 2024 Academic Ace Calculator. Helping students excel in their academic journey.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
