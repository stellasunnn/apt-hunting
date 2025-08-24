import { drizzle } from 'drizzle-orm/neon-http';
import { aptAvailability } from './schema';
import { env } from "cloudflare:workers";
import { eq, desc} from 'drizzle-orm';

const db = drizzle(env.PSQL);

export async function saveCurrentAvailability(apt_name, apt_code, current_availability){
    await db.insert(aptAvailability).values({ 
        name: apt_name, 
        apt_code: apt_code,
        current_availability: current_availability
    });
}

export async function getLatestAvailability(apt_code){
    return (await db.select()
    .from(aptAvailability)
    .where(eq(aptAvailability.apt_code, apt_code))
    .orderBy(desc(aptAvailability.timestamp))
    .limit(1))[0];
}
