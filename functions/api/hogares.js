export async function onRequestGet(context) {
  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT *
    FROM hogares
    ORDER BY nombre_hogar
  `).all();

  return Response.json(results);
}

export async function onRequestPost(context) {
  const { DB } = context.env;

  const body = await context.request.json();

  const id = crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO hogares (
      id,
      nombre_hogar,
      moneda,
      fecha_inicio_control,
      numero_integrantes,
      numero_personas_ingresos,
      numero_dependientes
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    id,
    body.nombre_hogar,
    body.moneda,
    body.fecha_inicio_control,
    body.numero_integrantes,
    body.numero_personas_ingresos,
    body.numero_dependientes
  )
  .run();

  return Response.json({
    success: true,
    id
  });
}
