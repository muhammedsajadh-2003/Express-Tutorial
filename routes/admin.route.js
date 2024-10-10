import express from "express";
import { addProduct } from "../controllers/admin.controller.js";

const app = express();

app.post("/add-product", addProduct);




export default app;