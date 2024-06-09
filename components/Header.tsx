import { Tabs } from "@/components/types";
import { useGetMessages } from "@/hooks/useGetMessages";
import useCurrentUrl from "@/hooks/useGetUrl";
import { FC, useEffect, useState } from "react";

type HeaderProps = {
  setTab: (tab: Tabs) => void;
  currentTab: Tabs;
};

export const Header = ({ setTab, currentTab }: HeaderProps) => {
  const currentUrl = useCurrentUrl();
  const { refresh } = useGetMessages();

  return (
    <header className="p-4 flex flex-col items-start border-b-4 border-black bg-purple-200">
      <div className="w-full flex justify-between items-center mb-2">
        {currentTab === Tabs.CHAT && <ChatHeader setTab={setTab} />}
        {currentTab === Tabs.SETTINGS && <SettingsHeader setTab={setTab} />}
      </div>
      <div className="flex flex-row gap-2 w-full">
        <input
          type="text"
          readOnly
          value={currentUrl || ""}
          className="text-sm w-full text-left bg-stone-200 rounded px-2 py-1 overflow-auto max-w-full border-black border-2 shadow-[2px_2px]"
        />

        <button
          type="button"
          className="bg-amber-500 px-0.5 text-xl hover:bg-amber-700 font-bold rounded border-black border-2 shadow-[2px_2px]"
          onClick={() => refresh()}>
          ↻
        </button>
      </div>
    </header>
  );
};

const ChatHeader: FC<{ setTab: (tab: Tabs) => void }> = ({ setTab }) => {
  return (
    <>
      <select>
        <option>sepolia</option>
      </select>
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
