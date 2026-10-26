(function () {
  "use strict";

  const paginas = [
    {
      titulo: "Inicio",
      icono: "⌂",
      archivo: "index.html",
      descripcion: "Resumen de tu situación financiera."
    },
    {
      titulo: "Mi familia",
      icono: "♟",
      archivo: "familia.html",
      descripcion: "La familia es un equipo financiero."
    },
    {
      titulo: "Ingresos",
      icono: "＄",
      archivo: "ingresos.html",
      descripcion: "Registra y controla todos tus ingresos."
    },
    {
      titulo: "Gastos y consumo",
      icono: "▣",
      archivo: "gastos.html",
      descripcion: "Controla tus gastos y oportunidades de ahorro."
    },
    {
      titulo: "Tarjetas",
      icono: "▤",
      archivo: "tarjetas.html",
      descripcion: "Controla cupos, saldos y próximos pagos."
    },
    {
      titulo: "Deudas y préstamos",
      icono: "◉",
      archivo: "deudasypréstamos.html",
      descripcion: "Gestiona tus deudas y estrategias de pago."
    },
    {
      titulo: "Presupuesto y ahorro",
      icono: "◎",
      archivo: "presupuesto y ahorro.html",
      descripcion: "Define presupuestos y objetivos de ahorro."
    },
    {
      titulo: "Inteligencia financiera",
      icono: "◔",
      archivo: "inteligencia financiera.html",
      descripcion: "Recibe recomendaciones financieras explicables."
    },
    {
      titulo: "Documentos",
      icono: "▧",
      archivo: "documentos.html",
      descripcion: "Organiza tus documentos financieros."
    },
    {
      titulo: "Perfil y seguridad",
      icono: "◆",
      archivo: "perfil y seguridad.html",
      descripcion: "Mantén tu cuenta segura y actualizada."
    }
  ];

  function obtenerArchivoActual() {
    const ruta = window.location.pathname;
    const archivo = ruta.substring(ruta.lastIndexOf("/") + 1);

    return archivo || "index.html";
  }

function normalizarArchivo(nombre) {
  return decodeURIComponent(nombre || "")
    .toLowerCase()
    .replace(/\.html$/, "")
    .replace(/\s+/g, "");
}

function obtenerPaginaActual() {
  const archivoActual = normalizarArchivo(obtenerArchivoActual());

  return (
    paginas.find(function (pagina) {
      return normalizarArchivo(pagina.archivo) === archivoActual;
    }) || paginas[0]
  );
}

  function crearNavegacion(paginaActual) {
    return paginas
      .map(function (pagina, indice) {
       const activa =
  normalizarArchivo(pagina.archivo) ===
  normalizarArchivo(paginaActual.archivo)
    ? " active"
    : "";

        const separador =
          indice === paginas.length - 2
            ? '<div class="nav-divider"></div>'
            : "";

        return (
          separador +
          '<a class="nav-item' +
          activa +
          '" href="' +
          pagina.archivo +
          '">' +
          '<span class="nav-icon">' +
          pagina.icono +
          "</span>" +
          '<span class="nav-label">' +
          pagina.titulo +
          "</span>" +
          "</a>"
        );
      })
      .join("");
  }

  function prepararTablas(contenido) {
    contenido.querySelectorAll("table.table").forEach(function (tabla) {
      if (
        tabla.parentElement &&
        tabla.parentElement.classList.contains("table-wrapper")
      ) {
        return;
      }

      const contenedor = document.createElement("div");
      contenedor.className = "table-wrapper";

      tabla.parentNode.insertBefore(contenedor, tabla);
      contenedor.appendChild(tabla);
    });
  }

  function ocultarEnlacesVolver(contenido) {
    contenido.querySelectorAll("a").forEach(function (enlace) {
      const texto = enlace.textContent || "";

      if (texto.toLowerCase().includes("volver al inicio")) {
        enlace.style.display = "none";
      }
    });
  }

  function montarAplicacion() {
    if (document.querySelector(".app-shell")) {
      return;
    }

    const paginaActual = obtenerPaginaActual();

    document.body.classList.add("finanza-layout");

    /*
     * Guardamos únicamente el contenido visual actual.
     * Los scripts ya cargados no se vuelven a ejecutar.
     */
    const nodosOriginales = Array.from(document.body.childNodes).filter(
      function (nodo) {
        if (nodo.nodeType !== Node.ELEMENT_NODE) {
          return true;
        }

        if (nodo.tagName !== "SCRIPT") {
          return true;
        }

        return false;
      }
    );

    /*
     * Limpiamos el body y creamos la estructura general.
     */
    document.body.innerHTML = "";

    const shell = document.createElement("div");
    shell.className = "app-shell";

    const sidebar = document.createElement("aside");
    sidebar.className = "app-sidebar";
    sidebar.id = "appSidebar";

    sidebar.innerHTML =
      '<div class="brand-row">' +
      '<div class="brand-mark">F</div>' +
      "<div>" +
      '<div class="brand-name">FINANZA AI</div>' +
      '<div class="brand-tag">Tu bienestar financiero, en familia</div>' +
      "</div>" +
      "</div>" +
      '<nav class="sidebar-nav" aria-label="Navegación principal">' +
      crearNavegacion(paginaActual) +
      "</nav>" +
      '<div class="sidebar-footer">' +
      '<span class="sidebar-footer-icon">♡</span>' +
      "<div>Juntos construimos un mejor futuro financiero</div>" +
      "</div>";

    const main = document.createElement("main");
    main.className = "app-main";

    const topbar = document.createElement("header");
    topbar.className = "app-topbar";

    topbar.innerHTML =
      '<div class="topbar-left">' +
      '<button type="button" class="mobile-menu-button" ' +
      'aria-label="Abrir menú" aria-controls="appSidebar" ' +
      'aria-expanded="false">☰</button>' +
      '<div class="topbar-icon">' +
      paginaActual.icono +
      "</div>" +
      '<div class="topbar-copy">' +
      '<h1 class="topbar-title">' +
      paginaActual.titulo +
      "</h1>" +
      '<div class="topbar-status">' +
      paginaActual.descripcion +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="topbar-right">' +
      '<button type="button" class="notification-button" ' +
      'aria-label="Notificaciones">♧</button>' +
      '<div class="profile-chip">' +
      '<div class="profile-avatar">AV</div>' +
      "<span>Finanzas Per</span>" +
      "</div>" +
      "</div>";

    const contenido = document.createElement("div");
    contenido.className = "app-content";

    nodosOriginales.forEach(function (nodo) {
      contenido.appendChild(nodo);
    });

    prepararTablas(contenido);
    ocultarEnlacesVolver(contenido);

    const overlay = document.createElement("div");
    overlay.className = "mobile-overlay";
    overlay.setAttribute("aria-hidden", "true");

    main.appendChild(topbar);
    main.appendChild(contenido);

    shell.appendChild(sidebar);
    shell.appendChild(main);

    document.body.appendChild(shell);
    document.body.appendChild(overlay);

    const botonMenu = document.querySelector(".mobile-menu-button");

    if (botonMenu) {
      botonMenu.addEventListener("click", function () {
        const abierto =
          document.body.classList.toggle("sidebar-open");

        botonMenu.setAttribute(
          "aria-expanded",
          abierto ? "true" : "false"
        );
      });
    }

    overlay.addEventListener("click", function () {
      document.body.classList.remove("sidebar-open");

      if (botonMenu) {
        botonMenu.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape") {
        document.body.classList.remove("sidebar-open");

        if (botonMenu) {
          botonMenu.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", montarAplicacion);
  } else {
    montarAplicacion();
  }
})();
