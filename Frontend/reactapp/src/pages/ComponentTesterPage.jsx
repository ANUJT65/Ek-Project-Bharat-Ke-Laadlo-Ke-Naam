// src/pages/Comptest.jsx
import React, { useState } from 'react';

const components = import.meta.glob('/src/components/**/*.jsx', { eager: true });

const ComponentTesterPage = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Extract component names and components
  const componentList = Object.entries(components).map(([path, component]) => {
    const name = path.split('/').pop().replace('.jsx', '');
    return { name, component: component.default };
  });

  return (
    <div className='flex flex-col'>
      <h1>Component Tester</h1>
      <select
        onChange={(e) => setSelectedComponent(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>Select a component</option>
        {componentList.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <div style={{ marginTop: '20px' }}>
        {selectedComponent && (
          <div>
            <h2>Now showing: {selectedComponent}</h2>
            {React.createElement(
              componentList.find(({ name }) => name === selectedComponent).component
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentTesterPage;
