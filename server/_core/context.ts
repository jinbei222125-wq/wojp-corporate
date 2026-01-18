import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { sdk } from "./sdk";
import { ENV } from "./env";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

// Development mode: create a mock admin user for easy access
function createDevAdminUser(): User {
  return {
    id: 1,
    openId: "dev-admin",
    name: "開発用管理者",
    email: "dev@example.com",
    loginMethod: "dev",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
}

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  // Development mode: allow bypassing auth with ?devAdmin=true query param
  if (!ENV.isProduction) {
    const devAdmin = opts.req.query?.devAdmin === "true" || opts.req.headers["x-dev-admin"] === "true";
    if (devAdmin) {
      user = createDevAdminUser();
      return {
        req: opts.req,
        res: opts.res,
        user,
      };
    }
  }

  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    // Authentication is optional for public procedures.
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
