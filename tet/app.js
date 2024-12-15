const canvas = document.getElementById("countdownCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const FONTFAMILY = "Courier New, Courier, monospace";
let touchCount = parseFloat(localStorage.getItem("touchCount")) || 0; // Tải số lượt touch từ localStorage

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

function drawCountdown() {
  const now = new Date();
  const diff = tetDate - now;
  const tet = "🎉 Chúc Mừng Năm Mới! 🎉";

  if (diff <= 0) {
    drawFireworks();
    ctx.fillStyle = "white";
    ctx.font = `bold ${updateFontSize()}px ${FONTFAMILY}`;
    ctx.textAlign = "center";
    ctx.fillText(tet, canvas.width / 2, canvas.height / 2);
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
  localStorage.setItem("touchCount", touchCount); // Lưu vào localStorage
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
if (navigator.userAgent.includes("Mobi")) {
  console.log("Mobile form factor detected.");
  document.body.classList.add("mobile-install");
} else {
  console.log("Desktop or Tablet form factor detected.");
  document.body.classList.add("desktop-install");
}
