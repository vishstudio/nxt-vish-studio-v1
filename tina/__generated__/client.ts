import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'f5f35bd82079027d29d4de729e9fa928ba95c103', queries,  });
export default client;
  