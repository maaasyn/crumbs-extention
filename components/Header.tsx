import { Tabs } from "@/components/types";
import { FC, useEffect, useState } from "react";

type HeaderProps = {
  setTab: (tab: Tabs) => void;
  currentTab: Tabs;
};

export const Header = ({ setTab, currentTab }: HeaderProps) => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setCurrentUrl(tabs[0].url || "");
    });
  }, []);
  return (
    <header className="p-4 flex flex-col items-start border-b-4 border-black bg-purple-200">
      <div className="w-full flex justify-between items-center mb-2">
        {currentTab === Tabs.CHAT && <ChatHeader setTab={setTab} />}
        {currentTab === Tabs.SETTINGS && <SettingsHeader setTab={setTab} />}
      </div>
      <input
        type="text"
        readOnly
        value={currentUrl}
        className="text-sm w-full text-left bg-stone-200 rounded px-2 py-1 overflow-auto max-w-full border-black border-2 shadow-[2px_2px]"
      />
    </header>
  );
};

const ChatHeader: FC<{ setTab: (tab: Tabs) => void }> = ({ setTab }) => {
  return (
    <>
      <select>
        <option>sepolia</option>
      </select>
      {/* <button className="text-sm">Chain</button> */}
      <h1 className="text-2xl font-bold">Crumbs</h1>
      <button onClick={() => setTab(Tabs.SETTINGS)} className="text-sm">
        Settings
      </button>
    </>
  );
};

const SettingsHeader: FC<{ setTab: (tab: Tabs) => void }> = ({ setTab }) => {
  return (
    <>
      <button onClick={() => setTab(Tabs.CHAT)} className="text-sm">
        {"< "}Chat
      </button>
      <h1 className="text-2xl font-bold">Settings</h1>
      <button className="text-sm">Wallet</button>
    </>
  );
};
