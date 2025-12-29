import { Palette, Copy, RefreshCw } from 'lucide-react';

const Instructions = () => {
  const instructions = [
    {
      icon: <Palette className="text-white" size={24} />,
      title: "Add Colors",
      gradient: "from-blue-500 to-purple-500",
      points: [
        "1. Click color square OR type HEX value",
        "2. Give it a name",
        "3. Click 'Add Color'"
      ]
    },
    {
      icon: <Copy className="text-white" size={24} />,
      title: "Copy Formats",
      gradient: "from-green-500 to-emerald-500",
      points: [
        "Click copy icon to copy:",
        "• HEX: #3B82F6",
        "• RGB: rgb(59, 130, 246)",
        "• HSL: hsl(217, 90%, 60%)"
      ]
    },
    {
      icon: <RefreshCw className="text-white" size={24} />,
      title: "Customize",
      gradient: "from-orange-500 to-red-500",
      points: [
        "• Toggle details visibility",
        "• Switch format display",
        "• Remove colors with × button",
        "• Generate random palette"
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-center">How to Use</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {instructions.map((instruction, index) => (
          <div key={index} className="text-center p-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${instruction.gradient} rounded-lg flex items-center justify-center mx-auto mb-4`}>
              {instruction.icon}
            </div>
            <h3 className="font-bold mb-2">{instruction.title}</h3>
            <p className="text-gray-600">
              {instruction.points.map((point, idx) => (
                <span key={idx}>
                  {point}
                  {idx < instruction.points.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;