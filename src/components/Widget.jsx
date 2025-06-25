import { ImCross } from "react-icons/im";
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Widget = ({ widget, sectionIndex, data, setData }) => {
  const handleRemove = () => {
    const updated = [...data];
    updated[sectionIndex].widgets = updated[sectionIndex].widgets.filter(
      (w) => w.id !== widget.id
    );
    setData(updated);
    localStorage.setItem('widgetData', JSON.stringify(updated));
  };

  const showStaticChart =
    widget.name.toLowerCase().includes('risk') ||
    widget.name.toLowerCase().includes('account');

  const showCustomChart =
    widget.type === 'chart' && Array.isArray(widget.data) && widget.data.length > 0;

  const staticPieData = {
    labels: ['Passed', 'Failed', 'Warning', 'Not Available'],
    datasets: [
      {
        label: 'Results',
        data: [7263, 689, 581, 36],
        backgroundColor: ['#22C55E', '#EF4444', '#FACC15', '#9CA3AF'],
        borderWidth: 1,
      },
    ],
  };

  const customPieData = {
    labels: widget.labels || widget.data?.map((_, i) => `Slice ${i + 1}`),
    datasets: [
      {
        data: widget.data,
        backgroundColor: ['#22C55E', '#EF4444', '#FACC15', '#9CA3AF', '#3B82F6'],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
        labels: {
          boxWidth: 12,
          font: {
            size: 10,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm p-4 border border-gray-200 h-[180px]">
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
      >
        <ImCross className="mr-2 mt-1"/>
      </button>

      <h3 className="text-sm font-semibold mb-2">{widget.name}</h3>

      {(showStaticChart || showCustomChart) ? (
        <div className="flex items-center justify-between h-[120px] overflow-hidden">
          <div className="w-[100px] h-[100px]">
            <Doughnut
              data={showCustomChart ? customPieData : staticPieData}
              options={pieOptions}
            />
          </div>
          <ul className="text-xs space-y-1 pl-4">
            {(showCustomChart ? widget.data : staticPieData.datasets[0].data).map(
              (val, idx) => (
                <li key={idx}>
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{
                      backgroundColor: (
                        showCustomChart
                          ? customPieData.datasets[0].backgroundColor
                          : staticPieData.datasets[0].backgroundColor
                      )[idx % 5],
                    }}
                  ></span>
                  {(showCustomChart
                    ? customPieData.labels[idx]
                    : staticPieData.labels[idx])} ({val})
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p className="text-xs whitespace-pre-line text-gray-600">{widget.text}</p>
      )}
    </div>
  );
};

export default Widget;
