export async function onRequestGet(context) {

  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT *
    FROM tarjetas
    ORDER BY created_at DESC
  `).all();

  return Response.json(results);
}

export async function onRequestPost(context) {

  const { DB } = context.env;

  const body = await context.request.json();

  const id = crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO tarjetas (
      id,
      hogar_id,
      entidad_financiera,
      nombre_tarjeta,
      titular,
      cupo,
      saldo_actual,
      cupo_disponible,
      pago_minimo,
      pago_total,
      fecha_corte,
      fecha_pago,
      tasa_interes,
      saldo_diferido,
      cuotas_pendientes,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    id,
    body.hogar_id,
    body.entidad_financiera,
    body.nombre_tarjeta,
    body.titular,
    body.cupo,
    body.saldo_actual,
    body.cupo_disponible,
    body.pago_minimo,
    body.pago_total,
    body.fecha_corte,
    body.fecha_pago,
    body.tasa_interes,
    body.saldo_diferido,
    body.cuotas_pendientes,
    body.observaciones
  )
  .run();

  return Response.json({
    success: true,
    id
  });
}
