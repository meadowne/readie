/* ===================================================
   JAVASCRIPT CHUYÊN MỤC BÀN TRUYỆN (bantruyen.js)
   - TỰ ĐỘNG CHUYỂN 1.5 GIÂY / LẦN
   - HIỆU ỨNG TRƯỢT SANG PHẢI (SLIDE EFFECT)
   - GIỮ NGUYÊN FORM, KHÔNG CO GIÃN KHUNG
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const mangaPollList = [
        { id: 1, name: "JoJo's Bizarre Adventure: Part 7 — Steel Ball Run", img: "assets/jojo_part7.png" },
        { id: 2, name: "Berserk", img: "assets/berserk.jpg" },
        { id: 3, name: "One Piece", img: "assets/one_piece.jpg" },
        { id: 4, name: "Fullmetal Alchemist: Brotherhood", img: "assets/fullmetal_alchemist.jpg" },
        { id: 5, name: "Grand Blue Dreaming", img: "assets/grand_blue_dreaming.jpg" },
        { id: 6, name: "Dược Sư Tự Sự", img: "assets/duoc_su_tu_su.jpg" },
        { id: 7, name: "Operation: True Love", img: "assets/operation_true_love.jpg" },
        { id: 8, name: "Blue Lock", img: "assets/blue_lock.jpg" },
        { id: 9, name: "Cry, or Better Yet, Beg", img: "assets/cry_or_better_yet_beg.jpg" },
        { id: 10, name: "Bẩm thầy Tường, có thầy Vũ đến tìm!", img: "assets/thay_tuong_thay_vu.jpg" },
        { id: 11, name: "Solo Leveling", img: "assets/poll_solo_leveling.jpg" },
        { id: 12, name: "Omniscient Reader's Viewpoint", img: "assets/poll_orv.jpg" },
        { id: 13, name: "Dandadan", img: "assets/poll_dandadan.jpg" },
        { id: 14, name: "Kagurabachi", img: "assets/poll_kagurabachi.jpg" },
        { id: 15, name: "Sakamoto Days", img: "assets/poll_sakamoto_days.jpg" },
        { id: 16, name: "The Fragrant Flower Blooms with Dignity", img: "assets/poll_fragrant_flower.jpg" },
        { id: 17, name: "The Advanced Player of the Tutorial Tower", img: "assets/poll_tutorial_tower.jpg" },
        { id: 18, name: "Lookism", img: "assets/poll_lookism.jpg" },
        { id: 19, name: "The Remarried Empress", img: "assets/poll_remarried_empress.jpg" },
        { id: 20, name: "The Mafia Nanny", img: "assets/poll_mafia_nanny.jpg" },
        { id: 21, name: "Jungle Juice", img: "assets/poll_jungle_juice.jpg" },
        { id: 22, name: "The Boxer", img: "assets/poll_the_boxer.jpg" },
        { id: 23, name: "I'm Really Not the Demon God's Lackey", img: "assets/poll_demon_god_lackey.jpg" },
        { id: 24, name: "Keep a Low Profile, Sect Leader", img: "assets/poll_sect_leader.jpg" },
        { id: 25, name: "Ngầu", img: "assets/poll_ngau.jfif" }
    ];

    const pollContainer = document.querySelector('.bantruyen-poll-container');
    const pollGrid = document.getElementById('poll-cards-grid');
    const pollPrevBtn = document.getElementById('poll-prev-btn');
    const pollNextBtn = document.getElementById('poll-next-btn');
    const submitVoteBtn = document.getElementById('btn-vote-submit');

    let selectedMangaIds = new Set();
    let currentPollPage = 1;
    const itemsPerPage = 4;
    const totalPollPages = Math.ceil(mangaPollList.length / itemsPerPage);
    let autoSlideInterval = null;

    // RENDER TRANG CÓ KÈM HIỆU ỨNG TRƯỢT
    function renderPollPage(page, animationClass = 'slide-in-right') {
        if (!pollGrid) return;
        
        // Reset animation
        pollGrid.classList.remove('slide-in-right', 'slide-in-left');
        void pollGrid.offsetWidth; // Trigger reflow để kích hoạt lại CSS animation
        if (animationClass) {
            pollGrid.classList.add(animationClass);
        }

        pollGrid.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const pageItems = mangaPollList.slice(start, start + itemsPerPage);

        pageItems.forEach(item => {
            const isSelected = selectedMangaIds.has(item.id);
            const isDisabled = selectedMangaIds.size >= 3 && !isSelected;

            const card = document.createElement('div');
            card.className = `manga-poll-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`;
            card.dataset.id = item.id;
            card.innerHTML = `
                <div class="manga-poll-thumb">
                    <img src="${item.img}" alt="${item.name}" onerror="this.src='assets/one_piece.jpg'">
                    <div class="poll-checkbox"></div>
                </div>
                <h4 class="manga-poll-name" title="${item.name}">${item.name}</h4>
            `;
            card.addEventListener('click', () => toggleSelectManga(item.id));
            pollGrid.appendChild(card);
        });
    }

    // CHỌN / BỎ CHỌN TRUYỆN
    function toggleSelectManga(id) {
        if (selectedMangaIds.has(id)) {
            selectedMangaIds.delete(id);
        } else {
            if (selectedMangaIds.size >= 3) {
                alert("Bạn chỉ được bình chọn tối đa 3 tác phẩm yêu thích!");
                return;
            }
            selectedMangaIds.add(id);
        }
        renderPollPage(currentPollPage, null); // Giữ nguyên vị trí khi click chọn
    }

    // CHUYỂN TRANG
    function goToNextPage() {
        if (currentPollPage < totalPollPages) {
            currentPollPage++;
        } else {
            currentPollPage = 1;
        }
        renderPollPage(currentPollPage, 'slide-in-right');
    }

    function goToPrevPage() {
        if (currentPollPage > 1) {
            currentPollPage--;
        } else {
            currentPollPage = totalPollPages;
        }
        renderPollPage(currentPollPage, 'slide-in-left');
    }

    // TỰ ĐỘNG CHẠY MỖI 1.5 GIÂY (1500ms)
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            goToNextPage();
        }, 2000); // Đã giảm xuống 1.5 giây
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // SỰ KIỆN NÚT TIẾP / LÙI
    if (pollNextBtn) {
        pollNextBtn.addEventListener('click', () => {
            goToNextPage();
            startAutoSlide();
        });
    }

    if (pollPrevBtn) {
        pollPrevBtn.addEventListener('click', () => {
            goToPrevPage();
            startAutoSlide();
        });
    }

    // HOVER VÀO KHUNG THÌ DỪNG, RỜI RA THÌ CHẠY TIẾP
    if (pollContainer) {
        pollContainer.addEventListener('mouseenter', stopAutoSlide);
        pollContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // NÚT GỬI BÌNH CHỌN
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

    // KHỞI ĐỘNG BAN ĐẦU
    renderPollPage(1, null);
    startAutoSlide();

    // FORM ĐỀ XUẤT THÊM TRUYỆN
    const suggestForm = document.getElementById('suggest-manga-form');
    const suggestInput = document.getElementById('suggest-manga-input');
    if (suggestForm && suggestInput) {
        suggestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = suggestInput.value.trim();
            if (val) {
                alert(`Cảm ơn bạn đã đề xuất truyện: "${val}". Ban biên tập Readie sẽ sớm cập nhật vào danh sách!`);
                suggestInput.value = '';
            }
        });
    }
});