import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ArticleSchema = new Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    subhead: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        required: true,
      },
    },
    cover: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ArticleSchema1 = new Schema({
  headline: {
    type: String,
    required: true,
  },
  subhead: {
    type: String,
    required: true,
  },
  author: {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
});
export default model("Article", ArticleSchema);
