/* ===================================================
   JAVASCRIPT BÀI LIÊN QUAN CHO BÀI TÁC GIẢ NỔI BẬT
   (ĐỒNG BỘ 100% CẤU TRÚC VỚI ARTICLE.CSS)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. DANH SÁCH BÀI VIẾT TÁC GIẢ NỔI BẬT
    const allAuthorArticles = [
        {
            title: "EIICHIRO ODA - Hành trình từ cậu bé mê hải tặc đến cha đẻ của One Piece",
            category: "Tác giả nổi bật",
            date: "20/10/2026",
            slug: "eiichiro-oda-hanh-trinh.html",
            img: "assets/tac_gia_oda.webp"
        },
        {
            title: "Nguyễn Thành Phong cùng hành trình đưa chất liệu Việt vào truyện tranh",
            category: "Tác giả nổi bật",
            date: "14/10/2026",
            slug: "nguyen_thanh_phong_cung_hanh_trinh_dua_chat_lieu_viet_vao_truyen_tranh.html",
            img: "assets/tac_gia_thanh_phong.png"
        },
        {
            title: "Hành trình tạo nên những tượng đài manga của RUMIKO TAKAHASHI",
            category: "Tác giả nổi bật",
            date: "10/10/2026",
            slug: "rumiko-takahashi.html",
            img: "assets/tac_gia_takahashi.jpg"
        },
        {
            title: "Naoki Urasawa và những câu chuyện manga đi sâu vào tâm lý con người",
            category: "Tác giả nổi bật",
            date: "24/09/2026",
            slug: "naoki-urasawa-tam-ly.html",
            img: "assets/tac_gia_urasawa.webp"
        },
        {
            title: "SIU và thế giới khổng lồ được kiến tạo trong Tower of God",
            category: "Tác giả nổi bật",
            date: "18/09/2026",
            slug: "siu-tower-of-god.html",
            img: "assets/tac_gia_siu.jpg"
        },
        {
            title: "Carnby Kim cùng hành trình tạo nên hiện tượng Sweet Home từ những câu chuyện kinh dị",
            category: "Tác giả nổi bật",
            date: "09/09/2026",
            slug: "carnby-kim-sweet-home.html",
            img: "assets/tac_gia_carnby_kim.jfif"
        },
        {
            title: "ONE từ webcomic nét vẽ đơn giản đến những tác phẩm vươn ra toàn cầu",
            category: "Tác giả nổi bật",
            date: "01/09/2026",
            slug: "one-tu-webcomic.html",
            img: "assets/tac_gia_one.webp"
        },
        {
            title: "Lê Linh và những nhân vật gắn liền với tuổi thơ qua Thần Đồng Đất Việt",
            category: "Tác giả nổi bật",
            date: "26/08/2026",
            slug: "le-linh.html",
            img: "assets/tac_gia_le_linh.webp"
        }
    ];

    const relatedContainer = document.getElementById('related-posts-grid');
    const prevBtn = document.getElementById('related-prev-btn');
    const nextBtn = document.getElementById('related-next-btn');
    const currPageElem = document.getElementById('related-page-curr');
    const nextPageElem = document.getElementById('related-page-next');

    if (!relatedContainer || !prevBtn || !nextBtn) return;

    // Tự động nhận diện và lọc bỏ bài hiện tại của Nguyễn Thành Phong
    const currentPath = window.location.pathname.split('/').pop() || '';
    const relatedArticles = allAuthorArticles.filter(art => !currentPath.includes(art.slug) && art.slug !== currentPath);

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

        // Hiển thị số trang 01 - 02...
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