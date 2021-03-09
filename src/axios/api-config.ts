import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/",
});

export const EndPoints = {
  heroes: "heroes",
  antiHeroes: "anti-heroes",
  villains: "villains",
};
