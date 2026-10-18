document.addEventListener('DOMContentLoaded', () => {
    // 1. TÌM KIẾM
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

    // 2. HIỆU ỨNG NẢY LOGO FOOTER
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

    // 3. XỬ LÝ SUBMIT EMAIL FOOTER
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

    // 4. DANH SÁCH 7 BÀI VIẾT BÀN TRUYỆN (ĐÃ CẬP NHẬT CHUẨN THEO BẢNG DỮ LIỆU MỚI NHẤT)
    const allBanTruyenArticles = [
        {
            title: "Loid × Yor: Khi “vợ chồng giả” bắt đầu có những cảm xúc thật",
            category: "Bàn truyện",
            date: "22/10/2026",
            img: "assets/bantruyen/soihint/manh_ghep_hoan_hao_cua_gia_dinh_forger.jpg",
            slug: "loid_x_yor_khi_vo_chong_gia_bat_dau_co_nhung_cam_xuc_that.html"
        },
        {
            title: "Long Thần Tướng: Khi khung tranh kể nhiều hơn lời thoại",
            category: "Bàn truyện",
            date: "18/10/2026",
            img: "assets/long_than_tuong_khi_khung_tranh_ke_nhieu_hon_loi_thoai.jpg",
            slug: "long-than-tuong-khung-tranh.html"
        },
        {
            title: "Maomao không chỉ giải án bằng kiến thức: Hãy nhìn vào thứ mọi người bỏ qua",
            category: "Bàn truyện",
            date: "11/10/2026",
            img: "assets/the_apothecary_diaries.jpg",
            slug: "maomao_khong_chi_giai_an_bang_kien_thuc.html"
        },
        {
            title: "Khi tác giả giấu một lời giải trong cảnh truyện bình thường: Học cách soi hint từ Witch Watch",
            category: "Bàn truyện",
            date: "05/10/2026",
            img: "assets/witch_watch.jpg",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/khi-t-c-gi-gi-u-m-t-l-i-gi-i-trong-c-nh-truy-n-b-nh-th-ng-h-c-c-ch-soi-hint-t-witch-watch"
        },
        {
            title: "Kim Dokja biết trước tương lai, nhưng có thật sự hiểu câu chuyện?",
            category: "Bàn truyện",
            date: "25/09/2026",
            img: "assets/kim_dokja.jpg",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/kim-dokja-bi-t-tr-c-t-ng-lai-nh-ng-c-th-t-s-hi-u-c-u-chuy-n"
        },
        {
            title: "Tác giả lỡ hé lộ? Những hint ngoài đời khiến fan Attack on Titan phải đọc lại từ đầu.",
            category: "Bàn truyện",
            date: "20/09/2026",
            img: "assets/aot.jpg",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/t-c-gi-l-h-l-nh-ng-hint-ngo-i-i-khi-n-fan-attack-on-titan-ph-i-c-l-i-t-u"
        },
        {
            title: "Vì sao hội mê manhua ngày càng bị cuốn vào kiểu nhân vật “phản diện chính”? Gu Changge của I Am the Fated Villain có gì đặc biệt?",
            category: "Bàn truyện",
            date: "07/09/2026",
            img: "assets/i_am_the_fated_villain.jpg",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/v-sao-h-i-m-manhua-ng-y-c-ng-b-cu-n-v-o-ki-u-nh-n-v-t-ph-n-di-n-ch-nh-gu-changge-c-a-i-am-the-fated-villain-c-g-c-bi-t"
        }
    ];

    // 5. PHÂN TRANG BÀI LIÊN QUAN (LỌC THÔNG MINH TRÁNH TRÙNG BÀI HIỆN TẠI)
    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');
    
    if (!relatedContainer || !prevBtn || !nextBtn) return;

    const currentPath = window.location.pathname.split('/').pop() || '';
    const relatedArticles = allBanTruyenArticles.filter(art => {
        if (!currentPath) return true;
        return art.slug !== currentPath && !art.slug.includes(currentPath);
    });

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
                            <img src="${item.img}" alt="${item.title}" onerror="this.src='assets/one_piece.jpg'">
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