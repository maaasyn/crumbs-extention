import { Layout } from "@/components/Layout";
import MainView from "@/components/MainView";
import { Settings } from "@/components/Settings";
import { Tabs } from "@/components/types";
import useAccount from "@/hooks/magmi/useAccount";
import useCurrentUrl from "@/hooks/useGetUrl";
import useSendMessage from "@/hooks/useSendMessage";
import { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
// QueryClientProvider,
// import { queryClientAtom } from "@/state/queryClient";
// import { useAtom } from "jotai/react";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryClient, persister } from "@/state/queryClient";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      <Content />
    </PersistQueryClientProvider>
  );
};

const Content = () => {
  const { isPending, sendMessage } = useSendMessage();
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
