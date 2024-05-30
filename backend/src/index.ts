import connection from "./db";
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

connection.connect();

var query = connection.query("SELECT * FROM basurerotable", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res.rows);
});

const api = new Elysia({prefix: "/api"})
      .get("/basureros", async () => {return await queryAllBasureros()})


async function queryAllBasureros(){
  const result = await connection.query("SELECT * FROM basurerotable");
  return result.rows;
}

const app = new Elysia()
      .use(api)
      .use(cors())
      .get("/", () => "Hello Elysia")
      .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
