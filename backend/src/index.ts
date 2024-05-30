import connection from './db';
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

connection.connect();

var query = connection.query('SELECT * FROM basurerotable', (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res.rows);
});

type basurero = {
  id: string;
  lleno: string;
};

let date: Date = new Date();

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year}:${hours}-${minutes}-${seconds}`;
}

const api = new Elysia({ prefix: '/api' })
  .get('/basureros', async () => {
    return await queryAllBasureros();
  })
  .post('/updateBasurero', async ({ body, error }) => {
    let response = await updateBasurero(body as basurero);
    if (response.status === 200) {
      return response;
    } else {
      return error(response.status, response.message);
    }
  });

async function updateBasurero(content: basurero) {
  if (parseInt(content.lleno) !== 1 && parseInt(content.lleno) !== 0) {
    return {
      status: 400,
      message: 'El campo lleno debe ser 0 o 1',
    };
  } else {
    try {
      const fechaactualizacion = formatDate(new Date()); // Assuming formatDate is the function you defined earlier
      const result = await connection.query(
        "UPDATE basurerotable SET lleno = $1, fechaactualizacion = TO_TIMESTAMP($3, 'DD-MM-YYYY:HH24-MI-SS') AT TIME ZONE 'UTC' WHERE id = $2 RETURNING *", 
        [content.lleno, content.id, fechaactualizacion]
      );
      if (result.rowCount === 0) {
        return {
          status: 404,
          message: 'No se encontró el basurero para actualizar',
        };
      } else {
        const basurero = result.rows[0];
        basurero.fechaactualizacion = formatDate(basurero.fechaactualizacion); // Format the date
        return {
          status: 200,
          message: 'Basurero actualizado',
          basurero: basurero,
        };
      }
    } catch (err) {
      console.error(err);
      return {
        status: 500,
        message: 'Error al actualizar basurero',
      };
    }
  }
}

async function queryAllBasureros() {
  const result = await connection.query('SELECT * FROM basurerotable');
  const basureros = result.rows;
  return basureros.map((basurero) => {
    basurero.fechaactualizacion = formatDate(basurero.fechaactualizacion); // Format the date
    return basurero;
  });
}

const app = new Elysia()
  .use(api)
  .use(cors())
  .get('/', () => 'Hello Elysia')
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
