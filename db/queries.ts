import { cache} from "react"

import db from "@/db/drizzle"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm";
import { challengeProgress, challenges, courses, units, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    })

    return data;
})

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
})

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();

    if(!userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lesson: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: true,
                        },
                    },
                },
            },
        },   
    });

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lesson.map((lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenges) => {
                return challenges.challengeProgress && challenges.challengeProgress.length > 0
                && challenges.challengeProgress.every((progress) => progress.completed);
            })

            return {...lesson, completed: allCompletedChallenges}
        })

        return { ...unit, lessons: lessonsWithCompletedStatus}
    })

    return normalizedData;
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        //TOODOADO
    })

    return data;
})