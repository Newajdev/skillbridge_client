import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
    server: {
        NEXT_BASEURL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_API_URL: z.string().url(),
        NEXT_PUBLIC_AUTH_URL: z.string().url(),
    },
    runtimeEnv: {
        NEXT_BASEURL: process.env.NEXT_BASEURL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    },
});
