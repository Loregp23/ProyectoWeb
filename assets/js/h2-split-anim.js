// Per-char split + animation (reusable)
(function () {
  if (typeof window === "undefined") return;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  var groups = [
    {
      // main large intro (if present)
      selector: ".analysis-intro .text-xl",
      params: {
        stagger: 50,
        duration: 1400,
        translate: "24px",
        rotateFrom: -360,
        loopDelay: 1000,
      },
    },
    {
      // all other main H2s (covers Awwwards, Webby, FWA, CSSDA, etc.)
      selector: "main h2:not(.text-xl)",
      params: {
        stagger: 40,
        duration: 1000,
        translate: "14px",
        rotateFrom: -270,
        loopDelay: 700,
      },
    },
  ];

  function splitToChars(el) {
    if (!el || el.dataset.charsSplit === "1") return;
    var raw = el.textContent || "";
    if (!raw.trim()) return;
    var chars = raw.replace(/\s+/g, " ").split("");
    el.innerHTML = "";
    el.classList.add("h2-anim");
    chars.forEach(function (c) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = c;
      el.appendChild(span);
    });
    el.dataset.charsSplit = "1";
  }

  function animateGroup(root, opts) {
    var nodes = Array.from(root.querySelectorAll(".char"));
    if (!nodes.length) return;
    var stagger = opts.stagger || 50;
    var duration = opts.duration || 1200;
    var translate = opts.translate || "16px";
    var rotateFrom = opts.rotateFrom || -300;
    var loopDelay = opts.loopDelay || 800;

    function run() {
      nodes.forEach(function (node, i) {
        var kf = [
          {
            transform:
              "translateY(" + translate + ") rotate(" + rotateFrom + "deg)",
            opacity: 0,
            offset: 0,
          },
          {
            transform:
              "translateY(" +
              parseFloat(translate) * -0.2 +
              "px) rotate(" +
              rotateFrom * 0.06 +
              "deg)",
            opacity: 1,
            offset: 0.7,
          },
          { transform: "translateY(0) rotate(0deg)", opacity: 1, offset: 1 },
        ];
        setTimeout(function () {
          try {
            node.animate(kf, {
              duration: duration,
              easing: "cubic-bezier(.2,.9,.3,1)",
              fill: "forwards",
            });
          } catch (e) {}
        }, i * stagger);
      });

      var total = duration + nodes.length * stagger + loopDelay;
      setTimeout(function () {
        nodes.forEach(function (n) {
          n.getAnimations().forEach(function (a) {
            try {
              a.cancel();
            } catch (e) {}
          });
          n.style.transform = "";
          n.style.opacity = "";
        });
        run();
      }, total);
    }

    // start after small paint delay
    setTimeout(run, 300 + Math.random() * 400);
  }

  // Split targets and start animations
  groups.forEach(function (g) {
    Array.from(document.querySelectorAll(g.selector)).forEach(function (el) {
      splitToChars(el);
    });
  });

  groups.forEach(function (g) {
    Array.from(document.querySelectorAll(g.selector)).forEach(function (el) {
      animateGroup(el, g.params);
    });
  });
})();
