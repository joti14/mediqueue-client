import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("CRITICAL ERROR: MONGODB_URI is not defined in environment variables!");
}

const client = new MongoClient(mongoUri || "mongodb://localhost:27017");
const db = client.db("mediqueuedb");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_SECRET, 
        }, 
    },
    session: {
      cookieCache: {
        enabled: true,
        strategy: "jwt",
        // max days
        maxAge: 10 * 24 * 60 * 60
      }
    },
    plugins: [
      jwt(),
    ]
});