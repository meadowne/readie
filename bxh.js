/* ===================================================
   JAVASCRIPT HIỆU ỨNG 10 BÓNG NẢY CHO TRANG BXH (bxh.js)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bxh-canvas');
    const container = document.getElementById('canvas-container');
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

// KÍCH THƯỚC ĐÃ GIẢM NHẸ VỪA VẶN: Top 1 (56px) -> Top 10 (32px)
    const mangaData = [
        { name: "JoJo Part 7", src: "assets/jojo_part7.png", radius: 56 },      // Top 1
        { name: "Berserk", src: "assets/berserk.jpg", radius: 50 },              // Top 2
        { name: "One Piece", src: "assets/one_piece.jpg", radius: 46 },          // Top 3
        { name: "Fullmetal Alchemist", src: "assets/fullmetal_alchemist.jpg", radius: 42 }, // Top 4
        { name: "Grand Blue", src: "assets/grand_blue_dreaming.jpg", radius: 39 }, // Top 5
        { name: "Dược Sư Tự Sự", src: "assets/duoc_su_tu_su.jpg", radius: 37 },    // Top 6
        { name: "Operation True Love", src: "assets/operation_true_love.jpg", radius: 35 }, // Top 7
        { name: "Blue Lock", src: "assets/blue_lock.jpg", radius: 34 },          // Top 8
        { name: "Cry or Better Yet Beg", src: "assets/cry_or_better_yet_beg.jpg", radius: 33 }, // Top 9
        { name: "Thầy Tường Thầy Vũ", src: "assets/thay_tuong_thay_vu.jpg", radius: 32 } // Top 10
    ];

    const balls = [];

    // Phân bổ toạ độ xuất phát tránh chồng đè nhau
    mangaData.forEach((data) => {
        const img = new Image();
        img.src = data.src;
        let x, y, overlapping;
        let attempts = 0;

        do {
            overlapping = false;
            x = data.radius + Math.random() * (canvas.width - data.radius * 2);
            y = data.radius + Math.random() * (canvas.height - data.radius * 2);

            for (let j = 0; j < balls.length; j++) {
                const other = balls[j];
                const dx = x - other.x;
                const dy = y - other.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < data.radius + other.radius + 4) {
                    overlapping = true;
                    break;
                }
            }
            attempts++;
        } while (overlapping && attempts < 150);

        const angle = Math.random() * Math.PI * 2;
        const speed = 1.3 + Math.random() * 0.8;

        balls.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: data.radius,
            img: img
        });
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 1. Cập nhật vị trí & va chạm 4 góc viền
        balls.forEach(ball => {
            ball.x += ball.vx;
            ball.y += ball.vy;

            if (ball.x - ball.radius <= 0) {
                ball.x = ball.radius;
                ball.vx = Math.abs(ball.vx);
            } else if (ball.x + ball.radius >= canvas.width) {
                ball.x = canvas.width - ball.radius;
                ball.vx = -Math.abs(ball.vx);
            }

            if (ball.y - ball.radius <= 0) {
                ball.y = ball.radius;
                ball.vy = Math.abs(ball.vy);
            } else if (ball.y + ball.radius >= canvas.height) {
                ball.y = canvas.height - ball.radius;
                ball.vy = -Math.abs(ball.vy);
            }
        });

        // 2. Va chạm vật lý đàn hồi giữa các quả bóng
        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const b1 = balls[i];
                const b2 = balls[j];
                const dx = b2.x - b1.x;
                const dy = b2.y - b1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = b1.radius + b2.radius;

                if (dist < minDist) {
                    const overlap = minDist - dist;
                    const nx = dx / (dist || 1);
                    const ny = dy / (dist || 1);

                    b1.x -= nx * (overlap / 2);
                    b1.y -= ny * (overlap / 2);
                    b2.x += nx * (overlap / 2);
                    b2.y += ny * (overlap / 2);

                    const kx = b1.vx - b2.vx;
                    const ky = b1.vy - b2.vy;
                    const p = 2 * (nx * kx + ny * ky) / 2;

                    b1.vx -= p * nx;
                    b1.vy -= p * ny;
                    b2.vx += p * nx;
                    b2.vy += p * ny;
                }
            }
        }

        // 3. Vẽ các hình tròn bo ảnh bìa truyện
        balls.forEach(ball => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.clip();

            if (ball.img.complete && ball.img.naturalWidth !== 0) {
                ctx.drawImage(
                    ball.img,
                    ball.x - ball.radius,
                    ball.y - ball.radius,
                    ball.radius * 2,
                    ball.radius * 2
                );
            } else {
                ctx.fillStyle = '#f5d450';
                ctx.fill();
            }
            ctx.restore();

            // Vẽ viền đen Comic
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#000000';
            ctx.stroke();
        });

        requestAnimationFrame(animate);
    }

    animate();
});