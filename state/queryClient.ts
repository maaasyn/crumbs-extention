import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { atomWithStorage } from "jotai/utils";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// const queryClient = new QueryClient();

// export const queryClientAtom = atomWithStorage<QueryClient>(
//   "queryClient",
//   queryClient
// );

export const queryClient = new QueryClient();

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
