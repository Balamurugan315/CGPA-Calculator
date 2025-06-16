
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GPAConverter = () => {
  const [gpa, setGpa] = useState<string>('');
  const [formula, setFormula] = useState<string>('formula1');
  const [percentage, setPercentage] = useState<number>(0);
  
  // New state for CGPA/5 to CGPA/10 conversion
  const [cgpa5, setCgpa5] = useState<string>('');
  const [cgpa10, setCgpa10] = useState<number>(0);

  const convertToPercentage = (gpaValue: number, formulaType: string) => {
    switch (formulaType) {
      case 'formula1':
        return (gpaValue / 10) * 100;
      case 'formula2':
        return (gpaValue - 0.75) * 10;
      case 'formula3':
        return gpaValue * 9.5; // Alternative formula
      default:
        return (gpaValue / 10) * 100;
    }
  };

  const convertCgpa5to10 = (cgpa5Value: number) => {
    // Standard conversion: CGPA/10 = (CGPA/5) * 2
    return cgpa5Value * 2;
  };

  useEffect(() => {
    if (gpa) {
      const gpaValue = parseFloat(gpa);
      if (!isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 10) {
        setPercentage(convertToPercentage(gpaValue, formula));
      } else {
        setPercentage(0);
      }
    } else {
      setPercentage(0);
    }
  }, [gpa, formula]);

  useEffect(() => {
    if (cgpa5) {
      const cgpa5Value = parseFloat(cgpa5);
      if (!isNaN(cgpa5Value) && cgpa5Value >= 0 && cgpa5Value <= 5) {
        setCgpa10(convertCgpa5to10(cgpa5Value));
      } else {
        setCgpa10(0);
      }
    } else {
      setCgpa10(0);
    }
  }, [cgpa5]);

  const clearInput = () => {
    setGpa('');
    setPercentage(0);
  };

  const clearCgpaInput = () => {
    setCgpa5('');
    setCgpa10(0);
  };

  const getGradeCategory = (perc: number) => {
    if (perc >= 90) return { category: "A+ Grade", color: "text-green-600" };
    if (perc >= 80) return { category: "A Grade", color: "text-blue-600" };
    if (perc >= 70) return { category: "B Grade", color: "text-indigo-600" };
    if (perc >= 60) return { category: "C Grade", color: "text-yellow-600" };
    if (perc >= 50) return { category: "D Grade", color: "text-orange-600" };
    return { category: "F Grade", color: "text-red-600" };
  };

  const gradeInfo = getGradeCategory(percentage);

  return (
    <Tabs defaultValue="gpa-to-percentage" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="gpa-to-percentage">GPA to Percentage</TabsTrigger>
        <TabsTrigger value="cgpa-conversion">CGPA/5 to CGPA/10</TabsTrigger>
      </TabsList>

      <TabsContent value="gpa-to-percentage">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 bg-gray-50/50 border border-gray-200">
              <CardContent className="p-0 space-y-4">
                <div>
                  <Label htmlFor="gpa-input">Enter GPA/CGPA (0-10)</Label>
                  <Input
                    id="gpa-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="e.g., 8.5"
                    value={gpa}
                    onChange={(e) => setGpa(e.target.value)}
                    className="text-lg"
                  />
                </div>
                
                <Button variant="outline" onClick={clearInput} className="w-full">
                  Clear
                </Button>
              </CardContent>
            </Card>

            {/* Formula Selection */}
            <Card className="p-4 bg-gray-50/50 border border-gray-200">
              <CardContent className="p-0">
                <Label className="text-base font-semibold">Conversion Formula</Label>
                <RadioGroup value={formula} onValueChange={setFormula} className="mt-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formula1" id="formula1" />
                    <Label htmlFor="formula1" className="text-sm">
                      (GPA ÷ 10) × 100
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formula2" id="formula2" />
                    <Label htmlFor="formula2" className="text-sm">
                      (GPA - 0.75) × 10
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="formula3" id="formula3" />
                    <Label htmlFor="formula3" className="text-sm">
                      GPA × 9.5
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Result Section */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Conversion Result</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-gray-600">Your GPA</Label>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {gpa || '0.00'}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-600">Equivalent Percentage</Label>
                  <div className="text-3xl font-bold text-pink-600 mb-2">
                    {percentage.toFixed(2)}%
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className={`text-lg font-semibold ${gradeInfo.color}`}>
                  {gradeInfo.category}
                </div>
                <div className="text-sm text-gray-600">
                  Formula used: {
                    formula === 'formula1' ? '(GPA ÷ 10) × 100' :
                    formula === 'formula2' ? '(GPA - 0.75) × 10' :
                    'GPA × 9.5'
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formula Explanation */}
          <Card className="bg-blue-50/50 border-blue-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Formula Explanations:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Formula 1:</strong> Standard conversion - divides GPA by 10 and multiplies by 100</div>
                <div><strong>Formula 2:</strong> Adjusted conversion - subtracts 0.75 from GPA and multiplies by 10</div>
                <div><strong>Formula 3:</strong> Alternative conversion - multiplies GPA by 9.5</div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Note: Different institutions may use different conversion formulas. Please check with your institution for the correct formula.
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="cgpa-conversion">
        <div className="space-y-6">
          {/* CGPA Conversion Input */}
          <Card className="p-4 bg-gray-50/50 border border-gray-200">
            <CardContent className="p-0 space-y-4">
              <div>
                <Label htmlFor="cgpa5-input">Enter CGPA on 5-point scale (0-5)</Label>
                <Input
                  id="cgpa5-input"
                  type="number"
                  step="0.01"
                  min="0"
                  max="5"
                  placeholder="e.g., 4.2"
                  value={cgpa5}
                  onChange={(e) => setCgpa5(e.target.value)}
                  className="text-lg"
                />
              </div>
              
              <Button variant="outline" onClick={clearCgpaInput} className="w-full">
                Clear
              </Button>
            </CardContent>
          </Card>

          {/* CGPA Conversion Result */}
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">CGPA Conversion Result</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-gray-600">CGPA (5-point scale)</Label>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {cgpa5 || '0.00'}
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm text-gray-600">CGPA (10-point scale)</Label>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {cgpa10.toFixed(2)}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Conversion Formula: CGPA(10) = CGPA(5) × 2
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CGPA Conversion Explanation */}
          <Card className="bg-green-50/50 border-green-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-gray-800 mb-3">CGPA Conversion Guide:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Standard Formula:</strong> CGPA(10-point) = CGPA(5-point) × 2</div>
                <div><strong>Example:</strong> If your CGPA is 4.0 on a 5-point scale, it equals 8.0 on a 10-point scale</div>
                <div><strong>Range:</strong> 5-point scale (0-5) converts to 10-point scale (0-10)</div>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                Note: This is the most commonly used conversion method. Some institutions may use different conversion ratios.
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GPAConverter;
