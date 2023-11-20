SCHEMA FORM PREVIWER

Welcome to SchemaForm Previewer! This React application allows users to generate dynamic forms based on a provided UI schema. Users can paste a UI schema on the left side, and the rendered form will be previewed on the right-hand side.

OVERVIEW
This project enables the rendering of forms from a specific JSON-based UI schema format. The UI schema is structured to define various form elements, their validations, nesting, conditional display, and more.

UI-SCHEMA FORMAT
The UI-Schema is a JSON array containing objects with specific keys to define form elements. Here are some key elements of the UI-Schema:

Text Input Field-

sort:     Defines the sequence of sections.
label:    Holds the section label value.
validate: Contains validation rules (e.g., required, immutable).
jsonKey:  Unique key used to send data to the backend.
uiType:   Defines the element type (e.g., Input, Number, Group, Select, Switch).

Group Field-
sort:          Sequencing for the sections.
uiType:        Indicates a group of fields.
subParameters: Contains nested fields within the group.

Radio Field-
sort:   Determines the order within its group.
uiType: Displays as tabs with values specified in options.

Show/Hide Fields on Tab Click-
uiType:     Marked as "Ignore" for fields to be displayed conditionally based on tab selection.
conditions: Specifies conditions for enabling/disabling the field based on the selected tab.

Select Field-
level:   Specifies nesting levels.
uiType:  Utilized for dropdown menus.
options: Defines the dropdown options.

Usage-
Paste UI Schema: Copy and paste the UI schema into the JSON editor on the left section.
Preview Form: Observe the live preview of the rendered form on the right side based on the pasted UI schema.
Toggle Advanced Fields: Show/hide advanced fields based on the toggle button.
Form Submission: Upon "Submit", the application generates the JSON data to be sent to the backend, filtering out data from unselected tabs.

SETUP
1. Clone this repository.
2. Install dependencies using npm install.
3. Run the application using npm start.
   
Technologies Used
React
JSON Editor Library (mention if any specific library/tool used for the JSON editor)
Additional libraries or tools for rendering the form

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
