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

    // 4. DANH SÁCH TOÀN BỘ 7 BÀI VIẾT BẢNG XẾP HẠNG (THEO ẢNH BẢNG CỦA BẠN)
    const allBxhArticles = [
        {
            title: "Top 5 truyện tranh Việt Nam đang được độc giả chú ý",
            category: "Bảng xếp hạng",
            date: "15/10/2026",
            slug: "top_5_truyen_tranh_viet_nam_dang_duoc_doc_gia_chu_y.html",
            img: "assets/anh-top-5-truyen-tranh-viet.jfif"
        },
        {
            title: "Top 5 manga đang được săn đón trên Bilibili Manga",
            category: "Bảng xếp hạng",
            date: "03/10/2026",
            slug: "top-5-manga-dang-duoc.html",
            img: "assets/anh-top-5-manga-dang-duoc.jpg"
        },
        {
            title: "Top 5 manhua Trung Quốc đang được yêu thích trên Bilibili Manga",
            category: "Bảng xếp hạng",
            date: "21/09/2026",
            slug: "top-5-manhua-trung-quoc.html",
            img: "assets/anh-top-5-manhua-trung-quoc.avif"
        },
        {
            title: "Top 5 webtoon Hàn Quốc đang nổi bật trên WEBTOON",
            category: "Bảng xếp hạng",
            date: "17/09/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/top-5-truy-n-tranh-h-n-qu-c-ang-n-i-b-t-tr-n-webtoon",
            img: "assets/anh-top-5-webtoon-han-quoc.avif"
        },
        {
            title: "10 bộ truyện tranh dưới 18 tuổi nên đọc ít nhất một lần",
            category: "Bảng xếp hạng",
            date: "05/09/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/b-n-sao-c-a-10-b-truy-n-tranh-d-i-18-tu-i-n-n-c-t-nh-t-m-t-l-n",
            img: "assets/anh-10-bo-truyen-tranh-duoi.jfif"
        },
        {
            title: "5 điều thú vị về thói quen đọc manga và webtoon của Gen Z năm 2026",
            category: "Bảng xếp hạng",
            date: "03/09/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/b-n-sao-c-a-10-b-truy-n-tranh-d-i-18-tu-i-n-n-c-t-nh-t-m-t-l-n",
            img: "assets/thoi-quen-genz.avif"
        },
        {
            title: "Top 5 manga và tác phẩm truyện minh họa giúp khám phá văn hóa Nhật Bản",
            category: "Bảng xếp hạng",
            date: "26/08/2026",
            slug: "https://hoaiphuongnguyenportfolio.my.canva.site/b-n-sao-c-a-10-b-truy-n-tranh-d-i-18-tu-i-n-n-c-t-nh-t-m-t-l-n",
            img: "assets/van-hoa-nhat-ban.avif"
        }
    ];

    // 5. PHÂN TRANG BÀI LIÊN QUAN (TỰ ĐỘNG LOẠI BỎ BÀI ĐANG XEM)
    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');

    if (!relatedContainer || !prevBtn || !nextBtn) return;

    // Lọc bỏ bài viết hiện tại
    const currentPath = window.location.pathname.split('/').pop() || '';
    const relatedArticles = allBxhArticles.filter(art => art.slug !== currentPath);

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

        // Cập nhật số trang 01 - 02...
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