import { useState } from 'react';
import { Copy, Check, Palette, RefreshCw, Eye, EyeOff } from 'lucide-react';

function App() {
  // Initial palette with various color formats
  const initialPalette = [
    { 
      name: "Ocean Blue", 
      hex: "#3B82F6", 
      rgb: "59, 130, 246", 
      hsl: "217, 90%, 60%",
      textColor: "text-white"
    },
    { 
      name: "Emerald Green", 
      hex: "#10B981", 
      rgb: "16, 185, 129", 
      hsl: "160, 84%, 39%",
      textColor: "text-white"
    },
    { 
      name: "Sunset Orange", 
      hex: "#F97316", 
      rgb: "249, 115, 22", 
      hsl: "25, 95%, 53%",
      textColor: "text-white"
    },
    { 
      name: "Royal Purple", 
      hex: "#8B5CF6", 
      rgb: "139, 92, 246", 
      hsl: "258, 89%, 66%",
      textColor: "text-white"
    },
    { 
      name: "Sunflower Yellow", 
      hex: "#FBBF24", 
      rgb: "251, 191, 36", 
      hsl: "43, 96%, 56%",
      textColor: "text-gray-900"
    },
    { 
      name: "Rose Pink", 
      hex: "#F472B6", 
      rgb: "244, 114, 182", 
      hsl: "330, 86%, 70%",
      textColor: "text-white"
    },
    { 
      name: "Slate Gray", 
      hex: "#64748B", 
      rgb: "100, 116, 139", 
      hsl: "215, 16%, 47%",
      textColor: "text-white"
    },
    { 
      name: "Crimson Red", 
      hex: "#DC2626", 
      rgb: "220, 38, 38", 
      hsl: "0, 72%, 51%",
      textColor: "text-white"
    }
  ];

  const [palette, setPalette] = useState(initialPalette);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState('hex');
  const [customColor, setCustomColor] = useState('#3B82F6');
  const [customColorName, setCustomColorName] = useState('Custom Color');

  // Color conversion functions
  const hexToRgb = (hex) => {
    let hexCode = hex;
    // Remove # if present
    hexCode = hexCode.replace('#', '');
    
    // Handle 3-digit hex
    if (hexCode.length === 3) {
      hexCode = hexCode.split('').map(char => char + char).join('');
    }
    
    const r = parseInt(hexCode.slice(0, 2), 16);
    const g = parseInt(hexCode.slice(2, 4), 16);
    const b = parseInt(hexCode.slice(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  };

  const hexToHsl = (hex) => {
    let hexCode = hex.replace('#', '');
    
    // Handle 3-digit hex
    if (hexCode.length === 3) {
      hexCode = hexCode.split('').map(char => char + char).join('');
    }
    
    let r = parseInt(hexCode.slice(0, 2), 16) / 255;
    let g = parseInt(hexCode.slice(2, 4), 16) / 255;
    let b = parseInt(hexCode.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `${h}, ${s}%, ${l}%`;
  };

  const getTextColor = (hex) => {
    let hexCode = hex.replace('#', '');
    
    if (hexCode.length === 3) {
      hexCode = hexCode.split('').map(char => char + char).join('');
    }
    
    const r = parseInt(hexCode.slice(0, 2), 16);
    const g = parseInt(hexCode.slice(2, 4), 16);
    const b = parseInt(hexCode.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'text-gray-900' : 'text-white';
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // FIXED: Better validation for hex colors
  const addCustomColor = () => {
    let colorToAdd = customColor.trim();
    
    // If empty, show error
    if (!colorToAdd) {
      alert('Please enter a color');
      return;
    }
    
    // Add # if missing (unless it's from color picker which already has #)
    if (!colorToAdd.startsWith('#')) {
      colorToAdd = '#' + colorToAdd;
    }
    
    // Validate hex format (3 or 6 digits after #)
    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
    
    if (hexRegex.test(colorToAdd)) {
      const nameToUse = customColorName.trim() || 'Custom Color';
      
      const newColor = {
        name: nameToUse,
        hex: colorToAdd.toUpperCase(),
        rgb: hexToRgb(colorToAdd),
        hsl: hexToHsl(colorToAdd),
        textColor: getTextColor(colorToAdd)
      };
      
      setPalette([...palette, newColor]);
      
      // Reset inputs
      setCustomColor('#3B82F6');
      setCustomColorName('Custom Color');
    } else {
      alert('Invalid color format! Please use HEX format like #FF0000 or #F00');
    }
  };

  const removeColor = (index) => {
    setPalette(palette.filter((_, i) => i !== index));
  };

  const generateRandomColor = () => {
    const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    return {
      hex,
      rgb: hexToRgb(hex),
      hsl: hexToHsl(hex),
      name: `Random ${Math.floor(Math.random() * 1000)}`,
      textColor: getTextColor(hex)
    };
  };

  const regeneratePalette = () => {
    const newPalette = [];
    for (let i = 0; i < 8; i++) {
      newPalette.push(generateRandomColor());
    }
    setPalette(newPalette);
  };

  const formatOptions = [
    { value: 'hex', label: 'HEX', prefix: '#' },
    { value: 'rgb', label: 'RGB', prefix: 'rgb(' },
    { value: 'hsl', label: 'HSL', prefix: 'hsl(' }
  ];

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {showDetails ? <EyeOff size={20} /> : <Eye size={20} />}
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
              <button
                onClick={regeneratePalette}
                className="flex items-center gap-2 px-4 py-2 bg-black text-black rounded-lg hover:opacity-90 transition-all"
              >
                <RefreshCw size={20} />
            
              </button>
            </div>
          </div>

    {/* Format Selector */}
<div className="flex flex-wrap justify-center gap-4 mb-6">
  {formatOptions.map((format) => (
    <button
      key={format.value}
      onClick={() => setSelectedFormat(format.value)}
      className={`px-4 py-2 rounded-lg transition-all duration-200 border ${
        selectedFormat === format.value
          ? 'bg-black border-black text-black'      // Selected state - filled black
          : 'bg-white border-gray-300 text-gray-700 shadow-sm'   // Default - white with light gray border
      }`}
    >
      {format.label}
    </button>
  ))}
</div>
          
        </header>

        {/* Add Custom Color - FIXED SECTION */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Palette className="text-blue-500" />
            Add Custom Color
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            
            {/* Color Picker Section */}
            <div className="md:col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color Picker
                <span className="text-xs text-gray-500 ml-2">(Click square or type HEX)</span>
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
                  />
                </div>
              </div>
            </div>
            
            {/* Color Name Section */}
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
              />
            </div>
            
            {/* Add Button */}
            <div className="md:col-span-3">
              <button
                onClick={addCustomColor}
                className="h-12 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg active:scale-95"
              >
                Add Color
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Accepts #FFF, #FFFFFF, FFF, FFFFFF
              </p>
            </div>
          </div>
          
          {/* Quick Examples */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-3">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  setCustomColor('#1DA1F2');
                  setCustomColorName('Twitter Blue');
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
              >
                #1DA1F2 → Twitter Blue
              </button>
              <button
                onClick={() => {
                  setCustomColor('#FF0000');
                  setCustomColorName('Pure Red');
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
              >
                #FF0000 → Pure Red
              </button>
              <button
                onClick={() => {
                  setCustomColor('#00FF00');
                  setCustomColorName('Lime Green');
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
              >
                #00FF00 → Lime Green
              </button>
              <button
                onClick={() => {
                  setCustomColor('#F0F');
                  setCustomColorName('Magenta');
                }}
                className="px-3 py-1.5 text-sm rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
              >
                #F0F → Magenta
              </button>
            </div>
          </div>
        </div>

        {/* Color Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {palette.map((color, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              {/* Color Preview */}
              <div 
                className="h-48 relative group"
                style={{ backgroundColor: color.hex }}
              >
                <button
                  onClick={() => removeColor(index)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  title="Remove color"
                >
                  <span className="text-gray-800 font-bold">×</span>
                </button>
              </div>

              {/* Color Details */}
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
                        {selectedFormat === 'hex' && color.hex}
                        {selectedFormat === 'rgb' && `rgb(${color.rgb})`}
                        {selectedFormat === 'hsl' && `hsl(${color.hsl})`}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(
                      selectedFormat === 'hex' ? color.hex :
                      selectedFormat === 'rgb' ? `rgb(${color.rgb})` :
                      `hsl(${color.hsl})`,
                      index
                    )}
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
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">HEX</span>
                      <div className="flex justify-between items-center">
                        <code className="font-mono bg-gray-50 px-2 py-1 rounded">
                          {color.hex}
                        </code>
                        <button
                          onClick={() => copyToClipboard(color.hex, `hex-${index}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">RGB</span>
                      <div className="flex justify-between items-center">
                        <code className="font-mono bg-gray-50 px-2 py-1 rounded">
                          rgb({color.rgb})
                        </code>
                        <button
                          onClick={() => copyToClipboard(`rgb(${color.rgb})`, `rgb-${index}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">HSL</span>
                      <div className="flex justify-between items-center">
                        <code className="font-mono bg-gray-50 px-2 py-1 rounded">
                          hsl({color.hsl})
                        </code>
                        <button
                          onClick={() => copyToClipboard(`hsl(${color.hsl})`, `hsl-${index}`)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-center">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Palette className="text-white" size={24} />
              </div>
              <h3 className="font-bold mb-2">Add Colors</h3>
              <p className="text-gray-600">
                1. Click color square OR type HEX value<br/>
                2. Give it a name<br/>
                3. Click "Add Color"
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Copy className="text-white" size={24} />
              </div>
              <h3 className="font-bold mb-2">Copy Formats</h3>
              <p className="text-gray-600">
                Click copy icon to copy:<br/>
                • HEX: #3B82F6<br/>
                • RGB: rgb(59, 130, 246)<br/>
                • HSL: hsl(217, 90%, 60%)
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="text-white" size={24} />
              </div>
              <h3 className="font-bold mb-2">Customize</h3>
              <p className="text-gray-600">
                • Toggle details visibility<br/>
                • Switch format display<br/>
                • Remove colors with × button<br/>
                • Generate random palette
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;