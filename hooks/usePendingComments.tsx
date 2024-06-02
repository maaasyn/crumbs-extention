import { PendingComment, pendingCommentsAtom } from "@/state/pending-comments";
import { useAtom } from "jotai";

export const usePendingComments = () => {
  const [pendingComments, setPendingComments] = useAtom(pendingCommentsAtom);

  const addPendingComment = (pendingComment: PendingComment) => {
    setPendingComments((cmds) => [...cmds, pendingComment]);
  };

  // check whether a comment tx is still pending on chain
  const checkPendingComment = async (txHash: string) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const tx = await provider.getTransaction(txHash);
    // return tx === null;
    return true;
  };
};

export default usePendingComments;
