import { Body } from "@/components/Body";
import { SingleMessage } from "@/components/SingeMessage";
import { Tabs } from "@/components/types";
import React, { useEffect, useRef } from "react";
import { useGetMessages } from "../hooks/useGetMessages";
import { Header } from "./Header";
import { usePendingComments } from "@/hooks/usePendingComments";
import useCurrentUrl from "@/hooks/useGetUrl";
import useAccount from "@/hooks/magmi/useAccount";
import SinglePendingComment from "@/components/SinglePendingComment";

export const Chat = ({
  userAddress,
  handleSubmit,
}: {
  userAddress: string | null;
  handleSubmit: (input: string) => void;
}) => {
  const { messages, isLoading, refresh } = useGetMessages();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [inputValue, setInputValue] = React.useState("");

  const currentUrl = useCurrentUrl();
  const { pendingComments } = usePendingComments(currentUrl);

  const { isConnected, handleConnectWalletClick } = useAccount();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const { isConnected } = useAccount();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Body>
        {isLoading && <div className="text-center p-4">Loading...</div>}
        {!isLoading && messages.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No messages yet. Be the first to send a message!
          </div>
        )}
        {messages.map((message, idx) => (
          <SingleMessage
            key={`${message.address}-${message.text}-${idx}-${Math.random()}`}
            idx={idx}
            message={message}
            messages={messages}
            userAddress={userAddress}
          />
        ))}
        {pendingComments.map((comment) => (
          <SinglePendingComment key={comment.internalId} comment={comment} />
        ))}
        <div ref={messagesEndRef} />
      </Body>
      <form
        className="flex p-2 border-black border-t-2 bg-purple-200 gap-1"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(inputValue);
          setInputValue("");
        }}>
        {isConnected ? (
          <>
            <textarea
              placeholder="Type your message here..."
              className="border-black border-2 shadow-[2px_2px] p-2 rounded flex-1"
              value={inputValue}
              rows={1}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]">
              Send
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1 w-full">
              <div className="text-center">
                To send a message, connect your wallet.
              </div>
              <button
                type="button"
                className="ml-2 bg-amber-500 hover:bg-amber-700 font-bold py-2 px-4 rounded border-black border-2 shadow-[2px_2px]"
                onClick={handleConnectWalletClick}>
                Connect Wallet
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

type MainViewProps = {
  userAddress: string | null;
  currentTab: Tabs;
  handleSubmit: (input: string) => void;
  setTab: (tab: Tabs) => void;
};

const MainView: React.FC<MainViewProps> = ({
  userAddress,
  setTab,
  currentTab: tab,
  handleSubmit,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg max-w-2xl min-w-60">
      <Header currentTab={tab} setTab={setTab} />
      <Chat handleSubmit={handleSubmit} userAddress={userAddress} />
    </div>
  );
};

export default MainView;
