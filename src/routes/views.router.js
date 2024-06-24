import { Router } from "express";
//import { infoSession } from "../controllers/user.controllers.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", (req, res) => {
  console.log(req.session);
  const {first_name, last_name, role} = req.session

  const infoUser = {
    first_name: first_name,
    last_name: last_name,
    role: role
  }
  res.render("profile", infoUser);
});

export default router;
