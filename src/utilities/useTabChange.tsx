import { createContext, useContext, useState, ReactNode } from "react";

type TabContextType = {
  activeTab: string;
  isContentPanelOpen: boolean;
  handleTabChange: (tabId: string) => void;
  setIsContentPanelOpen: (v: boolean) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabProviderProps {
  children: ReactNode;
}

export function TabProvider({ children }: TabProviderProps) {
  const [activeTab, setActiveTab] = useState("blocks");
  const [isContentPanelOpen, setIsContentPanelOpen] = useState(true);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsContentPanelOpen(true);
  };

  return (
    <TabContext.Provider
      value={{
        activeTab,
        isContentPanelOpen,
        handleTabChange,
        setIsContentPanelOpen,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useContentPanel() {
  const context = useContext(TabContext);
  
  if (context === undefined) {
    throw new Error("useContentPanel must be used within a TabProvider");
  }
  
  return context;
}