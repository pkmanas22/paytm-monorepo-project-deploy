"use server"

import db from '@manaspaytm/db/client'

export async function getNumbersList(number: string): Promise<{ number: string; name: string }[]> {
    const numbersList = await db.user.findMany({
        where: {
            number: {
                contains: number
            }
        },
        select: {
            number: true,
            name: true,
        }
    })

    return numbersList.map((entry: { number: string; name: string | null; }) => ({
        number: entry.number,
        name: entry.name ? entry.name : '', // Ensuring name is always a string
    }));
}
