import axios from "axios";

export const api = axios.create({
  baseURL: "/api/",
});

export const EndPoints = {
  heroes: "heroes",
  antiHeroes: "anti-heroes",
  villains: "villains",
};
