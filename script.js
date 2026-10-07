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