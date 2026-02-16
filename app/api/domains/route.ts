import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try{
    const domains = await prisma.domain.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(domains);
  } catch (error) {
    console.error("Failed to fetch domains:", error);
    return NextResponse.json(
      { error: "Failed to fetch domains" }, 
      { status: 500} 
    )
  }
}
