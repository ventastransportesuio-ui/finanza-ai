export async function onRequestGet(context) {
  try {
    const { DB } = context.env;

    if (!DB) {
      throw new Error(
        "La conexión DB no está configurada."
      );
    }

    const { results } = await DB.prepare(`
      SELECT *
      FROM tarjetas
      ORDER BY created_at DESC
    `).all();

    return Response.json(results || []);
  } catch (error) {
    console.error(
      "Error al consultar tarjetas:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error.message ||
          "No fue posible consultar las tarjetas."
      },
      {
        status: 500
      }
    );
  }
}

export async function onRequestPost(context) {
  try {
    const { DB } = context.env;

    if (!DB) {
      throw new Error(
        "La conexión DB no está configurada."
      );
    }

    const body = await context.request.json();

    const id = crypto.randomUUID();

    const resultado = await DB.prepare(`
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
      cuotas_pendientes
      )
      VALUES (
  ?, ?, ?, ?, ?, ?, ?, ?,
  ?, ?, ?, ?, ?, ?, ?
)
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
        body.fecha_corte || null,
        body.fecha_pago || null,
       body.tasa_interes ?? 0,
        body.saldo_diferido ?? 0,
        body.cuotas_pendientes ?? 0

      )
      .run();

    return Response.json(
      {
        success: true,
        id: id,
        meta: resultado.meta
      },
      {
        status: 201
      }
    );
  } catch (error) {
    console.error(
      "Error al registrar tarjeta:",
      error
    );

    return Response.json(
      {
        success: false,
        error:
          error.message ||
          "No fue posible registrar la tarjeta."
      },
      {
        status: 500
      }
    );
  }
}
