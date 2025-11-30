// --- GLOBAL VARIABLES ---
let chatHistory = []; // Stores conversation memory for the AI

document.addEventListener("DOMContentLoaded", () => {

    // 1. SMART LOADING ANIMATION (Run once per session)
    const loader = document.getElementById('loader');

    // Check if the user has already seen the intro in this session
    if (sessionStorage.getItem('gamerz_intro_shown')) {
        if (loader) loader.style.display = 'none';
    } else {
        // Play the intro animation
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Set the flag so it doesn't run again
                    sessionStorage.setItem('gamerz_intro_shown', 'true');
                }, 500);
            }, 2000);
        }
    }

    // 2. Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            cursorDot.style.opacity = 1; // Ensure visible on move
        }
        if (cursorOutline) {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
            cursorOutline.style.opacity = 1; // Ensure visible on move
        }
    });

    // Hide cursor when leaving the window
    document.addEventListener("mouseout", (e) => {
        if (!e.relatedTarget && !e.toElement) {
            if (cursorDot) cursorDot.style.opacity = 0;
            if (cursorOutline) cursorOutline.style.opacity = 0;
        }
    });

    // 3. Video Play on Hover (Home Page)
    function attachVideoHoverListeners(cards) {
        cards.forEach(card => {
            const video = card.querySelector('video');
            if (!video) return;

            // Remove existing listeners to prevent duplicates if called multiple times (optional safety)
            // But cloning creates new elements so it's fine.

            card.addEventListener('mouseenter', () => {
                video.currentTime = 0;
                video.play().catch(e => console.log("Video play error:", e));
            });
            card.addEventListener('mouseleave', () => {
                video.pause();
            });
        });
    }

    // Initial attachment
    const initialCards = document.querySelectorAll('.game-card');
    attachVideoHoverListeners(initialCards);



    // 4. Horizontal Scroll (Home Page)
    // 4. Horizontal Scroll (Home Page) - REMOVED to allow vertical page scroll
    // const scrollContainer = document.getElementById("scrollContainer");
    // if (scrollContainer) {
    //     scrollContainer.addEventListener("wheel", (evt) => {
    //         evt.preventDefault();
    //         scrollContainer.scrollLeft += evt.deltaY;
    //     });
    // }

    // 5. Light Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const root = document.body;
    let isLight = false;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isLight = !isLight;
            if (isLight) {
                root.classList.add('light-mode');
                themeToggle.style.color = '#555';
            } else {
                root.classList.remove('light-mode');
                themeToggle.style.color = '#ffaa00';
            }
        });
    }

    // 6. Hero Carousel Logic
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.dot-navigation');

    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        // Create Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = ''; // Clear existing dots if any
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(index));
                dotsContainer.appendChild(dot);
            });
        }
        const dots = document.querySelectorAll('.dot');

        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
        }

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            updateDots(index);
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);

        // Auto Play
        let slideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        const carousel = document.getElementById('hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carousel.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
        }

        // Initialize first slide
        showSlide(0);
    }

    // 7. Sidebar Category Logic
    const categoryItems = document.querySelectorAll('.sidebar-right li');
    const dynamicContainer = document.getElementById('dynamic-category-container');
    // We need a source of all games. We can use the existing trending section as a template/source
    // or better, query all game cards from the page initially.
    const allGameCards = Array.from(document.querySelectorAll('.trending-section .game-card'));

    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Check if already active (Toggle behavior)
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                dynamicContainer.classList.remove('open');
                return; // Stop here
            }

            // Remove active class from all
            categoryItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked
            item.classList.add('active');

            const categoryName = item.innerText.trim();

            // 1. Close container first (if open) to reset or just update content?
            // User wants animation. Let's update content then ensure it's open.

            // Filter Games
            const matchedCards = allGameCards.filter(card => {
                const gameGenre = (card.dataset.category || "").trim();
                if (!gameGenre) return false; // Ignore games with no genre

                return gameGenre.toLowerCase().includes(categoryName.toLowerCase()) ||
                    categoryName.toLowerCase().includes(gameGenre.toLowerCase());
            });

            // Build New Section HTML
            if (matchedCards.length > 0) {
                let cardsHTML = '';
                matchedCards.forEach(card => {
                    // Clone the card to avoid moving the original elements
                    cardsHTML += card.outerHTML;
                });

                dynamicContainer.innerHTML = `
                    <section class="trending-section" style="margin-top: 0;">
                        <div class="section-header">
                            <h2>${categoryName} <span style="color:var(--primary)">.</span></h2>
                        </div>
                        <main class="scroll-container">
                            ${cardsHTML}
                        </main>
                    </section>
                `;

                // Re-attach listeners to new cards
                const newCards = dynamicContainer.querySelectorAll('.game-card');
                attachVideoHoverListeners(newCards);

                // Animate Open
                requestAnimationFrame(() => {
                    dynamicContainer.classList.add('open');
                });

                if (typeof showToast === 'function') {
                    showToast(`Showing ${matchedCards.length} games for ${categoryName}`);
                }
            } else {
                // No games found, close it
                dynamicContainer.classList.remove('open');
                if (typeof showToast === 'function') {
                    showToast(`No games found for ${categoryName}`);
                }
            }
        });
    });

    // 8. Search Functionality (Floating Window)
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    // Scrape game data from the DOM
    let gamesData = [];
    const seenTitles = new Set();

    document.querySelectorAll('.game-card').forEach(card => {
        const title = card.querySelector('h3').textContent;

        if (!seenTitles.has(title)) {
            seenTitles.add(title);
            const image = card.querySelector('img').src;
            // Find the link inside the card or the card itself if it is a link
            const linkElement = card.closest('a') || card.querySelector('a');
            const href = linkElement ? linkElement.href : '#';

            gamesData.push({ title, image, link: href });
        }
    });

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            searchResults.innerHTML = ''; // Clear previous results

            if (searchTerm.length === 0) {
                searchResults.classList.remove('show');
                setTimeout(() => {
                    if (!searchResults.classList.contains('show')) {
                        searchResults.style.display = 'none';
                    }
                }, 300); // Wait for animation
                return;
            }

            const filteredGames = gamesData.filter(game =>
                game.title.toLowerCase().includes(searchTerm)
            );

            if (filteredGames.length > 0) {
                filteredGames.forEach((game, index) => {
                    const item = document.createElement('a');
                    item.className = 'search-result-item';
                    item.href = game.link;
                    item.style.animationDelay = `${index * 0.05}s`; // Staggered animation
                    item.innerHTML = `
                        <img src="${game.image}" class="search-result-img" alt="${game.title}">
                        <div class="search-result-info">
                            <h4>${game.title}</h4>
                            <p>Click to view details</p>
                        </div>
                    `;
                    searchResults.appendChild(item);
                });
                searchResults.style.display = 'block';
                // Small delay to allow display:block to apply before adding class for transition
                requestAnimationFrame(() => {
                    searchResults.classList.add('show');
                });
            } else {
                searchResults.classList.remove('show');
                setTimeout(() => {
                    if (!searchResults.classList.contains('show')) {
                        searchResults.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('show');
                setTimeout(() => {
                    if (!searchResults.classList.contains('show')) {
                        searchResults.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

}); // <--- FINAL CLOSING BRACE FOR DOMContentLoaded


// 6. CHATBOT FUNCTIONS (Memory & API)
// ===========================================

// Chat History (Reset on page load)
chatHistory = [];

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.style.display === 'flex') {
        // Close with animation
        chatWindow.classList.add('closing');
        setTimeout(() => {
            chatWindow.style.display = 'none';
            chatWindow.classList.remove('closing');
        }, 300);
    } else {
        chatWindow.style.display = 'flex';
    }
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const message = inputField.value.trim();

    if (message === "") return;

    // 1. Add User Message to UI
    chatBody.innerHTML += `<div class="user-message">${message}</div>`;
    inputField.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Show Loading
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'bot-message';
    loadingDiv.innerText = 'Thinking...';
    loadingDiv.id = 'loadingMsg';
    chatBody.appendChild(loadingDiv);

    try {
        // 3. Send Message AND History to Flask Backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: message,
                history: chatHistory
            })
        });

        const data = await response.json();

        // 4. Remove Loading
        document.getElementById('loadingMsg').remove();

        // 5. Add Bot Response to UI
        let botText = data.reply
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold
            .replace(/\n/g, '<br>'); // Line breaks
        chatBody.innerHTML += `<div class="bot-message">${botText}</div>`;

        // 6. UPDATE HISTORY MEMORY
        chatHistory.push({ role: "user", parts: [{ text: message }] });
        chatHistory.push({ role: "model", parts: [{ text: data.reply }] });

        // 7. SAVE TO SESSION STORAGE
        // 7. SAVE TO SESSION STORAGE - DISABLED
        // sessionStorage.setItem('gamerz_chat_history', JSON.stringify(chatHistory));

    } catch (error) {
        if (document.getElementById('loadingMsg')) document.getElementById('loadingMsg').remove();
        chatBody.innerHTML += `<div class="bot-message" style="color:red;">Connection Error.</div>`;
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}


// ===========================================
// --- 7. SHOPPING CART FUNCTIONS ---
// ===========================================

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function updateCartCounter(count) {
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
        badge.style.transform = 'scale(1.5)';
        setTimeout(() => badge.style.transform = 'scale(1)', 200);
    }
}

async function addToCart(gameId) {
    const numericId = Number(gameId);

    try {
        const response = await fetch('/add_to_cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ game_id: numericId })
        });

        const data = await response.json();

        if (data.status === 'success') {
            showToast("Game Added to Cart! 🛒");
            updateCartCounter(data.cart_count);
        } else if (data.status === 'exists') {
            showToast("Item is already in cart!");
        }

    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast("Error: Could not add item.");
    }
}
// <--- END OF FILE (No missing braces here now)
// 9. Cart Item Removal Animation
function removeItem(event, gameId) {
    event.preventDefault(); // Stop immediate navigation
    const row = event.target.closest('tr'); // Find the table row
    const tbody = row ? row.parentElement : null;
    const table = row ? row.closest('table') : null;

    if (row && tbody && table) {
        // Check if it's the last item
        if (tbody.children.length === 1) {
            table.classList.add('fade-out'); // Fade out the whole table
        } else {
            row.classList.add('fade-out'); // Fade out just the row
        }

        // Wait for animation to finish (0.5s) then navigate
        setTimeout(() => {
            window.location.href = '/remove_from_cart/' + gameId;
        }, 500);
    } else {
        // Fallback if row not found
        window.location.href = '/remove_from_cart/' + gameId;
    }
}

// 10. Light Mode Toggle
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check local storage - Apply theme regardless of toggle button existence
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-fire-flame-curved');
                icon.classList.add('fa-fire');
            }
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});

// 8. CLOSE CHATBOT ON OUTSIDE CLICK
document.addEventListener('click', (event) => {
    const chatWindow = document.getElementById('chatWindow');
    const chatIcon = document.querySelector('.chatbot-icon');

    // Check if elements exist and chat is open
    if (chatWindow && chatWindow.style.display === 'flex') {
        // If click is NOT inside chat window AND NOT on the toggle icon
        if (!chatWindow.contains(event.target) && !chatIcon.contains(event.target)) {
            // Close with animation
            chatWindow.classList.add('closing');
            setTimeout(() => {
                chatWindow.style.display = 'none';
                chatWindow.classList.remove('closing');
            }, 300);
        }
    }
});

// 9. PAGE TRANSITIONS
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        // Ignore anchors, JS links, blank targets, or if already exiting
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || link.target === '_blank' || document.body.classList.contains('page-exit')) return;

        e.preventDefault();
        document.body.classList.add('page-exit');

        setTimeout(() => {
            window.location.href = href;
        }, 300); // Match CSS animation duration
    });

    // Handle back button cache restoration (Safari/Firefox bfcache)
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            document.body.classList.remove('page-exit');
        }
    });
});
