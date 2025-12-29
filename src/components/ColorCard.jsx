import { Copy, Check } from 'lucide-react';

const ColorCard = ({ 
  color, 
  index, 
  selectedFormat, 
  showDetails, 
  copiedIndex, 
  onCopy, 
  onRemove 
}) => {
  const formatValue = {
    'hex': color.hex,
    'rgb': `rgb(${color.rgb})`,
    'hsl': `hsl(${color.hsl})`
  }[selectedFormat];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div 
        className="h-48 relative group"
        style={{ backgroundColor: color.hex }}
      >
        <button
          onClick={() => onRemove(index)}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          title="Remove color"
        >
          <span className="text-gray-800 font-bold">×</span>
        </button>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-bold mb-1 ${color.textColor}`}>
              {color.name}
            </h3>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded border border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <span className="font-mono text-lg font-semibold">
                {formatValue}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => onCopy(formatValue, index)}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            title="Copy to clipboard"
          >
            {copiedIndex === index ? (
              <Check className="text-green-500" size={20} />
            ) : (
              <Copy className="text-gray-600" size={20} />
            )}
          </button>
        </div>

        {showDetails && (
          <div className="space-y-3 border-t border-gray-100 pt-4">
            <FormatDetail 
              label="HEX" 
              value={color.hex} 
              onCopy={() => onCopy(color.hex, `hex-${index}`)} 
            />
            <FormatDetail 
              label="RGB" 
              value={`rgb(${color.rgb})`} 
              onCopy={() => onCopy(`rgb(${color.rgb})`, `rgb-${index}`)} 
            />
            <FormatDetail 
              label="HSL" 
              value={`hsl(${color.hsl})`} 
              onCopy={() => onCopy(`hsl(${color.hsl})`, `hsl-${index}`)} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

const FormatDetail = ({ label, value, onCopy }) => (
  <div>
    <span className="text-sm text-gray-500 block mb-1">{label}</span>
    <div className="flex justify-between items-center">
      <code className="font-mono bg-gray-50 px-2 py-1 rounded">
        {value}
      </code>
      <button
        onClick={onCopy}
        className="text-gray-400 hover:text-gray-600"
      >
        <Copy size={16} />
      </button>
    </div>
  </div>
);

export default ColorCard;