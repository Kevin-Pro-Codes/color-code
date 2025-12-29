import { Eye, EyeOff, RefreshCw } from 'lucide-react';

const Header = ({ showDetails, onToggleDetails, onRegeneratePalette, selectedFormat, onFormatChange }) => {
  const formatOptions = [
    { value: 'hex', label: 'HEX' },
    { value: 'rgb', label: 'RGB' },
    { value: 'hsl', label: 'HSL' }
  ];

  return (
    <header className="mb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold bg-black bg-clip-text text-transparent">
            Color Palette Studio
          </h1>
          <p className="text-gray-600 mt-2">Generate, customize, and copy color formats</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleDetails}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {showDetails ? <EyeOff size={20} /> : <Eye size={20} />}
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button
            onClick={onRegeneratePalette}
            className="flex items-center gap-2 px-4 py-2 bg-black text-black rounded-lg hover:opacity-90 transition-all"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {formatOptions.map((format) => (
          <button
            key={format.value}
            onClick={() => onFormatChange(format.value)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 border ${
              selectedFormat === format.value
                ? 'bg-black border-black text-black'
                : 'bg-white border-gray-300 text-gray-700 shadow-sm'
            }`}
          >
            {format.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;