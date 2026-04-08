import "./style.css";
import { init } from "./controller.js";

if (!localStorage.getItem("user-access-token")) {
  location.href = "/login.html";
}

init();
