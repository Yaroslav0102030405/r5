import React, { useState } from "react";
import Tab from "./Tab";
import "./Tabs.css";

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const Tabs = ({ tabs }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container">
      <div className="tab-buttons-container">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            isActive={index === activeTab}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
      <div className="tab-content-container">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
