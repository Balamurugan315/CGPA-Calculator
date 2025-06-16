
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
}

const CourseGPACalculator = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '', credits: '' }
  ]);
  const [gpa, setGpa] = useState<number>(0);

  const gradePoints: { [key: string]: number } = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C+': 5,
    'C': 4,
    'D': 3,
    'F': 0
  };

  const creditOptions = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];

  const addCourse = () => {
    const newId = Math.max(...courses.map(c => c.id)) + 1;
    setCourses([...courses, { id: newId, name: '', grade: '', credits: '' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    } else {
      toast({
        title: "Cannot remove",
        description: "At least one course is required",
        variant: "destructive"
      });
    }
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.grade && course.credits) {
        const points = gradePoints[course.grade] || 0;
        const credits = parseFloat(course.credits);
        totalPoints += points * credits;
        totalCredits += credits;
      }
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  useEffect(() => {
    setGpa(calculateGPA());
  }, [courses]);

  const clearAll = () => {
    setCourses([{ id: 1, name: '', grade: '', credits: '' }]);
    toast({
      title: "Cleared",
      description: "All courses have been cleared",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4 bg-gray-50/50 border border-gray-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <Label htmlFor={`name-${course.id}`}>Course Name (Optional)</Label>
                  <Input
                    id={`name-${course.id}`}
                    placeholder="e.g., Mathematics"
                    value={course.name}
                    onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor={`grade-${course.id}`}>Grade</Label>
                  <Select value={course.grade} onValueChange={(value) => updateCourse(course.id, 'grade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade} ({gradePoints[grade]} points)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`credits-${course.id}`}>Credit Hours</Label>
                  <Select value={course.credits} onValueChange={(value) => updateCourse(course.id, 'credits', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credits" />
                    </SelectTrigger>
                    <SelectContent>
                      {creditOptions.map(credit => (
                        <SelectItem key={credit} value={credit}>
                          {credit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <Button onClick={addCourse} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
        <Button variant="outline" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      {/* GPA Result */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Your GPA</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {gpa.toFixed(2)}
          </div>
          <p className="text-gray-600">
            {gpa >= 9 ? "Excellent!" : gpa >= 8 ? "Very Good" : gpa >= 7 ? "Good" : gpa >= 6 ? "Satisfactory" : gpa >= 5 ? "Pass" : "Needs Improvement"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseGPACalculator;
