document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý Bật/Tắt Search Box
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');

    searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        searchBox.classList.toggle('active');
    });

    // Bấm ra ngoài vùng search thì tự đóng search box
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && e.target !== searchBtn) {
            searchBox.classList.remove('active');
        }
    });

});

// DANH SÁCH DỮ LIỆU CÁC BÀI VIẾT TIN TỨC
const newsArticles = [
    {
        title: "5 anime hè 2026 để lại dấu ấn ở những tập cuối",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "22/10/2026",
        slug: "5-anime-he-2026-de-lai.html",
        img: "assets/anh-5-anime-he-2026-de-lai.png"
    },
    {
        title: "Đọc manga bằng 100 ngôn ngữ? Shueisha mở rộng thế giới truyện tranh với MANGA MILLION!",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "20/10/2026",
        slug: "doc-manga-bang-100-ngon-ngu.html",
        img: "assets/anh-doc-manga-bang-100-ngon-ngu.png"
    },
    {
        title: "TOUGEN ANKI 2 trở lại với arc thác Kegon: Cuộc chiến Oni và Momotaro tiếp tục lên sóng!",
        category: "TRUYỆN LÊN SÓNG",
        date: "18/10/2026",
        slug: "tougen-anki-2-tro-lai.html",
        img: "assets/anh-tougen-anki-2-tro-lai.jpg"
    },
    {
        title: "Không cần là mangaka chuyên nghiệp: Cánh cửa xuất bản manga đang mở rộng cho nhà sáng tạo mới",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "15/10/2026",
        slug: "khong-can-la-mangaka-chuyen-nghiep.html",
        img: "assets/anh-khong-can-la-mangaka-chuyen-nghiep.jpg"
    },
    {
        title: "Từ webtoon đến màn ảnh rộng: “Guardians of the Video Game” mở đường cho phim hoạt hình Hàn Quốc",
        category: "TRUYỆN LÊN SÓNG",
        date: "11/10/2026",
        slug: "tu-webtoon-den-man-anh-rong.html",
        img: "assets/anh-tu-webtoon-den-man-anh-rong.jpg"
    },
    {
        title: "Truyện tranh Việt sắp góp mặt tại Frankfurt 2026, đưa sáng tạo của tác giả Việt ra thế giới",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "06/10/2026",
        slug: "truyen-tranh-viet-sap-gop.html",
        img: "assets/anh-truyen-tranh-viet-sap-gop.jpg"
    },
    {
        title: "“Here U Are” chính thức được chuyển thể anime: Chuyện tình thanh xuân khiến fan manhua mong chờ",
        category: "TRUYỆN LÊN SÓNG",
        date: "01/10/2026",
        slug: "here-u-are-chinh-thuc.html",
        img: "assets/anh-here-u-are-chinh-thuc.jpg"
    }
];

// XỬ LÝ PHÂN TRANG (3 BÀI / TRANG)
let currentNewsPage = 1;
const itemsPerPage = 3;
const totalPages = Math.ceil(newsArticles.length / itemsPerPage);

function renderNewsPage(page) {
    const container = document.getElementById('news-container');
    if (!container) return;

    container.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = newsArticles.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const cardHTML = `
            <article class="news-card">
                <a href="${item.slug}" class="news-card-link">
                    <div class="news-thumb-wrapper">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                    <span class="news-badge">${item.category}</span>
                    <h3 class="news-card-title">${item.title}</h3>
                    <span class="news-card-date">${item.date}</span>
                </a>
            </article>
        `;
        container.innerHTML += cardHTML;
    });

    // Cập nhật số trang hiển thị (01 - 02 -> 02 - 03)
    const currStr = String(page).padStart(2, '0');
    const nextStr = String(Math.min(page + 1, totalPages)).padStart(2, '0');
    
    document.getElementById('page-curr').textContent = currStr;
    document.getElementById('page-next').textContent = nextStr;
}

// KHỞI TẠO BẮT SỰ KIỆN NÚT NEXT / PREV
document.addEventListener('DOMContentLoaded', () => {
    renderNewsPage(currentNewsPage);

    const prevBtn = document.getElementById('news-prev-btn');
    const nextBtn = document.getElementById('news-next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentNewsPage > 1) {
                currentNewsPage--;
                renderNewsPage(currentNewsPage);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentNewsPage < totalPages) {
                currentNewsPage++;
                renderNewsPage(currentNewsPage);
            }
        });
    }
});

// DANH SÁCH BÀI VIẾT XẾP XEN KẼ REVIEW & PHÂN TÍCH THEO MỐC THỜI GIAN GIẢM DẦN
const reviewArticles = [
    // Trang 1: (22/10 - 19/10)
    {
        title: "Long Thần Tướng kể lịch sử Việt Nam bằng ngôn ngữ truyện tranh",
        category: "Review",
        date: "22/10/2026",
        slug: "long-than-tuong-ke-lich.html",
        img: "assets/anh-long-than-tuong-ke-lich.jpg"
    },
    {
        title: "Từ Đôrêmon đến Doraemon: Hành trình hơn 30 năm của chú mèo máy tại Việt Nam",
        category: "Review",
        date: "21/10/2026",
        slug: "tu-doremon-den-doraemon-hanh.html",
        img: "assets/anh-tu-doremon-den-doraemon-hanh.jpg"
    },
    {
        title: "Death Note và ranh giới mong manh giữa công lý với quyền lực",
        category: "Phân tích",
        date: "20/10/2026",
        slug: "death-note-va-ranh-gioi.html",
        img: "assets/anh-death-note-va-ranh-gioi.jpg"
    },
    {
        title: "Cô đi mà lấy chồng tôi: Khi cơ hội thứ hai trở thành cuộc trả thù",
        category: "Review",
        date: "19/10/2026",
        slug: "co-di-ma-lay-chong.html",
        img: "assets/anh-co-di-ma-lay-chong.jpg"
    },

    // Trang 2: (18/10 - 12/10)
    {
        title: "Conan và nghệ thuật tạo nên một vụ án trinh thám",
        category: "Phân tích",
        date: "18/10/2026",
        slug: "conan-va-nghe-thuat-tao.html",
        img: "assets/anh-conan-va-nghe-thuat-tao.jpg"
    },
    {
        title: "Frieren: Beyond Journey’s End và hành trình giả tưởng chậm rãi nhưng đầy cảm xúc",
        category: "Review",
        date: "17/10/2026",
        slug: "frieren-beyond-journeys-end-va.html",
        img: "assets/anh-frieren-beyond-journeys-end-va.jpg"
    },
    {
        title: "Naruto và hành trình từ đứa trẻ bị lãng quên đến người được công nhận",
        category: "Phân tích",
        date: "15/10/2026",
        slug: "naruto-va-hanh-trinh-tu.html",
        img: "assets/anh-naruto-va-hanh-trinh-tu.jpg"
    },
    {
        title: "Hành trình trở thành người mạnh nhất của Solo Leveling",
        category: "Review",
        date: "14/10/2026",
        slug: "hanh-trinh-tro-thanh-nguoi.html",
        img: "assets/anh-hanh-trinh-tro-thanh-nguoi.jpg"
    },

    // Trang 3: (12/10 - 01/10)
    {
        title: "Luffy và quan niệm về tự do trong One Piece",
        category: "Phân tích",
        date: "12/10/2026",
        slug: "luffy-va-quan-niem-ve.html",
        img: "assets/anh-luffy-va-quan-niem-ve.jpg"
    },
    {
        title: "Haikyuu!! - Hành trình trưởng thành sau mỗi trận đấu",
        category: "Review",
        date: "11/10/2026",
        slug: "haikyuu-hanh-trinh-truong-thanh.html",
        img: "assets/anh-haikyuu-hanh-trinh-truong-thanh.jpg"
    },
    {
        title: "Thế giới rộng lớn qua đôi mắt cô bé 5 tuổi Yotsuba",
        category: "Review",
        date: "08/10/2026",
        slug: "the-gioi-rong-lon-qua.html",
        img: "assets/anh-the-gioi-rong-lon-qua.jpg"
    },
    {
        title: "Nhất Nhân Chi Hạ - Khi văn hóa truyền thống trở thành chất liệu xây dựng thế giới truyện",
        category: "Phân tích",
        date: "05/10/2026",
        slug: "nhat-nhan-chi-ha-khi.html",
        img: "assets/anh-nhat-nhan-chi-ha-khi.jpg"
    },
    {
        title: "The Boxer và câu chuyện về con người được kể qua những trận đấu",
        category: "Phân tích",
        date: "01/10/2026",
        slug: "the-boxer-va-cau-chuyen.html",
        img: "assets/anh-the-boxer-va-cau-chuyen.jpg"
    }
];

// PHÂN TRANG (4 BÀI / TRANG)
let currentReviewPage = 1;
const reviewItemsPerPage = 4;
const totalReviewPages = Math.ceil(reviewArticles.length / reviewItemsPerPage);

function renderReviewPage(page) {
    const container = document.getElementById('review-container');
    if (!container) return;

    container.innerHTML = '';
    const startIndex = (page - 1) * reviewItemsPerPage;
    const endIndex = startIndex + reviewItemsPerPage;
    const pageItems = reviewArticles.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const cardHTML = `
            <article class="review-card">
                <a href="${item.slug}" class="review-card-link">
                    <div class="review-thumb-wrapper">
                        <img src="${item.img}" alt="${item.title}">
                    </div>
                    <div class="review-meta">
                        <span class="review-category">| ${item.category}</span>
                        <span class="review-date">${item.date}</span>
                    </div>
                    <h3 class="review-card-title">${item.title}</h3>
                </a>
            </article>
        `;
        container.innerHTML += cardHTML;
    });

    // Cập nhật số trang hiển thị
    const currStr = String(page).padStart(2, '0');
    const nextStr = String(Math.min(page + 1, totalReviewPages)).padStart(2, '0');
    
    document.getElementById('review-page-curr').textContent = currStr;
    document.getElementById('review-page-next').textContent = nextStr;
}

// BẮT SỰ KIỆN NÚT ĐIỀU HƯỚNG REVIEW
document.addEventListener('DOMContentLoaded', () => {
    renderReviewPage(currentReviewPage);

    const prevBtn = document.getElementById('review-prev-btn');
    const nextBtn = document.getElementById('review-next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentReviewPage > 1) {
                currentReviewPage--;
                renderReviewPage(currentReviewPage);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentReviewPage < totalReviewPages) {
                currentReviewPage++;
                renderReviewPage(currentReviewPage);
            }
        });
    }
});

// HIỆU ỨNG CANVAS BÓNG NẢY (TĂNG KÍCH THƯỚC CHUNG VÀ GIỮ THỨ TỰ TOP 1 -> TOP 5)
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

    // Bán kính bóng đã được tăng kích thước chung:
    // Top 1: 52px (to nhất) -> Top 5: 30px (nhỏ nhất)
    const mangaData = [
        { name: 'JoJo Part 7', src: 'assets/jojo_part7.jpg', radius: 52 },          // Top 1 (To nhất)
        { name: 'Berserk', src: 'assets/berserk.jpg', radius: 45 },                 // Top 2
        { name: 'One Piece', src: 'assets/one_piece.jpg', radius: 39 },             // Top 3
        { name: 'Fullmetal Alchemist', src: 'assets/fullmetal_alchemist.jpg', radius: 34 }, // Top 4
        { name: 'Grand Blue', src: 'assets/grand_blue_dreaming.jpg', radius: 30 }   // Top 5 (Nhỏ nhất)
    ];

    const balls = [];

    // Phân bổ vị trí ban đầu tránh chồng lấp
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
                if (dist < data.radius + other.radius + 6) {
                    overlapping = true;
                    break;
                }
            }
            attempts++;
        } while (overlapping && attempts < 100);

        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 1.0;

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

        // 1. Cập nhật vị trí & va chạm tường
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

        // 2. Va chạm vật lý chống dính giữa các bóng
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

        // 3. Vẽ lại các hình tròn cắt ảnh avatar
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

            // Viền đen nét đậm xung quanh bóng
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

// CHUYÊN MỤC TÁC GIẢ NỔI BẬT (SVG KHUNG CHUẨN)
document.addEventListener('DOMContentLoaded', () => {
    const authorArticles = [
        {
            title: "Hành trình từ cậu bé mê hải tặc đến cha đẻ của One Piece",
            date: "22/10/2026",
            slug: "eiichiro-oda-hanh-trinh.html",
            img: "assets/tac_gia_oda.jpg"
        },
        {
            title: "Naoki Urasawa và những câu chuyện manga đi sâu vào tâm lý con người",
            date: "20/10/2026",
            slug: "naoki-urasawa-tam-ly.html",
            img: "assets/tac_gia_urasawa.jpg"
        },
        {
            title: "Nguyễn Thành Phong cùng hành trình đưa chất liệu Việt vào truyện tranh",
            date: "18/10/2026",
            slug: "nguyen-thanh-phong-chat-lieu-viet.html",
            img: "assets/tac_gia_thanh_phong.jpg"
        },
        {
            title: "SIU và thế giới khổng lồ được kiến tạo trong Tower of God",
            date: "15/10/2026",
            slug: "siu-tower-of-god.html",
            img: "assets/tac_gia_siu.jpg"
        },
        {
            title: "Carnby Kim cùng hành trình tạo nên hiện tượng Sweet Home từ những câu chuyện kinh dị",
            date: "12/10/2026",
            slug: "carnby-kim-sweet-home.html",
            img: "assets/tac_gia_carnby_kim.jpg"
        },
        {
            title: "ONE từ webcomic nét vẽ đơn giản đến những tác phẩm vươn ra toàn cầu",
            date: "10/10/2026",
            slug: "one-tu-webcomic.html",
            img: "assets/tac_gia_one.jpg"
        }
    ];

    const gridContainer = document.getElementById('author-grid');
    const prevBtn = document.getElementById('author-prev-btn');
    const nextBtn = document.getElementById('author-next-btn');
    const currSpan = document.getElementById('author-page-curr');
    const nextSpan = document.getElementById('author-page-next');

    if (!gridContainer || !prevBtn || !nextBtn || !currSpan || !nextSpan) return;

    const itemsPerPage = 3;
    let currentAuthorPage = 1;
    const totalPages = Math.ceil(authorArticles.length / itemsPerPage);

    function renderAuthorPage(page) {
        gridContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const pageItems = authorArticles.slice(start, start + itemsPerPage);

        pageItems.forEach(item => {
            const cardHTML = `
                <a href="${item.slug}" class="author-card">
                    <!-- SVG Khung trắng vát góc + 2 đường gạch chéo vẽ chuẩn xịn -->
                    <svg class="author-card-bg" viewBox="0 0 320 440" preserveAspectRatio="none">
                        <!-- Khung nền trắng viền đen -->
                        <polygon points="50,15 305,15 305,385 270,425 15,425 15,55" fill="#ffffff" stroke="#000000" stroke-width="2.5" />
                        <!-- Đường vát chéo góc trên trái -->
                        <line x1="0" y1="70" x2="65" y2="0" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                        <!-- Đường vát chéo góc dưới phải -->
                        <line x1="255" y1="440" x2="320" y2="370" stroke="#000000" stroke-width="2.5" stroke-linecap="round" />
                    </svg>

                    <!-- Nội dung bên trong thẻ -->
                    <div class="author-card-content">
                        <div class="author-avatar-box">
                            <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/tac_gia_oda.jpg'">
                        </div>
                        <h3 class="author-card-title">${item.title}</h3>
                        <span class="author-card-date">${item.date}</span>
                    </div>
                </a>
            `;
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        const currStr = String(page).padStart(2, '0');
        const nextStr = String(Math.min(page + 1, totalPages)).padStart(2, '0');

        currSpan.textContent = currStr;
        nextSpan.textContent = nextStr;

        prevBtn.disabled = (page === 1);
        nextBtn.disabled = (page === totalPages);
    }

    prevBtn.addEventListener('click', () => {
        if (currentAuthorPage > 1) {
            currentAuthorPage--;
            renderAuthorPage(currentAuthorPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentAuthorPage < totalPages) {
            currentAuthorPage++;
            renderAuthorPage(currentAuthorPage);
        }
    });

    renderAuthorPage(1);
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. DANH SÁCH BÀI VIẾT BÀN TRUYỆN
    const discussionArticles = [
        { title: "Loid × Yor: Khi “vợ chồng giả” bắt đầu có những cảm xúc thật", date: "22/10/2026", img: "assets/ban_truyen_1.jpg", slug: "loid-yor-cam-xuc-that.html" },
        { title: "Kim Dokja biết trước tương lai, nhưng có thật sự hiểu câu chuyện?", date: "20/10/2026", img: "assets/ban_truyen_2.jpg", slug: "kim-dokja-tuong-lai.html" },
        { title: "Long Thần Tướng: Khi khung tranh kể nhiều hơn lời thoại", date: "18/10/2026", img: "assets/ban_truyen_3.jpg", slug: "long-than-tuong-khung-tranh.html" },
        { title: "Maomao không chỉ giải án bằng kiến thức: Hãy nhìn vào thứ mọi người bỏ qua", date: "15/10/2026", img: "assets/ban_truyen_4.jpg", slug: "maomao-giai-an.html" },
        { title: "Khi tác giả giấu một lời giải trong cảnh truyện bình thường: Học cách soi hint từ Witch Watch", date: "12/10/2026", img: "assets/ban_truyen_5.jpg", slug: "witch-watch-soi-hint.html" },
        { title: "Tác giả lỡ hé lộ? Những hint ngoài đời khiến fan Attack on Titan phải đọc lại từ đầu.", date: "10/10/2026", img: "assets/ban_truyen_6.jpg", slug: "aot-hint-ngoai-doi.html" }
    ];

    // RENDER BÀI VIẾT BÀN TRUYỆN
    const gridContainer = document.getElementById('discussion-grid');
    const prevBtn = document.getElementById('discussion-prev-btn');
    const nextBtn = document.getElementById('discussion-next-btn');
    const currSpan = document.getElementById('discussion-page-curr');
    const nextSpan = document.getElementById('discussion-page-next');

    if (gridContainer && prevBtn && nextBtn) {
        const itemsPerPage = 3;
        let currentPage = 1;
        const totalPages = Math.ceil(discussionArticles.length / itemsPerPage);

        function renderArticles(page) {
            gridContainer.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const pageItems = discussionArticles.slice(start, start + itemsPerPage);

            pageItems.forEach(item => {
                const cardHTML = `
                    <a href="${item.slug}" class="discussion-card">
                        <div class="discussion-card-img">
                            <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x250/d9d9d9/000000?text=Ban+Truyen'">
                        </div>
                        <div class="discussion-card-body">
                            <h3 class="discussion-card-title">${item.title}</h3>
                            <span class="discussion-card-date">${item.date}</span>
                        </div>
                    </a>
                `;
                gridContainer.insertAdjacentHTML('beforeend', cardHTML);
            });

            currSpan.textContent = String(page).padStart(2, '0');
            nextSpan.textContent = String(Math.min(page + 1, totalPages)).padStart(2, '0');
            prevBtn.disabled = (page === 1);
            nextBtn.disabled = (page === totalPages);
        }

        prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderArticles(currentPage); } });
        nextBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderArticles(currentPage); } });
        renderArticles(1);
    }

    // 2. DANH SÁCH BÌNH CHỌN TRUYỆN YÊU THÍCH
    const mangaPollList = [
        { id: 1, name: "JoJo's Bizarre Adventure: Part 7—Steel Ball Run", img: "assets/poll_jojo.jpg" },
        { id: 2, name: "Berserk", img: "assets/poll_berserk.jpg" },
        { id: 3, name: "One Piece", img: "assets/poll_onepiece.jpg" },
        { id: 4, name: "Fullmetal Alchemist: Brotherhood", img: "assets/poll_fma.jpg" },
        { id: 5, name: "Monster", img: "assets/poll_monster.jpg" },
        { id: 6, name: "Fullmetal Alchemist", img: "assets/poll_fma_orig.jpg" },
        { id: 7, name: "Grand Blue Dreaming", img: "assets/poll_grandblue.jpg" },
        { id: 8, name: "Haikyu!!", img: "assets/poll_haikyu.jpg" },
        { id: 9, name: "Solo travelling", img: "assets/poll_solo.jpg" },
        { id: 10, name: "Toàn trí độc giả", img: "assets/poll_orv.jpg" },
        { id: 11, name: "Cô đi mà lấy chồng tôi", img: "assets/poll_marrymyhusband.jpg" },
        { id: 12, name: "One-Punch Man", img: "assets/poll_opm.jpg" },
        { id: 13, name: "Tránh ra, Ta là pháp ma thiếu nữ", img: "assets/poll_phapmathieunu.jpg" },
        { id: 14, name: "My Avatars’ Path to Greatness", img: "assets/poll_avatars.jpg" },
        { id: 15, name: "Sweet Romance, Spicy Roommates", img: "assets/poll_roommates.jpg" },
        { id: 16, name: "Iseop’s Romance", img: "assets/poll_iseop.jpg" },
        { id: 17, name: "Bẩm thầy Tường, có thầy Vũ đến tìm!", img: "assets/poll_thaytuong.jpg" },
        { id: 18, name: "Chiêu Hoàng Kỷ", img: "assets/poll_chieuhoangky.jpg" }
    ];

    const pollGrid = document.getElementById('poll-grid');
    const pollPrevBtn = document.getElementById('poll-prev-btn');
    const pollNextBtn = document.getElementById('poll-next-btn');
    const submitVoteBtn = document.getElementById('submit-vote-btn');

    let selectedMangaIds = new Set();
    let currentPollPage = 1;
    const pollItemsPerPage = 4;
    const totalPollPages = Math.ceil(mangaPollList.length / pollItemsPerPage);

    function renderPollPage(page) {
        if (!pollGrid) return;
        pollGrid.innerHTML = '';
        const start = (page - 1) * pollItemsPerPage;
        const pageItems = mangaPollList.slice(start, start + pollItemsPerPage);

        pageItems.forEach(item => {
            const isSelected = selectedMangaIds.has(item.id);
            const isDisabled = selectedMangaIds.size >= 3 && !isSelected;

            const card = document.createElement('div');
            card.className = `manga-poll-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`;
            card.dataset.id = item.id;

            card.innerHTML = `
                <div class="manga-cover-wrapper">
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/200x280/d9d9d9/000000?text=Manga'">
                    <div class="manga-checkbox"></div>
                </div>
                <h4 class="manga-title">${item.name}</h4>
            `;

            card.addEventListener('click', () => toggleSelectManga(item.id));
            pollGrid.appendChild(card);
        });

        if (pollPrevBtn && pollNextBtn) {
            pollPrevBtn.disabled = (page === 1);
            pollNextBtn.disabled = (page === totalPollPages);
        }
    }

    function toggleSelectManga(id) {
        if (selectedMangaIds.has(id)) {
            selectedMangaIds.delete(id);
        } else {
            if (selectedMangaIds.size >= 3) {
                alert("Bạn chỉ được bình chọn tối đa 3 truyện!");
                return;
            }
            selectedMangaIds.add(id);
        }
        renderPollPage(currentPollPage);
    }

    if (pollPrevBtn && pollNextBtn) {
        pollPrevBtn.addEventListener('click', () => {
            if (currentPollPage > 1) {
                currentPollPage--;
                renderPollPage(currentPollPage);
            }
        });

        pollNextBtn.addEventListener('click', () => {
            if (currentPollPage < totalPollPages) {
                currentPollPage++;
                renderPollPage(currentPollPage);
            }
        });
    }

    if (submitVoteBtn) {
        submitVoteBtn.addEventListener('click', () => {
            if (selectedMangaIds.size === 0) {
                alert("Vui lòng chọn ít nhất 1 truyện để bình chọn!");
                return;
            }
            const selectedNames = mangaPollList
                .filter(m => selectedMangaIds.has(m.id))
                .map(m => m.name)
                .join("\n- ");

            alert(`Cảm ơn bạn đã bình chọn cho ${selectedMangaIds.size} truyện:\n- ${selectedNames}`);
        });
    }

    renderPollPage(1);
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. HIỆU ỨNG NẢY LÒ XO KHI HOVER VÀO LOGO TRẮNG
    const logoImg = document.querySelector('.footer-logo-img');

    if (logoImg) {
        logoImg.addEventListener('mouseenter', () => {
            logoImg.style.animation = 'none';
            logoImg.style.transition = 'transform 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            logoImg.style.transform = 'translateY(-12px) scale(0.95, 1.1)';

            setTimeout(() => {
                logoImg.style.transform = 'translateY(4px) scale(1.04, 0.92)';
                setTimeout(() => {
                    logoImg.style.transform = 'translateY(-2px) scale(0.98, 1.02)';
                    setTimeout(() => {
                        logoImg.style.transform = 'translateY(0) scale(1, 1)';
                        setTimeout(() => {
                            logoImg.style.animation = 'springBounce 3s infinite ease-in-out';
                        }, 500);
                    }, 100);
                }, 100);
            }, 120);
        });
    }

    // 2. XỬ LÝ NÚT ĐĂNG KÝ EMAIL
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');

    if (newsletterForm && newsletterEmail) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailValue = newsletterEmail.value.trim();

            if (emailValue) {
                alert(`Cảm ơn bạn đã đăng ký! Thông tin mới nhất sẽ được gửi đến email: ${emailValue}`);
                newsletterEmail.value = '';
            }
        });
    }
});