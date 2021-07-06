import express from "express";
import { Users } from "../models/users.js";
const router = express.Router();

router
  .route("/")
  .get(async (request, respone) => {
    const users = await Users.find();
    respone.send(users);
  })
  .post(async (request, respone) => {
    const addUser = request.body;
    console.log(addUser);
    const user = new Users(addUser);
    try {
      const newUser = await user.save();
      respone.send(newUser);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

router
  .route("/:id")
  .get(async (request, respone) => {
    const { id } = request.params;
    const user = await Users.findById(id);
    respone.send(user);
  })
  .delete(async (request, respone) => {
    const { id } = request.params;
    try {
      const user = await Users.findOne(id);
      await user.remove();
      respone.send({
        name: user.name,
        id: user.id,
        message: "Deleted successfully",
      });
    } catch (err) {
      respone.status(500);
      respone.send("User is missing");
    }
  })
  .patch(async (request, respone) => {
    const { id } = request.params;
    const { name, avatar } = request.body;

    try {
      const user = await Users.findById(id);
      if (name) {
        user.name = name;
      }
      if (avatar) {
        user.avatar = avatar;
      }
      await user.save();
      respone.send(user);
    } catch (err) {
      respone.status(500);
      respone.send(err);
    }
  });

export const userRouter = router;
