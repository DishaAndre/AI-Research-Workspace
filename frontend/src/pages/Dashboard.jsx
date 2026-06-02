import React, { useState, useRef } from 'react';
import { Button, Input, Card } from '../components';

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [extractedSummary, setExtractedSummary] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSendingMsg, setIsSendingMsg] = useState(false);

  const fileInputRef = useRef(null);

  const handleZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== "application/pdf" && !file.name.endsWith('.pdf')) {
        alert("Validation Error: Please select a valid PDF file document structure.");
        return;
      }
      setSelectedFile(file);
      setExtractedSummary('');
    }
  };

  // REAL WORLD UPDATE: Communicates with your live backend /api/documents pipeline
  const handleAnalyzeDocument = async () => {
    if (!selectedFile) return;

    try {
      setIsAnalyzing(true);
      
      const formData = new FormData();
      formData.append('document', selectedFile);

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'File Ingestion matrix failed.');
      }

      setExtractedSummary(data.summary || 'Ingestion complete. Document core contents indexed and optimized for AI agent context vectors.');
      
      // Inject standard initialization message into Chat UI
      setChatHistory([
        { sender: 'system', text: `Successfully parsed document vector structural maps for: ${selectedFile.name}` }
      ]);

    } catch (err) {
      alert(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // REAL WORLD UPDATE: Routes prompt context down to the live AI agent cluster
  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!chatQuestion.trim()) return;

    const userMessage = chatQuestion;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMessage }]);
    setChatQuestion('');

    try {
      setIsSendingMsg(true);
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question: userMessage, fileName: selectedFile?.name || 'none' })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'AI agent interface timeout.');
      }

      setChatHistory(prev => [...prev, { sender: 'agent', text: data.reply }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'agent', text: `Connection Error: ${err.message}` }]);
    } finally {
      setIsSendingMsg(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-1.5 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Research Analysis Core</h1>
        <p className="text-base text-gray-500">Inject raw research papers, process textual analytical insights, and execute semantic reasoning tasks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start flex-1">
        {/* Document Parsing Controls - Left Hand Side */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          <Card title="Document Data Intake" description="Ingest PDF research papers into the secure cloud processing array.">
            <div 
              onClick={handleZoneClick}
              className="border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50/50 hover:bg-blue-50/20 p-8 rounded-xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 group"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf"
              />
              <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 shadow-xs flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:border-blue-200 transition-colors">
                📄
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-700">
                  {selectedFile ? selectedFile.name : "Select Document File Vector"}
                </span>
                <span className="text-xs text-gray-400">Supported formats: Native Adobe PDF Layouts (*.pdf)</span>
              </div>
            </div>

            {selectedFile && (
              <Button 
                text={isAnalyzing ? "Processing Matrix Arrays..." : "Execute Structural Ingestion"} 
                onClick={handleAnalyzeDocument} 
                variant="primary" 
                disabled={isAnalyzing}
              />
            )}
          </Card>

          {extractedSummary && (
            <div className="flex-1 min-h-[250px]">
              <Card title="Extracted Core Outlines" description="Synthesized operational insights and primary themes mapped from the source text.">
                <div className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50/60 border border-gray-100 p-4 rounded-xl max-h-[350px] overflow-y-auto whitespace-pre-line">
                  {extractedSummary}
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* AI Agent Interaction Console Terminal - Right Hand Side */}
        <div className="lg:col-span-7 h-full min-h-[500px] flex flex-col">
          <Card title="Interactive AI Agent Terminal" description="Query content trees, generate notes, and compile analytical cross-references.">
            <div className="flex-1 bg-gray-50 border border-gray-200/60 rounded-xl p-4 flex flex-col gap-4 overflow-y-auto max-h-[400px] min-h-[350px]">
              {chatHistory.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-2 p-6 text-gray-400">
                  <span className="text-2xl">⚡</span>
                  <p className="text-sm font-semibold">Terminal offline. Ingest a data source configuration file to initialize context queries.</p>
                </div>
              ) : (
                chatHistory.map((m, idx) => (
                  <div key={idx} className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                    <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">
                      {m.sender === 'user' ? 'Client Request' : m.sender === 'system' ? 'System Status' : 'AI Reasoning Agent'}
                    </span>
                    <div className={`px-5 py-3.5 rounded-xl text-base shadow-sm leading-relaxed ${
                      m.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : m.sender === 'system'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                    }`}>
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
                  placeholder={selectedFile ? "Ask a question about the uploaded document..." : "Please ingest a document first..."} 
                  value={chatQuestion} 
                  onChange={(e) => setChatQuestion(e.target.value)} 
                  disabled={!selectedFile || isSendingMsg}
                />
              </div>
              <div className="w-full sm:w-auto">
                <Button 
                  text={isSendingMsg ? "Processing..." : "Execute Question"} 
                  type="submit" 
                  variant="primary" 
                  disabled={!selectedFile || isSendingMsg}
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}