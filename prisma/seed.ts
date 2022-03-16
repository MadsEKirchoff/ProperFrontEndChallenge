import {PrismaClient} from "@prisma/client";

const db = new PrismaClient();

async function seed() {
    await Promise.all(
        seedTenancies().map((tenancy) => {
            return db.tenancy.create({data: tenancy});
        })
    );
}

seed();

function seedTenancies() {
    return [
        {
            address: "Bogholder Allé 1, 2720 Vanløse",
            size: "78",
            rooms: "2",
            description: "Decent beginner apartment.",
        },
        {
            address: "Somewhere, over the rainbow 5",
            size: "185",
            rooms: "6",
            description: "The sun will shine.",
        },
    ]
}