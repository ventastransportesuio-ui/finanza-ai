export async function onRequestGet(context) {

  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT *
    FROM ingresos
    ORDER BY fecha DESC
  `).all();

  return Response.json(results);
}

export async function onRequestPost(context) {

  const { DB } = context.env;

  const body = await context.request.json();

  const id = crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO ingresos (
      id,
      hogar_id,
      integrante_id,
      fecha,
      tipo_ingreso,
      fuente,
      descripcion,
      monto_bruto,
      deducciones,
      monto_neto,
      frecuencia,
      notas
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    id,
    body.hogar_id,
    body.integrante_id,
    body.fecha,
    body.tipo_ingreso,
    body.fuente,
    body.descripcion,
    body.monto_bruto,
    body.deducciones,
    body.monto_neto,
    body.frecuencia,
    body.notas
  )
  .run();

  return Response.json({
    success: true,
    id
  });
}
