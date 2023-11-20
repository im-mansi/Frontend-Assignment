// App.js
import React, { useState } from 'react';
// import FormPreview from './pages/FormPreview';
import Form from './pages/FOrm';
import JsonEditor from './pages/JsonEditor';

const App = () => {
  const [schema, setSchema] = useState('');

  const handleSchemaChange = (newSchema) => {
    // Handle schema changes, e.g., update state
    setSchema(newSchema);
  };

  return (
    <>
    <h2 className="text-2xl font-bold m-8">New Pizza</h2>
    <div className='flex'>
      
      {/* <div className='w-1/2'> */}
        {/* <FormPreview schema={schema} /> */}
        <Form schema={schema}/>
      {/* </div>
      <div className='w-1/2'> */}
        <JsonEditor onSchemaChange={handleSchemaChange} />
      {/* </div> */}
    </div>
    </>
  );
};

export default App;
