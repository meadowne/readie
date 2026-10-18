document.addEventListener('DOMContentLoaded', () => {
    // 1. TÌM KIẾM TRÊN THANH NAVBAR
    const searchBtn = document.getElementById('search-btn');
    const searchBox = document.getElementById('search-box');
    if (searchBtn && searchBox) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchBox.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && e.target !== searchBtn) {
                searchBox.classList.remove('active');
            }
        });
    }

    // 2. HIỆU ỨNG NẢY LÒ XO LOGO CHÂN TRANG FOOTER
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

    // 3. XỬ LÝ SUBMIT EMAIL NEWSLETTER FOOTER
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

    // 4. DANH SÁCH TOÀN BỘ 7 BÀI VIẾT CHUYÊN MỤC TIN TỨC (SẮP XẾP MỚI NHẤT GIẢM DẦN)
    const allNewsArticles = [
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
            title: "Truyện tranh Việt sắp góp mặt tại Frankfurt 2026, đưa sáng tạo của tác giả Việt ra thế giới",
            category: "Comic Buzz - Tin nóng",
            date: "15/10/2026",
            slug: "truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.html",
            img: "assets/tintuc/comicbuzz/truyen_tranh_viet_sap_gop_mat_tai_frankfurt_2026_dua_sang_tao_cua_tac_gia_viet_ra_the_gioi.jpg"
        },
        {
            title: "Từ webtoon đến màn ảnh rộng: “Guardians of the Video Game” mở đường cho phim hoạt hình Hàn Quốc",
            category: "Truyện lên sóng",
            date: "12/10/2026",
            slug: "tu_webtoon_den_man_anh_rong_guardians_of_the_video_game_mo_duong_cho_phim_hoat_hinh_han_quoc.html",
            img: "assets/anh-tu-webtoon-den-man-anh-rong.jpg"
        },
        {
            title: "Đọc manga bằng 100 ngôn ngữ? Shueisha mở rộng thế giới truyện tranh với MANGA MILLION!",
            category: "Comic Buzz - Tin nóng",
            date: "07/10/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/c-manga-b-ng-100-ng-n-ng-shueisha-m-r-ng-th-gi-i-truy-n-tranh-v-i-manga-million",
            img: "assets/anh-doc-manga-bang-100-ngon-ngu.png"
        },
        {
            title: "Không cần là mangaka chuyên nghiệp: Cánh cửa xuất bản manga đang mở rộng cho nhà sáng tạo mới",
            category: "Comic Buzz - Tin nóng",
            date: "30/09/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/kh-ng-c-n-l-mangaka-chuy-n-nghi-p-c-nh-c-a-xu-t-b-n-manga-ang-m-r-ng-cho-nh-s-ng-t-o-m-i",
            img: "assets/anh-khong-can-la-mangaka-chuyen-nghiep.jpg"
        },
        {
            title: "“Here U Are” chính thức được chuyển thể anime: Chuyện tình thanh xuân khiến fan manhua mong chờ",
            category: "Truyện lên sóng",
            date: "14/09/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/here-u-are-ch-nh-th-c-c-chuy-n-th-anime-chuy-n-t-nh-thanh-xu-n-khi-n-fan-manhua-mong-ch",
            img: "assets/anh-here-u-are-chinh-thuc.jpg"
        }
    ];

    // 5. TỰ LỌC BỎ BÀI HIỆN TẠI ĐANG XEM
    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');

    if (!relatedContainer || !prevBtn || !nextBtn) return;

    const currentPath = window.location.pathname.split('/').pop() || '';
    const relatedArticles = allNewsArticles.filter(art => !currentPath.includes(art.slug) && !art.slug.includes(currentPath));

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

        // Hiển thị số trang 01 - 02 -> 02 - 03
        const currStr = String(page).padStart(2, '0');
        const nextStr = String(Math.min(page + 1, totalRelatedPages)).padStart(2, '0');

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