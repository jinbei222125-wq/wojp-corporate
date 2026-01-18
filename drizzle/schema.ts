import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * NEWS table for company announcements
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(), // Markdown content
  category: mysqlEnum("category", ["お知らせ", "重要なお知らせ", "プレスリリース", "メディア掲載"]).notNull(),
  imageUrl: varchar("imageUrl", { length: 500 }),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  isPublished: int("isPublished").default(1).notNull(), // 1 = 公開, 0 = 非公開
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

/**
 * Job positions table for recruitment
 */
export const jobPositions = mysqlTable("job_positions", {
  id: int("id").autoincrement().primaryKey(),
  positionName: varchar("positionName", { length: 255 }).notNull(),
  description: text("description").notNull(), // 業務内容
  requirements: text("requirements").notNull(), // 応募資格
  location: varchar("location", { length: 255 }).notNull(), // 勤務地
  salary: varchar("salary", { length: 255 }).notNull(), // 給与
  isActive: int("isActive").default(1).notNull(), // 1 = active, 0 = inactive
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type JobPosition = typeof jobPositions.$inferSelect;
export type InsertJobPosition = typeof jobPositions.$inferInsert;
