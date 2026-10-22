export async function onRequestGet(context) {

  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT *
    FROM integrantes
    ORDER BY nombre
  `).all();

  return Response.json(results);
}

export async function onRequestPost(context) {

  const { DB } = context.env;

  const body = await context.request.json();

  const id = crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO integrantes (
      id,
      hogar_id,
      nombre,
      apellido,
      fecha_ingreso_hogar,
      activo
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  .bind(
    id,
    body.hogar_id,
    body.nombre,
    body.apellido,
    body.fecha_ingreso_hogar,
    1
  )
  .run();

  return Response.json({
    success: true,
    id
  });
}
