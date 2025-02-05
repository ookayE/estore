Working with layout
Creating constants: /lib/constants/index.ts.
Check public app name from .env first - if not, default to what's written
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'EStore'

Using a constants file to house reusable code throughout application -- define sensitive variables in .env file, create variables in constants file reference .env file, then import those constant variables throughout app.

ex.
.env:
APP_NAME=my app

@lib/constants/index.ts:
export const APP_NAME = process.env.APP_NAME

using Neon (serverless Postgres database)
using Prisma (ORM)

npx prisma studio to use Prisma Studio in browser to view database

---

To migrate sampleData from local file to database. Created seed.ts file in ./db and main() function to popualte data

async function main() {
const prisma = new PrismaClient();
await prisma.product.deleteMany();

await prisma.product.createMany({ data: sampleData.products });

console.log("Database seeded successfully");
}

main();

To actually fetch data from db instead of sampleData.ts, use server action:

export async function getLatestProducts()
const prisma = new PrismaClient();

const data = await prisma.product.findMany({
take: LATEST_PRODUCTS_LIMIT, //sets limit on how many we get back
orderBy: { createdAt: "desc" },
});

then import action into home page (where we're fetching data) and create variable to store products:
const latestProducts = await getLatestProducts();

then pass latestProducts into component rendering them (replacing sampleProducts)
<ProductList data={latestProducts} title="Newest Arrivals" limit={4} />

---

Implementing zod into typescript app

Zod is a TypeScript-first schema validation library that helps ensure data is correctly structured before being used.

Type Safety: It works seamlessly with TypeScript, ensuring type correctness.
Runtime Validation: Unlike TypeScript (which only checks types at compile-time), Zod validates data at runtime.
Composability: You can combine and extend schemas easily.
Error Handling: Provides detailed validation errors.
