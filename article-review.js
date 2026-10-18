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
            slug: "nhat_nhan_chi_ha_khi_van_hoa_truyen_thong_tro_thanh_chat_lieu_xay_dung_the_gioi_truyen.html",
            img: "assets/phantich/nhat_nhan_chi_ha_xay_dung_the_gioi_di_nhan_tu_nhieu_lop_chat_lieu_van_hoa_truyen_thong_trung_hoa.jpg"
        },
        {
            title: "Long Thần Tướng kể lịch sử Việt Nam bằng ngôn ngữ truyện tranh",
            category: "Review",
            date: "13/10/2026",
            slug: "long_than_tuong_ke_lich_su_viet_nam_bang_ngon_ngu_truyen_tranh.html",
            img: "assets/anh-long-than-tuong-ke-lich.webp"
        },
        {
            title: "Câu chuyện về con người được kể qua những trận đấu trong The Boxer",
            category: "Phân tích",
            date: "10/10/2026",
            slug: "https://bai4tieumucreview.my.canva.site/theboxer",
            img: "assets/anh-the-boxer-va-cau-chuyen.jpg"
        },
        {
            title: "Thế giới rộng lớn qua đôi mắt cô bé 5 tuổi Yotsuba",
            category: "Review",
            date: "09/10/2026",
            slug: "the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.html",
            img: "assets/review/the_gioi_rong_lon_qua_doi_mat_co_be_5_tuoi_yotsuba.png"
        },
        {
            title: "Cô đi mà lấy chồng tôi: Khi cơ hội thứ hai trở thành cuộc trả thù",
            category: "Review",
            date: "06/10/2026",
            slug: "co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.html",
            img: "assets/review/co_di_ma_lay_chong_toi_khi_co_hoi_thu_hai_tro_thanh_cuoc_tra_thu.png"
        },
        {
            title: "Conan và nghệ thuật tạo nên một vụ án trinh thám",
            category: "Phân tích",
            date: "02/10/2026",
            slug: "https://preview.canva.site/393b154f-8c79-47a5-8910-6fa76db1c211/readie.com/",
            img: "assets/phantich/conan_va_nghe_thuat_tao_nen_mot_vu_an_trinh_tham.jpg"
        },
        {
            title: "Frieren: Beyond Journey’s End và hành trình giả tưởng chậm rãi nhưng đầy cảm xúc",
            category: "Review",
            date: "27/09/2026",
            slug: "https://preview.canva.site/c1aee036-32a5-40e1-830b-39e1f8046995/readie.com/frieren",
            img: "assets/anh-frieren-beyond-journeys-end-va.jpg"
        },
        {
            title: "Naruto và hành trình từ đứa trẻ bị lãng quên đến người được công nhận",
            category: "Phân tích",
            date: "17/09/2026",
            slug: "https://bai4tieumucreview.my.canva.site/naruto",
            img: "assets/anh-naruto-va-hanh-trinh-tu.jpg"
        },
        {
            title: "Hành trình trở thành người mạnh nhất của Solo Leveling",
            category: "Review",
            date: "14/09/2026",
            slug: "https://bai4tieumucreview.my.canva.site/bai6",
            img: "assets/review/hanh_trinh_tro_thanh_nguoi_manh_nhat_cua_solo_leveling.png"
        },
        {
            title: "Luffy và quan niệm về tự do trong One Piece",
            category: "Phân tích",
            date: "04/09/2026",
            slug: "https://preview.canva.site/231c67ed-8746-4e41-89c0-ba5cdf2fd15e/readie.com/luffy ",
            img: "assets/anh-luffy-va-quan-niem-ve.jpg"
        },
        {
            title: "Haikyuu!! - Hành trình trưởng thành sau mỗi trận đấu",
            category: "Review",
            date: "31/08/2026",
            slug: "https://bai4tieumucreview.my.canva.site/bai6",
            img: "assets/review/haikyuu_hanh_trinh_truong_thanh_sau_moi_tran_dau.webp"
        },
        {
            title: "Từ Đôrêmon đến Doraemon: Hành trình hơn 30 năm của chú mèo máy tại Việt Nam",
            category: "Review",
            date: "25/08/2026",
            slug: "https://bai4tieumucreview.my.canva.site/b-i-7-ti-u-m-c-review",
            img: "assets/review/tu_doremon_den_doraemon_hanh_trinh_hon_30_nam_cua_chu_meo_may_tai_viet_nam.jpg"
        },
        {
            title: "Death Note và ranh giới mong manh giữa công lý với quyền lực",
            category: "Phân tích",
            date: "07/08/2026",
            slug: "https://walrus-cfdcbd.my.canva.site/deathnote",
            img: "assets/anh-death-note-va-ranh-gioi.jfif"
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