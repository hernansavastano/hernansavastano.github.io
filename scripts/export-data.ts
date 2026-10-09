// Writes the site's track and gallery data (defined in server/storage.ts)
// to static JSON files so the site can be hosted without a server.
import { mkdirSync, writeFileSync } from "fs";
import { storage } from "../data/storage";

const out = "client/public/api";
mkdirSync(out, { recursive: true });
const write = (name: string, data: unknown) =>
  writeFileSync(`${out}/${name}.json`, JSON.stringify(data, null, 2));

write("tracks", await storage.getTracks());
write("ep-tracks", await storage.getEpTracks());
write("gallery", await storage.getGalleryImages());
console.log("Exported static data to", out);
