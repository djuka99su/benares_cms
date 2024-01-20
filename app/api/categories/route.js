import connectMongoDB from "../../../libs/mongodb";
import Categories from "../../../models/categories";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title } = await request.json();
  await connectMongoDB();
  await Categories.create({title});
  return NextResponse.json({ message: "Categories created" }, { status: 201 });
}

export async function GET (request){
  await connectMongoDB();
  const categories = await Categories.find();
  return NextResponse.json({categories})
}

export async function DELETE (request){
  const title = request.nextUrl.searchParams.get("title");
  await connectMongoDB();
  await Categories.findOneAndDelete({ title: title })
  return NextResponse.json({massage : "Category deleted"}, {status: 200})
}
