import express from "express";
import { Pizzas } from "./../models/pizzas.js";
const router = express.Router();
router
  .route("/")
  .get(async (request, respone) => {
    if (request.query.title) {
      request.query.title = new RegExp("^" + request.query.title, "i");
    }
    const recipe = await Pizzas.find(request.query);
    respone.send(recipe);
  })
  .post(async (request, respone) => {
    const addRecipe = request.body;
    console.log(addRecipe);
    const recipe = new Pizzas(addRecipe);
    try {
      const newRecipe = await recipe.save();
      respone.send(newRecipe);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });
router
  .route("/:id")
  .get(async (request, respone) => {
    const { id } = request.params;
    const recipe = await Pizzas.find({ id: parseInt(id) });
    respone.send(recipe);
  })
  .delete(async (request, respone) => {
    const { id } = request.params;
    console.log(id);
    try {
      const pizza = await Pizzas.findByIdAndRemove(id);
      respone.send({
        title: pizza.title,
        id: pizza.id,
        message: "Deleted successfully",
      });
    } catch (err) {
      respone.status(500);
      respone.send("User is missing");
    }
  })
  .patch(async (request, respone) => {
    const { _id } = request.params;
    const { title, id, type, size, crust, ingredient } = request.body;
    try {
      const pizza = await Pizzas.findById(_id);
      if (title) {
        pizza.title = title;
      }
      if (type) {
        pizza.type = type;
      }
      if (size) {
        pizza.size = size;
      }
      if (crust) {
        pizza.crust = crust;
      }
      if (ingredient) {
        pizza.ingredient = ingredient;
      }
      if (id) {
        pizza.id = id;
      }
      await pizza.save();
      respone.send(pizza);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });
export default router;
