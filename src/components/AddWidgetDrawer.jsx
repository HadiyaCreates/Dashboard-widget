import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const AddWidgetDrawer = ({ closeDrawer, data, onSave }) => {
  const [selectedTab, setSelectedTab] = useState("CSPM");
  const [selectedWidgets, setSelectedWidgets] = useState({});

  // Load only existing widgets from section
  useEffect(() => {
    const section = data.find((s) => s.category === selectedTab);
    const checked = {};

    section?.widgets.forEach((w) => {
      checked[w.name] = true; // all shown widgets will be checked by default
    });

    setSelectedWidgets(checked);
  }, [selectedTab, data]);

  const handleToggle = (widgetName) => {
    setSelectedWidgets((prev) => ({
      ...prev,
      [widgetName]: !prev[widgetName],
    }));
  };

  const handleConfirm = () => {
    const checkedNames = Object.keys(selectedWidgets).filter(
      (key) => selectedWidgets[key]
    );

    const currentSection = data.find((s) => s.category === selectedTab);
    const existingWidgets = currentSection?.widgets || [];

    // Build new list using preserved data
    const updatedWidgets = checkedNames.map((name) => {
      const existing = existingWidgets.find((w) => w.name === name);
      if (existing) return existing;

      // fallback (shouldn’t hit often)
      const isChart =
        name.toLowerCase().includes("risk") ||
        name.toLowerCase().includes("account");
      return {
        id: Date.now() + Math.random(),
        name,
        text: isChart ? "" : "Custom Widget Content",
        type: isChart ? "chart" : "text",
        data: isChart ? [25, 35, 40] : [],
      };
    });

    onSave(updatedWidgets, selectedTab);
    closeDrawer();
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={closeDrawer}
      ></div>

      <div className="relative w-[400px] h-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-[#1E2B74] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-md font-semibold leading-tight">
            Remove existing widgets
          </h2>
          <button onClick={closeDrawer} className="text-white text-xl">
            <RxCross2 />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pt-4 flex gap-4 border-b">
          {data.map((section) => (
            <button
              key={section.category}
              onClick={() => setSelectedTab(section.category)}
              className={`text-sm pb-2 ${
                selectedTab === section.category
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>

        {/* Existing Widgets */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {Object.keys(selectedWidgets).length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              No widgets present in this section
            </p>
          ) : (
            Object.keys(selectedWidgets).map((widgetName, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 mb-3 cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedWidgets[widgetName]}
                  onChange={() => handleToggle(widgetName)}
                />
                {widgetName}
              </label>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={closeDrawer}
            className="border px-4 py-1 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetDrawer;
