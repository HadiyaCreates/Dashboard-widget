import { RxCross2 } from "react-icons/rx";

import React, { useState } from "react";

const AddWidget = ({ closeModal, sectionIndex, data, setData }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("text");
  const [chartRows, setChartRows] = useState([{ label: "", value: "" }]);

  const handleAdd = () => {
    if (!name || (type === "text" && !text)) return;

    let parsedLabels = [];
    let parsedData = [];

    if (type === "chart") {
      chartRows.forEach((row) => {
        if (row.label && !isNaN(row.value)) {
          parsedLabels.push(row.label.trim());
          parsedData.push(parseFloat(row.value));
        }
      });
    }

    const newWidget = {
      id: Date.now(),
      name,
      text: type === "chart" ? "" : text,
      type,
      labels: parsedLabels,
      data: parsedData,
    };

    const updated = [...data];
    updated[sectionIndex].widgets.push(newWidget);
    setData(updated);
    localStorage.setItem("widgetData", JSON.stringify(updated));
    closeModal();
  };

  const handleChartChange = (index, field, value) => {
    const updated = [...chartRows];
    updated[index][field] = value;
    setChartRows(updated);
  };

  const addChartRow = () => {
    setChartRows([...chartRows, { label: "", value: "" }]);
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={closeModal}
      ></div>

      {/* Drawer */}
      <div className="relative w-[400px] h-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-[#1E2B74] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-md font-semibold leading-tight">
            Add Widget to Section
          </h2>
          <button onClick={closeModal} className="text-white text-xl ">
            <RxCross2 />
          </button>
        </div>

        {/* Widget Type Tabs */}
        <div className="px-6 pt-4 flex gap-4 border-b">
          {["text", "chart"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`text-sm pb-2 capitalize ${
                type === t
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {t} Widget
            </button>
          ))}
        </div>

        {/* Form Inputs */}
        <div className="px-6 py-4 space-y-4 flex-1 overflow-auto">
          {/* Widget Name */}
          <input
            placeholder="Widget Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full text-sm"
          />

          {/* Text Widget Input */}
          {type === "text" && (
            <textarea
              placeholder="Enter content"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded w-full h-24 text-sm"
            />
          )}

          {/* Chart Widget Input */}
          {type === "chart" && (
            <>
              {chartRows.map((row, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Label"
                    value={row.label}
                    onChange={(e) =>
                      handleChartChange(idx, "label", e.target.value)
                    }
                    className="flex-1 border border-gray-300 px-2 py-1 rounded text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Value"
                    value={row.value}
                    onChange={(e) =>
                      handleChartChange(idx, "value", e.target.value)
                    }
                    className="w-[80px] border border-gray-300 px-2 py-1 rounded text-sm"
                  />
                </div>
              ))}
              <button
                onClick={addChartRow}
                className="text-blue-600 text-sm mt-2 hover:underline"
              >
                + Add Row
              </button>
            </>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <button
            onClick={closeModal}
            className="border px-4 py-1 rounded text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidget;
