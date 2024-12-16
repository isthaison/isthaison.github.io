const a0_0x564f4a = a0_0x3dc0;
(function (_0x477b46, _0x40e633) {
  const _0xed5cd6 = a0_0x3dc0,
    _0x543439 = _0x477b46();
  while (!![]) {
    try {
      const _0x1698b8 =
        (parseInt(_0xed5cd6(0xd8)) / 0x1) * (-parseInt(_0xed5cd6(0xf7)) / 0x2) +
        -parseInt(_0xed5cd6(0xa1)) / 0x3 +
        (parseInt(_0xed5cd6(0x111)) / 0x4) *
          (parseInt(_0xed5cd6(0x124)) / 0x5) +
        parseInt(_0xed5cd6(0xf2)) / 0x6 +
        (-parseInt(_0xed5cd6(0xea)) / 0x7) *
          (-parseInt(_0xed5cd6(0xaf)) / 0x8) +
        parseInt(_0xed5cd6(0xe0)) / 0x9 +
        parseInt(_0xed5cd6(0x11e)) / 0xa;
      if (_0x1698b8 === _0x40e633) break;
      else _0x543439["push"](_0x543439["shift"]());
    } catch (_0x3fda07) {
      _0x543439["push"](_0x543439["shift"]());
    }
  }
})(a0_0x11af, 0x38aa0);
const canvas = document[a0_0x564f4a(0xad)]("countdownCanvas"),
  ctx = canvas[a0_0x564f4a(0x101)]("2d");
(canvas[a0_0x564f4a(0xc5)] = window["innerWidth"]),
  (canvas[a0_0x564f4a(0xf6)] = window["innerHeight"]);
const FONTFAMILY = "Courier\x20New,\x20Courier,\x20monospace";
let touchCount = localStorage["getItem"](a0_0x564f4a(0xbe)),
  isMusicPlaying = ![];
const locale = {
  l1: "JUYwJTlGJThFJTg5JTIwQ2glQzMlQkFjJTIwTSVFMSVCQiVBQm5nJTIwTiVDNCU4M20lMjBNJUUxJUJCJTlCaSElMjAlRjAlOUYlOEUlODklMjAyMDI1",
  l2: "QmElQ0MlQTNuJTIwJUM0JTkxYSVDQyU4MyUyMGNoYSVDQyVBM20",
  l3: a0_0x564f4a(0xbf),
  l4: a0_0x564f4a(0x9f),
  l5: a0_0x564f4a(0x113),
  l6: a0_0x564f4a(0xa0),
  l7: a0_0x564f4a(0xb3),
  l8: a0_0x564f4a(0xb8),
  l9: a0_0x564f4a(0xfa),
  l10: a0_0x564f4a(0x10a),
  l11: a0_0x564f4a(0x126),
  l12: a0_0x564f4a(0xfc),
  l13: a0_0x564f4a(0x114),
  l14: a0_0x564f4a(0xf5),
  l15: "R2klQzMlQTJ5",
  l16: a0_0x564f4a(0xd2),
};
touchCount ? (touchCount = decodeData(touchCount)) : (touchCount = 0x0);
let angle = 0x0;
const BASE_PATH = self[a0_0x564f4a(0xb5)]["pathname"][a0_0x564f4a(0x11f)](
  /\/$/,
  ""
);
function encodeData(_0x222bf3) {
  let _0x3b37be = btoa(_0x222bf3["toString"]());
  return _0x3b37be;
}
function decodeData(_0x163da2) {
  let _0x5d2ce8 = atob(_0x163da2);
  return parseFloat(_0x5d2ce8);
}
function a0_0x3dc0(_0x4b2d02, _0x149b5d) {
  const _0x11af15 = a0_0x11af();
  return (
    (a0_0x3dc0 = function (_0x3dc0ea, _0x1681c0) {
      _0x3dc0ea = _0x3dc0ea - 0x9f;
      let _0x4f1048 = _0x11af15[_0x3dc0ea];
      return _0x4f1048;
    }),
    a0_0x3dc0(_0x4b2d02, _0x149b5d)
  );
}
function encodeString(_0x23163f) {
  const _0x11e552 = a0_0x564f4a;
  try {
    let _0x30522a = btoa(encodeURIComponent(_0x23163f));
    return _0x30522a;
  } catch (_0x2cc212) {
    return console["error"](_0x11e552(0x106), _0x2cc212), null;
  }
}
function decodeString(_0x33f007) {
  const _0x137b31 = a0_0x564f4a;
  try {
    let _0x5ab365 = decodeURIComponent(atob(_0x33f007));
    return _0x5ab365;
  } catch (_0x2e7ddb) {
    return console[_0x137b31(0xb4)](_0x137b31(0x123), _0x2e7ddb), null;
  }
}
function debounce(_0x5225b1, _0x5748e3) {
  let _0xeb933a;
  return function (..._0x1adb5f) {
    clearTimeout(_0xeb933a),
      (_0xeb933a = setTimeout(() => {
        _0x5225b1["apply"](this, _0x1adb5f);
      }, _0x5748e3));
  };
}
const music = document["getElementById"](a0_0x564f4a(0xcf));
music[a0_0x564f4a(0xdf)] = 0.5;
let lastMusicTime = Date["now"]();
const tetDate = new Date(a0_0x564f4a(0x125));
let fireworks = [],
  stars = [];
function updateFontSize() {
  const _0x1eab99 = a0_0x564f4a,
    _0x3ba722 = canvas[_0x1eab99(0xc5)],
    _0xfb2434 = canvas["height"],
    _0x1f04e1 = Math[_0x1eab99(0x112)](_0x3ba722 / 0x780, _0xfb2434 / 0x438),
    _0xa4f3dd = 0x46 * _0x1f04e1;
  return _0xa4f3dd;
}
for (let i = 0x0; i < 0xc8; i++) {
  stars[a0_0x564f4a(0xc8)]({
    x: Math[a0_0x564f4a(0x107)]() * canvas[a0_0x564f4a(0xc5)],
    y: Math[a0_0x564f4a(0x107)]() * canvas[a0_0x564f4a(0xf6)],
    radius: Math[a0_0x564f4a(0x107)]() * 0x2,
    alpha: Math[a0_0x564f4a(0x107)](),
    speed: Math[a0_0x564f4a(0x107)]() * 0.02,
  });
}
function drawStars() {
  const _0x581497 = a0_0x564f4a;
  stars[_0x581497(0x11c)]((_0x49c066) => {
    const _0x2cba25 = _0x581497;
    _0x49c066["alpha"] += _0x49c066[_0x2cba25(0xa7)];
    if (_0x49c066[_0x2cba25(0x108)] > 0x1 || _0x49c066[_0x2cba25(0x108)] < 0x0)
      _0x49c066[_0x2cba25(0xa7)] *= -0x1;
    ctx[_0x2cba25(0xff)](),
      ctx[_0x2cba25(0xbc)](
        _0x49c066["x"],
        _0x49c066["y"],
        _0x49c066[_0x2cba25(0xb6)],
        0x0,
        Math["PI"] * 0x2
      ),
      (ctx["fillStyle"] = _0x2cba25(0xeb) + _0x49c066[_0x2cba25(0x108)] + ")"),
      ctx["fill"]();
  });
}
function wrapText(
  _0x47bde1,
  _0x31bfd0,
  _0x4570fd,
  _0x592e6b,
  _0x49247f,
  _0x176aa2
) {
  const _0x182903 = a0_0x564f4a,
    _0x48a2d3 = _0x31bfd0[_0x182903(0xa9)]("\x20");
  let _0x2a56fd = "",
    _0x1f1421 = [];
  _0x48a2d3[_0x182903(0x11c)]((_0x52b829) => {
    const _0x2c4ba2 = _0x182903,
      _0xa82fdc = _0x2a56fd + _0x52b829 + "\x20",
      _0x272cd = _0x47bde1[_0x2c4ba2(0xa3)](_0xa82fdc),
      _0x36ff24 = _0x272cd["width"];
    _0x36ff24 > _0x49247f && _0x2a56fd !== ""
      ? (_0x1f1421[_0x2c4ba2(0xc8)](_0x2a56fd),
        (_0x2a56fd = _0x52b829 + "\x20"))
      : (_0x2a56fd = _0xa82fdc);
  }),
    _0x1f1421[_0x182903(0xc8)](_0x2a56fd),
    _0x1f1421[_0x182903(0x11c)]((_0x1c94ce, _0x125ebd) => {
      _0x47bde1["fillText"](
        _0x1c94ce,
        _0x4570fd,
        _0x592e6b + _0x125ebd * _0x176aa2
      );
    });
}
function drawCountdown() {
  const _0x5e20bc = a0_0x564f4a,
    _0x13a525 = new Date(),
    _0x2fbc89 = tetDate - _0x13a525,
    _0x1a1f8e = decodeString(locale["l1"]);
  if (_0x2fbc89 <= 0x0) {
    drawFireworks(),
      (ctx[_0x5e20bc(0xd9)] = _0x5e20bc(0xd0)),
      (ctx[_0x5e20bc(0xf3)] =
        "bold\x20" + updateFontSize() + _0x5e20bc(0xb0) + FONTFAMILY),
      (ctx["textAlign"] = _0x5e20bc(0xc7)),
      ctx[_0x5e20bc(0xbb)](
        _0x1a1f8e,
        canvas["width"] / 0x2,
        canvas[_0x5e20bc(0xf6)] / 0x2
      ),
      (ctx[_0x5e20bc(0xf3)] = "bold\x2012px\x20" + FONTFAMILY),
      wrapText(
        ctx,
        decodeString(locale["l2"]) +
          "\x20" +
          touchCount +
          "\x20" +
          decodeString(locale["l3"]),
        canvas["width"] / 0x2,
        canvas[_0x5e20bc(0xf6)] / 0x2 +
          Math[_0x5e20bc(0xe9)](updateFontSize(), 0xc),
        canvas[_0x5e20bc(0xc5)] * 0.8,
        0xe
      ),
      drawGift(ctx, canvas[_0x5e20bc(0xc5)] / 0x2, 0x64);
    let _0x3116bd;
    if (touchCount >= 0x4e20) _0x3116bd = decodeString(locale["l4"]);
    else {
      if (touchCount >= 0x2710) _0x3116bd = decodeString(locale["l5"]);
      else {
        if (touchCount >= 0x1388) _0x3116bd = decodeString(locale["l6"]);
        else
          touchCount >= 0x3e8
            ? (_0x3116bd = decodeString(locale["l7"]))
            : (_0x3116bd = decodeString(locale["l8"]));
      }
    }
    (ctx[_0x5e20bc(0xf3)] = _0x5e20bc(0x103) + FONTFAMILY),
      (ctx[_0x5e20bc(0x128)] = "center"),
      wrapText(
        ctx,
        _0x3116bd,
        canvas["width"] / 0x2,
        0xb4,
        canvas[_0x5e20bc(0xc5)] * 0.8,
        0xe
      );
    return;
  }
  const _0x3f6892 = updateFontSize(),
    _0x5b9e20 = Math[_0x5e20bc(0xe4)](_0x2fbc89 / (0x3e8 * 0x3c * 0x3c * 0x18)),
    _0x482020 = Math[_0x5e20bc(0xe4)](
      (_0x2fbc89 / (0x3e8 * 0x3c * 0x3c)) % 0x18
    ),
    _0x5b5eca = Math[_0x5e20bc(0xe4)]((_0x2fbc89 / (0x3e8 * 0x3c)) % 0x3c),
    _0x16b2b1 = Math[_0x5e20bc(0xe4)]((_0x2fbc89 / 0x3e8) % 0x3c),
    _0x5beb32 =
      _0x5b9e20 +
      "\x20" +
      decodeString(locale[_0x5e20bc(0xe1)]) +
      "\x20" +
      _0x482020 +
      "\x20" +
      decodeString(locale[_0x5e20bc(0xc2)]) +
      "\x20" +
      _0x5b5eca +
      "\x20" +
      decodeString(locale[_0x5e20bc(0xee)]) +
      "\x20" +
      _0x16b2b1 +
      "\x20" +
      decodeString(locale[_0x5e20bc(0x11b)]),
    _0x29bcbc = decodeString(locale[_0x5e20bc(0x117)]);
  (ctx[_0x5e20bc(0xd9)] = _0x5e20bc(0xab)),
    (ctx[_0x5e20bc(0xf3)] =
      _0x5e20bc(0xde) + _0x3f6892 + "px\x20" + FONTFAMILY),
    (ctx["textAlign"] = "center"),
    ctx[_0x5e20bc(0xbb)](
      _0x29bcbc,
      canvas[_0x5e20bc(0xc5)] / 0x2,
      canvas[_0x5e20bc(0xf6)] / 0x2 - 0x64
    ),
    (ctx[_0x5e20bc(0xf3)] =
      _0x5e20bc(0xde) + _0x3f6892 * 1.4 + _0x5e20bc(0xb0) + FONTFAMILY),
    (ctx[_0x5e20bc(0xd9)] = _0x5e20bc(0xd0)),
    ctx[_0x5e20bc(0xbb)](
      _0x5beb32,
      canvas[_0x5e20bc(0xc5)] / 0x2,
      canvas["height"] / 0x2
    );
}
function createFireworks(_0x45cf4a, _0x32136e) {
  const _0x43b186 = a0_0x564f4a;
  let _0x56af87 = "hsl(" + Math[_0x43b186(0x107)]() * 0x168 + _0x43b186(0xd1),
    _0x3f3468 = [];
  for (let _0x2d2101 = 0x0; _0x2d2101 < 0x32; _0x2d2101++) {
    _0x3f3468[_0x43b186(0xc8)]({
      x: _0x45cf4a,
      y: _0x32136e,
      radius: Math[_0x43b186(0x107)]() * 0x2 + 0x1,
      angle: Math[_0x43b186(0x107)]() * Math["PI"] * 0x2,
      speed: Math[_0x43b186(0x107)]() * 0x4 + 0x2,
      decay: Math[_0x43b186(0x107)]() * 0.05 + 0.01,
      colors: _0x56af87,
    });
  }
  fireworks[_0x43b186(0xc8)]({ sparkles: _0x3f3468 });
}
function a0_0x11af() {
  const _0x331099 = [
    "bold\x2012px\x20",
    "beginPath",
    "standalone",
    "getContext",
    "top",
    "16px\x20",
    "/tet",
    "textContent",
    "Error\x20encoding\x20string:",
    "random",
    "alpha",
    "active",
    "JUYwJTlGJThFJTgx",
    "Notification",
    "px\x20Arial",
    "sin",
    "matchMedia",
    "add",
    "selectstart",
    "275688Khxcgl",
    "min",
    "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFhMISUyME0lRTElQkIlOTl0JTIwbSVDMyVCM24lMjBxdSVDMyVBMCUyMHR1eSVFMSVCQiU4N3QlMjB2JUUxJUJCJTlEaSE",
    "R2klQzYlQTElQ0MlODA",
    "metaKey",
    "addEventListener",
    "l11",
    "colors",
    "/service-worker.js",
    "position",
    "l15",
    "forEach",
    "prompt",
    "3826230fTyrBS",
    "replace",
    "remove",
    "preventDefault",
    "textBaseline",
    "Error\x20decoding\x20string:",
    "5mTTMjX",
    "2025-02-10T00:00:00",
    "JUYwJTlGJThFJTg5JTIwVCVFMSVCQSVCRnQlMjBOZ3V5JUMzJUFBbiUyMCVDNCU5MCVDMyVBMW4lMjAyMDI1JTIwJUYwJTlGJThFJTg5",
    "load",
    "textAlign",
    "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFhYWEwlMjB2JUUxJUJCJTlCaSUyMGdpJUUxJUJBJUEzaSUyMHRoJUM2JUIwJUUxJUJCJTlGbmclMjB4JUUxJUJCJUE5bmclMjAlQzQlOTElQzMlQTFuZyE",
    "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMEwhJTIwQ2glQzMlQkFjJTIwbSVFMSVCQiVBQm5nJTIwYiVFMSVCQSVBMW4h",
    "1329765HcOnGR",
    "innerHeight",
    "measureText",
    "bottom",
    "splice",
    "href",
    "speed",
    "decay",
    "split",
    "pause",
    "yellow",
    "body",
    "getElementById",
    "clearRect",
    "68144nqUflS",
    "px\x20",
    "zIndex",
    "20px",
    "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyME0hJTIwTSVFMSVCQiU5OXQlMjBtJUMzJUIzbiUyMHF1JUMzJUEwJTIwbmglRTElQkIlOEYlMjB0aCVDMyVCNGkh",
    "error",
    "location",
    "radius",
    "userChoice",
    "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFMhJTIwQyVFMSVCQiU5MSUyMGclRTElQkElQUZuZyUyMGglQzYlQTFuJTIwbiVFMSVCQiVBRmEh",
    "defineProperty",
    "angle",
    "fillText",
    "arc",
    "left",
    "touchCount",
    "bCVDMyVBMiVDQyU4MG4uJTIwVGglQzMlQTIlQ0MlQTN0JTIwbGElQ0MlODAlMjBkJUM2JUIwJUNDJTgzJTIwZCVDMyVCNCVDQyVBM2klRTIlOUMlQTglRTIlOUMlQTglRjAlOUYlOEMlQjglRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRTIlOUMlQTglRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRjAlOUYlOEUlODlDaHUlQ0MlODFjJTIwYmElQ0MlQTNuJTIwdmElQ0MlODAlMjBnaWElMjAlQzQlOTFpJUNDJTgwbmglMjBtJUMzJUI0JUNDJUEzdCUyMG4lQzQlODNtJTIwbSVDNiVBMSVDQyU4MWklMjB0cmElQ0MlODBuJTIwbmclQzMlQTIlQ0MlQTNwJTIwbmklQzMlQUElQ0MlODBtJTIwdnVpJTIwdmElQ0MlODAlMjBoYSVDQyVBM25oJTIwcGh1JUNDJTgxYyElMjBNb25nJTIwciVDNCU4MyVDQyU4MG5nJTIwbW8lQ0MlQTNpJTIwJUM0JTkxaSVDMyVBQSVDQyU4MHUlMjBiYSVDQyVBM24lMjBtJUM2JUExJTIwJUM2JUIwJUM2JUExJUNDJTgxYyUyMHNlJUNDJTgzJTIwdHIlQzYlQTElQ0MlODklMjB0aGElQ0MlODBuaCUyMGhpJUMzJUFBJUNDJUEzbiUyMHRoJUM2JUIwJUNDJUEzYyUyQyUyMG1vJUNDJUEzaSUyMGtobyVDQyU4MSUyMGtoJUM0JTgzbiUyMGNoaSVDQyU4OSUyMGxhJUNDJTgwJTIwbmglQzYlQjAlQ0MlODNuZyUyMGMlQzMlQTJ1JTIwY2h1eSVDMyVBQSVDQyVBM24lMjAlQzQlOTFhJUNDJTgzJTIwcXVhLiUyMEhhJUNDJTgzeSUyMGx1JUMzJUI0biUyMGMlQzYlQjAlQzYlQTElQ0MlODBpJTIwdGglQzMlQTIlQ0MlQTN0JTIwdCVDNiVCMCVDNiVBMWklMjB2YSVDQyU4MCUyMHRyYSVDQyU4MG4lMjAlQzQlOTElQzMlQTIlQ0MlODB5JTIwbiVDNCU4M25nJTIwbCVDNiVCMCVDNiVBMSVDQyVBM25nJTIwdHJvbmclMjBuJUM0JTgzbSUyMG0lQzYlQTElQ0MlODFpJTIwbmElQ0MlODB5JTIwbmhlJUNDJTgxISUyMENoJUMzJUJBYyUyMGIlRTElQkElQTFuJTIwbSVFMSVCQiU5OXQlMjBuJUM0JTgzbSUyMG0lQzYlQTElQ0MlODFpJTIwYW4lMjBraGFuZyUyQyUyMHRoJUUxJUJCJThCbmglMjB2JUM2JUIwJUUxJUJCJUEzbmclMkMlMjB2YSVDQyU4MCUyMHRoJUUxJUJBJUFEdCUyMG5oaSVFMSVCQiU4MXUlMjB5JUMzJUFBdSUyMHRoJUM2JUIwJUM2JUExbmchJUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUUyJTlDJUE4JUUyJTlDJUE4JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5",
    "1000",
    "style",
    "l13",
    "createElement",
    "then",
    "width",
    "sparkles",
    "center",
    "push",
    "clientX",
    "cos",
    "appendChild",
    "matches",
    "getBoundingClientRect",
    "userAgent",
    "backgroundMusic",
    "white",
    ",\x20100%,\x2050%)",
    "JUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJGJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJEJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJDJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJFJUYwJTlGJTkxJUFDJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJFJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJF",
    "button",
    "register",
    "innerWidth",
    "Mobile\x20form\x20factor\x20detected.",
    "(display-mode:\x20standalone)",
    "2ikftiX",
    "fillStyle",
    "shiftKey",
    "setItem",
    "serviceWorker",
    "mobile-install",
    "bold\x20",
    "volume",
    "1394919mBLGRd",
    "l12",
    "now",
    "F12",
    "floor",
    "keydown",
    "Mobi",
    "resize",
    "classList",
    "max",
    "182vsAwIl",
    "rgba(255,\x20255,\x20255,\x20",
    "log",
    "length",
    "l14",
    "key",
    "l16",
    "right",
    "1009626ESIOCy",
    "font",
    "about:blank",
    "UGh1JUNDJTgxdA",
    "height",
    "320924LgPpGN",
    "click",
    "desktop-install",
    "JUM0JTkwaSVDMyVBQSVDQyU4OW0lMjBzJUMzJUI0JUNDJTgxJTIwY3UlQ0MlODlhJTIwYmElQ0MlQTNuJTNB",
    "clientY",
    "TmdhJUNDJTgweQ",
    "ctrlKey",
  ];
  a0_0x11af = function () {
    return _0x331099;
  };
  return a0_0x11af();
}
function drawFireworks() {
  const _0xecce = a0_0x564f4a;
  fireworks[_0xecce(0x11c)]((_0x3e99e7, _0x1a8c3b) => {
    const _0x2b5f9a = _0xecce;
    _0x3e99e7["sparkles"]["forEach"]((_0x308919, _0x2996d0) => {
      const _0x553bc4 = a0_0x3dc0;
      (_0x308919["x"] +=
        Math[_0x553bc4(0xca)](_0x308919[_0x553bc4(0xba)]) *
        _0x308919[_0x553bc4(0xa7)]),
        (_0x308919["y"] +=
          Math[_0x553bc4(0x10d)](_0x308919[_0x553bc4(0xba)]) *
          _0x308919[_0x553bc4(0xa7)]),
        (_0x308919[_0x553bc4(0xb6)] = Math[_0x553bc4(0xe9)](
          _0x308919["radius"] - _0x308919[_0x553bc4(0xa8)],
          0x0
        )),
        _0x308919[_0x553bc4(0xb6)] > 0x0
          ? (ctx["beginPath"](),
            ctx["arc"](
              _0x308919["x"],
              _0x308919["y"],
              _0x308919[_0x553bc4(0xb6)],
              0x0,
              Math["PI"] * 0x2
            ),
            (ctx[_0x553bc4(0xd9)] = _0x308919[_0x553bc4(0x118)]),
            ctx["fill"]())
          : _0x3e99e7["sparkles"][_0x553bc4(0xa5)](_0x2996d0, 0x1);
    });
    if (_0x3e99e7[_0x2b5f9a(0xc6)][_0x2b5f9a(0xed)] === 0x0)
      fireworks[_0x2b5f9a(0xa5)](_0x1a8c3b, 0x1);
  });
}
function createRandomFireworks() {
  const _0x314479 = a0_0x564f4a,
    _0x16f4ac = Math[_0x314479(0x107)]() * canvas[_0x314479(0xc5)],
    _0x4599db = canvas[_0x314479(0xf6)];
  createFireworks(_0x16f4ac, _0x4599db);
}
function startMusic() {
  const _0x5a5a6f = a0_0x564f4a;
  (isMusicPlaying = !![]),
    musicIcon[_0x5a5a6f(0xe8)][_0x5a5a6f(0x10f)](_0x5a5a6f(0x109)),
    music["play"]()["catch"]((_0x210023) =>
      console[_0x5a5a6f(0xec)](_0x210023)
    );
}
const increaseTouchCount = debounce(() => {
  const _0x1f2fa = a0_0x564f4a;
  localStorage[_0x1f2fa(0xdb)](_0x1f2fa(0xbe), encodeData(touchCount));
}, 0xc8);
canvas[a0_0x564f4a(0x116)]("click", (_0x15c685) => {
  const _0x3cf84d = a0_0x564f4a,
    _0x230f10 = canvas[_0x3cf84d(0xcd)]();
  createFireworks(
    _0x15c685[_0x3cf84d(0xc9)] - _0x230f10[_0x3cf84d(0xbd)],
    _0x15c685[_0x3cf84d(0xfb)] - _0x230f10[_0x3cf84d(0x102)]
  ),
    touchCount++,
    increaseTouchCount();
});
function drawTouchCount() {
  const _0x5c4730 = a0_0x564f4a;
  (ctx[_0x5c4730(0xf3)] = _0x5c4730(0xfe) + FONTFAMILY),
    (ctx[_0x5c4730(0xd9)] = _0x5c4730(0xd0)),
    (ctx["textAlign"] = _0x5c4730(0xbd)),
    ctx[_0x5c4730(0xbb)](
      decodeString(locale["l9"]) + "\x20" + touchCount,
      0x14,
      0x32
    );
}
function animate() {
  const _0x3d7859 = a0_0x564f4a;
  ctx[_0x3d7859(0xae)](0x0, 0x0, canvas["width"], canvas[_0x3d7859(0xf6)]),
    drawStars(),
    drawCountdown(),
    drawFireworks(),
    drawTouchCount();
  const _0x3e35db = Date[_0x3d7859(0xe2)]();
  _0x3e35db - lastMusicTime >= 0x3e8 * 0x3c &&
    isMusicPlaying == !![] &&
    ((touchCount += 0xa), (lastMusicTime = _0x3e35db), increaseTouchCount()),
    requestAnimationFrame(animate);
}
setInterval(createRandomFireworks, Math["random"]() * 0x3e8 + 0x3e8),
  (canvas["width"] = window[a0_0x564f4a(0xd5)]),
  (canvas["height"] = window[a0_0x564f4a(0xa2)]),
  animate(),
  window["addEventListener"](a0_0x564f4a(0xe7), () => {
    const _0x532d9c = a0_0x564f4a;
    (canvas["width"] = window[_0x532d9c(0xd5)]),
      (canvas[_0x532d9c(0xf6)] = window[_0x532d9c(0xa2)]);
  }),
  window["addEventListener"](a0_0x564f4a(0xf8), startMusic, { once: !![] }),
  musicIcon["addEventListener"](a0_0x564f4a(0xf8), () => {
    const _0x166340 = a0_0x564f4a;
    isMusicPlaying
      ? (music[_0x166340(0xaa)](),
        musicIcon["classList"][_0x166340(0x120)](_0x166340(0x109)))
      : (music["play"](),
        musicIcon[_0x166340(0xe8)][_0x166340(0x10f)](_0x166340(0x109))),
      (isMusicPlaying = !isMusicPlaying);
  });
function getGiftSize(_0x4fba6f) {
  if (_0x4fba6f >= 0x4e20) return 0x96;
  if (_0x4fba6f >= 0x2710) return 0x78;
  if (_0x4fba6f >= 0x1388) return 0x5a;
  if (_0x4fba6f >= 0x3e8) return 0x46;
  if (_0x4fba6f >= 0x64) return 0x32;
  return 0x1e;
}
function drawGift(_0x314e0e, _0x4e28b5, _0x584726) {
  const _0x32a69c = a0_0x564f4a,
    _0x3fce5d = getGiftSize(touchCount),
    _0x493d81 = Math[_0x32a69c(0x10d)](angle) * 0x5,
    _0x5ae2f0 = Math["cos"](angle) * 0x2;
  (_0x314e0e[_0x32a69c(0xf3)] = _0x3fce5d + _0x32a69c(0x10c)),
    (_0x314e0e[_0x32a69c(0x128)] = _0x32a69c(0xc7)),
    (_0x314e0e[_0x32a69c(0x122)] = "top"),
    _0x314e0e[_0x32a69c(0xbb)](
      decodeString(locale["l10"]),
      _0x4e28b5 + _0x493d81,
      _0x584726 + _0x5ae2f0
    ),
    (angle += 0.1);
}
navigator[a0_0x564f4a(0xce)]["includes"](a0_0x564f4a(0xe6))
  ? (console[a0_0x564f4a(0xec)](a0_0x564f4a(0xd6)),
    document[a0_0x564f4a(0xac)][a0_0x564f4a(0xe8)][a0_0x564f4a(0x10f)](
      a0_0x564f4a(0xdd)
    ))
  : (console[a0_0x564f4a(0xec)](
      "Desktop\x20or\x20Tablet\x20form\x20factor\x20detected."
    ),
    document[a0_0x564f4a(0xac)][a0_0x564f4a(0xe8)]["add"](a0_0x564f4a(0xf9)));
if (a0_0x564f4a(0xdc) in navigator && a0_0x564f4a(0x10b) in window) {
  function showInstallPrompt() {
    const _0x262e0d = a0_0x564f4a;
    window[_0x262e0d(0x116)]("beforeinstallprompt", (_0x339daa) => {
      const _0x231ad6 = _0x262e0d;
      _0x339daa[_0x231ad6(0x121)]();
      let _0x50d123 = _0x339daa;
      const _0x1ec4ea = document[_0x231ad6(0xc3)](_0x231ad6(0xd3));
      (_0x1ec4ea[_0x231ad6(0x105)] = "Cài\x20đặt"),
        (_0x1ec4ea[_0x231ad6(0xc1)][_0x231ad6(0x11a)] = "fixed"),
        (_0x1ec4ea["style"][_0x231ad6(0xa4)] = _0x231ad6(0xb2)),
        (_0x1ec4ea[_0x231ad6(0xc1)][_0x231ad6(0xf1)] = _0x231ad6(0xb2)),
        (_0x1ec4ea[_0x231ad6(0xc1)][_0x231ad6(0xb1)] = _0x231ad6(0xc0)),
        _0x1ec4ea[_0x231ad6(0x116)](_0x231ad6(0xf8), () => {
          const _0x5a4071 = _0x231ad6;
          _0x50d123[_0x5a4071(0x11d)](),
            _0x50d123[_0x5a4071(0xb7)][_0x5a4071(0xc4)]((_0x5e8658) => {
              _0x50d123 = null;
            });
        }),
        document[_0x231ad6(0xac)][_0x231ad6(0xcb)](_0x1ec4ea);
    }),
      window[_0x262e0d(0x10e)](_0x262e0d(0xd7))[_0x262e0d(0xcc)] &&
        (window[_0x262e0d(0xb5)][_0x262e0d(0xa6)] = _0x262e0d(0x104));
  }
  window[a0_0x564f4a(0x116)](a0_0x564f4a(0x127), () => {
    const _0x5007a8 = a0_0x564f4a;
    navigator[_0x5007a8(0xdc)]
      [_0x5007a8(0xd4)](BASE_PATH + _0x5007a8(0x119))
      [_0x5007a8(0xc4)]((_0x37a735) => {
        const _0x22ce7a = _0x5007a8;
        if (window[_0x22ce7a(0x10e)](_0x22ce7a(0xd7))[_0x22ce7a(0xcc)]) return;
        window["navigator"][_0x22ce7a(0x100)] === undefined &&
          showInstallPrompt();
      });
  });
}
document[a0_0x564f4a(0x116)](a0_0x564f4a(0xe5), (_0x2525e3) => {
  const _0x28b869 = a0_0x564f4a;
  _0x2525e3[_0x28b869(0xef)] === _0x28b869(0xe3) &&
    (_0x2525e3[_0x28b869(0x121)](),
    alert(decodeString(locale[_0x28b869(0xf0)]))),
    (_0x2525e3[_0x28b869(0xfd)] || _0x2525e3[_0x28b869(0x115)]) &&
      _0x2525e3[_0x28b869(0xda)] &&
      _0x2525e3["key"] === "I" &&
      (_0x2525e3["preventDefault"](),
      alert(decodeString(locale[_0x28b869(0xf0)]))),
    (_0x2525e3["ctrlKey"] || _0x2525e3[_0x28b869(0x115)]) &&
      _0x2525e3[_0x28b869(0xef)] === "U" &&
      (_0x2525e3[_0x28b869(0x121)](),
      alert(decodeString(locale[_0x28b869(0xf0)]))),
    (_0x2525e3[_0x28b869(0xfd)] || _0x2525e3[_0x28b869(0x115)]) &&
      _0x2525e3[_0x28b869(0xda)] &&
      _0x2525e3[_0x28b869(0xef)] === "J" &&
      (_0x2525e3[_0x28b869(0x121)](),
      alert(decodeString(locale[_0x28b869(0xf0)]))),
    (_0x2525e3[_0x28b869(0xfd)] || _0x2525e3[_0x28b869(0x115)]) &&
      _0x2525e3[_0x28b869(0xda)] &&
      _0x2525e3[_0x28b869(0xef)] === "C" &&
      (_0x2525e3[_0x28b869(0x121)](), alert(decodeString(locale["l16"])));
}),
  document[a0_0x564f4a(0x116)]("contextmenu", (_0x558974) => {
    const _0x193044 = a0_0x564f4a;
    _0x558974[_0x193044(0x121)](), alert(decodeString(locale[_0x193044(0xf0)]));
  }),
  (function () {
    const _0x6ae1d7 = a0_0x564f4a,
      _0x125f45 = new Image();
    Object[_0x6ae1d7(0xb9)](_0x125f45, "id", {
      get: function () {
        const _0xb04cff = _0x6ae1d7;
        alert(decodeString(locale[_0xb04cff(0xf0)])),
          (window[_0xb04cff(0xb5)][_0xb04cff(0xa6)] = _0xb04cff(0xf4));
      },
    }),
      console[_0x6ae1d7(0xec)](_0x125f45);
  })(),
  document["addEventListener"](a0_0x564f4a(0x110), function (_0x57d977) {
    const _0x25faae = a0_0x564f4a;
    _0x57d977[_0x25faae(0x121)]();
  });
