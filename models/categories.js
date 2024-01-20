import mongoose, { Schema } from "mongoose";

const catergoriesSchema = new Schema(
  {
    title: String,
  },
  {
    timestamps: true,
  }
);


const Categories = mongoose.models.Categories || mongoose.model("Categories", catergoriesSchema);

export default Categories;