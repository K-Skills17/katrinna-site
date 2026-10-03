import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ items: data || [] });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function DELETE(request: Request) {
  const { id, storage_path } = await request.json();
  const supabase = getServiceClient();

  if (storage_path) {
    await supabase.storage.from("portfolio").remove([storage_path]);
  }

  const { error } = await supabase.from("portfolio").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
