import React, { useState } from 'react';
import WidgetCard from './Widget';
import AddWidgetModal from './AddWidget';

const Section = ({ title, widgets, index, data, setData, search }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Filter widgets based on search
  const filteredWidgets = widgets.filter((widget) =>
    widget.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-[14px] font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredWidgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            data={data}
            setData={setData}
            widget={widget}
            sectionIndex={index}
          />
        ))}

        {/* + Add Widget Button */}
        <div
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center h-[180px] bg-white rounded-lg border border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition"
        >
          <span className="text-sm font-medium text-gray-500">+ Add Widget</span>
        </div>
      </div>

      {/* Drawer Modal */}
      {modalOpen && (
        <AddWidgetModal
          closeModal={() => setModalOpen(false)}
          sectionIndex={index}
          setData={setData}
          data={data}
        />
      )}
    </div>
  );
};

export default Section;
