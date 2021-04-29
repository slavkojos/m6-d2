import express from "express";
import mongoose from "mongoose";

import ArticleModel from "./schema.js";

const route = express.Router();

route.get("/", async (req, res, next) => {
  try {
    const articles = await ArticleModel.find();
    res.send(articles);
  } catch (error) {
    next(error);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await ArticleModel.findById(id);
    if (article) {
      res.send(article);
    } else {
      const error = new Error();
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next("While reading articles list a problem occurred!");
  }
});

route.post("/", async (req, res, next) => {
  console.log("hello");
  try {
    const newArticle = new ArticleModel(req.body);
    const { _id } = await newArticle.save();

    res.status(201).send(newArticle);
  } catch (error) {
    next(error);
  }
});

route.put("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (article) {
      res.send(article);
    } else {
      const error = new Error(`article with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

route.delete("/:id", async (req, res, next) => {
  try {
    const article = await ArticleModel.findByIdAndDelete(req.params.id);
    if (article) {
      res.send("Deleted");
    } else {
      const error = new Error(`article with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

route.get("/:id/reviews", async (req, res, next) => {
  console.log("okay");
  try {
    const id = req.params.id;
    const { reviews } = await ArticleModel.findById(id, { reviews: 1, _id: 0 });
    if (reviews) {
      res.send(reviews);
    } else {
      res.send("No reviews");
    }
  } catch (error) {
    console.log(error);
    next("While reading reviews list a problem occurred!");
  }
});

route.get("/:id/reviews/:reviewId", async (req, res, next) => {
  console.log("okay reviewId", req.params.reviewId);
  try {
    const { reviews } = await ArticleModel.findOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        reviews: {
          $elemMatch: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      }
    );
    if (reviews) {
      res.send(reviews[0]);
    } else {
      res.send("No review with that ID");
    }
  } catch (error) {
    console.log(error);
    next("While reading reviews list a problem occurred!");
  }
});

route.post("/:id", async (req, res, next) => {
  console.log(`hello ${req.params.id} review post`);
  try {
    const updated = await ArticleModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: req.body,
        },
      },
      { runValidators: true, new: true }
    );
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

route.delete("/:id/reviews/:reviewId", async (req, res, next) => {
  console.log("deleting review");
  try {
    const updated = await ArticleModel.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: {
          reviews: { _id: mongoose.Types.ObjectId(req.params.reviewId) },
        },
      },
      { new: true }
    );
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

export default route;
