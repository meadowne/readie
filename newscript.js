/* ==========================================================================
   NEW POP-ART SCRIPT FOR INDEX (newscript.js)
   - Tắt Autoplay trên Mobile (<= 768px)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Hàm kiểm tra màn hình máy tính
    function isDesktop() {
        return window.innerWidth > 768;
    }

    // 1. TÌM KIẾM POPUP & MENU 3 GẠCH
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Bấm kính lúp: Mở/đóng ô tìm kiếm
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBox.classList.toggle('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    }

    // Bấm nút 3 gạch: Mở/đóng Menu (Hoạt động trên cả PC lẫn Mobile)
    if (menuToggleBtn && mobileMenu) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            if (searchBox) searchBox.classList.remove('active');
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

    // 2. DỮ LIỆU TIN TỨC (RENDER 1 LỚN + 2 NHỎ TRONG HỘP TRẮNG)
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
        }
    ];

    const newsBox = document.getElementById('news-featured-container');
    if (newsBox && newsArticles.length >= 3) {
        newsBox.innerHTML = `
            <a href="${newsArticles[0].slug}" class="tintuc-white-box">
                <div class="large-news-thumb">
                    <img src="${newsArticles[0].img}" alt="${newsArticles[0].title}" onerror="this.src='assets/one_piece.jpg'">
                </div>
                <span class="news-tag-badge">${newsArticles[0].category}</span>
                <h3 class="news-box-title">${newsArticles[0].title}</h3>
                <span class="news-box-date">${newsArticles[0].date}</span>
            </a>
            <div class="tintuc-small-grid">
                <a href="${newsArticles[1].slug}" class="tintuc-white-box">
                    <div class="small-news-thumb">
                        <img src="${newsArticles[1].img}" alt="${newsArticles[1].title}" onerror="this.src='assets/one_piece.jpg'">
                    </div>
                    <span class="news-tag-badge">${newsArticles[1].category}</span>
                    <h4 class="news-box-title">${newsArticles[1].title}</h4>
                    <span class="news-box-date">${newsArticles[1].date}</span>
                </a>
                <a href="${newsArticles[2].slug}" class="tintuc-white-box">
                    <div class="small-news-thumb">
                        <img src="${newsArticles[2].img}" alt="${newsArticles[2].title}" onerror="this.src='assets/one_piece.jpg'">
                    </div>
                    <span class="news-tag-badge">${newsArticles[2].category}</span>
                    <h4 class="news-box-title">${newsArticles[2].title}</h4>
                    <span class="news-box-date">${newsArticles[2].date}</span>
                </a>
            </div>
        `;
    }

    // 3. TOÀN BỘ 13 BÀI VIẾT REVIEW & PHÂN TÍCH
    const reviewArticles = [
        { title: "Nhất Nhân Chi Hạ - Khi văn hóa truyền thống trở thành chất liệu xây dựng thế giới truyện", category: "Phân tích", date: "20/10/2026", slug: "nhat_nhan_chi_ha_khi_van_hoa_truyen_thong_tro_thanh_chat_lieu_xay_dung_the_gioi_truyen.html", img: "assets/phantich/tin_nguong_dan_gian_buoc_vao_the_gioi_di_nhan.jpg" },
        { title: "Long Thần Tướng kể lịch sử Việt Nam bằng ngôn ngữ truyện tranh", category: "Review", date: "13/10/2026", slug: "long_than_tuong_ke_lich_su_viet_nam_bang_ngon_ngu_truyen_tranh.html", img: "assets/anh-long-than-tuong-ke-lich.webp" },
        { title: "Thế giới rộng lớn qua đôi mắt cô bé 5 tuổi Yotsuba", category: "Review", date: "09/10/2026", slug: "the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.html", img: "assets/review/the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.png" },
        { title: "Cô đi mà lấy chồng tôi: Khi cơ hội thứ hai trở thành cuộc trả thù", category: "Review", date: "06/10/2026", slug: "co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.html", img: "assets/review/co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.png" },
        { title: "Conan và nghệ thuật tạo nên một vụ án trinh thám", category: "Phân tích", date: "18/10/2026", slug: "https://walrus-cfdcbd.my.canva.site/conan?fbclid=IwY2xjawVFvi5leHRuA2FlbQIxMQBwZG9mA3NydGMGYXBwX2lkATAAAR7Q_BZmp5Cm8LdnqbTiO6j9hjlJS6vsgiPnPRFOerm02LVxfI7VnE5WdmN1EQ_aem_4QtZNyW-u9yv42PvjM5DDw", img: "assets/phantich/conan_va_nghe_thuat_tao_nen_mot_vu_an_trinh_tham.jpg" },
        { title: "Frieren: Beyond Journey’s End và hành trình giả tưởng chậm rãi nhưng đầy cảm xúc", category: "Review", date: "27/09/2026", slug: "frieren-beyond-journeys-end.html", img: "assets/anh-frieren-beyond-journeys-end-va.jpg" },
        { title: "Naruto và hành trình từ đứa trẻ bị lãng quên đến người được công nhận", category: "Phân tích", date: "15/10/2026", slug: "https://bai4tieumucreview.my.canva.site/naruto", img: "assets/anh-naruto-va-hanh-trinh-tu.jpg" },
        { title: "Hành trình trở thành người mạnh nhất của Solo Leveling", category: "Review", date: "14/10/2026", slug: "https://bai4tieumucreview.my.canva.site/", img: "assets/review/hanh_trinh_tro_thanh_nguoi_manh_nhat_cua_solo_leveling.png" },
        { title: "The Boxer và câu chuyện về con người được kể qua những trận đấu", category: "Phân tích", date: "13/10/2026", slug: "https://bai4tieumucreview.my.canva.site/theboxer", img: "assets/anh-the-boxer-va-cau-chuyen.jpg" },
        { title: "Luffy và quan niệm về tự do trong One Piece", category: "Phân tích", date: "12/10/2026", slug: "https://walrus-cfdcbd.my.canva.site/luffy?fbclid=IwY2xjawVFvgJleHRuA2FlbQIxMQBwZG9mA3NydGMGYXBwX2lkATAAAR7u-JW_yp8LA0uqwt021LZ81othDC2Amlo9ukxYGz3TAIskCs3gMkIhjulBCw_aem_idK75H05_yw89Sps8ECQqQ", img: "assets/anh-luffy-va-quan-niem-ve.jpg" },
        { title: "Haikyuu!! - Hành trình trưởng thành sau mỗi trận đấu", category: "Review", date: "11/10/2026", slug: "https://bai4tieumucreview.my.canva.site/bai6", img: "assets/review/haikyuu_hanh_trinh_truong_thanh_sau_moi_tran_dau.webp" },
        { title: "Death Note và ranh giới mong manh giữa công lý với quyền lực", category: "Phân tích", date: "07/10/2026", slug: "https://walrus-cfdcbd.my.canva.site/deathnote", img: "assets/anh-death-note-va-ranh-gioi.jfif" },
        { title: "Từ Đôrêmon đến Doraemon: Hành trình hơn 30 năm của chú mèo máy tại Việt Nam", category: "Review", date: "05/10/2026", slug: "https://bai4tieumucreview.my.canva.site/b-i-7-ti-u-m-c-review", img: "assets/review/tu_doremon_den_doraemon_hanh_trinh_hon_30_nam_cua_chu_meo_may_tai_viet_nam.jpg" }
    ];

    const reviewContainer = document.getElementById('review-container');
    const reviewPrevBtn = document.getElementById('review-prev-btn');
    const reviewNextBtn = document.getElementById('review-next-btn');
    const reviewZone = document.getElementById('review-hover-zone');
    let reviewPage = 1;
    const reviewItemsPerPage = 4;
    const totalReviewPages = Math.ceil(reviewArticles.length / reviewItemsPerPage);
    let reviewAutoTimer = null;

    function renderReviewGrid(page) {
        if (!reviewContainer) return;
        reviewContainer.style.opacity = '0';
        setTimeout(() => {
            reviewContainer.innerHTML = '';
            const start = (page - 1) * reviewItemsPerPage;
            const items = reviewArticles.slice(start, start + reviewItemsPerPage);
            items.forEach(art => {
                const card = `
                    <a href="${art.slug}" class="review-white-box">
                        <div class="review-box-thumb">
                            <img src="${art.img}" alt="${art.title}" onerror="this.src='assets/one_piece.jpg'">
                        </div>
                        <div class="review-box-meta">
                            <span>| ${art.category}</span>
                            <span>${art.date}</span>
                        </div>
                        <h4 class="review-box-title">${art.title}</h4>
                    </a>
                `;
                reviewContainer.insertAdjacentHTML('beforeend', card);
            });
            reviewContainer.style.opacity = '1';
        }, 150);
    }

    function startReviewAuto() {
        stopReviewAuto();
        if (!isDesktop()) return; // Tắt trên điện thoại

        reviewAutoTimer = setInterval(() => {
            reviewPage = reviewPage < totalReviewPages ? reviewPage + 1 : 1;
            renderReviewGrid(reviewPage);
        }, 2000);
    }

    function stopReviewAuto() {
        if (reviewAutoTimer) {
            clearInterval(reviewAutoTimer);
            reviewAutoTimer = null;
        }
    }

    if (reviewZone) {
        reviewZone.addEventListener('mouseenter', stopReviewAuto);
        reviewZone.addEventListener('mouseleave', startReviewAuto);
    }
    if (reviewPrevBtn) {
        reviewPrevBtn.addEventListener('click', () => {
            reviewPage = reviewPage > 1 ? reviewPage - 1 : totalReviewPages;
            renderReviewGrid(reviewPage);
        });
    }
    if (reviewNextBtn) {
        reviewNextBtn.addEventListener('click', () => {
            reviewPage = reviewPage < totalReviewPages ? reviewPage + 1 : 1;
            renderReviewGrid(reviewPage);
        });
    }

    renderReviewGrid(1);
    startReviewAuto();

    // 4. BẢNG XẾP HẠNG: NẠP ĐỦ 7 BÀI VIẾT
    const bxhArticles = [
        { title: "Top 5 truyện tranh Việt Nam đang được độc giả chú ý", date: "22/10/2026", img: "assets/anh-top-5-truyen-tranh-viet.jfif", slug: "top_5_truyen_tranh_viet_nam_dang_duoc_doc_gia_chu_y.html" },
        { title: "Top 5 manga đang được săn đón trên Bilibili Manga", date: "20/10/2026", img: "assets/anh-top-5-manga-dang-duoc.jpg", slug: "top-5-manga-dang-duoc.html" },
        { title: "Top 5 manhua Trung Quốc đang được yêu thích trên Bilibili Manga", date: "17/10/2026", img: "assets/anh-top-5-manhua-trung-quoc.avif", slug: "top-5-manhua-trung-quoc.html" },
        { title: "Top 5 webtoon Hàn Quốc đang nổi bật trên WEBTOON", date: "12/10/2026", img: "assets/anh-top-5-webtoon-han-quoc.avif", slug: "https://hoaiphuongnguyenportfolio.my.canva.site/top-5-truy-n-tranh-h-n-qu-c-ang-n-i-b-t-tr-n-webtoon" },
        { title: "10 bộ truyện tranh dưới 18 tuổi nên đọc ít nhất một lần", date: "05/10/2026", img: "assets/anh-10-bo-truyen-tranh-duoi.jfif", slug: "https://hoaiphuongnguyenportfolio.my.canva.site/b-n-sao-c-a-10-b-truy-n-tranh-d-i-18-tu-i-n-n-c-t-nh-t-m-t-l-n" },
        { title: "5 điều thú vị về thói quen đọc manga và webtoon của Gen Z năm 2026", date: "03/09/2026", img: "assets/thoi-quen-genz.avif", slug: "https://hoaiphuongnguyenportfolio.my.canva.site/b-n-sao-c-a-10-b-truy-n-tranh-d-i-18-tu-i-n-n-c-t-nh-t-m-t-l-n" },
        { title: "Top 5 manga và tác phẩm truyện minh họa giúp khám phá văn hóa Nhật Bản", date: "26/08/2026", img: "assets/van-hoa-nhat-ban.avif", slug: "https://hoaiphuongnguyenportfolio.my.canva.site/b-n-sao-c-a-10-b-truy-n-tranh-d-i-18-tu-i-n-n-c-t-nh-t-m-t-l-n" }
    ];

    const bxhList = document.getElementById('bxh-articles-list');
    if (bxhList) {
        bxhList.innerHTML = bxhArticles.map(item => `
            <a href="${item.slug}" class="bxh-row-card">
                <div class="bxh-row-thumb">
                    <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/one_piece.jpg'">
                </div>
                <div>
                    <h4 class="bxh-row-title">${item.title}</h4>
                    <span class="news-box-date">${item.date}</span>
                </div>
            </a>
        `).join('');
    }

    // 5. TOÀN BỘ 8 BÀI VIẾT TÁC GIẢ NỔI BẬT
    const authorArticles = [
        { title: "Eiichiro Oda - Hành trình từ cậu bé mê hải tặc đến cha đẻ của One Piece", date: "22/10/2026", slug: "eiichiro-oda-hanh-trinh.html", img: "assets/tacgia/Eiichiro_Oda.png" },
        { title: "Nguyễn Thành Phong cùng hành trình đưa chất liệu Việt vào truyện tranh", date: "14/10/2026", slug: "nguyen_thanh_phong_cung_hanh_trinh_dua_chat_lieu_viet_vao_truyen_tranh.html", img: "assets/tacgia/hoa_si_thanh_phong.png" },
        { title: "Hành trình tạo nên những tượng đài manga của Rumiko Takahashi", date: "10/10/2026", slug: "rumiko-takahashi.html", img: "assets/tacgia/di_san_cua_rumiko_takahashi.png" },
        { title: "Naoki Urasawa và những câu chuyện manga đi sâu vào tâm lý con người", date: "24/09/2026", slug: "https://walrus-cfdcbd.my.canva.site/t-c-gi-naoki-urasawa", img: "assets/tac_gia_urasawa.webp" },
        { title: "SIU và thế giới khổng lồ được kiến tạo trong Tower of God", date: "18/09/2026", slug: "https://walrus-cfdcbd.my.canva.site/siu-v-th-gi-i-kh-ng-l-c-ki-n-t-o-trong-tower-of-god", img: "assets/tacgia/siu.jpg" },
        { title: "Carnby Kim cùng hành trình tạo nên hiện tượng Sweet Home từ những câu chuyện kinh dị", date: "09/09/2026", slug: "https://walrus-cfdcbd.my.canva.site/carnby-kim-c-ng-h-nh-tr-nh-t-o-n-n-hi-n-t-ng-sweet-home-t-nh-ng-c-u-chuy-n-kinh-d", img: "assets/tacgia/carnby_kim.jpg" },
        { title: "ONE từ webcomic nét vẽ đơn giản đến những tác phẩm vươn ra toàn cầu", date: "01/09/2026", slug: "https://walrus-cfdcbd.my.canva.site/one-t-webcomic-n-t-v-n-gi-n-n-nh-ng-t-c-ph-m-v-n-ra-to-n-c-u", img: "assets/tacgia/one.jpg" },
        { title: "Lê Linh và những nhân vật gắn liền với tuổi thơ qua Thần Đồng Đất Việt", date: "26/08/2026", slug: "https://walrus-cfdcbd.my.canva.site/one-t-webcomic-n-t-v-n-gi-n-n-nh-ng-t-c-ph-m-v-n-ra-to-n-c-u", img: "assets/tacgia/le_linh.jpg" }
    ];

    const authorContainer = document.getElementById('author-container');
    const authorPrevBtn = document.getElementById('author-prev-btn');
    const authorNextBtn = document.getElementById('author-next-btn');
    const authorZone = document.getElementById('author-hover-zone');
    let authorPage = 1;
    const authorItemsPerPage = 4;
    const totalAuthorPages = Math.ceil(authorArticles.length / authorItemsPerPage);
    let authorAutoTimer = null;

    function renderAuthorGrid(page) {
        if (!authorContainer) return;
        authorContainer.style.opacity = '0';
        setTimeout(() => {
            authorContainer.innerHTML = '';
            const start = (page - 1) * authorItemsPerPage;
            const items = authorArticles.slice(start, start + authorItemsPerPage);
            items.forEach(art => {
                const card = `
                    <a href="${art.slug}" class="author-white-box">
                        <div class="author-box-thumb">
                            <img src="${art.img}" alt="${art.title}" onerror="this.src='assets/tac_gia_oda.jpg'">
                        </div>
                        <div class="author-box-meta">
                            <span>| Tác giả nổi bật</span>
                            <span>${art.date}</span>
                        </div>
                        <h4 class="author-box-title">${art.title}</h4>
                    </a>
                `;
                authorContainer.insertAdjacentHTML('beforeend', card);
            });
            authorContainer.style.opacity = '1';
        }, 150);
    }

    function startAuthorAuto() {
        stopAuthorAuto();
        if (!isDesktop()) return; // Tắt trên điện thoại

        authorAutoTimer = setInterval(() => {
            authorPage = authorPage < totalAuthorPages ? authorPage + 1 : 1;
            renderAuthorGrid(authorPage);
        }, 2000);
    }

    function stopAuthorAuto() {
        if (authorAutoTimer) {
            clearInterval(authorAutoTimer);
            authorAutoTimer = null;
        }
    }

    if (authorZone) {
        authorZone.addEventListener('mouseenter', stopAuthorAuto);
        authorZone.addEventListener('mouseleave', startAuthorAuto);
    }
    if (authorPrevBtn) {
        authorPrevBtn.addEventListener('click', () => {
            authorPage = authorPage > 1 ? authorPage - 1 : totalAuthorPages;
            renderAuthorGrid(authorPage);
        });
    }
    if (authorNextBtn) {
        authorNextBtn.addEventListener('click', () => {
            authorPage = authorPage < totalAuthorPages ? authorPage + 1 : 1;
            renderAuthorGrid(authorPage);
        });
    }

    renderAuthorGrid(1);
    startAuthorAuto();

    // 6. BÀN TRUYỆN: LƯỚI 2x2
    const discussionArticles = [
        { title: "Loid × Yor: Khi “vợ chồng giả” bắt đầu có những cảm xúc thật", date: "22/10/2026", img: "assets/bantruyen/soihint/manh_ghep_hoan_hao_cua_gia_dinh_forger.jpg", slug: "loid_x_yor_khi_vo_chong_gia_bat_dau_co_nhung_cam_xuc_that.html" },
        { title: "Long Thần Tướng: Khi khung tranh kể nhiều hơn lời thoại", date: "18/10/2026", img: "assets/long_than_tuong_khi_khung_tranh_ke_nhieu_hon_loi_thoai.jpg", slug: "long-than-tuong-khung-tranh.html" },
        { title: "Maomao không chỉ giải án bằng kiến thức: Hãy nhìn vào thứ mọi người bỏ qua", date: "11/10/2026", img: "assets/the_apothecary_diaries.jpg", slug: "maomao_khong_chi_giai_an_bang_kien_thuc.html" },
        { title: "Khi tác giả giấu một lời giải trong cảnh truyện bình thường: Học cách soi hint từ Witch Watch", date: "05/10/2026", img: "assets/witch_watch.jpg", slug: "https://hoaiphuongnguyenportfolio.my.canva.site/khi-t-c-gi-gi-u-m-t-l-i-gi-i-trong-c-nh-truy-n-b-nh-th-ng-h-c-c-ch-soi-hint-t-witch-watch" }
    ];

    const btContainer = document.getElementById('bantruyen-container');
    if (btContainer) {
        btContainer.innerHTML = discussionArticles.map(item => `
            <a href="${item.slug}" class="bantruyen-white-box">
                <div class="bantruyen-box-thumb">
                    <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/one_piece.jpg'">
                </div>
                <div class="review-box-meta">
                    <span>| Bàn truyện</span>
                    <span>${item.date}</span>
                </div>
                <h4 class="bantruyen-box-title">${item.title}</h4>
            </a>
        `).join('');
    }

    // 7. LẮNG NGHE SỰ KIỆN ĐỔI KÍCH THƯỚC MÀN HÌNH / XOAY ĐIỆN THOẠI
    window.addEventListener('resize', () => {
        if (!isDesktop()) {
            stopReviewAuto();
            stopAuthorAuto();
        } else {
            if (!reviewAutoTimer) startReviewAuto();
            if (!authorAutoTimer) startAuthorAuto();
        }
    });

    // 8. SCROLL REVEAL
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }
});