import connectMongoDB from "../../../../libs/mongodb";
import Categories from "../../../../models/categories";
import { NextResponse } from "next/server";


export async function PUT (request, {params}) {
  const  {id} = params;
  const { newTitle: title} = await request.json();
  await connectMongoDB();
  await Categories.findByIdAndUpdate(id, {title});
  return NextResponse.json({massage: "Topic updated"}, {status:200})
}

export async function GET (request, {params}){
    const {id} = params;
    await connectMongoDB();
    const category =await Categories.findOne({_id : id});
    return NextResponse.json({category}, {status: 200})
}