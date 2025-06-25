import React, { useState } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('widgetData');
    return saved
      ? JSON.parse(saved)
      : [
          { category: 'CSPM', widgets: [] },
          { category: 'CWPP', widgets: [] },
          { category: 'Image', widgets: [] },
          { category: 'Ticket', widgets: [] },
        ];
  });

  return <Dashboard data={data} setData={setData} />;
};

export default App;
