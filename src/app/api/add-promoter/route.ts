/* eslint-disable camelcase */
import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request){
    const { agent, first_name, last_name, email, } = await request.json()
    
    await client.execute(`INSERT INTO PROMOTERS (agent, first_name, last_name, email) VALUES ("${agent}", "${first_name}", "${last_name}", "${email}")`);

    return NextResponse.json("success");

}