import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

// News category enum
const newsCategoryEnum = z.enum(["お知らせ", "重要なお知らせ", "プレスリリース", "メディア掲載"]);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // NEWS router
  news: router({
    // Public: 公開済みNEWS一覧
    list: publicProcedure.query(async () => {
      return await db.getPublishedNews();
    }),

    // Admin: 全NEWS一覧（公開/非公開含む）
    listAll: adminProcedure.query(async () => {
      return await db.getAllNews();
    }),

    // Public: 公開済みNEWSの詳細（非公開は404）
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const n = await db.getNewsById(input.id);
        if (!n || n.isPublished !== 1) return undefined;
        return n;
      }),

    // Admin: Create news
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1, "タイトルは必須です"),
        content: z.string().min(1, "内容は必須です"),
        category: newsCategoryEnum,
        imageUrl: z.string().optional(),
        publishedAt: z.date().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createNews({
          title: input.title,
          content: input.content,
          category: input.category,
          imageUrl: input.imageUrl ?? null,
          publishedAt: input.publishedAt ?? new Date(),
          isPublished: input.isPublished ?? 0,
        });
        return { id };
      }),

    // Admin: Update news
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        category: newsCategoryEnum.optional(),
        imageUrl: z.string().optional(),
        publishedAt: z.date().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateNews(id, data);
        return { success: true };
      }),

    // Admin: Delete news
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteNews(input.id);
        return { success: true };
      }),
  }),

  // Job Positions router
  jobPositions: router({
    // Public: Get active job positions
    list: publicProcedure.query(async () => {
      return await db.getActiveJobPositions();
    }),

    // Admin: Get all job positions (including inactive)
    listAll: adminProcedure.query(async () => {
      return await db.getAllJobPositions();
    }),

    // Public: Get single job position by ID
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getJobPositionById(input.id);
      }),

    // Admin: Create job position
    create: adminProcedure
      .input(z.object({
        positionName: z.string().min(1, "ポジション名は必須です"),
        description: z.string().min(1, "業務内容は必須です"),
        requirements: z.string().min(1, "応募資格は必須です"),
        location: z.string().min(1, "勤務地は必須です"),
        salary: z.string().min(1, "給与は必須です"),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createJobPosition({
          positionName: input.positionName,
          description: input.description,
          requirements: input.requirements,
          location: input.location,
          salary: input.salary,
          isActive: input.isActive ?? 1,
        });
        return { id };
      }),

    // Admin: Update job position
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        positionName: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        requirements: z.string().min(1).optional(),
        location: z.string().min(1).optional(),
        salary: z.string().min(1).optional(),
        isActive: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateJobPosition(id, data);
        return { success: true };
      }),

    // Admin: Delete job position
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await db.deleteJobPosition(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
