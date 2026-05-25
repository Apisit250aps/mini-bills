import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { eq } from 'drizzle-orm'
import { Pool } from 'pg'
import { v7 as uuidv7 } from 'uuid'
import { users, wallet, transaction } from './schema'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const db = drizzle({ client: pool })

const SEED_USER_EMAIL = 'aps.apisit250@gmail.com'

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(randomInt(8, 22), randomInt(0, 59), 0, 0)
  return d
}

const incomeItems = [
  'เงินเดือน',
  'รายได้พิเศษ',
  'โบนัส',
  'ขายของออนไลน์',
  'ค่าจ้างฟรีแลนซ์',
  'เงินปันผล',
  'ดอกเบี้ยรับ',
]

const expenseItems = [
  'ค่าอาหาร',
  'ค่าเดินทาง',
  'ค่าไฟฟ้า',
  'ค่าน้ำประปา',
  'ค่าอินเทอร์เน็ต',
  'ค่าโทรศัพท์',
  'ช้อปปิ้ง',
  'ค่าบันเทิง',
  'ค่าสุขภาพ',
  'ค่าของใช้',
  'ค่าเช่า',
  'ค่าน้ำมัน',
]

async function seed() {
  console.log('🌱 Seeding database...')

  // Upsert seed user
  const existingUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, SEED_USER_EMAIL))

  let userId: string
  if (existingUsers.length > 0) {
    userId = existingUsers[0].id
    console.log(`✅ Using existing user: ${userId}`)
  } else {
    userId = uuidv7()
    await db.insert(users).values({
      id: userId,
      name: 'Seed User',
      email: SEED_USER_EMAIL,
    })
    console.log(`✅ Created user: ${userId}`)
  }

  // Create wallet
  const walletId = uuidv7()
  await db.insert(wallet).values({
    id: walletId,
    userId,
    title: 'กระเป๋าหลัก',
    description: 'กระเป๋าเงินสำหรับทดสอบข้อมูลย้อนหลัง 3 เดือน',
  })
  console.log(`✅ Created wallet: ${walletId}`)

  // Generate transactions over past 3 months (~90 days)
  const transactions: (typeof transaction.$inferInsert)[] = []

  // ~15 transactions per month = 45 total
  for (let i = 0; i < 45; i++) {
    const daysBack = randomInt(1, 90)
    const isIncome = Math.random() < 0.3 // 30% income, 70% expense
    const type = isIncome ? 'income' : 'expense'
    const description = isIncome
      ? incomeItems[randomInt(0, incomeItems.length - 1)]
      : expenseItems[randomInt(0, expenseItems.length - 1)]
    const amount = isIncome ? randomInt(5000, 50000) : randomInt(50, 5000)
    const date = daysAgo(daysBack)

    transactions.push({
      id: uuidv7(),
      walletId,
      amount,
      description,
      type,
      createdAt: date,
      updatedAt: date,
    })
  }

  // Sort by date ascending
  transactions.sort(
    (a, b) => (a.createdAt as Date).getTime() - (b.createdAt as Date).getTime(),
  )

  await db.insert(transaction).values(transactions)
  console.log(`✅ Inserted ${transactions.length} transactions`)

  console.log('🎉 Seeding complete!')
  await pool.end()
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  pool.end()
  process.exit(1)
})
