document.addEventListener('DOMContentLoaded', () => {
    // 1. XỬ LÝ NÚT TÌM KIẾM
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

    // 2. HIỆU ỨNG NẢY LÒ XO LOGO FOOTER
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

    // 3. XỬ LÝ SUBMIT EMAIL NEWSLETTER
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

    // 4. DANH SÁCH TOÀN BỘ 13 BÀI VIẾT REVIEW & PHÂN TÍCH (SẮP XẾP THEO THỜI GIAN GIẢM DẦN)
    const allReviewArticles = [
        {
            title: "Nhất Nhân Chi Hạ - Khi văn hóa truyền thống trở thành chất liệu xây dựng thế giới truyện",
            category: "Phân tích",
            date: "20/10/2026",
            slug: "nhat-nhan-chi-ha-khi.html",
            img: "assets/anh-nhat-nhan-chi-ha-khi.jpg"
        },
        {
            title: "Long Thần Tướng kể lịch sử Việt Nam bằng ngôn ngữ truyện tranh",
            category: "Review",
            date: "13/10/2026",
            slug: "long-than-tuong-ke-lich.html",
            img: "assets/anh-long-than-tuong-ke-lich.jpg"
        },
        {
            title: "Câu chuyện về con người được kể qua những trận đấu trong The Boxer",
            category: "Phân tích",
            date: "10/10/2026",
            slug: "the-boxer-va-cau-chuyen.html",
            img: "assets/anh-the-boxer-va-cau-chuyen.jpg"
        },
        {
            title: "Thế giới rộng lớn qua đôi mắt cô bé 5 tuổi Yotsuba",
            category: "Review",
            date: "09/10/2026",
            slug: "the-gioi-rong-lon-qua.html",
            img: "assets/review/the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.png"
        },
        {
            title: "Cô đi mà lấy chồng tôi: Khi cơ hội thứ hai trở thành cuộc trả thù",
            category: "Review",
            date: "06/10/2026",
            slug: "co-di-ma-lay-chong.html",
            img: "assets/anh-co-di-ma-lay-chong.jpg"
        },
        {
            title: "Conan và nghệ thuật tạo nên một vụ án trinh thám",
            category: "Phân tích",
            date: "02/10/2026",
            slug: "conan-va-nghe-thuat-tao.html",
            img: "assets/anh-conan-va-nghe-thuat-tao.jpg"
        },
        {
            title: "Frieren: Beyond Journey’s End và hành trình giả tưởng chậm rãi nhưng đầy cảm xúc",
            category: "Review",
            date: "27/09/2026",
            slug: "frieren-beyond-journeys-end-va.html",
            img: "assets/anh-frieren-beyond-journeys-end-va.jpg"
        },
        {
            title: "Naruto và hành trình từ đứa trẻ bị lãng quên đến người được công nhận",
            category: "Phân tích",
            date: "17/09/2026",
            slug: "naruto-va-hanh-trinh-tu.html",
            img: "assets/anh-naruto-va-hanh-trinh-tu.jpg"
        },
        {
            title: "Hành trình trở thành người mạnh nhất của Solo Leveling",
            category: "Review",
            date: "14/09/2026",
            slug: "hanh-trinh-tro-thanh-nguoi.html",
            img: "assets/review/hanh_trinh_tro_thanh_nguoi_manh_nhat_cua_solo_leveling.png"
        },
        {
            title: "Luffy và quan niệm về tự do trong One Piece",
            category: "Phân tích",
            date: "04/09/2026",
            slug: "luffy-va-quan-niem-ve.html",
            img: "assets/anh-luffy-va-quan-niem-ve.jpg"
        },
        {
            title: "Haikyuu!! - Hành trình trưởng thành sau mỗi trận đấu",
            category: "Review",
            date: "31/08/2026",
            slug: "haikyuu-hanh-trinh-truong-thanh.html",
            img: "assets/anh-haikyuu-hanh-trinh-truong-thanh.jpg"
        },
        {
            title: "Từ Đôrêmon đến Doraemon: Hành trình hơn 30 năm của chú mèo máy tại Việt Nam",
            category: "Review",
            date: "25/08/2026",
            slug: "tu-doremon-den-doraemon-hanh.html",
            img: "assets/anh-tu-doremon-den-doraemon-hanh.jpg"
        },
        {
            title: "Death Note và ranh giới mong manh giữa công lý với quyền lực",
            category: "Phân tích",
            date: "07/08/2026",
            slug: "death-note-va-ranh-gioi.html",
            img: "assets/anh-death-note-va-ranh-gioi.jpg"
        }
    ];

    // 5. PHÂN TRANG BÀI LIÊN QUAN (TỰ LOẠI BỎ BÀI HIỆN TẠI)
    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');

    if (!relatedContainer || !prevBtn || !nextBtn) return;

    // Lọc bỏ bài viết hiện tại
    const currentPath = window.location.pathname.split('/').pop() || '';
    const relatedArticles = allReviewArticles.filter(art => art.slug !== currentPath);

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

        // Hiển thị số trang 01 - 02, 02 - 03...
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