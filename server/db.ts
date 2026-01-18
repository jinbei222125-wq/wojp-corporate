import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, news, InsertNews, jobPositions, InsertJobPosition } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ NEWS QUERIES ============

/** 公開済みのNEWS一覧（公開サイト用） */
export async function getPublishedNews() {
  const db = await getDb();
  if (!db) return [];
  return await db
    .select()
    .from(news)
    .where(eq(news.isPublished, 1))
    .orderBy(desc(news.publishedAt));
}

/** 全NEWS一覧（管理画面用・公開/非公開含む） */
export async function getAllNews() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(news).orderBy(desc(news.publishedAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

const DB_UNAVAILABLE_MSG =
  "データベースに接続できません。.env に DATABASE_URL を設定し、pnpm db:push でマイグレーションを実行してください。";

export async function createNews(data: InsertNews) {
  const db = await getDb();
  if (!db) throw new Error(DB_UNAVAILABLE_MSG);
  const result = await db.insert(news).values(data);
  const row = Array.isArray(result) ? result[0] : result;
  const id = (row as { insertId?: number })?.insertId;
  if (typeof id !== "number") throw new Error(DB_UNAVAILABLE_MSG);
  return id;
}

export async function updateNews(id: number, data: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) throw new Error(DB_UNAVAILABLE_MSG);
  await db.update(news).set(data).where(eq(news.id, id));
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error(DB_UNAVAILABLE_MSG);
  await db.delete(news).where(eq(news.id, id));
}

// ============ JOB POSITIONS QUERIES ============

export async function getAllJobPositions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(jobPositions).orderBy(desc(jobPositions.createdAt));
}

export async function getActiveJobPositions() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(jobPositions).where(eq(jobPositions.isActive, 1)).orderBy(desc(jobPositions.createdAt));
}

export async function getJobPositionById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(jobPositions).where(eq(jobPositions.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createJobPosition(data: InsertJobPosition) {
  const db = await getDb();
  if (!db) throw new Error(DB_UNAVAILABLE_MSG);
  const result = await db.insert(jobPositions).values(data);
  const row = Array.isArray(result) ? result[0] : result;
  const id = (row as { insertId?: number })?.insertId;
  if (typeof id !== "number") throw new Error(DB_UNAVAILABLE_MSG);
  return id;
}

export async function updateJobPosition(id: number, data: Partial<InsertJobPosition>) {
  const db = await getDb();
  if (!db) throw new Error(DB_UNAVAILABLE_MSG);
  await db.update(jobPositions).set(data).where(eq(jobPositions.id, id));
}

export async function deleteJobPosition(id: number) {
  const db = await getDb();
  if (!db) throw new Error(DB_UNAVAILABLE_MSG);
  await db.delete(jobPositions).where(eq(jobPositions.id, id));
}
