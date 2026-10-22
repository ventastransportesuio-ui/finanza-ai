export async function onRequestGet(context) {

  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT *
    FROM gastos
    ORDER BY fecha DESC
  `).all();

  return Response.json(results);
}

export async function onRequestPost(context) {

  const { DB } = context.env;

  const body = await context.request.json();

  const id = crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO gastos (
      id,
      hogar_id,
      fecha,
      comercio,
      categoria,
      subcategoria,
      descripcion,
      monto,
      moneda,
      medio_pago,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    id,
    body.hogar_id,
    body.fecha,
    body.comercio,
    body.categoria,
    body.subcategoria,
    body.descripcion,
    body.monto,
    body.moneda,
    body.medio_pago,
    body.observaciones
  )
  .run();

  return Response.json({
    success: true,
    id
  });
}
