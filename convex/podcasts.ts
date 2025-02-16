import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const getURL = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});
