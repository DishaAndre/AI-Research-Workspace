import React, { useState, useRef } from 'react';
import { Button, Input, Card } from '../components';

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [extractedSummary, setExtractedSummary] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Core React reference anchor hook to map native browser interactions
  const fileInputRef = useRef(null);

  // Triggered when clicking on the stylized dashed drop zone container box
  const handleZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Fired immediately after a user selects a genuine file from their machine
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate that it is a valid PDF document type
      if (file.type !== "application/pdf" && !file.name.endsWith('.pdf')) {
        alert("Validation Error: Please select a valid PDF file document structure.");
        return;
      }
      
      // Store the real web object parameters natively in component state tracking
      setSelectedFile(file);
      
      // Clear out older summary parameters cleanly
      setExtractedSummary('');
    }
  };

  // Dynamic file calculation formatter helper utility
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Triggers the simulated AI analytics logic block
  const runExtractionPipeline = () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      // Note: This summary will connect directly to your Node.js endpoint later
      setExtractedSummary(
        `File Diagnostics Matrix Generated Successfully.\n\n` +
        `• Target Filename: ${selectedFile.name}\n` +
        `• Measured Payload Mass: ${formatFileSize(selectedFile.size)}\n` +
        `• Status: Text matrix index layers mapped inside active transient runtime memory safely. You can now issue natural text questions below.`
      );
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleAskQuestion = (event) => {
    event.preventDefault();
    if (!chatQuestion.trim()) return;

    const userMessage = { sender: 'user', text: chatQuestion };
    let botMessage = { sender: 'ai', text: "" };

    if (!selectedFile) {
      botMessage.text = "System Boundary Alert: File reference matrix context is completely unassigned. Load a PDF before querying data parameters.";
    } else if (!extractedSummary) {
      botMessage.text = "Execution Exception: Please click 'Analyze Selected File' to compile the layout variables before messaging.";
    } else {
      botMessage.text = `Insight vector processed over data structures inside target "${selectedFile.name}". Your request concerning "${chatQuestion}" complies perfectly with system architecture configurations.`;
    }

    setChatHistory((prev) => [...prev, userMessage, botMessage]);
    setChatQuestion('');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50/50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Interactive Pipeline Controls Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          
          <Card title="Document Management" description="Load engineering papers, logs, or textbook material straight from your device workspace memory layout.">
            
            {/* Hidden Native File Input Field Element Endpoint Hook */}
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="application/pdf"
              className="hidden"
              id="real-native-pdf-uploader"
            />

            {/* Stylized Drop Zone Element Canvas */}
            <div 
              onClick={handleZoneClick}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-3 group ${
                selectedFile 
                  ? 'border-green-500 bg-green-50/30 shadow-xs' 
                  : 'border-gray-300 hover:border-blue-500 bg-white hover:bg-blue-50/20 shadow-xs'
              }`}
            >
              <div className={`font-bold text-base transition-colors duration-150 ${selectedFile ? 'text-green-700' : 'text-gray-600 group-hover:text-blue-600'}`}>
                {selectedFile ? "✓ File Chosen Successfully" : "Click to select or drop target PDF file"}
              </div>
              
              {selectedFile ? (
                <div className="text-sm text-green-600 font-mono font-bold tracking-tight bg-white border border-green-200 px-3 py-1.5 rounded-md shadow-xs">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </div>
              ) : (
                <span className="text-xs text-gray-400 font-medium leading-relaxed">
                  Opens native operating system file selector window (PDF max 10MB)
                </span>
              )}
            </div>
            
            <Button 
              text={isAnalyzing ? "Analyzing Core Context Matrices..." : "Analyze Selected File"} 
              variant="primary" 
              onClick={runExtractionPipeline} 
              disabled={!selectedFile || isAnalyzing} 
            />
          </Card>

          {/* AI Synthesis Workspace Section Panel Block */}
          <Card title="Workspace Deep Summary" description="Extracted synthesis engine highlighting structural concepts instantly.">
            {isAnalyzing ? (
              <div className="animate-pulse flex flex-col gap-3 py-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            ) : extractedSummary ? (
              <p className="text-base text-gray-700 font-normal leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-100">
                {extractedSummary}
              </p>
            ) : (
              <div className="text-sm text-gray-400 italic text-center py-6 border border-dashed border-gray-200 rounded-lg bg-gray-50/50">
                No telemetry processed. Select a real local PDF from your computer above to mount analytical details.
              </div>
            )}
          </Card>
        </div>

        {/* Right AI Conversation Engine Screen Section */}
        <div className="lg:col-span-2 flex flex-col h-full">
          <Card title="Interactive AI Knowledge Assistant" description="Execute natural language computational prompt updates across data fields effortlessly.">
            
            <div className="flex-1 min-h-[420px] max-h-[600px] border border-gray-200 rounded-xl p-5 bg-gray-50 overflow-y-auto flex flex-col gap-4 shadow-inner">
              {chatHistory.length === 0 ? (
                <div className="text-sm text-gray-400 italic m-auto text-center max-w-sm flex flex-col gap-2">
                  <span className="text-2xl">💬</span>
                  Contextual workspace streams are idle. Issue an execution query below to start standard prompt telemetry logic.
                </div>
              ) : (
                chatHistory.map((m, idx) => (
                  <div key={idx} className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {m.sender === 'user' ? 'Client Request' : 'Gemini Core System API'}
                    </span>
                    <div className={`px-5 py-3.5 rounded-xl text-base shadow-sm leading-relaxed ${m.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAskQuestion} className="flex flex-col sm:flex-row gap-3 items-end mt-3">
              <div className="flex-1 w-full">
                <Input 
                  id="query-input"
                  placeholder="Ask a question about the uploaded document..." 
                  value={chatQuestion} 
                  onChange={(e) => setChatQuestion(e.target.value)} 
                />
              </div>
              <div className="w-full sm:w-auto">
                <Button text="Execute Question" type="submit" variant="primary" />
              </div>
            </form>

          </Card>
        </div>

      </div>
    </div>
  );
}