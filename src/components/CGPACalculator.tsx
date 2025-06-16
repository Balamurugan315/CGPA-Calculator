
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Semester {
  id: number;
  gpa: string;
}

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, gpa: '' }
  ]);
  const [cgpa, setCgpa] = useState<number>(0);

  const addSemester = () => {
    const newId = Math.max(...semesters.map(s => s.id)) + 1;
    setSemesters([...semesters, { id: newId, gpa: '' }]);
  };

  const removeSemester = (id: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(semester => semester.id !== id));
    } else {
      toast({
        title: "Cannot remove",
        description: "At least one semester is required",
        variant: "destructive"
      });
    }
  };

  const updateSemester = (id: number, field: keyof Semester, value: string) => {
    setSemesters(semesters.map(semester => 
      semester.id === id ? { ...semester, [field]: value } : semester
    ));
  };

  const calculateCGPA = () => {
    const validGpas = semesters
      .filter(semester => semester.gpa && !isNaN(parseFloat(semester.gpa)))
      .map(semester => parseFloat(semester.gpa))
      .filter(gpa => gpa >= 0 && gpa <= 10);

    return validGpas.length > 0 ? validGpas.reduce((sum, gpa) => sum + gpa, 0) / validGpas.length : 0;
  };

  useEffect(() => {
    setCgpa(calculateCGPA());
  }, [semesters]);

  const clearAll = () => {
    setSemesters([{ id: 1, gpa: '' }]);
    toast({
      title: "Cleared",
      description: "All semesters have been cleared",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {semesters.map((semester, index) => (
          <Card key={semester.id} className="p-4 bg-gray-50/50 border border-gray-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <Label htmlFor={`semester-${semester.id}`}>
                    Semester {index + 1}
                  </Label>
                  <div className="text-sm text-gray-500 mb-2">
                    Enter GPA for this semester
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`gpa-${semester.id}`}>GPA (0-10)</Label>
                  <Input
                    id={`gpa-${semester.id}`}
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g., 8.5"
                    value={semester.gpa}
                    onChange={(e) => updateSemester(semester.id, 'gpa', e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeSemester(semester.id)}
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
        <Button onClick={addSemester} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Semester
        </Button>
        <Button variant="outline" onClick={clearAll}>
          Clear All
        </Button>
      </div>

      {/* CGPA Result */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Your CGPA</h3>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {cgpa.toFixed(2)}
          </div>
          <p className="text-gray-600">
            {cgpa >= 9 ? "Outstanding Performance!" : 
             cgpa >= 8 ? "Excellent Work" : 
             cgpa >= 7 ? "Very Good" : 
             cgpa >= 6 ? "Good" : 
             cgpa >= 5 ? "Satisfactory" : 
             "Keep Working Hard!"}
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Average of {semesters.filter(s => s.gpa && !isNaN(parseFloat(s.gpa))).length} semesters
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CGPACalculator;
