import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function GradeTracker() {
  const [grades, setGrades] = useState([]);
  const [target, setTarget] = useState(85);
  const [current, setCurrent] = useState(0);
  const [weight, setWeight] = useState(1);

  const handleAddGrade = () => {
    const newGrade = parseFloat(current);
    if (!isNaN(newGrade)) {
      setGrades([...grades, { grade: newGrade, weight: parseFloat(weight) }]);
      setCurrent(0);
      setWeight(1);
    }
  };

  const weightedAverage = grades.reduce((acc, g) => acc + g.grade * g.weight, 0) /
                          grades.reduce((acc, g) => acc + g.weight, 0);

  const calculateNeeded = () => {
    const totalWeight = grades.reduce((acc, g) => acc + g.weight, 0);
    const currentScore = grades.reduce((acc, g) => acc + g.grade * g.weight, 0);
    const desiredTotal = target * (totalWeight + 1);
    const needed = (desiredTotal - currentScore).toFixed(2);
    return needed;
  };

  const data = grades.map((g, index) => ({
    name: `Sem ${index + 1}`,
    Grade: g.grade,
    Target: target,
  }));

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📊 Grade Tracker</h1>

      <Card className="mb-4">
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              placeholder="Grade"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Button onClick={handleAddGrade}>Add</Button>
          </div>
          <div>
            <p>🎯 Target Grade: {target}</p>
            <Input
              type="number"
              placeholder="Set target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <p>📈 Current Weighted Average: {isNaN(weightedAverage) ? 'N/A' : weightedAverage.toFixed(2)}</p>
          <p>🔮 Grade Needed Next Semester to Hit Target: {grades.length > 0 ? calculateNeeded() : 'N/A'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Grade" stroke="#8884d8" />
              <Line type="monotone" dataKey="Target" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
