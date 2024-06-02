import { Layout } from "@/components/Layout";
import MainView from "@/components/MainView";
import { Settings } from "@/components/Settings";
import { Tabs } from "@/components/types";
import useAccount from "@/hooks/useAccount";
import useCurrentUrl from "@/hooks/useGetUrl";
import useSendMessage from "@/hooks/useSendMessage";
import { useState } from "react";

const App = () => {
  const { isPending, sendMessage, tx } = useSendMessage();
  const url = useCurrentUrl();

  const handleSubmit = async (input: string) => {
    console.log({ url });
    console.log({ input });
    sendMessage({ messageContent: input, url: url! });
  };

  const { userAddress, handleConnectWalletClick } = useAccount();

  const [tab, setTab] = useState(Tabs.CHAT);

  switch (tab) {
    case Tabs.CHAT:
      return (
        <Layout>
          <MainView
            currentTab={tab}
            setTab={setTab}
            userAddress={userAddress}
            handleSubmit={handleSubmit}
          />
        </Layout>
      );
    case Tabs.SETTINGS:
      return (
        <Layout>
          <Settings
            userAddress={userAddress}
            currentTab={tab}
            setTab={setTab}
            handleConnectWalletClick={handleConnectWalletClick}
          />
        </Layout>
      );
    default:
      return <div>Chat</div>;
  }
};

export default App;
