(function () {
  (function () {
    (function () {
      (function () {
        (function () {
          const canvas = document.getElementById("countdownCanvas");
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const FONTFAMILY = "Courier New, Courier, monospace";
          let isMusicPlaying = false;
          const ver = "2.2.10";
          let visibilitychange = true;
          let angle = 0; // Góc để tạo hiệu ứng lắc lư
          const music = document.getElementById("backgroundMusic");
          music.volume = 0.5;
          let lastMusicTime = Date.now(); // Lưu thời gian gần nhất chơi nhạc

          const tetDate = new Date("2025-01-29T00:00:00+07:00");
          let fireworks = [];
          let stars = [];
          const locale = {
            l1: "JUYwJTlGJThFJTg5JTIwQ2glQzMlQkFjJTIwTSVFMSVCQiVBQm5nJTIwTiVDNCU4M20lMjBNJUUxJUJCJTlCaSElMjAlRjAlOUYlOEUlODklMjAyMDI1",
            l2: `QmElQ0MlQTNuJTIwJUM0JTkxYSVDQyU4MyUyMGNoYSVDQyVBM20`,
            l3: `bCVDMyVBMiVDQyU4MG4uJTIwVGglQzMlQTIlQ0MlQTN0JTIwbGElQ0MlODAlMjBkJUM2JUIwJUNDJTgzJTIwZCVDMyVCNCVDQyVBM2klRTIlOUMlQTglRTIlOUMlQTglRjAlOUYlOEMlQjglRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRTIlOUMlQTglRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRjAlOUYlOEUlODklRjAlOUYlOEUlODklRjAlOUYlOEMlQjglRjAlOUYlOEUlODlDaHUlQ0MlODFjJTIwYmElQ0MlQTNuJTIwdmElQ0MlODAlMjBnaWElMjAlQzQlOTFpJUNDJTgwbmglMjBtJUMzJUI0JUNDJUEzdCUyMG4lQzQlODNtJTIwbSVDNiVBMSVDQyU4MWklMjB0cmElQ0MlODBuJTIwbmclQzMlQTIlQ0MlQTNwJTIwbmklQzMlQUElQ0MlODBtJTIwdnVpJTIwdmElQ0MlODAlMjBoYSVDQyVBM25oJTIwcGh1JUNDJTgxYyElMjBNb25nJTIwciVDNCU4MyVDQyU4MG5nJTIwbW8lQ0MlQTNpJTIwJUM0JTkxaSVDMyVBQSVDQyU4MHUlMjBiYSVDQyVBM24lMjBtJUM2JUExJTIwJUM2JUIwJUM2JUExJUNDJTgxYyUyMHNlJUNDJTgzJTIwdHIlQzYlQTElQ0MlODklMjB0aGElQ0MlODBuaCUyMGhpJUMzJUFBJUNDJUEzbiUyMHRoJUM2JUIwJUNDJUEzYyUyQyUyMG1vJUNDJUEzaSUyMGtobyVDQyU4MSUyMGtoJUM0JTgzbiUyMGNoaSVDQyU4OSUyMGxhJUNDJTgwJTIwbmglQzYlQjAlQ0MlODNuZyUyMGMlQzMlQTJ1JTIwY2h1eSVDMyVBQSVDQyVBM24lMjAlQzQlOTFhJUNDJTgzJTIwcXVhLiUyMEhhJUNDJTgzeSUyMGx1JUMzJUI0biUyMGMlQzYlQjAlQzYlQTElQ0MlODBpJTIwdGglQzMlQTIlQ0MlQTN0JTIwdCVDNiVCMCVDNiVBMWklMjB2YSVDQyU4MCUyMHRyYSVDQyU4MG4lMjAlQzQlOTElQzMlQTIlQ0MlODB5JTIwbiVDNCU4M25nJTIwbCVDNiVCMCVDNiVBMSVDQyVBM25nJTIwdHJvbmclMjBuJUM0JTgzbSUyMG0lQzYlQTElQ0MlODFpJTIwbmElQ0MlODB5JTIwbmhlJUNDJTgxISUyMENoJUMzJUJBYyUyMGIlRTElQkElQTFuJTIwbSVFMSVCQiU5OXQlMjBuJUM0JTgzbSUyMG0lQzYlQTElQ0MlODFpJTIwYW4lMjBraGFuZyUyQyUyMHRoJUUxJUJCJThCbmglMjB2JUM2JUIwJUUxJUJCJUEzbmclMkMlMjB2YSVDQyU4MCUyMHRoJUUxJUJBJUFEdCUyMG5oaSVFMSVCQiU4MXUlMjB5JUMzJUFBdSUyMHRoJUM2JUIwJUM2JUExbmchJUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUUyJTlDJUE4JUUyJTlDJUE4JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5JUYwJTlGJThDJUI4JUYwJTlGJThFJTg5`,
            l4: `JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFhYWEwlMjB2JUUxJUJCJTlCaSUyMGdpJUUxJUJBJUEzaSUyMHRoJUM2JUIwJUUxJUJCJTlGbmclMjB4JUUxJUJCJUE5bmclMjAlQzQlOTElQzMlQTFuZyE`,
            l5: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFhMISUyME0lRTElQkIlOTl0JTIwbSVDMyVCM24lMjBxdSVDMyVBMCUyMHR1eSVFMSVCQiU4N3QlMjB2JUUxJUJCJTlEaSE",
            l6: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMEwhJTIwQ2glQzMlQkFjJTIwbSVFMSVCQiVBQm5nJTIwYiVFMSVCQSVBMW4h",
            l7: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyME0hJTIwTSVFMSVCQiU5OXQlMjBtJUMzJUIzbiUyMHF1JUMzJUEwJTIwbmglRTElQkIlOEYlMjB0aCVDMyVCNGkh",
            l8: "JUM0JTkwJUMzJUEyeSUyMGwlQzMlQTAlMjBjJUUxJUJCJUE3YSUyMGIlRTElQkElQTFuJTIwJUYwJTlGJThFJTgxJTIwc2l6ZSUyMFMhJTIwQyVFMSVCQiU5MSUyMGclRTElQkElQUZuZyUyMGglQzYlQTFuJTIwbiVFMSVCQiVBRmEh",
            l9: `JUM0JTkwaSVDMyVBQSVDQyU4OW0lMjBzJUMzJUI0JUNDJTgxJTIwY3UlQ0MlODlhJTIwYmElQ0MlQTNuJTNB`,
            l10: `JUYwJTlGJThFJTgx`,
            l11: `JUYwJTlGJThFJTg5JTIwVCVFMSVCQSVCRnQlMjBOZ3V5JUMzJUFBbiUyMCVDNCU5MCVDMyVBMW4lMjAyMDI1JTIwJUYwJTlGJThFJTg5`,
            l12: `TmdhJUNDJTgweQ`,
            l13: `R2klQzYlQTElQ0MlODA`,
            l14: `UGh1JUNDJTgxdA`,
            l15: `R2klQzMlQTJ5`,
            l16: `JUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJGJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJEJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJDJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJFJUYwJTlGJTkxJUFDJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJTkxJUE4JUYwJTlGJThGJUJCJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJFJUYwJTlGJTkxJUE5JUYwJTlGJThGJUJFJUUyJTgwJThEJUYwJTlGJUE0JTlEJUUyJTgwJThEJUYwJTlGJUE3JTkxJUYwJTlGJThGJUJF`,
            l17: `MQ`,
            l18: `MTA`,
            l19: `dG91Y2hDb3VudA`,
          };
          const die = [
            "QyVDMyVCNCVDQyU4MSUyMGclQzQlODMlQ0MlODFuZyUyMGN1JUNDJTgzbmclMjB2JUMzJUI0JTIwaSVDQyU4MWNoJTIwKCVFMiU5RCU4MSVDMiVCNCVFMiU5NyVBMSU2MCVFMiU5RCU4MSk",
            "QmElQ0MlQTNuJTIwJUM0JTkxYSVDQyU4MyUyMHBoYSVDQyVBM20lMjBwaGElQ0MlODlpJTIwc2FpJTIwbCVDMyVBMiVDQyU4MG0lMjBsJUM2JUExJUNDJTgxbiUyMCglRTIlOTclOEYlMjIlRTIlOTclQTElMjIlRTIlOTclOEYp",
            "QyVDMyVCNCVDQyU4MSUyMGclQzQlODMlQ0MlODFuZyUyMGN1JUNDJTgzbmclMjB2JUMzJUI0JTIwaSVDQyU4MWNoJTIwKCVFMiU5RCU4MSVDMiVCNCVFMiU5NyVBMSU2MCVFMiU5RCU4MSk",
            `KCVFMiU5NyU4RiclRTIlOTclQTEnJUUyJTk3JThGKS4lMjAlQzQlOTAlQzMlQTJ5JTIwbCVDMyVBMCUyMHBoYSUyMHQlRTElQkIlQjElMjBoJUUxJUJCJUE3eQ`,
            "QyVDMyVCNCVDQyU4MSUyMGclQzQlODMlQ0MlODFuZyUyMGN1JUNDJTgzbmclMjB2JUMzJUI0JTIwaSVDQyU4MWNoJTIwKCVFMiU5RCU4MSVDMiVCNCVFMiU5NyVBMSU2MCVFMiU5RCU4MSk",
            "QmElQ0MlQTNuJTIwJUM0JTkxYSVDQyU4MyUyMHBoYSVDQyVBM20lMjBwaGElQ0MlODlpJTIwc2FpJTIwbCVDMyVBMiVDQyU4MG0lMjBsJUM2JUExJUNDJTgxbiUyMCglRTIlOTclOEYlMjIlRTIlOTclQTElMjIlRTIlOTclOEYp",
            "QyVDMyVCNCVDQyU4MSUyMGclQzQlODMlQ0MlODFuZyUyMGN1JUNDJTgzbmclMjB2JUMzJUI0JTIwaSVDQyU4MWNoJTIwKCVFMiU5RCU4MSVDMiVCNCVFMiU5NyVBMSU2MCVFMiU5RCU4MSk",
            "QmElQ0MlQTNuJTIwJUM0JTkxYSVDQyU4MyUyMHBoYSVDQyVBM20lMjBwaGElQ0MlODlpJTIwc2FpJTIwbCVDMyVBMiVDQyU4MG0lMjBsJUM2JUExJUNDJTgxbiUyMCglRTIlOTclOEYlMjIlRTIlOTclQTElMjIlRTIlOTclOEYp",
          ];
          class Root {
            touchCount = "MA";
            BASE_PATH = "";
            constructor() {
              this.touchCount = localStorage.getItem(locale.l19) || "MA";
              this.BASE_PATH = self.location.pathname.replace(/\/$/, "");
              this.randomFakeValue();
            }
            up = (N) => {
              this.touchCount = this.encodeData(
                this.decodeData(this.touchCount) + this.decodeData(N)
              );
              this._fdbu();
            };
            randomFakeValue = () => {
              localStorage.clear();
              for (let index = 0; index < 50; index++) {
                const randomValue = Math.floor(Math.random() * 1000) + 1;
                const randomKey = `_${Math.random()
                  .toString(36)
                  .substring(2, 15)}`;
                async () => {
                  localStorage.setItem(randomKey, this.encodeData(randomValue));
                };
              }
              this._fdbu();

              // Log ra console để kiểm tra
            };
            getup = () => {
              return this.decodeData(this.touchCount);
            };
            encodeData = (data) => {
              let encoded = btoa(data.toString()); // Encode dữ liệu sang Base64
              return encoded;
            };
            decodeData = (encodedData) => {
              let decoded = atob(encodedData) || "0"; // Decode Base64
              return parseFloat(decoded); // Convert trở lại thành số
            };
            encodeString = (str) => {
              try {
                let encoded = btoa(encodeURIComponent(str));
                return encoded;
              } catch (error) {
                console.error("Error encoding string:", error);
                return null;
              }
            };
            decodeString = (encodedStr) => {
              try {
                let decoded = decodeURIComponent(atob(encodedStr));
                return decoded;
              } catch (error) {
                console.error("Error decoding string:", error);
                return null;
              }
            };

            debounce = (func, delay) => {
              let timer;
              return function (...args) {
                clearTimeout(timer); // Xóa bộ hẹn giờ trước đó
                timer = setTimeout(() => {
                  func.apply(this, args); // Gọi hàm sau khi hết thời gian delay
                }, delay);
              };
            };
            _fdbu = this.debounce(() => {
              localStorage.setItem(locale.l19, this.touchCount);
            }, 200);

            randomFrom = () => {
              return Math.floor(Math.random() * 4);
            };
          }

          const root = new Root();

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
            const tet = root.decodeString(locale.l1);
            ctx.font = `bold 12px ${FONTFAMILY}`;
            ctx.fillText(ver, 2, 12);

            if (diff <= 0 && 1 == 1 && 2 == 2) {
              drawFireworks();
              ctx.fillStyle = "white";
              ctx.font = `bold ${updateFontSize()}px ${FONTFAMILY}`;
              ctx.textAlign = "center";
              ctx.fillText(tet, canvas.width / 2, canvas.height / 2);
              ctx.font = `bold 12px ${FONTFAMILY}`;
              wrapText(
                ctx,
                `${root.decodeString(
                  locale.l2
                )} ${root.getup()} ${root.decodeString(locale.l3)}`,
                canvas.width / 2,
                canvas.height / 2 + Math.max(updateFontSize(), 12),
                canvas.width * 0.8,
                14
              );
              drawGift(ctx, canvas.width / 2, 100);

              // Vẽ văn bản giải thưởng
              let message;
              if (root.getup() >= 20000) {
                message = root.decodeString(locale.l4);
              } else if (root.getup() >= 10000) {
                message = root.decodeString(locale.l5);
              } else if (root.getup() >= 5000) {
                message = root.decodeString(locale.l6);
              } else if (root.getup() >= 1000) {
                message = root.decodeString(locale.l7);
              } else {
                message = root.decodeString(locale.l8);
              }

              ctx.font = `16px ${FONTFAMILY}`;
              ctx.textAlign = "center";
              wrapText(
                ctx,
                message,
                canvas.width / 2,
                180,
                canvas.width * 0.8,
                14
              );
              return;
            }
            const fontSize = updateFontSize();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            const text = `${days} ${root.decodeString(
              locale.l12
            )} ${hours} ${root.decodeString(
              locale.l13
            )} ${minutes} ${root.decodeString(
              locale.l14
            )} ${seconds} ${root.decodeString(locale.l15)}`;
            const label = root.decodeString(locale.l11);
            ctx.fillStyle = "yellow";
            ctx.font = `bold ${fontSize}px ${FONTFAMILY}`;
            ctx.textAlign = "center";
            ctx.fillText(label, canvas.width / 2, canvas.height / 2 - 100);

            ctx.font = `bold ${fontSize * 1.4}px ${FONTFAMILY}`;
            ctx.fillStyle = "white";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
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
                root.up(locale.l18);
                lastMusicTime = now;
              }
            })();
            const x = Math.random() * canvas.width; // Vị trí ngẫu nhiên theo chiều ngang
            const y = Math.random() * canvas.height; // Bắn từ đáy màn hình
            createFireworks(x, y);
          }

          // Phát nhạc nền
          function startMusic() {
            isMusicPlaying = true;
            musicIcon?.classList.add("active");
            music.play().catch((error) => console.log(error));
          }

          // Hàm xử lý tăng số lần chạm

          // Thêm sự kiện nhấp chuột để tạo pháo hoa
          canvas.addEventListener("click", (event) => {
            const rect = canvas.getBoundingClientRect();
            createFireworks(
              event.clientX - rect.left,
              event.clientY - rect.top
            );
            root.up(locale.l17);
          });
          // Vẽ số lần touch
          function drawTouchCount() {
            ctx.font = `bold 12px ${FONTFAMILY}`;
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText(
              `${root.decodeString(locale.l9)} ${root.getup()}`,
              20,
              50
            );
          }
          function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawStars();
            drawCountdown();
            drawFireworks();
            drawTouchCount();

            (function () {
              const start = new Date();
              debugger; // DevTools sẽ dừng lại ở đây
              const end = new Date();

              if (end - start > 100) {
                // Thời gian tăng bất thường => DevTools mở
                localStorage.clear();
                document.body.innerHTML = ""; // Xóa nội dung trang
                document.head.innerHTML = ""; // Xóa nội dung trang
                console.clear();
                let c = confirm(root.decodeString(die[root.randomFrom()]));
                while (c == false) {
                  c = confirm(root.decodeString(die[root.randomFrom()]));
                }
                while (c == true) {
                  localStorage.clear();
                  // Thời gian tăng bất thường => DevTools mở
                  document.body.innerHTML = ""; // Xóa nội dung trang
                  document.head.innerHTML = ""; // Xóa nội dung trang
                  console.clear();
                  window.location.href = "/tet";
                }
              }
            })();
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
            const size = getGiftSize(root.touchCount); // Kích thước dựa trên số điểm

            const offsetX = Math.sin(angle) * 5;
            const offsetY = Math.cos(angle) * 2;

            ctx.font = `${size}px Arial`;
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(
              root.decodeString(locale.l10),
              x + offsetX,
              y + offsetY
            );

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
                .register(`${root.BASE_PATH}/service-worker.js`)
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

          document.addEventListener("keydown", (event) => {
            // Ngăn phím F12
            if (event.key === "F12") {
              event.preventDefault();
            }

            // Ngăn tổ hợp phím Ctrl+Shift+I (Chrome, Edge, Firefox)
            if (
              (event.ctrlKey || event.metaKey) &&
              event.shiftKey &&
              event.key === "I"
            ) {
              event.preventDefault();
              console.log(root.decodeString(locale.l16));
            }

            // Ngăn tổ hợp phím Ctrl+U (xem mã nguồn trang)
            if ((event.ctrlKey || event.metaKey) && event.key === "U") {
              event.preventDefault();
              console.log(root.decodeString(locale.l16));
            }

            // Ngăn tổ hợp phím Ctrl+Shift+J (console)
            if (
              (event.ctrlKey || event.metaKey) &&
              event.shiftKey &&
              event.key === "J"
            ) {
              event.preventDefault();
              console.log(root.decodeString(locale.l16));
            }

            // Ngăn tổ hợp phím Ctrl+Shift+C (element picker)
            if (
              (event.ctrlKey || event.metaKey) &&
              event.shiftKey &&
              event.key === "C"
            ) {
              event.preventDefault();
              console.log(root.decodeString(locale.l16));
            }
          });
          document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            console.log(root.decodeString(locale.l16));
          });

          // Ngăn chặn chọn văn bản
          document.addEventListener("selectstart", function (e) {
            e.preventDefault(); // Ngăn không cho người dùng chọn văn bản
          });

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
          window.addEventListener("blur", () => {
            visibilitychange = false;
          });

          window.addEventListener("focus", () => {
            visibilitychange = true;
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
          console.log("(●'◡'●)");
        })();
      })();
    })();
  })();
})();
