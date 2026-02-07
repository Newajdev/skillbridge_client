import { env } from "@/env";
import { cookies } from "next/headers";
const API_URL = env.API_URL;

export const userService = {

    getSesion: async function(){
        try{
            const cookieStore = await cookies();

          const res = await fetch(`${API_URL}/auth/get-session`, {
            headers: {
              cookie: cookieStore.toString(),
            },
            cache: "no-store",
          });
        
          const sesion = await res.json();

          if(sesion === null){
            return {data: null, erro:{message: "No session found"}}
          }
        
          return {data: sesion, error: null};
        }catch(err){
            console.log("Error fetching session:", err)
            return {data: null, erro:{message:"Something went wrong while fetching session"}}
        }
    }

}