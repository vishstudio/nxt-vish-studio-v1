import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'effdd5b419c83677e081c08c90c3a1dee3d7b399', queries,  });
export default client;
  