import React, { useEffect, useState } from 'react';

const JsonEditor = ({ onSchemaChange }) => {
  const [schema, setSchema] = useState('');

  useEffect(() => {
    // Validate and parse JSON schema
    try {
      JSON.parse(schema);
      // If valid JSON, notify the parent component
      onSchemaChange(schema);
    } catch (error) {
      // Handle invalid JSON (you might want to provide user feedback)
      console.error('Invalid JSON:', error.message);
    }
  }, [schema, onSchemaChange]);

  const handleSchemaChange = (event) => {
    const newSchema = event.target.value;
    setSchema(newSchema);
  };

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(schema);
      const formattedJson = JSON.stringify(parsedJson, null, 2);
      setSchema(formattedJson);
    } catch (error) {
      console.error('Invalid JSON format:', error.message);
    }
  };

  const isFieldRequired = (field) => field.validate && field.validate.required;

  return (
    <div className="lg:w-1/2 p-8 bg-[#fafcff] ">
      <h2 className="text-2xl font-bold mb-4">JSON Editor</h2>
      <textarea
        className="w-full h-[80vh] p-4 border border-gray-300 rounded-md resize-none mb-4 lg:mb-0 lg:mr-4"
        value={schema}
        onChange={handleSchemaChange}
        placeholder="Paste UI Schema here..."
      />
      <button onClick={formatJson} className="bg-blue-500 text-white px-4 py-2 rounded-md">Format JSON</button>
    </div>
  );
};

export default JsonEditor;
