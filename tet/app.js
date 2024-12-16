const canvas = document.getElementById("countdownCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const FONTFAMILY = "Courier New, Courier, monospace";
let touchCount = localStorage.getItem("touchCount");
const dev = true;
// Nếu touchCount tồn tại, giải mã nó
if (touchCount) {
  touchCount = decodeData(touchCount);
} else {
  touchCount = 0; // Nếu không có, bắt đầu từ 0
}
let angle = 0; // Góc để tạo hiệu ứng lắc lư

const BASE_PATH = self.location.pathname.replace(/\/$/, ""); // Loại bỏ dấu "/" cuối

// Mã hóa dữ liệu
function encodeData(data) {
  let encoded = btoa(data.toString()); // Encode dữ liệu sang Base64
  return encoded;
}
// Giải mã dữ liệu
function decodeData(encodedData) {
  let decoded = atob(encodedData); // Decode Base64
  return parseFloat(decoded); // Convert trở lại thành số
}
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // Xóa bộ hẹn giờ trước đó
    timer = setTimeout(() => {
      func.apply(this, args); // Gọi hàm sau khi hết thời gian delay
    }, delay);
  };
}
const music = document.getElementById("backgroundMusic");
music.volume = 0.5;
let lastMusicTime = Date.now(); // Lưu thời gian gần nhất chơi nhạc

const tetDate = new Date("2025-02-10T00:00:00");
let fireworks = [];
let stars = [];
function updateFontSize() {
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Tỷ lệ phần trăm dựa trên chiều rộng và chiều cao của canvas
  const scale = Math.min(canvasWidth / 1920, canvasHeight / 1080); // Adjust this based on your base resolution

  const fontSize = 70 * scale; // Điều chỉnh số 50 này tùy thuộc vào kích thước font mong muốn

  return fontSize;
}

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

function drawStars() {
  stars.forEach((star) => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0) star.speed *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
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
function drawCountdown() {
  const now = new Date();
  const diff = tetDate - now;
  const tet = `🎉 Chúc Mừng Năm Mới! 🎉 2025`;
  if (diff <= 0 || 1 == 1) {
    drawFireworks();
    ctx.fillStyle = "white";
    ctx.font = `bold ${updateFontSize()}px ${FONTFAMILY}`;
    ctx.textAlign = "center";
    ctx.fillText(tet, canvas.width / 2, canvas.height / 2);
    ctx.font = `bold 12px ${FONTFAMILY}`;
    wrapText(
      ctx,
      `Bạn đã chạm ${touchCount} lần. Thật là dữ dội✨✨🌸🎉🌸✨🎉🎉🎉🌸🎉🎉🌸🎉Chúc bạn và gia đình một năm mới tràn ngập niềm vui và hạnh phúc! Mong rằng mọi điều bạn mơ ước sẽ trở thành hiện thực, mọi khó khăn chỉ là những câu chuyện đã qua. Hãy luôn cười thật tươi và tràn đầy năng lượng trong năm mới này nhé! Chúc bạn một năm mới an khang, thịnh vượng, và thật nhiều yêu thương!🌸🎉🌸🎉🌸🎉🌸🎉✨✨🌸🎉🌸🎉`,
      canvas.width / 2,
      canvas.height / 2 + Math.max(updateFontSize(), 12),
      canvas.width * 0.8,
      14
    );
    drawGift(ctx, canvas.width / 2, 100);

    // Vẽ văn bản giải thưởng
    let message;
    if (touchCount >= 20000) {
      message = "Đây là của bạn 🎁 size XXXL với giải thưởng xứng đáng!";
    } else if (touchCount >= 10000) {
      message = "Đây là của bạn 🎁 size XL! Một món quà tuyệt vời!";
    } else if (touchCount >= 5000) {
      message = "Đây là của bạn 🎁 size L! Chúc mừng bạn!";
    } else if (touchCount >= 1000) {
      message = "Đây là của bạn 🎁 size M! Một món quà nhỏ thôi!";
    } else {
      message = "Đây là của bạn 🎁 size S! Cố gắng hơn nữa!";
    }

    ctx.font = `16px ${FONTFAMILY}`;
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, 180);
    return;
  }
  const fontSize = updateFontSize();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const text = `${days} Ngày ${hours} Giờ ${minutes} Phút ${seconds} Giây`;
  const label = "🎉 Tết Nguyên Đán 2025 🎉";
  ctx.fillStyle = "yellow";
  ctx.font = `bold ${fontSize}px ${FONTFAMILY}`;
  ctx.textAlign = "center";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 - 100);

  ctx.font = `bold ${fontSize * 1.4}px ${FONTFAMILY}`;
  ctx.fillStyle = "white";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function createFireworks(x, y) {
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
}

function drawFireworks() {
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
}

// Pháo hoa tự động bắn ngẫu nhiên từ đáy màn hình
function createRandomFireworks() {
  const x = Math.random() * canvas.width; // Vị trí ngẫu nhiên theo chiều ngang
  const y = canvas.height; // Bắn từ đáy màn hình
  createFireworks(x, y);
}

// Phát nhạc nền
function startMusic() {
  musicIcon.classList.add("active");
  music
    .play()
    .catch((error) =>
      console.log("Nhạc nền không tự phát do giới hạn trình duyệt.", error)
    );
}
function onInputChange(event) {
  console.log("Input value:", event.target.value);
}

// Hàm xử lý tăng số lần chạm
const increaseTouchCount = debounce(() => {
  localStorage.setItem("touchCount", encodeData(touchCount));
}, 200); // Giới hạn: Tăng số lần chạm tối đa 1 lần mỗi 200ms
// Thêm sự kiện nhấp chuột để tạo pháo hoa
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  createFireworks(event.clientX - rect.left, event.clientY - rect.top);
  touchCount++;
  // Cập nhật số lượt touch
  increaseTouchCount();
});
// Vẽ số lần touch
function drawTouchCount() {
  ctx.font = `bold 12px ${FONTFAMILY}`;
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(`Điểm số của bạn: ${touchCount}`, 20, 50);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawCountdown();
  drawFireworks();
  drawTouchCount();
  const now = Date.now();
  if (now - lastMusicTime >= 60000 && isMusicPlaying == true) {
    // Nếu thời gian hiện tại cách lần chơi nhạc trước ít nhất 1 phút
    touchCount += 10;
    lastMusicTime = now; // Cập nhật thời gian chơi nhạc gần nhất
    increaseTouchCount();
  }

  requestAnimationFrame(animate);
}
// Tự động bắn pháo hoa mỗi 1-2 giây
setInterval(createRandomFireworks, Math.random() * 1000 + 1000);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
animate();

// Điều chỉnh kích thước canvas khi thay đổi kích thước cửa sổ
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Bắt đầu phát nhạc khi tương tác
window.addEventListener("click", startMusic, { once: true });
// Điều khiển nhạc bằng icon
let isMusicPlaying = false;
musicIcon.addEventListener("click", () => {
  if (isMusicPlaying) {
    music.pause();
    musicIcon.classList.remove("active");
  } else {
    music.play();
    musicIcon.classList.add("active");
  }
  isMusicPlaying = !isMusicPlaying;
});

// Hàm xác định kích thước 🎁 theo cấp bậc
function getGiftSize(score) {
  if (score >= 20000) return 150; // Cấp 5
  if (score >= 10000) return 120; // Cấp 4
  if (score >= 5000) return 90; // Cấp 3
  if (score >= 1000) return 70; // Cấp 2
  if (score >= 100) return 50; // Cấp 1
  return 30; // Mặc định
}

function drawGift(ctx, x, y) {
  // Tăng kích thước dựa trên điểm số
  const size = getGiftSize(touchCount); // Kích thước dựa trên số điểm

  // Hiệu ứng lắc lư
  const offsetX = Math.sin(angle) * 5;
  const offsetY = Math.cos(angle) * 2;

  // Vẽ 🎁
  ctx.font = `${size}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("🎁", x + offsetX, y + offsetY);

  // Tăng góc để tạo hiệu ứng lắc lư liên tục
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
  console.log(BASE_PATH);

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${BASE_PATH}/service-worker.js`)
      .then((registration) => {
        // Kiểm tra điều kiện hỗ trợ khả năng cài đặt PWA
        if (window.matchMedia("(display-mode: standalone)").matches) {
          // Trường hợp đã là ứng dụng PWA
          return;
        }

        // Hiển thị yêu cầu cài đặt PWA nếu người dùng đang trên thiết bị di động
        if (window.navigator.standalone === undefined) {
          showInstallPrompt();
        }
      });
  });
}

if (!dev) {
  document.addEventListener("keydown", (event) => {
    // Ngăn phím F12
    if (event.key === "F12") {
      event.preventDefault();
      alert("Developer Tools đã bị vô hiệu hóa!");
    }

    // Ngăn tổ hợp phím Ctrl+Shift+I (Chrome, Edge, Firefox)
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === "I"
    ) {
      event.preventDefault();
      alert("Developer Tools đã bị vô hiệu hóa!");
    }

    // Ngăn tổ hợp phím Ctrl+U (xem mã nguồn trang)
    if ((event.ctrlKey || event.metaKey) && event.key === "U") {
      event.preventDefault();
      alert("Xem mã nguồn đã bị vô hiệu hóa!");
    }

    // Ngăn tổ hợp phím Ctrl+Shift+J (console)
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === "J"
    ) {
      event.preventDefault();
      alert("Developer Tools đã bị vô hiệu hóa!");
    }

    // Ngăn tổ hợp phím Ctrl+Shift+C (element picker)
    if (
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key === "C"
    ) {
      event.preventDefault();
      alert("Developer Tools đã bị vô hiệu hóa!");
    }
  });
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    alert("Chức năng chuột phải đã bị vô hiệu hóa!");
  });
  (function () {
    const element = new Image();
    Object.defineProperty(element, "id", {
      get: function () {
        alert("Developer Tools đang mở!");
        window.location.href = "about:blank"; // Chuyển hướng nếu mở Developer Tools
      },
    });
    console.log(element);
  })();
}
