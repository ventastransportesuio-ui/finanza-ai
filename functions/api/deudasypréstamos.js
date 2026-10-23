export async function onRequestGet(context) {

  const { DB } = context.env;

  const { results } = await DB.prepare(`
    SELECT *
    FROM deudas
    ORDER BY created_at DESC
  `).all();

  return Response.json(results);
}

export async function onRequestPost(context) {

  const { DB } = context.env;

  const body = await context.request.json();

  const id = crypto.randomUUID();

  await DB.prepare(`
    INSERT INTO deudas (
      id,
      hogar_id,
      institucion,
      tipo_deuda,
      numero_operacion,
      fecha_inicio,
      monto_original,
      saldo_actual,
      tasa_interes,
      tipo_tasa,
      numero_cuotas_originales,
      cuotas_pagadas,
      cuotas_restantes,
      valor_cuota,
      frecuencia_pago,
      fecha_proximo_pago,
      seguro,
      comisiones,
      forma_pago,
      observaciones
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    id,
    body.hogar_id,
    body.institucion,
    body.tipo_deuda,
    body.numero_operacion,
    body.fecha_inicio,
    body.monto_original,
    body.saldo_actual,
    body.tasa_interes,
    body.tipo_tasa,
    body.numero_cuotas_originales,
    body.cuotas_pagadas,
    body.cuotas_restantes,
    body.valor_cuota,
    body.frecuencia_pago,
    body.fecha_proximo_pago,
    body.seguro,
    body.comisiones,
    body.forma_pago,
    body.observaciones
  )
  .run();

  return Response.json({
    success: true,
    id
  });
}
