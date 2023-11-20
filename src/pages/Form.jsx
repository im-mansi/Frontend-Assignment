// FormPreview.js
import React, { useEffect, useMemo, useState } from 'react';
import InputField from '../components/InputField';
import SeasoningCheckbox from '../components/SeasoningCheckbox';
import SelectField from '../components/SelectField';
import SliceOptionsField from '../components/SliceOptionsField';
import SwitchField from '../components/SwitchField';

const Form = ({ schema }) => {
    const [showAdvancedFields, setShowAdvancedFields] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSelectfield, setshowSelectfield] = useState(false)
    const [showSwitchtfield, setshowSwitchtfield] = useState(false)
    const [selected, setselected] = useState(false);
    useEffect(() => {
        setLoading(true);
        // Simulating an asynchronous operation, you can replace this with actual data fetching logic.
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [schema]);
    const [isRightToLeft, setIsRightToLeft] = useState(false);

    const handleToggleChange = () => {
        setIsRightToLeft(!isRightToLeft);
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
                {subParameter.label === 'Cheeseburst' || subParameter.label === 'Slices' || subParameter.label == 'Type' ? null : <label className={`block w-1/6 ${subParameter.validate.required ? 'text-red-500' : ''}`}>
                    {subParameter.label}
                    {subParameter.validate.required && <span className="ml-1 text-red-500">*</span>}
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
                return showSelectfield || field.label != 'Slices' ? <SelectField key={index} field={field} isRequired={isRequired} disabled={disabled} showAdvancedFields={showAdvancedFields} /> : '';
            case 'Switch':
                return showSwitchtfield || field.label != 'Cheeseburst' ? <SwitchField key={index} field={field} /> : '';
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
                        {subParameter.validate.required && <span className="ml-1 text-red-500">*</span>}
                    </label>
                    {renderField(subParameter, index, false)}
                    {subParameter.subParameters && renderSubParameters(subParameter.subParameters, level + 1)}
                </div>
            ));

        return (
            <div className="mb-4">
                <div className="flex space-x-4">
                    {subParameters.map((option) => (
                        <>

                        </>
                    )).slice(0, 2)}
                </div>

            </div>
        );
    };

    const handleClicks = (field) => {
        if (field.label === 'Naples Style Pizza') {
            setshowSelectfield(!showSelectfield);
            setselected(!selected)
        } else if (field.label === 'New York Style Pizza') {
            setshowSwitchtfield(!showSwitchtfield);
            setselected(!selected)
        }
    }
    const renderForm = (fields, disabled = false) =>
        fields
            .filter((field) => field.label !== 'Pizza_type Type') // Filter out specific field
            .map((field, index) => (
                <div key={index} className={`mb-8 `}>
                    <div className="flex">
                        {field.uiType !== 'Group' && (
                            <button
                                className={`text-lg font-semibold mb-2  ${field.label === 'Naples Style Pizza' || field.label === 'New York Style Pizza'
                                    ? 'bg-[#dfecfd] w-1/2 h-10 rounded-lg  '
                                    : ''
                                    }`}

                                onClick={() => handleClicks(field)}
                            >
                                {console.log(field.label)}
                                {field.label === 'Naples Style Pizza' || field.label === 'New York Style Pizza' ? field.label : null}
                            </button>
                        )}
                    </div>
                    {field.uiType === 'Group' && field.subParameters && renderForm(field.subParameters, disabled)}
                    {renderField(field, index, disabled)}
                </div>
            ));

    return (
        <div className="w-2/3 p-8 bg-[#fafcff] shadow-md">
            {loading && <p>Loading...</p>}
            {!loading && parsedSchema && renderForm(parsedSchema)}
            {!loading && parsedSchema ? <div className="flex justify-between items-center mt-8 space-x-4">
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" onChange={handleToggleChange}/>
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span class="ms-3 text-sm font-medium text-gray-900 ">Show Advance options</span>
                </label>
                <div className='flex justify-end mt-8 space-x-4'>
                    <button className="bg-gray-400 text-white px-6 py-3 rounded-md">Cancel</button>
                    <button className="bg-[#36383c] text-white px-6 py-3 rounded-md">Submit</button>
                </div>
            </div> : <div className='w-full h-full flex justify-center items-center'><h1 className='text-5xl'>Your Form will appear here</h1></div>
            }
        </div>
    );
};

export default Form;