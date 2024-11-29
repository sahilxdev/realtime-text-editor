import React, { useState, useEffect } from 'react';
import socketService from '../services/socketService';

const CollaborativeEditor: React.FC = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const socket = socketService.connect();
    
    socketService.onTextChange((newText) => {
      setText(newText);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    socketService.emitTextChange(newText);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Collaborative Text Editor
        </h1>
        <textarea
          className="w-full h-96 p-4 border rounded-lg shadow-md resize-none"
          value={text}
          onChange={handleTextChange}
          placeholder="Start typing collaboratively..."
        />
      </div>
    </div>
  );
};

export default CollaborativeEditor;