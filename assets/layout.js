(function () {
  "use strict";

  const pages = [
    {
      key: "inicio",
      title: "Inicio",
      icon: "⌂",
      file: "index.html",
      subtitle: "Resumen de tu situación financiera."
    },
    {
      key: "familia",
      title: "Mi familia",
      icon: "♟",
      file: "familia.html",
      subtitle: "La familia es un equipo. Juntos llegamos más lejos."
    },
    {
      key: "ingresos",
      title: "Ingresos",
      icon: "＄",
      file: "ingresos.html",
      subtitle: "Registra y controla todos tus ingresos."
    },
    {
      key: "gastos",
      title: "Gastos y consumo",
      icon: "▣",
      file: "gastos.html",
      subtitle: "Controla tus gastos y detecta oportunidades de ahorro."
    },
    {
      key: "tarjetas",
      title: "Tarjetas",
      icon: "▤",
      file: "tarjetas.html",
      subtitle: "Controla tus tarjetas de crédito y evita deudas innecesarias."
    },
    {
      key: "deudas",
      title: "Deudas y préstamos",
      icon: "◉",
      file: "deudasypréstamos.html",
      subtitle: "Conoce tus deudas, pagos y caminos hacia la libertad financiera."
    },
    {
      key: "presupuesto",
      title: "Presupuesto y ahorro",
      icon: "◎",
      file: "presupuesto y ahorro.html",
      subtitle: "Define límites realistas y construye tus metas de ahorro."
    },
    {
      key: "inteligencia",
      title: "Inteligencia financiera",
      icon: "◔",
      file: "inteligencia financiera.html",
      subtitle: "Recomendaciones basadas en la situación real del hogar."
    },
    {
      key: "consumo",
      title: "Consumo inteligente",
      icon: "▾",
      file: "consumo-inteligente.html",
      subtitle: "Analiza productos, compras repetidas y oportunidades de ahorro."
    },
    {
      key: "lista",
      title: "Lista inteligente",
      icon: "▦",
      file: "lista-inteligente.html",
      subtitle: "Convierte el análisis de consumo en una lista práctica."
    },
    {
      key: "asistente",
      title: "Asistente financiero",
      icon: "✦",
      file: "asistente-financiero.html",
      subtitle: "Pregunta, recibe análisis y toma mejores decisiones."
    },
    {
      key: "documentos",
      title: "Documentos",
      icon: "▧",
      file: "documentos.html",
      subtitle: "Carga y organiza comprobantes y documentos financieros."
    },
    {
      key: "perfil",
      title: "Perfil y seguridad",
      icon: "◆",
      file: "perfil y seguridad.html",
      subtitle: "Mantén la cuenta segura y actualizada."
    }
  ];

  const normalizar = (texto) => {
    try {
      return decodeURIComponent(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "");
    } catch (_) {
      return String(texto || "").toLowerCase().replace(/\s+/g, "");
    }
  };

  const archivoActual = () => {
    const path = window.location.pathname.split("/").pop();
    return path || "index.html";
  };

  const buscarPaginaActual = () => {
    const actual = normalizar(archivoActual());

    return (
      pages.find((page) => normalizar(page.file) === actual) ||
      pages.find((page) => actual.includes(normalizar(page.key))) ||
      pages[0]
    );
  };

  const crearElemento = (tag, clase, contenido) => {
    const elemento = document.createElement(tag);

    if (clase) {
      elemento.className = clase;
    }

    if (contenido !== undefined) {
      elemento.textContent = contenido;
    }

    return elemento;
  };

  const crearNavegacion = (paginaActual) => {
    const nav = crearElemento("nav", "sidebar-nav");
    nav.setAttribute("aria-label", "Navegación principal");

    const principal = crearElemento("div", "nav-section");
    const secundaria = crearElemento("div", "nav-section");

    const clavesPrincipales = [
      "inicio",
      "familia",
      "ingresos",
      "gastos",
      "tarjetas",
      "deudas",
      "presupuesto",
      "inteligencia",
      "consumo",
      "lista",
      "asistente"
    ];

    pages.forEach((page) => {
      const enlace = crearElemento("a", "nav-item");
      enlace.href = page.file;
      enlace.dataset.page = page.key;

      if (page.key === paginaActual.key) {
        enlace.classList.add("active");
        enlace.setAttribute("aria-current", "page");
      }

      const icono = crearElemento("span", "nav-icon", page.icon);
      icono.setAttribute("aria-hidden", "true");

      const texto = crearElemento("span", "nav-label", page.title);

      enlace.append(icono, texto);

      if (clavesPrincipales.includes(page.key)) {
        principal.appendChild(enlace);
      } else {
        secundaria.appendChild(enlace);
      }
    });

    nav.appendChild(principal);

    const divider = crearElemento("div", "nav-divider");
    divider.setAttribute("aria-hidden", "true");
    nav.appendChild(divider);

    nav.appendChild(secundaria);

    return nav;
  };

  const crearSidebar = (paginaActual) => {
    const sidebar = crearElemento("aside", "app-sidebar");
    sidebar.id = "appSidebar";

    const marca = crearElemento("div", "brand-row");

    const logotipo = crearElemento("div", "brand-mark", "F");
    logotipo.setAttribute("aria-hidden", "true");

    const marcaTexto = crearElemento("div");
    const nombre = crearElemento("div", "brand-name", "FINANZA AI");
    const lema = crearElemento(
      "div",
      "brand-tag",
      "Tu bienestar financiero, en familia"
    );

    marcaTexto.append(nombre, lema);
    marca.append(logotipo, marcaTexto);

    const navegacion = crearNavegacion(paginaActual);

    const pie = crearElemento("div", "sidebar-footer");
    const pieIcono = crearElemento("span", "sidebar-footer-icon", "♡");
    const pieTexto = crearElemento(
      "div",
      "",
      "Juntos construimos un mejor futuro financiero"
    );

    pie.append(pieIcono, pieTexto);
    sidebar.append(marca, navegacion, pie);

    return sidebar;
  };

  const crearTopbar = (paginaActual) => {
    const topbar = crearElemento("header", "app-topbar");

    const izquierda = crearElemento("div", "topbar-left");

    const botonMenu = crearElemento("button", "mobile-menu-button", "☰");
    botonMenu.type = "button";
    botonMenu.setAttribute("aria-label", "Abrir menú");
    botonMenu.setAttribute("aria-controls", "appSidebar");
    botonMenu.setAttribute("aria-expanded", "false");

    const icono = crearElemento("div", "topbar-icon", paginaActual.icon);
    icono.setAttribute("aria-hidden", "true");

    const textos = crearElemento("div", "topbar-copy");
    const titulo = crearElemento("h1", "topbar-title", paginaActual.title);
    const estado = crearElemento(
      "div",
      "topbar-status",
      paginaActual.subtitle
    );

    textos.append(titulo, estado);
    izquierda.append(botonMenu, icono, textos);

    const derecha = crearElemento("div", "topbar-right");

    const notificaciones = crearElemento(
      "button",
      "notification-button",
      "♧"
    );
    notificaciones.type = "button";
    notificaciones.setAttribute("aria-label", "Notificaciones");

    const perfil = crearElemento("div", "profile-chip");
    const avatar = crearElemento("div", "profile-avatar", "AV");
    const perfilNombre = crearElemento("span", "", "Finanzas Per");

    perfil.append(avatar, perfilNombre);
    derecha.append(notificaciones, perfil);

    topbar.append(izquierda, derecha);

    botonMenu.addEventListener("click", () => {
      const abierto = document.body.classList.toggle("sidebar-open");
      botonMenu.setAttribute("aria-expanded", String(abierto));
    });

    return topbar;
  };

  const prepararContenido = (contenido) => {
    contenido.querySelectorAll("a").forEach((enlace) => {
      const href = enlace.getAttribute("href");

      if (!href) {
        return;
      }

      if (
        href === "index.html" &&
        enlace.textContent.toLowerCase().includes("volver")
      ) {
        enlace.style.display = "none";
      }
    });

    contenido.querySelectorAll("table.table").forEach((tabla) => {
      if (tabla.parentElement.classList.contains("table-wrapper")) {
        return;
      }

      const wrapper = crearElemento("div", "table-wrapper");
      tabla.parentNode.insertBefore(wrapper, tabla);
      wrapper.appendChild(tabla);
    });
  };

  const montarLayout = () => {
    if (document.body.dataset.layoutReady === "true") {
      return;
    }

    document.body.dataset.layoutReady = "true";
    document.body.classList.add("finanza-layout");

    const paginaActual = buscarPaginaActual();

    const nodosOriginales = Array.from(document.body.childNodes).filter(
      (nodo) =>
        !(
          nodo.nodeType === Node.ELEMENT_NODE &&
          nodo.tagName === "SCRIPT" &&
          nodo.src &&
          nodo.src.includes("assets/layout.js")
        )
    );

    const shell = crearElemento("div", "app-shell");
    const sidebar = crearSidebar(paginaActual);
    const main = crearElemento("main", "app-main");
    const topbar = crearTopbar(paginaActual);
    const contenido = crearElemento("div", "app-content");
    const overlay = crearElemento("div", "mobile-overlay");

    overlay.setAttribute("aria-hidden", "true");

    nodosOriginales.forEach((nodo) => {
      contenido.appendChild(nodo);
    });

    prepararContenido(contenido);

    main.append(topbar, contenido);
    shell.append(sidebar, main);

    document.body.append(shell, overlay);

    overlay.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");

      const boton = document.querySelector(".mobile-menu-button");
      if (boton) {
        boton.setAttribute("aria-expanded", "false");
      }
    });

    sidebar.querySelectorAll(".nav-item").forEach((enlace) => {
      enlace.addEventListener("click", () => {
        document.body.classList.remove("sidebar-open");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.body.classList.remove("sidebar-open");

        const boton = document.querySelector(".mobile-menu-button");
        if (boton) {
          boton.setAttribute("aria-expanded", "false");
        }
      }
    });
  };

  if (document.readyState === "loading") {
    document
