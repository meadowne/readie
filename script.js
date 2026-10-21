document.addEventListener('DOMContentLoaded', () => {

    // Hàm kiểm tra màn hình máy tính
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // 1. CHỨC NĂNG TÌM KIẾM TOÀN TRANG
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const searchInput = document.getElementById('search-input');
    const searchSubmitBtn = document.getElementById('search-submit-btn');
    const searchResults = document.getElementById('search-results');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    const searchableDatabase = [
        { title: "TOUGEN ANKI 2 trở lại với arc thác Kegon", category: "Tin tức", slug: "tougen_anki_2_tro_lai_voi_arc_thac_kegon_cuoc_chien_oni_va_momotaro_tiep_tuc_len_song.html", img: "assets/tintuc/truyenlensong/poster-anime.png" },
        { title: "Truyện tranh Việt sắp góp mặt tại Frankfurt 2026", category: "Tin tức", slug: "truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.html", img: "assets/tintuc/comicbuzz/truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.jpg" },
        { title: "Nhất Nhân Chi Hạ - Khi văn hóa truyền thống trở thành chất liệu xây dựng thế giới truyện", category: "Phân tích", slug: "nhat_nhan_chi_ha_khi_van_hoa_truyen_thong_tro_thanh_chat_lieu_xay_dung_the_gioi_truyen.html", img: "assets/phantich/tin_nguong_dan_gian_buoc_vao_the_gioi_di_nhan.jpg" },
        { title: "Long Thần Tướng kể lịch sử Việt Nam bằng ngôn ngữ truyện tranh", category: "Review", slug: "long_than_tuong_ke_lich_su_viet_nam_bang_ngon_ngu_truyen_tranh.html", img: "assets/anh-long-than-tuong-ke-lich.webp" },
        { title: "Thế giới rộng lớn qua đôi mắt cô bé 5 tuổi Yotsuba", category: "Review", slug: "the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.html", img: "assets/review/the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.png" },
        { title: "Frieren: Beyond Journey’s End và hành trình giả tưởng chậm rãi nhưng đầy cảm xúc", category: "Review", slug: "frieren-beyond-journeys-end-va.html", img: "assets/anh-frieren-beyond-journeys-end-va.jpg" },
        { title: "Top 5 truyện tranh Việt Nam đang được độc giả chú ý", category: "Bảng xếp hạng", slug: "top_5_truyen_tranh_viet_nam_dang_duoc_doc_gia_chu_y.html", img: "assets/anh-top-5-truyen-tranh-viet.jfif" },
        { title: "Top 5 manga đang được săn đón trên Bilibili Manga", category: "Bảng xếp hạng", slug: "top-5-manga-dang-duoc.html", img: "assets/anh-top-5-manga-dang-duoc.jpg" },
        { title: "Top 5 manhua Trung Quốc đang được yêu thích trên Bilibili Manga", category: "Bảng xếp hạng", slug: "top-5-manhua-trung-quoc.html", img: "assets/anh-top-5-manhua-trung-quoc.avif" },
        { title: "Eiichiro Oda - Hành trình từ cậu bé mê hải tặc đến cha đẻ của One Piece", category: "Tác giả", slug: "eiichiro-oda-hanh-trinh.html", img: "assets/tac_gia_oda.webp" },
        { title: "Loid × Yor: Khi “vợ chồng giả” bắt đầu có những cảm xúc thật", category: "Bàn truyện", slug: "loid_x_yor_khi_vo_chong_gia_bat_dau_co_nhung_cam_xuc_that.html", img: "assets/bantruyen/soihint/manh_ghep_hoan_hao_cua_gia_dinh_forger.jpg" }
    ];

    function removeVietnameseTones(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
    }

    function performSearch() {
        if (!searchInput || !searchResults) return;
        const query = removeVietnameseTones(searchInput.value.trim());

        if (query === '') {
            searchResults.innerHTML = '';
            searchResults.classList.remove('has-results');
            return;
        }

        const filtered = searchableDatabase.filter(item => 
            removeVietnameseTones(item.title).includes(query) || 
            removeVietnameseTones(item.category).includes(query)
        );

        if (filtered.length > 0) {
            searchResults.innerHTML = filtered.map(item => `
                <a href="${item.slug}" class="search-result-item">
                    <div class="search-result-thumb">
                        <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/logo.png'">
                    </div>
                    <div class="search-result-info">
                        <div class="search-result-title">${item.title}</div>
                        <div class="search-result-meta">${item.category}</div>
                    </div>
                </a>
            `).join('');
            searchResults.classList.add('has-results');
        } else {
            searchResults.innerHTML = `<div class="search-no-result">Không tìm thấy bài viết</div>`;
            searchResults.classList.add('has-results');
        }
    }

    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
            if (searchBox.classList.contains('active') && searchInput) {
                searchInput.focus();
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', performSearch);
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    // Bấm ra ngoài khoảng trống bất kỳ: Tự đóng popup và menu
    document.addEventListener('click', (e) => {
        if (searchBox && searchBox.classList.contains('active')) {
            if (!searchBox.contains(e.target) && !e.target.closest('#search-btn')) {
                searchBox.classList.remove('active');
            }
        }
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !e.target.closest('#menu-toggle-btn')) {
                mobileMenu.classList.remove('active');
            }
        }
    });

// DANH SÁCH DỮ LIỆU CÁC BÀI VIẾT TIN TỨC (SẮP XẾP THEO THỜI GIAN MỚI NHẤT GIẢM DẦN)
const newsArticles = [
    {
        title: "TOUGEN ANKI 2 trở lại với arc thác Kegon: Cuộc chiến Oni và Momotaro tiếp tục lên sóng!",
        category: "TRUYỆN LÊN SÓNG",
        date: "22/10/2026",
        slug: "tougen_anki_2_tro_lai_voi_arc_thac_kegon_cuoc_chien_oni_va_momotaro_tiep_tuc_len_song.html",
        img: "assets/tintuc/truyenlensong/poster-anime.png"
    },
    {
        title: "Truyện tranh Việt sắp góp mặt tại Frankfurt 2026, đưa sáng tạo của tác giả Việt ra thế giới",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "21/10/2026",
        slug: "truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.html",
        img: "assets/tintuc/comicbuzz/truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.jpg"
    },
    {
        title: "Từ webtoon đến màn ảnh rộng: “Guardians of the Video Game” mở đường cho phim hoạt hình Hàn Quốc",
        category: "TRUYỆN LÊN SÓNG",
        date: "19/10/2026",
        slug: "tu_webtoon_den_man_anh_rong_guardians_of_the_video_game_mo_duong_cho_phim_hoat_hinh_han_quoc.html",
        img: "assets/anh-tu-webtoon-den-man-anh-rong.jpg"
    },
    {
        title: "Đọc manga bằng 100 ngôn ngữ? Shueisha mở rộng thế giới truyện tranh với MANGA MILLION!",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "17/10/2026",
        slug: "https://hoaiphuongnguyenportfolio.my.canva.site/c-manga-b-ng-100-ng-n-ng-shueisha-m-r-ng-th-gi-i-truy-n-tranh-v-i-manga-million",
        img: "assets/anh-doc-manga-bang-100-ngon-ngu.png"
    },
    {
        title: "Không cần là mangaka chuyên nghiệp: Cánh cửa xuất bản manga đang mở rộng cho nhà sáng tạo mới",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "15/10/2026",
        slug: "https://hoaiphuongnguyenportfolio.my.canva.site/kh-ng-c-n-l-mangaka-chuy-n-nghi-p-c-nh-c-a-xu-t-b-n-manga-ang-m-r-ng-cho-nh-s-ng-t-o-m-i",
        img: "assets/anh-khong-can-la-mangaka-chuyen-nghiep.jpg"
    },
    {
        title: "“Here U Are” chính thức được chuyển thể anime: Chuyện tình thanh xuân khiến fan manhua mong chờ",
        category: "TRUYỆN LÊN SÓNG",
        date: "08/10/2026",
        slug: "https://hoaiphuongnguyenportfolio.my.canva.site/here-u-are-ch-nh-th-c-c-chuy-n-th-anime-chuy-n-t-nh-thanh-xu-n-khi-n-fan-manhua-mong-ch",
        img: "assets/anh-here-u-are-chinh-thuc.jpg"
    },
    {
        title: "5 anime hè 2026 để lại dấu ấn ở những tập cuối",
        category: "COMIC BUZZ - TIN NÓNG",
        date: "01/10/2026",
        slug: "https://hoaiphuongnguyenportfolio.my.canva.site/5-anime-h-2026-l-i-d-u-n-nh-ng-t-p-cu-i",
        img: "assets/anh-5-anime-he-2026-de-lai.png"
    }
];

// ===================================================
// XỬ LÝ PHÂN TRANG & TỰ ĐỘNG LƯỚT TIN TỨC (AUTOPLAY)
// ===================================================
let currentNewsPage = 1;
const itemsPerPage = 3;
const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
let autoNewsSlideInterval = null;

function renderNewsPage(page, animationClass = 'slide-in-right') {
    const container = document.getElementById('news-container');
    if (!container) return;

    // Reset và kích hoạt animation trượt
    container.classList.remove('slide-in-right', 'slide-in-left');
    void container.offsetWidth; // Trigger reflow
    if (animationClass) {
        container.classList.add(animationClass);
    }

    container.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = newsArticles.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const cardHTML = `
            <article class="news-card">
                <a href="${item.slug}" class="news-card-link">
                    <div class="news-thumb-wrapper">
                        <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/one_piece.jpg'">
                    </div>
                    <span class="news-badge">${item.category}</span>
                    <h3 class="news-card-title">${item.title}</h3>
                    <span class="news-card-date">${item.date}</span>
                </a>
            </article>
        `;
        container.innerHTML += cardHTML;
    });

    // Cập nhật số trang hiển thị (01 - 02)
    const currStr = String(page).padStart(2, '0');
    const nextStr = String(page < totalPages ? page + 1 : 1).padStart(2, '0');
    
    const currElem = document.getElementById('page-curr');
    const nextElem = document.getElementById('page-next');
    if (currElem) currElem.textContent = currStr;
    if (nextElem) nextElem.textContent = nextStr;
}

// Chức năng chuyển sang trang tiếp theo (quay vòng tròn)
function nextNewsPage() {
    if (currentNewsPage < totalPages) {
        currentNewsPage++;
    } else {
        currentNewsPage = 1;
    }
    renderNewsPage(currentNewsPage, 'slide-in-right');
}

// Chức năng lùi trang trước
function prevNewsPage() {
    if (currentNewsPage > 1) {
        currentNewsPage--;
    } else {
        currentNewsPage = totalPages;
    }
    renderNewsPage(currentNewsPage, 'slide-in-left');
}

// Cơ chế tự động lướt (mỗi 3 giây chuyển 1 lần)
function startAutoNewsSlide() {
    stopAutoNewsSlide();
    autoNewsSlideInterval = setInterval(() => {
        nextNewsPage();
    }, 1500); // 1500ms = 1.5 giây (bạn có thể đổi thành 2000 hoặc 2500 tùy ý)
}

function stopAutoNewsSlide() {
    if (autoNewsSlideInterval) {
        clearInterval(autoNewsSlideInterval);
        autoNewsSlideInterval = null;
    }
}

// KHỞI TẠO BẮT SỰ KIỆN CHO TIN TỨC
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const newsSection = document.getElementById('tintuc');
    const prevBtn = document.getElementById('news-prev-btn');
    const nextBtn = document.getElementById('news-next-btn');

    if (newsContainer) {
        renderNewsPage(currentNewsPage, null);
        startAutoNewsSlide();

        // Rê chuột vào vùng tin tức thì dừng, rời ra thì chạy tiếp
        if (newsSection) {
            newsSection.addEventListener('mouseenter', stopAutoNewsSlide);
            newsSection.addEventListener('mouseleave', startAutoNewsSlide);
        }

        // Bấm nút chuyển trang thủ công
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextNewsPage();
                startAutoNewsSlide();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevNewsPage();
                startAutoNewsSlide();
            });
        }
    }
});

// DANH SÁCH BÀI VIẾT REVIEW & PHÂN TÍCH SẮP XẾP THEO MỐC THỜI GIAN MỚI NHẤT GIẢM DẦN
const reviewArticles = [
    // Trang 1: (22/10 - 19/10)
    {
        title: "Nhất Nhân Chi Hạ - Khi văn hóa truyền thống trở thành chất liệu xây dựng thế giới truyện",
        category: "Phân tích",
        date: "22/10/2026",
        slug: "nhat_nhan_chi_ha_khi_van_hoa_truyen_thong_tro_thanh_chat_lieu_xay_dung_the_gioi_truyen.html",
        img: "assets/phantich/tin_nguong_dan_gian_buoc_vao_the_gioi_di_nhan.jpg"
    },
    {
        title: "Long Thần Tướng kể lịch sử Việt Nam bằng ngôn ngữ truyện tranh",
        category: "Review",
        date: "21/10/2026",
        slug: "long_than_tuong_ke_lich_su_viet_nam_bang_ngon_ngu_truyen_tranh.html",
        img: "assets/anh-long-than-tuong-ke-lich.webp"
    },
    {
        title: "Thế giới rộng lớn qua đôi mắt cô bé 5 tuổi Yotsuba",
        category: "Review",
        date: "20/10/2026",
        slug: "the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.html",
        img: "assets/review/the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.png"
    },
    {
        title: "Cô đi mà lấy chồng tôi: Khi cơ hội thứ hai trở thành cuộc trả thù",
        category: "Review",
        date: "19/10/2026",
        slug: "co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.html",
        img: "assets/review/co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.png"
    },

    // Trang 2: (18/10 - 14/10)
    {
        title: "Conan và nghệ thuật tạo nên một vụ án trinh thám",
        category: "Phân tích",
        date: "18/10/2026",
        slug: "https://walrus-cfdcbd.my.canva.site/conan?fbclid=IwY2xjawVFvi5leHRuA2FlbQIxMQBwZG9mA3NydGMGYXBwX2lkATAAAR7Q_BZmp5Cm8LdnqbTiO6j9hjlJS6vsgiPnPRFOerm02LVxfI7VnE5WdmN1EQ_aem_4QtZNyW-u9yv42PvjM5DDw",
        img: "assets/phantich/conan_va_nghe_thuat_tao_nen_mot_vu_an_trinh_tham.jpg"
    },
    {
        title: "Frieren: Beyond Journey’s End và hành trình giả tưởng chậm rãi nhưng đầy cảm xúc",
        category: "Review",
        date: "17/10/2026",
        slug: "frieren-beyond-journeys-end.html",
        img: "assets/anh-frieren-beyond-journeys-end-va.jpg"
    },
    {
        title: "Naruto và hành trình từ đứa trẻ bị lãng quên đến người được công nhận",
        category: "Phân tích",
        date: "15/10/2026",
        slug: "https://bai4tieumucreview.my.canva.site/naruto",
        img: "assets/anh-naruto-va-hanh-trinh-tu.jpg"
    },
    {
        title: "Hành trình trở thành người mạnh nhất của Solo Leveling",
        category: "Review",
        date: "14/10/2026",
        slug: "https://bai4tieumucreview.my.canva.site/",
        img: "assets/review/hanh_trinh_tro_thanh_nguoi_manh_nhat_cua_solo_leveling.png",
    },

    // Trang 3: (13/10 - 11/10)
    {
        title: "The Boxer và câu chuyện về con người được kể qua những trận đấu",
        category: "Phân tích",
        date: "13/10/2026",
        slug: "the-boxer-va-cau-chuyen.html",
        img: "assets/anh-the-boxer-va-cau-chuyen.jpg"
    },
    {
        title: "Luffy và quan niệm về tự do trong One Piece",
        category: "Phân tích",
        date: "12/10/2026",
        slug: "https://walrus-cfdcbd.my.canva.site/luffy?fbclid=IwY2xjawVFvgJleHRuA2FlbQIxMQBwZG9mA3NydGMGYXBwX2lkATAAAR7u-JW_yp8LA0uqwt021LZ81othDC2Amlo9ukxYGz3TAIskCs3gMkIhjulBCw_aem_idK75H05_yw89Sps8ECQqQ",
        img: "assets/anh-luffy-va-quan-niem-ve.jpg"
    },
    {
        title: "Haikyuu!! - Hành trình trưởng thành sau mỗi trận đấu",
        category: "Review",
        date: "11/10/2026",
        slug: "https://bai4tieumucreview.my.canva.site/bai6",
        img: "assets/review/haikyuu_hanh_trinh_truong_thanh_sau_moi_tran_dau.webp"
    },
    {
        title: "Death Note và ranh giới mong manh giữa công lý với quyền lực",
        category: "Phân tích",
        date: "07/10/2026",
        slug: "https://walrus-cfdcbd.my.canva.site/deathnote",
        img: "assets/anh-death-note-va-ranh-gioi.jfif"
    },

    // Trang 4: (05/10)
    {
        title: "Từ Đôrêmon đến Doraemon: Hành trình hơn 30 năm của chú mèo máy tại Việt Nam",
        category: "Review",
        date: "05/10/2026",
        slug: "https://bai4tieumucreview.my.canva.site/b-i-7-ti-u-m-c-review",
        img: "assets/review/tu_doremon_den_doraemon_hanh_trinh_hon_30_nam_cua_chu_meo_may_tai_viet_nam.jpg"
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
        { name: 'JoJo Part 7', src: 'assets/jojo_part7.png', radius: 52 },          // Top 1 (To nhất)
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
            title: "Eiichiro Oda - Hành trình từ cậu bé mê hải tặc đến cha đẻ của One Piece",
            date: "22/10/2026",
            slug: "eiichiro-oda-hanh-trinh.html",
            img: "assets/tac_gia_oda.webp"
        },
        {
            title: "Nguyễn Thành Phong cùng hành trình đưa chất liệu Việt vào truyện tranh",
            date: "14/10/2026",
            slug: "nguyen_thanh_phong_cung_hanh_trinh_dua_chat_lieu_viet_vao_truyen_tranh.html",
            img: "assets/tac_gia_thanh_phong.png"
        },
        {
            title: "Hành trình tạo nên những tượng đài manga của Rumiko Takahashi",
            date: "10/10/2026",
            slug: "rumiko-takahashi.html",
            img: "assets/tac_gia_takahashi.jpg"
        },
        {
            title: "Naoki Urasawa và những câu chuyện manga đi sâu vào tâm lý con người",
            date: "24/09/2026",
            slug: "https://walrus-cfdcbd.my.canva.site/t-c-gi-naoki-urasawa",
            img: "assets/tac_gia_urasawa.webp"
        },
        {
            title: "SIU và thế giới khổng lồ được kiến tạo trong Tower of God",
            date: "18/09/2026",
            slug: "https://walrus-cfdcbd.my.canva.site/siu-v-th-gi-i-kh-ng-l-c-ki-n-t-o-trong-tower-of-god",
            img: "assets/tac_gia_siu.jpg"
        },
        {
            title: "Carnby Kim cùng hành trình tạo nên hiện tượng Sweet Home từ những câu chuyện kinh dị",
            date: "09/09/2026",
            slug: "https://walrus-cfdcbd.my.canva.site/carnby-kim-c-ng-h-nh-tr-nh-t-o-n-n-hi-n-t-ng-sweet-home-t-nh-ng-c-u-chuy-n-kinh-d",
            img: "assets/tac_gia_carnby_kim.jfif"
        },
        {
            title: "ONE từ webcomic nét vẽ đơn giản đến những tác phẩm vươn ra toàn cầu",
            date: "01/09/2026",
            slug: "https://walrus-cfdcbd.my.canva.site/one-t-webcomic-n-t-v-n-gi-n-n-nh-ng-t-c-ph-m-v-n-ra-to-n-c-u",
            img: "assets/tac_gia_one.webp"
        },
        {
            title: "Lê Linh và những nhân vật gắn liền với tuổi thơ qua Thần Đồng Đất Việt",
            date: "26/08/2026",
            slug: "https://walrus-cfdcbd.my.canva.site/one-t-webcomic-n-t-v-n-gi-n-n-nh-ng-t-c-ph-m-v-n-ra-to-n-c-u",
            img: "assets/tac_gia_le_linh.webp"
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
// 1. DANH SÁCH BÀI VIẾT BÀN TRUYỆN (SẮP XẾP THEO THỜI GIAN)
    const discussionArticles = [
        { 
            title: "Loid × Yor: Khi “vợ chồng giả” bắt đầu có những cảm xúc thật", 
            date: "22/10/2026", 
            img: "assets/bantruyen/soihint/manh_ghep_hoan_hao_cua_gia_dinh_forger.jpg", 
            slug: "loid_x_yor_khi_vo_chong_gia_bat_dau_co_nhung_cam_xuc_that.html" 
        },
        { 
            title: "Long Thần Tướng: Khi khung tranh kể nhiều hơn lời thoại", 
            date: "18/10/2026", 
            img: "assets/long_than_tuong_khi_khung_tranh_ke_nhieu_hon_loi_thoai.jpg", 
            slug: "long-than-tuong-khung-tranh.html" 
        },
        { 
            title: "Maomao không chỉ giải án bằng kiến thức: Hãy nhìn vào thứ mọi người bỏ qua", 
            date: "11/10/2026", 
            img: "assets/the_apothecary_diaries.jpg", 
            slug: "maomao_khong_chi_giai_an_bang_kien_thuc.html" 
        },
        { 
            title: "Khi tác giả giấu một lời giải trong cảnh truyện bình thường: Học cách soi hint từ Witch Watch", 
            date: "05/10/2026", 
            img: "assets/witch_watch.jpg", 
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/khi-t-c-gi-gi-u-m-t-l-i-gi-i-trong-c-nh-truy-n-b-nh-th-ng-h-c-c-ch-soi-hint-t-witch-watch" 
        },
        { 
            title: "Kim Dokja biết trước tương lai, nhưng có thật sự hiểu câu chuyện?", 
            date: "25/09/2026", 
            img: "assets/kim_dokja.jpg", 
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/kim-dokja-bi-t-tr-c-t-ng-lai-nh-ng-c-th-t-s-hi-u-c-u-chuy-n" 
        },
        { 
            title: "Tác giả lỡ hé lộ? Những hint ngoài đời khiến fan Attack on Titan phải đọc lại từ đầu.", 
            date: "20/09/2026", 
            img: "assets/aot.jpg", 
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/t-c-gi-l-h-l-nh-ng-hint-ngo-i-i-khi-n-fan-attack-on-titan-ph-i-c-l-i-t-u" 
        },
        { 
            title: "Vì sao hội mê manhua ngày càng bị cuốn vào kiểu nhân vật “phản diện chính”? Gu Changge của I Am the Fated Villain có gì đặc biệt?", 
            date: "07/09/2026", 
            img: "assets/i_am_the_fated_villain.jpg", 
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/v-sao-h-i-m-manhua-ng-y-c-ng-b-cu-n-v-o-ki-u-nh-n-v-t-ph-n-di-n-ch-nh-gu-changge-c-a-i-am-the-fated-villain-c-g-c-bi-t" 
        }
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
    // 1. HIỆU ỨNG NẢY LÒ XO KHI HOVER VÀO LOGO
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

// --- XỬ LÝ PHÂN TRANG BÀI LIÊN QUAN TRONG TRANG BÀI VIẾT (3 BÀI / TRANG) ---
document.addEventListener('DOMContentLoaded', () => {
    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');

    if (!relatedContainer || !prevBtn || !nextBtn) return;

    // Danh sách 6 bài còn lại trong chuyên mục Tin tức
    const relatedArticles = [
        // Trang 1
        {
            title: "TOUGEN ANKI 2 trở lại với arc thác Kegon: Cuộc chiến Oni và Momotaro tiếp tục lên sóng!",
            category: "Truyện lên sóng",
            date: "22/10/2026",
            slug: "tougen_anki_2_tro_lai_voi_arc_thac_kegon_cuoc_chien_oni_va_momotaro_tiep_tuc_len_song.html",
            img: "assets/tintuc/truyenlensong/poster-anime.png"
        },
        {
            title: "5 anime hè 2026 để lại dấu ấn ở những tập cuối",
            category: "Comic Buzz - Tin nóng",
            date: "16/10/2026",
            slug: "5-anime-he-2026-de-lai.html",
            img: "assets/anh-5-anime-he-2026-de-lai.png"
        },
        {
            title: "Từ webtoon đến màn ảnh rộng: “Guardians of the Video Game” mở đường cho phim hoạt hình Hàn Quốc",
            category: "Truyện lên sóng",
            date: "12/10/2026",
            slug: "tu-webtoon-den-man-anh-rong.html",
            img: "assets/anh-tu-webtoon-den-man-anh-rong.jpg"
        },
        // Trang 2
        {
            title: "Đọc manga bằng 100 ngôn ngữ? Shueisha mở rộng thế giới truyện tranh với MANGA MILLION!",
            category: "Comic Buzz - Tin nóng",
            date: "07/10/2026",
            slug: "doc-manga-bang-100-ngon-ngu.html",
            img: "assets/anh-doc-manga-bang-100-ngon-ngu.png"
        },
        {
            title: "Không cần là mangaka chuyên nghiệp: Cánh cửa xuất bản manga đang mở rộng cho nhà sáng tạo mới",
            category: "Comic Buzz - Tin nóng",
            date: "30/09/2026",
            slug: "khong-can-la-mangaka-chuyen-nghiep.html",
            img: "assets/anh-khong-can-la-mangaka-chuyen-nghiep.jpg"
        },
        {
            title: "“Here U Are” chính thức được chuyển thể anime: Chuyện tình thanh xuân khiến fan manhua mong chờ",
            category: "Truyện lên sóng",
            date: "14/09/2026",
            slug: "here-u-are-chinh-thuc.html",
            img: "assets/anh-here-u-are-chinh-thuc.jpg"
        }
    ];

    let currentRelatedPage = 1;
    const itemsPerPage = 3;
    const totalRelatedPages = Math.ceil(relatedArticles.length / itemsPerPage);

    function renderRelatedPage(page) {
        relatedContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const pageItems = relatedArticles.slice(start, start + itemsPerPage);

        pageItems.forEach(item => {
            const cardHTML = `
                <article class="related-card">
                    <a href="${item.slug}" class="related-card-link">
                        <div class="related-card-thumb">
                            <img src="${item.img}" alt="${item.title}">
                        </div>
                        <div class="related-card-meta">
                            <span class="related-cat">| ${item.category}</span>
                            <span class="related-date">${item.date}</span>
                        </div>
                        <h4 class="related-card-title">${item.title}</h4>
                    </a>
                </article>
            `;
            relatedContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Cập nhật số hiển thị (01 - 02 -> 02 - 03)
        const currStr = String(page).padStart(2, '0');
        const nextStr = String(page + 1).padStart(2, '0');

        if (currPageElem) currPageElem.textContent = currStr;
        if (nextPageElem) nextPageElem.textContent = nextStr;

        // Vô hiệu hóa nút khi ở trang đầu hoặc trang cuối
        prevBtn.disabled = (page === 1);
        nextBtn.disabled = (page === totalRelatedPages);
        prevBtn.style.opacity = page === 1 ? '0.4' : '1';
        nextBtn.style.opacity = page === totalRelatedPages ? '0.4' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentRelatedPage > 1) {
            currentRelatedPage--;
            renderRelatedPage(currentRelatedPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentRelatedPage < totalRelatedPages) {
            currentRelatedPage++;
            renderRelatedPage(currentRelatedPage);
        }
    });

    // Chạy render trang đầu tiên
    renderRelatedPage(currentRelatedPage);
});

// --- XỬ LÝ PHÂN TRANG BÀI LIÊN QUAN TRONG TRANG BÀI VIẾT (TỰ LOẠI TRỪ BÀI HIỆN TẠI) ---
document.addEventListener('DOMContentLoaded', () => {
    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');

    if (!relatedContainer || !prevBtn || !nextBtn) return;

    // Danh sách toàn bộ 7 bài viết của chuyên mục Tin tức
    const allNewsArticles = [
        {
            title: "TOUGEN ANKI 2 trở lại với arc thác Kegon: Cuộc chiến Oni và Momotaro tiếp tục lên sóng!",
            category: "Truyện lên sóng",
            date: "22/10/2026",
            slug: "tougen-anki-2-tro-lai.html",
            img: "assets/anh-tougen-anki-2-tro-lai.jpg"
        },
        {
            title: "5 anime hè 2026 để lại dấu ấn ở những tập cuối",
            category: "Comic Buzz - Tin nóng",
            date: "16/10/2026",
            slug: "5-anime-he-2026-de-lai.html",
            img: "assets/anh-5-anime-he-2026-de-lai.png"
        },
        {
            title: "Truyện tranh Việt sắp góp mặt tại Frankfurt 2026, đưa sáng tạo của tác giả Việt ra thế giới",
            category: "Comic Buzz - Tin nóng",
            date: "15/10/2026",
            slug: "truyen-tranh-viet-sap-gop.html",
            img: "assets/tintuc/comicbuzz/truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.jpg"
        },
        {
            title: "Từ webtoon đến màn ảnh rộng: “Guardians of the Video Game” mở đường cho phim hoạt hình Hàn Quốc",
            category: "Truyện lên sóng",
            date: "12/10/2026",
            slug: "tu-webtoon-den-man-anh-rong.html",
            img: "assets/tintuc/truyenlensong/tu_webtoon_den_man_anh_rong_guardians_of_the_video_game_mo_duong_cho_phim_hoat_hinh_han_quoc.png"
        },
        {
            title: "Đọc manga bằng 100 ngôn ngữ? Shueisha mở rộng thế giới truyện tranh với MANGA MILLION!",
            category: "Comic Buzz - Tin nóng",
            date: "07/10/2026",
            slug: "doc-manga-bang-100-ngon-ngu.html",
            img: "assets/anh-doc-manga-bang-100-ngon-ngu.png"
        },
        {
            title: "Không cần là mangaka chuyên nghiệp: Cánh cửa xuất bản manga đang mở rộng cho nhà sáng tạo mới",
            category: "Comic Buzz - Tin nóng",
            date: "30/09/2026",
            slug: "khong-can-la-mangaka-chuyen-nghiep.html",
            img: "assets/anh-khong-can-la-mangaka-chuyen-nghiep.jpg"
        },
        {
            title: "“Here U Are” chính thức được chuyển thể anime: Chuyện tình thanh xuân khiến fan manhua mong chờ",
            category: "Truyện lên sóng",
            date: "14/09/2026",
            slug: "here-u-are-chinh-thuc.html",
            img: "assets/anh-here-u-are-chinh-thuc.jpg"
        }
    ];

    // Lấy tên file HTML đang mở trên trình duyệt (ví dụ: "tu-webtoon-den-man-anh-rong.html")
    const currentPath = window.location.pathname.split('/').pop() || '';
    
    // Tự lọc bỏ bài viết hiện tại, chỉ giữ 6 bài còn lại
    const relatedArticles = allNewsArticles.filter(art => art.slug !== currentPath);

    let currentRelatedPage = 1;
    const itemsPerPage = 3;
    const totalRelatedPages = Math.ceil(relatedArticles.length / itemsPerPage);

    function renderRelatedPage(page) {
        relatedContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const pageItems = relatedArticles.slice(start, start + itemsPerPage);

        pageItems.forEach(item => {
            const cardHTML = `
                <article class="related-card">
                    <a href="${item.slug}" class="related-card-link">
                        <div class="related-card-thumb">
                            <img src="${item.img}" alt="${item.title}">
                        </div>
                        <div class="related-card-meta">
                            <span class="related-cat">| ${item.category}</span>
                            <span class="related-date">${item.date}</span>
                        </div>
                        <h4 class="related-card-title">${item.title}</h4>
                    </a>
                </article>
            `;
            relatedContainer.insertAdjacentHTML('beforeend', cardHTML);
        });

        const currStr = String(page).padStart(2, '0');
        const nextStr = String(page + 1).padStart(2, '0');

        if (currPageElem) currPageElem.textContent = currStr;
        if (nextPageElem) nextPageElem.textContent = nextStr;

        prevBtn.disabled = (page === 1);
        nextBtn.disabled = (page === totalRelatedPages);
        prevBtn.style.opacity = page === 1 ? '0.4' : '1';
        nextBtn.style.opacity = page === totalRelatedPages ? '0.4' : '1';
    }

    prevBtn.addEventListener('click', () => {
        if (currentRelatedPage > 1) {
            currentRelatedPage--;
            renderRelatedPage(currentRelatedPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentRelatedPage < totalRelatedPages) {
            currentRelatedPage++;
            renderRelatedPage(currentRelatedPage);
        }
    });

    renderRelatedPage(currentRelatedPage);
});

// ===================================================
// XỬ LÝ HIỆU ỨNG HIỆN DẦN KHI CUỘN XUỐNG (SCROLL REVEAL)
// ===================================================
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Khi phần tử lọt vào tầm nhìn ít nhất 15%
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Hiện xong thì ngừng theo dõi để không bị chạy lại gây phiền
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15, // Kích hoạt khi thấy 15% phần tử
            rootMargin: "0px 0px -40px 0px" // Kích hoạt trước khi chạm đáy một chút cho mượt
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Dự phòng cho trình duyệt quá cũ: hiện luôn không cần hiệu ứng
        revealElements.forEach(el => el.classList.add('is-visible'));
    }
});

/* ===================================================
   XỬ LÝ KHỐI "CÓ THỂ BẠN MUỐN ĐỌC" (DÙNG CHUNG CÁC TRANG)
   =================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Danh sách 6 bài viết chuẩn theo bảng dữ liệu
    const maybeReadArticles = [
        {
            title: "Từ webtoon đến màn ảnh rộng: “Guardians of the Video Game” mở đường cho phim hoạt hình Hàn Quốc",
            category: "Tin tức",
            date: "12/10/2026",
            slug: "tu_webtoon_den_man_anh_rong_guardians_of_the_video_game_mo_duong_cho_phim_hoat_hinh_han_quoc.html",
            img: "assets/anh-tu-webtoon-den-man-anh-rong.jpg"
        },
        {
            title: "Cô đi mà lấy chồng tôi: Khi cơ hội thứ hai trở thành cuộc trả thù",
            category: "Review & Phân tích",
            date: "06/10/2026",
            slug: "co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.html",
            img: "assets/review/co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.png"
        },
        {
            title: "EIICHIRO ODA - Hành trình từ cậu bé mê hải tặc đến cha đẻ của One Piece",
            category: "Tác giả nổi bật",
            date: "20/10/2026",
            slug: "eiichiro-oda-hanh-trinh.html",
            img: "assets/tacgia/Eiichiro_Oda.png"
        },
        {
            title: "Top 5 manga và tác phẩm truyện minh họa giúp khám phá văn hóa Nhật Bản",
            category: "Bảng xếp hạng",
            date: "26/08/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/top-5-manga-v-t-c-ph-m-truy-n-minh-h-a-gi-p-kh-m-ph-v-n-h-a-nh-t-b-n",
            img: "assets/van-hoa-nhat-ban.avif"
        },
        {
            title: "Maomao không chỉ giải án bằng kiến thức: Hãy nhìn vào thứ mọi người bỏ qua",
            category: "Bàn truyện",
            date: "11/10/2026",
            slug: "maomao_khong_chi_giai_an_bang_kien_thuc.html",
            img: "assets/bantruyen/maomao.webp"
        },
        {
            title: "Từ Đôrêmon đến Doraemon: Hành trình hơn 30 năm của chú mèo máy tại Việt Nam",
            category: "Review & Phân tích",
            date: "25/08/2026",
            slug: "https://bai4tieumucreview.my.canva.site/b-i-7-ti-u-m-c-review",
            img: "assets/review/tu_doremon_den_doraemon_hanh_trinh_hon_30_nam_cua_chu_meo_may_tai_viet_nam.jpg"
        }
    ];

    const grid = document.getElementById('maybe-read-grid') || document.querySelector('.maybe-read-grid');
    const prevBtn = document.getElementById('maybe-prev-btn');
    const nextBtn = document.getElementById('maybe-next-btn');
    const currElem = document.getElementById('maybe-page-curr');
    const nextElem = document.getElementById('maybe-page-next');

    if (!grid) return;

    let currentPage = 1;
    const itemsPerPage = 3;
    const totalPages = Math.ceil(maybeReadArticles.length / itemsPerPage);

    function renderMaybePage(page) {
        grid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const pageItems = maybeReadArticles.slice(start, start + itemsPerPage);

        pageItems.forEach(item => {
            const card = document.createElement('article');
            card.className = 'maybe-read-card';
            card.innerHTML = `
                <a href="${item.slug}" class="maybe-read-link">
                    <div class="maybe-read-thumb">
                        <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/one_piece.jpg'">
                    </div>
                    <div class="maybe-read-meta">
                        <span class="maybe-read-cat">| ${item.category}</span>
                        <span class="maybe-read-date">${item.date}</span>
                    </div>
                    <h4 class="maybe-read-title">${item.title}</h4>
                </a>
            `;
            grid.appendChild(card);
        });

        if (currElem) currElem.textContent = String(page).padStart(2, '0');
        if (nextElem) nextElem.textContent = String(page < totalPages ? page + 1 : 1).padStart(2, '0');

        if (prevBtn) {
            prevBtn.disabled = (page === 1);
            prevBtn.style.opacity = page === 1 ? '0.4' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = (page === totalPages);
            nextBtn.style.opacity = page === totalPages ? '0.4' : '1';
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderMaybePage(currentPage);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderMaybePage(currentPage);
            }
        });
    }

    renderMaybePage(1);
});
});
