import express from "express";

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
    const newarticle = new ArticleModel(req.body);
    const { _id } = await newarticle.save();

    res.status(201).send(_id);
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

export default route;
