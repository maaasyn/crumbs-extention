import { Message } from "@/components/types";
import { getLongHexShorter } from "@/utils/getLongHexShorter";

export const SingleMessage = ({
  idx,
  message,
  messages,
  userAddress,
}: {
  messages: Message[];
  userAddress: string | null;
  message: Message;
  idx: number;
}) => {
  const isUser = message.address === userAddress;
  return (
    <div
      key={`${message.address}-${message.text}-${idx}`}
      className={`flex items-center mb-2 last:mb-0 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}>
      {shouldShowAvatar(message, messages[idx + 1]) && (
        <div
          style={{ backgroundImage: generateGradient(message.address) }}
          className={`w-5 h-5 rounded-full flex-shrink-0 self-end ${
            isUser ? "ml-1" : "mr-1"
          }`}></div>
      )}

      {!shouldShowAvatar(message, messages[idx + 1]) && (
        <div
          className={`w-5 h-5 rounded-full flex-shrink-0 self-end ${
            isUser ? "ml-1" : "mr-1"
          }`}></div>
      )}

      <div className="flex flex-col relative">
        <div className="flex gap-1">
          <span
            className="text-xs font-mediu hover:underline"
            title={message.address}>
            <a
              href={`${message.fromChain.blockExplorers.default.url}/address/${message.address}`}
              target="_blank"
              rel="noopener noreferrer">
              {getLongHexShorter(message.address)}
            </a>
          </span>
          <button
            type="button"
            title="Copy address to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(message.address);
            }}>
            📑
          </button>
        </div>
        <div
          className={`p-2 rounded border-black border-2 shadow-[2px_2px] break-all ${
            isUser ? "bg-amber-200" : "bg-gray-200 gap-2 flex"
          }`}>
          <span>{message.text}</span>
        </div>
        <span
          className="text-xs text-gray-500 text-right mt-0.5"
          suppressHydrationWarning={true}
          title={formatDate(message.timestamp)}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleString(); // Format as a string
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const generateGradient = (address: string) => {
  const hash = address.slice(2, 10); // Take part of the address to seed the gradient
  const colors = hash.match(/.{1,2}/g)?.map((value) => parseInt(value, 16));
  const gradient = `linear-gradient(to right, rgba(${colors?.[0]}, ${colors?.[1]}, ${colors?.[2]}, 0.7), rgba(${colors?.[3]}, ${colors?.[0]}, ${colors?.[1]}, 0.7))`;
  return gradient;
};

const shouldShowAvatar = (
  currentMessage: Message,
  nextMessage: Message | undefined
) => {
  return !nextMessage || nextMessage.address !== currentMessage.address;
};
