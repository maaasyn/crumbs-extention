import { Body } from "@/components/Body";
import { Header } from "@/components/Header";
import { Tabs } from "@/components/types";
import { urlAccountMapAtom } from "@/state/url-to-account";
import { useAtom } from "jotai";

type SettingsProps = {
  handleConnectWalletClick: () => void;
  setTab: (tab: Tabs) => void;
  currentTab: Tabs;
  userAddress: string | null;
};

export const Settings = ({
  handleConnectWalletClick,
  setTab,
  currentTab,
  userAddress,
}: SettingsProps) => {
  const [urlToAccount] = useAtom(urlAccountMapAtom);
  return (
    <div className="bg-white rounded-lg max-w-2xl min-w-60">
      <Header currentTab={currentTab} setTab={setTab} />
      <Body>
        <div className="flex flex-col gap-2 break-words">
          <div className="px-4">
            <p className="text-sm font-bold">Account:</p>
            <p className="text-sm">{userAddress}</p>
          </div>

          {/* url to account map */}
          <div className="px-4">
            <p className="text-sm font-bold">URL to Account:</p>

            <details>
              <summary>Json</summary>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(urlToAccount, null, 2)}
              </pre>
            </details>
          </div>

          <button
            className="ml-2 bg-white hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]"
            onClick={() => setTab(Tabs.CHAT)}>
            Return
          </button>

          <button
            className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]"
            onClick={handleConnectWalletClick}>
            Connect Wallet
          </button>
        </div>
      </Body>
    </div>
  );
};
