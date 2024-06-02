import { Message } from "@/components/types";

const getAddressShort = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
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

      <div className="flex flex-col">
        <span className="text-xs font-medium" title={message.address}>
          {getAddressShort(message.address)}
        </span>
        <p
          className={`p-2 rounded border-black border-2 shadow-[2px_2px] break-all ${
            isUser ? "bg-amber-200" : "bg-gray-200"
          }`}>
          {message.text}
        </p>
      </div>
    </div>
  );
};
