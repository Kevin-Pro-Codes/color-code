import { Palette } from 'lucide-react';
import { useState } from 'react';

const CustomColorForm = ({ onAddColor }) => {
  const [customColor, setCustomColor] = useState('#3B82F6');
  const [customColorName, setCustomColorName] = useState('Custom Color');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddColor(customColor, customColorName);
    setCustomColor('#3B82F6');
    setCustomColorName('Custom Color');
  };

  const quickExamples = [
    { hex: '#1DA1F2', name: 'Twitter Blue' },
    { hex: '#FF0000', name: 'Pure Red' },
    { hex: '#00FF00', name: 'Lime Green' },
    { hex: '#F0F', name: 'Magenta' }
  ];

  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Palette className="text-blue-500" />
        Add Custom Color
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Picker
              <span className="text-xs bg-white text-gray-500 ml-2">(Click square or type HEX)</span>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-300 hover:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                  placeholder="#3B82F6 or F00"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Name
              <span className="text-xs text-gray-500 ml-2">(Give it a name)</span>
            </label>
            <input
              type="text"
              value={customColorName}
              onChange={(e) => setCustomColorName(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              placeholder="Twitter Blue, Sunset Orange, etc."
              required
            />
          </div>
          
          <div className="md:col-span-3">
            <button
              type="submit"
              className="h-12 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg active:scale-95"
            >
              Add Color
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Accepts #FFF, #FFFFFF, FFF, FFFFFF
            </p>
          </div>
        </div>
      </form>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
        <div className="flex flex-wrap gap-2">
          {quickExamples.map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setCustomColor(example.hex);
                setCustomColorName(example.name);
              }}
              className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
            >
              {example.hex} → {example.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomColorForm;