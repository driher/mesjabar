import { NextRequest, NextResponse } from "next/server";
import { searchPosts } from "@/lib/wordpress";

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("q") || "";

  const posts = await searchPosts(keyword);

  return NextResponse.json(posts);
}