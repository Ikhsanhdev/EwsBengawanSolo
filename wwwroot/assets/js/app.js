class ThemeLayout {
    constructor() {
        ((this.html = document.getElementsByTagName("html")[0]),
            $(function () {
                $('[data-plugin="knob"]').knob();
            }));
    }
    initComponents() {
        (Waves.init(), lucide.createIcons());
        ([...document.querySelectorAll('[data-bs-toggle="popover"]')].map(
            (e) => new bootstrap.Popover(e),
        ),
            [...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map(
                (e) => new bootstrap.Tooltip(e),
            ),
            [...document.querySelectorAll(".offcanvas")].map(
                (e) => new bootstrap.Offcanvas(e),
            ));
        var e = document.getElementById("toastPlacement");
        e &&
            document
                .getElementById("selectToastPlacement")
                .addEventListener("change", function () {
                    (e.dataset.originalClass || (e.dataset.originalClass = e.className),
                        (e.className = e.dataset.originalClass + " " + this.value));
                });
        [].slice.call(document.querySelectorAll(".toast")).map(function (e) {
            return new bootstrap.Toast(e);
        });
        const o = document.getElementById("liveAlertPlaceholder"),
            t = document.getElementById("liveAlertBtn");
        t &&
            t.addEventListener("click", () => {
                {
                    var e = "Nice, you triggered this alert message!",
                        t = "success";
                    const n = document.createElement("div");
                    ((n.innerHTML = [
                        `<div class="alert alert-${t} alert-dismissible" role="alert">`,
                        `   <div>${e}</div>`,
                        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                        "</div>",
                    ].join("")),
                        o.append(n));
                }
            });
        var themeToggle = document.getElementById("theme-mode");
        if (themeToggle) {
            themeToggle.addEventListener("click", function () {
                var html = document.documentElement;
                var currentTheme = html.getAttribute("data-bs-theme") || "light";
                var newTheme = currentTheme === "dark" ? "light" : "dark";
                html.setAttribute("data-bs-theme", newTheme);
                sessionStorage.setItem("themeMode", newTheme);
            });
        }

        // Saat halaman dimuat: ambil dari sessionStorage, kalau belum ada pakai "light"
        var savedTheme = sessionStorage.getItem("themeMode");
        sessionStorage.removeItem("themeMode");
        if (savedTheme) {
            document.documentElement.setAttribute("data-bs-theme", savedTheme);
            console.log("ini session save theme terakhir");
        } else {
            document.documentElement.setAttribute("data-bs-theme", "light");
            sessionStorage.setItem("themeMode", "light");
            console.log("ini theme light")
        }
    }
    initfullScreenListener() {
        var e = document.querySelector('[data-bs-toggle="fullscreen"]');
        e &&
            e.addEventListener("click", function (e) {
                (e.preventDefault(),
                    document.body.classList.toggle("fullscreen-enable"),
                    document.fullscreenElement ||
                        document.mozFullScreenElement ||
                        document.webkitFullscreenElement
                        ? document.cancelFullScreen
                            ? document.cancelFullScreen()
                            : document.mozCancelFullScreen
                                ? document.mozCancelFullScreen()
                                : document.webkitCancelFullScreen &&
                                document.webkitCancelFullScreen()
                        : document.documentElement.requestFullscreen
                            ? document.documentElement.requestFullscreen()
                            : document.documentElement.mozRequestFullScreen
                                ? document.documentElement.mozRequestFullScreen()
                                : document.documentElement.webkitRequestFullscreen &&
                                document.documentElement.webkitRequestFullscreen(
                                    Element.ALLOW_KEYBOARD_INPUT,
                                ));
            });
    }
    initFormValidation() {
        document.querySelectorAll(".needs-validation").forEach((t) => {
            t.addEventListener(
                "submit",
                (e) => {
                    (t.checkValidity() || (e.preventDefault(), e.stopPropagation()),
                        t.classList.add("was-validated"));
                },
                !1,
            );
        });
    }
    initMainMenu() {
        var e, t;
        ($(".app-menu").length &&
            ((e = $(".app-menu .menu-item .collapse")),
                $(".app-menu li [data-bs-toggle='collapse']").on("click", function (e) {
                    return !1;
                }),
                e.on({
                    "show.bs.collapse": function (e) {
                        var t = $(e.target).parents(".collapse.show");
                        $(".app-menu .collapse.show").not(e.target).not(t).collapse("hide");
                    },
                }),
                (e = document.querySelectorAll(".app-menu .menu-link")),
                (t = window.location.href.split(/[?#]/)[0]),
                e.forEach(function (e) {
                    e.href == t &&
                        (e.classList.add("active"),
                            e.parentNode.classList.add("active"),
                            e.parentNode.parentNode.parentNode.classList.add("show"),
                            e.parentNode.parentNode.parentNode.parentNode.classList.add("active"),
                            e.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add(
                                "active",
                            ),
                            e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.classList.add(
                                "show",
                            ));
                })),
            setTimeout(function () {
                var e,
                    o,
                    l,
                    a,
                    c,
                    d,
                    t = document.querySelector("li.active .active");
                function s() {
                    ((e = d += 20), (t = a), (n = c));
                    var e,
                        t,
                        n =
                            (e /= l / 2) < 1
                                ? (n / 2) * e * e + t
                                : (-n / 2) * (--e * (e - 2) - 1) + t;
                    ((o.scrollTop = n), d < l && setTimeout(s, 20));
                }
                null != t &&
                    ((e = document.querySelector(
                        ".main-menu .simplebar-content-wrapper",
                    )),
                        (t = t.offsetTop - 300),
                        e &&
                        100 < t &&
                        ((l = 600), (a = (o = e).scrollTop), (c = t - a), (d = 0), s()));
            }, 200));
    }
    reverseQuery(e, t) {
        for (; e;) {
            if (e.parentElement && e.parentElement.querySelector(t) === e) return e;
            e = e.parentElement;
        }
        return null;
    }
    initSwitchListener() {
        var e = this,
            t = document.querySelector(".button-toggle-menu");
        t &&
            t.addEventListener("click", function () {
                document.getElementsByTagName("html")[0];
                ("full" === e.html.getAttribute("data-sidebar-size") &&
                    e.showBackdrop(),
                    e.html.classList.toggle("sidebar-enable"));
            });
    }
    showBackdrop() {
        var e = (function () {
            const e = document.createElement("div");
            ((e.style.width = "100px"),
                (e.style.height = "100px"),
                (e.style.overflow = "scroll"),
                document.body.appendChild(e));
            var t = e.offsetWidth - e.clientWidth;
            return (document.body.removeChild(e), t);
        })();
        const t = document.createElement("div"),
            n =
                ((t.id = "custom-backdrop"),
                    (t.classList = "offcanvas-backdrop fade show"),
                    document.body.appendChild(t),
                    (document.body.style.overflow = "hidden"),
                    (document.body.style.paddingRight = e + "px"),
                    this);
        t.addEventListener("click", function (e) {
            (n.html.classList.remove("sidebar-enable"), n.hideBackdrop());
        });
    }
    hideBackdrop() {
        var e = document.getElementById("custom-backdrop");
        e &&
            (document.body.removeChild(e),
                (document.body.style.overflow = null),
                (document.body.style.paddingRight = null));
    }
    init() {
        (this.initComponents(),
            this.initfullScreenListener(),
            this.initFormValidation(),
            this.initMainMenu(),
            this.initSwitchListener());
    }
}
new ThemeLayout().init();
