const canvas = document.getElementById("countdownCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const FONTFAMILY = "Courier New, Courier, monospace";
let isMusicPlaying = false;
const ver = "2.3.12";
let visibilitychange = true;
let angle = 0; // Góc để tạo hiệu ứng lắc lư
const music = document.getElementById("backgroundMusic");
const musicIcon = document.getElementById("musicIcon");
music.volume = 0.5;
let lastMusicTime = Date.now(); // Lưu thời gian gần nhất chơi nhạc

const tetDate = new Date("2026-02-17T00:00:00+07:00");
let fireworks = [];
let stars = [];
const locale = {
  l1: "JUYwJTlGJThFJTg5JTIwQ2glQzMlQkFjJTIwTSVFMSVCQiVBQm5nJTIwTiVDNCU4M20lMjBNJUUxJUJCJTlCaSElMjAlRjAlOUYlOEUlODk",
  l2: `QmElQ0MlQTNuJTIwJUM0JTkxYSVDQyU4MyUyMGNoYSVDQyVBM20`,
  l3: `bCVDMyVBMiVDQyU4MG4uJTIwVGglQzMlQTIlQ0MlQTN0JTIwbGElQ0MlODAlMjBkJUM2JUIwJUNDJTgzJTIwZCVDMyVCNCVDQyVBM2klRTIlOUMlQTglRTIlOUMlQTglRjAlOUYlOEMlQjglRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRTIlOUMlQTglRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRjAlOUYlOEUlODlDaHUlQ0MlODFjJTIwYmElQ0MlQTNuJTIwdmElQ0MlODAlMjBnaWElMjAlQzQlOTFpJUNDJTgwbmglMjBtJUMzJUI0JUNDJUEzdCUyMG4lQzQlODNtJTIwbSVDNiVBMSVDQyU4MWklMjB0cmElQ0MlODBuJTIwbmclQzMlQTIlQ0MlQTNwJTIwbmklQzMlQUElQ0MlODBtJTIwdnVpJTIwdmElQ0MlODAlMjBoYSVDQyVBM25oJTIwcGh1JUNDJTgxYyElMjBNb25nJTIwciVDNCU4MyVDQyU4MG5nJTIwbW8lQ0MlQTNpJTIwJUM0JTkxaSVDMyVBQSVDQyU4MHUlMjBiYSVDQyVBM24lMjBtJUM2JUExJTIwJUM2JUIwJUM2JUExJUNDJTgxYyUyMHNlJUNDJTgzJTIwdHIlQzYlQTElQ0MlODklMjB0aGElQ0MlODBuaCUyMGhpJUMzJUFBJUNDJUEzbiUyMHRoJUM2JUIwJUNDJUEzYyUyQyUyMG1vJUNDJUEzaSUyMGtobyVDQyU4MSUyMGtoJUM0JTgzbiUyMGNoaSVDQyU4OSUyMGxhJUNDJTgwJTIwbmglQzYlQjAlQ0MlODNuZyUyMGMlQzMlQTJ1JTIwY2h1eSVDMyVBQSVDQyVBM24lMjAlQzQlOTFhJUNDJTgzJTIwcXVhLiUyMEhhJUNDJTgzeSUyMGx1JUMzJUI0biUyMGMlQzYlQjAlQzYlQTElQ0MlODBpJTIwdGglQzMlQTIlQ0MlQTN0JTIwdCVDNiVCMCVDNiVBMWklMjB2YSVDQyU4MCUyMHRyYSVDQyU4MG4lMjAlQzQlOTElQzMlQTIlQ0MlODB5JTIwbiVDNCU4M25nJTIwbCVDNiVCMCVDNiVBMSVDQyVBM25nJTIwdHJvbmclMjBuJUM0JTgzbSUyMG0lQzYlQTElQ0MlODFpJTIwbmElQ0MlODB5JTIwbmhlJUNDJTgxISUyMENoJUMzJUJBYyUyMGIlRTElQkElQTFuJTIwbSVFMSVCQiU5OXQlMjBuJUM0JTgzbSUyMG0lQzYlQTElQ0MlODFpJTIwYW4lMjBraGFuZyUyQyUyMHRoJUUxJUJCJThCbmglMjB2JUM2JUIwJUUxJUJCJUEzbmclMkMlMjB2YSVDQyU4MCUyMHRoJUUxJUJBJUFEdCUyMG5oaSVFMSVCQiU4MXUlMjB5JUMzJUFBdSUyMHRoJUM2JUIwJUM2JUExbmchJUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUUyJTlDJUE4JUUyJTlDJUE4JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5`,
  l4: `JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFhYWEwlMjB2JUUxJUJCJTlCaSUyMGdpJUUxJUJBJUEzaSUyMHRoJUM2JUIwJUUxJUJCJTlGbmclMjB4JUUxJUJCJUE5bmclMjAlQzQlOTElQzMlQTFuZyE`,
  l5: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFhMISUyME0lRTElQkIlOTl0JTIwbSVDMyVCM24lMjBxdSVDMyVBMCUyMHR1eSVFMSVCQiU4N3QlMjB2JUUxJUJCJTlEaSE",
  l6: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMEwhJTIwQ2glQzMlQkFjJTIwbSVFMSVCQiVBQm5nJTIwYiVFMSVCQSVBMW4h",
  l7: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyME0hJTIwTSVFMSVCQiU5OXQlMjBtJUMzJUIzbiUyMHF1JUMzJUEwJTIwbmglRTElQkIlOEYlMjB0aCVDMyVCNGkh",
  l8: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFMhJTIwQyVFMSVCQiU5MSUyMGclRTElQkElQUZuZyUyMGglQzYlQTFuJTIwbiVFMSVCQiVBRmEh",
  l9: `JUM0JTkwaSVDMyVBQSVDQyU4OW0lMjBzJUMzJUI0JUNDJTgxJTIwY3UlQ0MlODlhJTIwYmElQ0MlQTNuJTNB`,
  l10: `JUYwJTlGJThFJTgx`,
  l11: `JUYwJTlGJThFJTg5JTIwVCVFMSVCQSVCRnQlMjBOZ3V5JUMzJUFBbiUyMCVDNCU5MCVDMyVBMW4lMjAlN0J5ZWFyJTdEJTIwJUYwJTlGJThFJTg5`,
  l12: `TmdhJUNDJTgweQ`,
  l13: `R2klQzYlQTElQ0MlODA`,
  l14: `UGh1JUNDJTgxdA`,
  l15: `R2klQzMlQTJ5`,
  l16: `JUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJGJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJEJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJDJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJFJUYwJTlGJTkxJUFDJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJFJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJF`,
  l17: `MQ`,
  l18: `MTA`,
  l19: `dG91Y2hDb3VudA`,
};

const decodeData = (encodedData) => parseFloat(atob(encodedData) || "0");
const BASE_PATH = self.location.pathname.replace(/\/$/, "") || "";

// NOTE: Do NOT clear localStorage here — that can erase useful user data.
// Initialize client-side signed score, rate-limiter, and tamper detection helpers.
const SECRET_OBF = "kj3f9KJf9s8dFj39fK"; // client-obfuscated secret (not fully secure)
// CLIENT-ONLY MITIGATIONS: This increases difficulty for casual tampering by signing score and validating periodically.
// It is NOT a replacement for server-side authoritative score validation. An attacker with access to client JS can still forge signatures.
const STORAGE_KEYS = { score: locale.l19, sig: `${locale.l19}_sig_v1` };
let currentScore = 0;
let tamperDetected = false;
let incrementTimestamps = []; // timestamps of recent increments (ms)

async function computeHMAC(message) {
  try {
    const keyData = new TextEncoder().encode(SECRET_OBF);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(String(message))
    );
    return Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (e) {
    console.error("computeHMAC error", e);
    return null;
  }
}

async function verifyHMAC(message, signature) {
  try {
    const expected = await computeHMAC(message);
    return expected === signature;
  } catch (e) {
    console.error("verifyHMAC error", e);
    return false;
  }
}

async function saveSignedScore(score) {
  try {
    const sig = await computeHMAC(String(score));
    localStorage.setItem(STORAGE_KEYS.score, btoa(String(score)));
    localStorage.setItem(STORAGE_KEYS.sig, sig); // Keep a lightweight local backup (unsigned) for recovery heuristics
    try {
      localStorage.setItem(`${STORAGE_KEYS.score}_bak`, btoa(String(score)));
    } catch (e) {}
  } catch (e) {
    console.error("saveSignedScore error", e);
  }
}

async function loadSignedScore() {
  try {
    const encoded = localStorage.getItem(STORAGE_KEYS.score);
    const sig = localStorage.getItem(STORAGE_KEYS.sig);
    if (!encoded || !sig) {
      currentScore = 0;
      await saveSignedScore(0);
      return;
    }
    const score = parseFloat(atob(encoded) || "0");
    const valid = await verifyHMAC(String(score), sig);
    if (valid) {
      currentScore = score;
      tamperDetected = false;
    } else {
      console.warn("Score signature invalid — possible tampering detected.");
      tamperDetected = true;
      // Attempt recovery from local backup (unsigned), if reasonable
      const bak = localStorage.getItem(`${STORAGE_KEYS.score}_bak`);
      if (bak) {
        const bakScore = parseFloat(atob(bak) || "0");
        if (Math.abs(bakScore - score) < 1000) {
          console.warn("Restoring from unsigned backup.");
          currentScore = bakScore;
          await saveSignedScore(currentScore);
          return;
        }
      }
      // else reset to safe default
      currentScore = 0;
      await saveSignedScore(0);
    }
  } catch (e) {
    console.error("loadSignedScore error", e);
    currentScore = 0;
  }
}

// Rate limit helpers
function pruneTimestamps(windowMs) {
  const cutoff = Date.now() - windowMs;
  incrementTimestamps = incrementTimestamps.filter((t) => t >= cutoff);
}

function canIncrement(delta) {
  // Basic heuristics
  pruneTimestamps(1000); // 1s
  if (incrementTimestamps.length >= 5) return false; // >5 per second
  pruneTimestamps(60000); // 1m
  if (incrementTimestamps.length >= 500) return false; // >500 per minute
  if (Math.abs(delta) > 1000) return false; // very large single change
  return true;
}

async function incrementScore(delta) {
  try {
    if (!canIncrement(delta)) {
      console.warn("Rate limit or invalid delta, increment rejected:", delta);
      return;
    }
    incrementTimestamps.push(Date.now());
    currentScore = Math.max(0, currentScore + Number(delta));
    await saveSignedScore(currentScore);
  } catch (e) {
    console.error("incrementScore error", e);
  }
}

// Initialize signed score on load
(async () => {
  await loadSignedScore();
  setInterval(async () => {
    // Periodic check for tampering (double-check signature)
    const encoded = localStorage.getItem(STORAGE_KEYS.score);
    const sig = localStorage.getItem(STORAGE_KEYS.sig);
    if (encoded && sig) {
      const score = parseFloat(atob(encoded) || "0");
      const valid = await verifyHMAC(String(score), sig);
      if (!valid) {
        console.warn("Periodic check: tamper detected, resetting score.");
        tamperDetected = true;
        currentScore = 0;
        await saveSignedScore(0);
      }
    }
  }, 5000);
})();
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
const touchCountSet = debounce(() => {
  // Persist current score with signature
  saveSignedScore(currentScore).catch(console.error);
}, 200);
// Persist current score once at startup
touchCountSet();

const getup = () => Number(currentScore || 0);

const encodeData = (data) => btoa(data.toString());

const encodeString = (str) => btoa(encodeURIComponent(str));
const decodeString = (encodedStr) => decodeURIComponent(atob(encodedStr));
const randomFrom = () => Math.floor(Math.random() * 4);

const up = async (N) => {
  try {
    const delta = decodeData(N);
    await incrementScore(delta);
    touchCountSet();
  } catch (e) {
    console.error("up error", e);
  }
};
const updateFontSize = () => {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Tỷ lệ phần trăm dựa trên chiều rộng và chiều cao của canvas
  const scale = Math.min(canvasWidth / 1920, canvasHeight / 1080); // Adjust this based on your base resolution

  const fontSize = 70 * scale; // Điều chỉnh số 50 này tùy thuộc vào kích thước font mong muốn

  return fontSize;
};

// Tạo nền ngôi sao lấp lánh
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    alpha: Math.random(),
    speed: Math.random() * 0.02,
  });
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let lines = [];

  words.forEach((word) => {
    const testLine = line + word + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && line !== "") {
      lines.push(line);
      line = word + " ";
    } else {
      line = testLine;
    }
  });
  lines.push(line); // Dòng cuối cùng

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

function createFireworks(x, y) {
  try {
    let colors = `hsl(${Math.random() * 360}, 100%, 50%)`;
    let sparkles = [];
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x,
        y,
        radius: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 4 + 2,
        decay: Math.random() * 0.05 + 0.01,
        colors,
      });
    }
    fireworks.push({ sparkles });
  } catch (error) {
    console.log("[createFireworks]", error);
  }
}

function drawFireworks() {
  if (!visibilitychange) return;
  try {
    fireworks.forEach((fw, index) => {
      fw.sparkles.forEach((sp, i) => {
        sp.x += Math.cos(sp.angle) * sp.speed;
        sp.y += Math.sin(sp.angle) * sp.speed;
        sp.radius = Math.max(sp.radius - sp.decay, 0); // Đảm bảo bán kính không âm

        if (sp.radius > 0) {
          ctx.beginPath();
          ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
          ctx.fillStyle = sp.colors;
          ctx.fill();
        } else {
          fw.sparkles.splice(i, 1); // Loại bỏ các hạt đã hết bán kính
        }
      });

      if (fw.sparkles.length === 0) fireworks.splice(index, 1); // Xóa pháo hoa khi không còn tia sáng
    });
  } catch (error) {
    console.log("[drawFireworks]", error);
  }
}

// Pháo hoa tự động bắn ngẫu nhiên từ đáy màn hình
function createRandomFireworks() {
  if (!visibilitychange) return;
  (async () => {
    const now = Date.now();
    if (now - lastMusicTime >= 1000 * 60 && isMusicPlaying == true) {
      up(locale.l18);
      lastMusicTime = now;
    }
  })();
  const x = Math.random() * canvas.width; // Vị trí ngẫu nhiên theo chiều ngang
  const y = Math.random() * canvas.height; // Bắn từ đáy màn hình
  createFireworks(x, y);
}

// Hàm xử lý tăng số lần chạm

// Thêm sự kiện nhấp chuột để tạo pháo hoa
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  createFireworks(event.clientX - rect.left, event.clientY - rect.top);
  up(locale.l17);
});
// Vẽ số lần touch
function drawTouchCount() {
  ctx.font = `bold 12px ${FONTFAMILY}`;
  ctx.fillStyle = tamperDetected ? "orange" : "white";
  ctx.textAlign = "left";
  let text = `${decodeString(locale.l9)} ${getup()}`;
  if (tamperDetected) text += " (Tamper detected)";
  ctx.fillText(text, 20, 50);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  (function () {
    stars.forEach((star) => {
      star.alpha += star.speed;
      if (star.alpha > 1 || star.alpha < 0) star.speed *= -1;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });
  })();
  (function () {
    const now = new Date();
    const diff = tetDate - now;
    const tet = decodeString(locale.l1);
    ctx.font = `bold 12px ${FONTFAMILY}`;
    ctx.fillText(ver, 2, 12);

    if (diff <= 0 && 1 == 1 && 2 == 2) {
      drawFireworks();
      ctx.fillStyle = "white";
      ctx.font = `bold ${updateFontSize()}px ${FONTFAMILY}`;
      ctx.textAlign = "center";
      ctx.fillText(
        `${tet} ${tetDate.getFullYear()}`,
        canvas.width / 2,
        canvas.height / 2
      );
      ctx.font = `bold 12px ${FONTFAMILY}`;
      wrapText(
        ctx,
        `${decodeString(locale.l2)} ${getup()} ${decodeString(locale.l3)}`,
        canvas.width / 2,
        canvas.height / 2 + Math.max(updateFontSize(), 12),
        canvas.width * 0.8,
        14
      );
      drawGift(ctx, canvas.width / 2, 100);

      // Vẽ văn bản giải thưởng
      let message;
      if (getup() >= 20000) {
        message = decodeString(locale.l4);
      } else if (getup() >= 10000) {
        message = decodeString(locale.l5);
      } else if (getup() >= 5000) {
        message = decodeString(locale.l6);
      } else if (getup() >= 1000) {
        message = decodeString(locale.l7);
      } else {
        message = decodeString(locale.l8);
      }

      ctx.font = `16px ${FONTFAMILY}`;
      ctx.textAlign = "center";
      wrapText(ctx, message, canvas.width / 2, 180, canvas.width * 0.8, 14);
      return;
    }
    const fontSize = updateFontSize();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const text = `${days} ${decodeString(locale.l12)} ${hours} ${decodeString(
      locale.l13
    )} ${minutes} ${decodeString(locale.l14)} ${seconds} ${decodeString(
      locale.l15
    )}`;
    const label = decodeString(locale.l11).replace(
      "{year}",
      tetDate.getFullYear()
    );
    ctx.fillStyle = "yellow";
    ctx.font = `bold ${fontSize}px ${FONTFAMILY}`;
    ctx.textAlign = "center";
    ctx.fillText(label, canvas.width / 2, canvas.height / 2 - 100);

    ctx.font = `bold ${fontSize * 1.4}px ${FONTFAMILY}`;
    ctx.fillStyle = "white";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  })();
  drawFireworks();
  drawTouchCount();

  requestAnimationFrame(animate);
}
setInterval(createRandomFireworks, Math.random() * 1000 + 1000);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
animate();
// Điều chỉnh kích thước canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Phát nhạc nền
function startMusic() {
  isMusicPlaying = true;
  musicIcon?.classList.add("active");
  music.play().catch((error) => console.log(error));
}
// Bắt đầu phát nhạc khi tương tác
window.addEventListener("click", startMusic, { once: true });
// Điều khiển nhạc bằng icon
musicIcon?.addEventListener("click", () => {
  if (isMusicPlaying) {
    music?.pause();
    musicIcon?.classList.remove("active");
  } else {
    music?.play();
    musicIcon?.classList.add("active");
  }
  isMusicPlaying = !isMusicPlaying;
});

function getGiftSize(score) {
  if (score >= 20000) return 150; // Cấp 5
  if (score >= 10000) return 120; // Cấp 4
  if (score >= 5000) return 90; // Cấp 3
  if (score >= 1000) return 70; // Cấp 2
  if (score >= 100) return 50; // Cấp 1
  return 30; // Mặc định
}

function drawGift(ctx, x, y) {
  const size = getGiftSize(getup()); // Kích thước dựa trên số điểm

  const offsetX = Math.sin(angle) * 5;
  const offsetY = Math.cos(angle) * 2;

  ctx.font = `${size}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(decodeString(locale.l10), x + offsetX, y + offsetY);

  angle += 0.1;
}

if (navigator.userAgent.includes("Mobi")) {
  console.log("Mobile form factor detected.");
  document.body.classList.add("mobile-install");
} else {
  console.log("Desktop or Tablet form factor detected.");
  document.body.classList.add("desktop-install");
}

if ("serviceWorker" in navigator && "Notification" in window) {
  function showInstallPrompt() {
    // Kiểm tra xem có hỗ trợ beforeinstallprompt không
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent Chrome 76 and later from showing the default prompt
      event.preventDefault();
      // Lưu lại sự kiện để sử dụng sau
      let deferredPrompt = event;

      const installButton = document.createElement("button");
      installButton.textContent = "Cài đặt";
      installButton.style.position = "fixed";
      installButton.style.bottom = "20px";
      installButton.style.right = "20px";
      installButton.style.zIndex = "1000";

      installButton.addEventListener("click", () => {
        // Hiển thị prompt cài đặt
        deferredPrompt.prompt();

        // Đợi người dùng phản hồi
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the install prompt");
          } else {
            console.log("User dismissed the install prompt");
          }
          deferredPrompt = null;
        });
      });

      document.body.appendChild(installButton);
    });

    // Kiểm tra xem đang ở chế độ độc lập không
    if (window.matchMedia("(display-mode: standalone)").matches) {
      window.location.href = "/tet"; // Đến trực tiếp nếu đã ở chế độ standalone
    }
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${BASE_PATH}/service-worker.js`)
      .then((registration) => {
        // Kiểm tra điều kiện hỗ trợ khả năng cài đặt PWA
        if (window.matchMedia("(display-mode: standalone)").matches) {
          // Trường hợp đã là ứng dụng PWA
          return;
        }
        if (navigator.userAgent.includes("Mobi")) {
          showInstallPrompt();
        }
      });
  });
}

// App load
window.addEventListener("load", () => {
  checkForSWUpdate(); // Kiểm tra Service Worker mới
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    visibilitychange = false;
  } else {
    visibilitychange = true;
  }
});

// Hàm kiểm tra Service Worker mới
function checkForSWUpdate() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.update(); // Cập nhật Service Worker
      })
      .catch((error) => {
        console.error("Service Worker update failed:", error);
      });
  }
}
// Lập trình lặp lại thông báo mỗi phút

function calculateTimeToTet() {
  const now = new Date();
  const timeDiff = tetDate - now; // Khoảng thời gian còn lại (ms)

  if (timeDiff <= 0) {
    return "Chúc mừng năm mới! 🎉";
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return `Còn ${days > 0 && `${days} ngày`}  ${hours > 0 && `${hours} giờ`} ${
    minutes > 0 && `${minutes} phút`
  } ${seconds > 0 && `${seconds} giây`} nữa là đến Tết!`;
}
function handlerNotification() {
  if (Notification.permission === "granted") {
    const message = calculateTimeToTet();
    new Notification("Tết Nguyên Đán 2025 🎉🎉🎉", {
      body: message,
      icon: "icons/icon-48x48.png", // Đường dẫn tới icon của bạn
      tag: "tet-countdown",
    });
  } else {
    console.warn("Không có quyền thông báo.");
  }
}
function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    //alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    // …
    handlerNotification();
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        // …
        handlerNotification();
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
document.addEventListener("DOMContentLoaded", () => {
  notifyMe();
});
console.log("(●'◡'●)");
console.info(
  "Client-only score protections enabled: signed local storage with periodic validation. For strong security, move score handling to a server."
);
