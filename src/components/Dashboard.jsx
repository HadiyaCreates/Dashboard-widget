import React, { useState, useEffect } from "react";
import Section from "./Section";
import AddWidgetDrawer from "./AddWidgetDrawer";
import Navbar from "./Navbar";

const widgetsByTab = {
  CSPM: ["Cloud Accounts", "Cloud Account Risk Assessment"],
  CWPP: ["Top 5 Namespace Specific Alerts", "Workload Alerts"],
  Image: ["Image Risk Assessment", "Image Security Issues"],
  Ticket: ["Jira Tickets", "PagerDuty Alerts"],
};

const Dashboard = ({ data, setData }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");

  //  Load from localStorage on first render (optional)
  useEffect(() => {
    const saved = localStorage.getItem("widgetData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, [setData]);

  // This runs when drawer "Confirm" is clicked
  const handleSave = (updatedWidgets, tab) => {
    const updated = [...data];
    const sectionIndex = updated.findIndex((s) => s.category === tab);
    if (sectionIndex >= 0) {
      updated[sectionIndex].widgets = updatedWidgets;
      setData(updated);
      localStorage.setItem("widgetData", JSON.stringify(updated)); // persist to localStorage
    }
  };

  return (
    <>
      {/* Top Navbar with search and Add Widget button */}
      <Navbar
        search={search}
        setSearch={setSearch}
        onAddWidget={() => setDrawerOpen(true)}
      />

      {/* Sections */}
      <div className="p-6 space-y-10 bg-[#F6F8FB] min-h-screen">
        {data.map((section, index) => (
          <Section
            key={index}
            title={section.category}
            widgets={section.widgets}
            index={index}
            data={data}
            setData={setData}
            search={search}
          />
        ))}
      </div>

      {/* Drawer to add/remove widgets per category */}
      {drawerOpen && (
        <AddWidgetDrawer
          closeDrawer={() => setDrawerOpen(false)}
          widgetsByTab={widgetsByTab}
          data={data}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default Dashboard;
