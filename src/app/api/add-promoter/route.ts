/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import { createClient } from "@libsql/client";
import { NextResponse } from "next/server";
import { Schema } from '@/components/BookingForm';

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

console.log(process.env.DATABASE_URL)
 
// eslint-disable-next-line import/prefer-default-export
export async function POST(request: Request){
    const formData:Schema = await request.json()
    
    try{
    
        await client.execute(`INSERT INTO PROMOTERS (agent, first_name, last_name, email) VALUES ("${formData.agent}", "${formData.first_name}", "${formData.last_name}", "${formData.email}")`);

        return NextResponse.json("success");
    }
    catch(error) {
        return NextResponse.json({ error });
    }
    

}