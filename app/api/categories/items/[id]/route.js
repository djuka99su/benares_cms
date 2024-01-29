import connectMongoDB from "../../../../../libs/mongodb";
import Items from "../../../../../models/items";
import { NextResponse } from "next/server";




export async function GET (request, {params}){
    const {id} = params;
    await connectMongoDB();
    const item =await Items.findOne({_id : id});
    return NextResponse.json({item}, {status: 200})
}

export async function PUT (request, {params}) {
    const  {id} = params;
    const { newTitle: title, newPrice : price, newCategory : category, newAllergens : allergens, newDescription : description } = await request.json();
    await connectMongoDB();
    await Items.findByIdAndUpdate(id, {title, price, category, allergens, description});
    return NextResponse.json({massage: "Item updated"}, {status:200})
  }