import React, { useEffect, useMemo, useState } from 'react';

const InputField = ({ field, isRequired, disabled }) => (
  <div className="mb-4 flex">
    {
      field.label == 'Type' || field.label == 'Slices' ? null :
        <>
          <label className={`block w-1/6 ${isRequired ? 'text-red-500' : ''}`}>
            {field.label}
            {isRequired && <span className="ml-1">*</span>}
          </label>
        </>
    }
    {
      field.label == 'Type' ? null :
        <>

          <input
            type="text"
            placeholder={field.placeholder}
            className={`w-full p-2 border ${isRequired ? 'border-red-500' : 'border-gray-300 bg-[#f1f6ff'} rounded-md`}
            disabled={disabled}
          />
        </>
    }
  </div>
);

const SelectField = ({ field, isRequired, disabled }) => (
  <div className="mb-4 flex">
   {
    field.label == 'Slices' ? null : <label className={`block w-1/6 ${isRequired ? 'text-red-500' : ''}`}>
    {field.label}
    {isRequired && <span className="ml-1">*</span>}
  </label>
   }
    <select
      className={`w-full p-2 border ${isRequired ? 'border-red-500' : 'border-gray-300'} rounded-md`}
      disabled={disabled}
    >
      {field.validate.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const SwitchField = ({ field }) => (
  <div className="mb-4">
    <label className="block">
      {field.label}
    </label>
    <input type="checkbox" />
  </div>
);


const SliceOptionsField = ({ field, isRequired }) => (
  <div className="mb-4 flex">
    <label className={`block w-1/6 ${isRequired ? 'text-red-500' : ''}`}>
      {field.label}
      {isRequired && <span className="ml-1">*</span>}
    </label>
    <select className="w-full p-2 border border-gray-300 rounded-md bg-[#f1f6ff]">
      {field.validate.options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

const SeasoningCheckbox = ({ field }) => (
  <div className="mb-4">
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
      <span className="ml-2 text-gray-700">{field.label}</span>
    </label>
  </div>
);

const FooterButtons = () => (
  <div className="flex justify-end mt-8 space-x-4">
    <button className="bg-green-500 text-white px-6 py-3 rounded-md">Submit</button>
    <button className="bg-gray-400 text-white px-6 py-3 rounded-md">Cancel</button>
  </div>
);

const FormPreview = ({ schema }) => {
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulating an asynchronous operation, you can replace this with actual data fetching logic.
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [schema]);

  const handleToggleChange = () => {
    setShowAdvancedFields(!showAdvancedFields);
  };

  const parsedSchema = useMemo(() => {
    try {
      return JSON.parse(schema);
    } catch (error) {
      console.error('Error parsing schema:', error.message);
      return null;
    }
  }, [schema]);

  const renderSubParameters = (subParameters, level) =>
    subParameters.map((subParameter, index) => (
      <div key={index} className={`mb-4 ml-${level * 2} flex`}>
        {subParameter.label == 'Type' ? null : <label className={`block w-1/6 ${subParameter.validate.required ? 'text-red-500' : ''}`}>
          {subParameter.label}
          {subParameter.validate.required && <span className="ml-1">*</span>}
        </label>}
        {renderField(subParameter, index, false)}
        {subParameter.subParameters && renderSubParameters(subParameter.subParameters, level + 1)}
      </div>
    ));

  const renderField = (field, index, disabled) => {
    const isRequired = field.validate && field.validate.required;

    switch (field.uiType) {
      case 'Input':
        return <InputField key={index} field={field} isRequired={isRequired} disabled={disabled} />;
      case 'Select':
        return <SelectField key={index} field={field} isRequired={isRequired} disabled={disabled} />;
      case 'Switch':
        return <SwitchField key={index} field={field} />;
      case 'Size':
      case 'Second Topping':
        return (
          showAdvancedFields && (
            <SelectFieldWithOptions
              key={index}
              field={field}
              isRequired={isRequired}
              disabled={disabled}
            />
          )
        );
      case 'Slice Options':
        return <SliceOptionsField key={index} field={field} isRequired={isRequired} />;
      case 'Toppings':
        return (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{field.label}</h3>
            <SelectFieldWithOptions
              field={field.subParameters[0]}
              isRequired={isRequired}
              disabled={disabled}
            />
            <SelectFieldWithOptions
              field={field.subParameters[1]}
              isRequired={isRequired}
              disabled={disabled}
            />
            <SeasoningCheckbox field={field.subParameters[2]} />
          </div>
        );
      case 'Group':
        if (field.label === 'Pizza_type') {
          return (
            <PizzaTypeButtons
              key={index}
              subParameters={field.subParameters}
            />
          );
        }
        return null;
      default:
        return (
          <>
            {field.uiType !== 'Group' && (
              <h1></h1>
              // <div className={`w-full p-2 border ${isRequired ? 'border-red-500' : 'border-gray-300 bg-[#f1f6ff'} rounded-md`}>

              //   {/* Render appropriate input field based on the field type */}
              //   {field.uiType === 'Input' && (
              //     <input
              //       type="text"
              //       placeholder={field.placeholder}
              //       disabled={disabled}
              //     />
              //   )}
              //   {field.uiType === 'Select' && (
              //     <select disabled={disabled}>
              //       {field.validate.options.map((option) => (
              //         <option key={option.value} value={option.value}>
              //           {option.label}
              //         </option>
              //       ))}
              //     </select>
              //   )}
              //   {/* Add more cases for other field types */}
              // </div>
            )}
            {field.subParameters && renderSubParameters(field.subParameters, 1)}
          </>
        );
    }
  };
  const PizzaTypeButtons = ({ subParameters }) => {
    console.log(subParameters);
    const [subsubParameters, setsubsubParameters] = useState('');
    console.log(subsubParameters);

    useEffect(() => {
      const setsubParameters = () => {
        subParameters.map((item, index) => {
          setsubsubParameters(item.subParameters);
        });
      };

      setsubParameters();
    }, [subParameters]);

    const renderSubParameters = (subParameters, level) =>
      subParameters.map((subParameter, index) => (
        <div key={index} className={`mb-4 ml-${level * 2} flex`}>
          <label className={`block w-1/6 ${subParameter.validate.required ? 'text-red-500' : ''}`}>
            {subParameter.label}
            {subParameter.validate.required && <span className="ml-1">*</span>}
          </label>
          {renderField(subParameter, index, false)}
          {subParameter.subParameters && renderSubParameters(subParameter.subParameters, level + 1)}
        </div>
      ));

    return (
      <div className="mb-4">
        {/* <label className="block text-base font-semibold mb-2">{subParameters[0].label}</label> */}
        <div className="flex space-x-4">
          {subParameters.map((option) => (
            <>
              {/* <button key={option.value} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                {option.label}
              </button> */}
            </>
          )).slice(0, 2)}
        </div>
        {/* {subsubParameters && renderSubParameters(subsubParameters, 1)} */}
      </div>
    );
  };


  const renderForm = (fields, disabled = false) =>
    fields
      .filter((field) => field.label !== 'Pizza_type Type') // Filter out specific field
      .map((field, index) => (
        <div key={index} className="mb-8">
          {field.uiType !== 'Group' && <h3 className="text-lg font-semibold mb-2">{field.label == 'Naples Style Pizza' || field.label == 'New York Style Pizza' ? field.label : null}</h3>}
          {field.uiType === 'Group' && field.subParameters && renderForm(field.subParameters, disabled)}
          {renderField(field, index, disabled)}
        </div>
      ));
  return (
    <div className="w-2/3 p-8 bg-white shadow-md">
      {loading && <p>Loading...</p>}
      {!loading && parsedSchema && renderForm(parsedSchema)}
      <FooterButtons />
    </div>
  );
};

export default FormPreview;
