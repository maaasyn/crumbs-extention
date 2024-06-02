// export enum HashFunctionType {
//   KECCAK = "KECCAK",
// }

const HARD_CODED_URL = null;

export const getOffChainClient = () => {
  const setHashValue = async (input: { hash: string; value: string }) => {
    /**
     * POST http://localhost:3000/api/hasher
     * BODY
     * {
     *   "0x2b06196afaaf044c3e6b6deba3711a1080ef87319848cb511de0bd81bccbc488": "i was blind, now i can see"
     * }
     * RESPONSE
     * 0x2b06196afaaf044c3e6b6deba3711a1080ef87319848cb511de0bd81bccbc488
     */

    const url = HARD_CODED_URL ?? "http://localhost:3000/api/hasher";
    const reqType = "POST";
    const body = JSON.stringify({ [input.hash]: input.value });

    const response = await fetch(url, {
      method: reqType,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.text();
  };
  const getHashValue = async (hash: string) => {
    // http://localhost:3000/api/hasher?hash=0x2b06196afaaf044c3e6b6deba3711a1080ef87319848cb511de0bd81bccbc488

    const url =
      HARD_CODED_URL ?? `http://localhost:3000/api/hasher?hash=${hash}`;
    const reqType = "GET";

    const response = await fetch(url, {
      method: reqType,
    });

    // resonsole is outputed by the server in body as so, no wrap in object

    return response.text();
  };

  return { getHashValue, setHashValue };
};
