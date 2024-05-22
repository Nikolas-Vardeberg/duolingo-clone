import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!); 
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Nettvett Regler",
        imageSrc: "/mascot.svg",
      },
      {
        id: 2,
        title: "Cookies",
        imageSrc: "/woman.svg",
      },
      {
        id: 3,
        title: "Trygg Vaner",
        imageSrc: "/robot.svg",
      },
      {
        id: 4,
        title: "VPN",
        imageSrc: "/man.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, 
        title: "Unit 1",
        description: "Learn the basics of Nettikett",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 4,
        title: "Verbs",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basics...)
        order: 5,
        title: "Verbs",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: '"Hva bør du gjøre for å sikre brukerkontoer?"',
      },
      {
        id: 2,
        lessonId: 1, // Nouns
        type: "ASSIST",
        order: 2,
        question: '"Hvordan bør du håndtere e-poster for å unngå svindel?"',
      },
      {
        id: 3,
        lessonId: 1, // Nouns
        type: "SELECT",
        order: 3,
        question: 'Hva er en god praksis for å beskytte filer?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Which one of these is "the man"?
        imageSrc: "/man.svg",
        correct: false,
        text: "Samme passord",
        audioSrc: "/feilurl.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: true,
        text: "2-trinns bekreftelse",
        audioSrc: "/svf.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "Post-it-lapper",
        audioSrc: "/dbi.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2, // "the man"?
        correct: false,
        text: "Klikke på alle lenker",
        audioSrc: "/http.mp3",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Legge inn personopplysninger",
        audioSrc: "/smpt.mp3",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Vurdere avsenderen",
        audioSrc: "/ftpp.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Which one of these is the "the robot"?
        imageSrc: "/man.svg",
        correct: false,
        text: "Sikkerhetskopiere sjelden",
        audioSrc: "/brannmur.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: true,
        text: "Sikkerhetskopiere jevnlig",
        audioSrc: "/antivirus.mp3",
      },
      {
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: false,
        text: "Aldri oppdatere kopier",
        audioSrc: "/malware.mp3",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 5,
        lessonId: 2, // Verbs
        type: "ASSIST",
        order: 2,
        question: '"Hvilket nettverksprotokoll brukes vanligvis for å sende e-post?"',
      },
      {
        id: 6,
        lessonId: 2, // Verbs
        type: "SELECT",
        order: 3,
        question: 'Hva er en vanlig beskyttelse mot nettbaserte angrep?',
      },
    ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();