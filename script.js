/**
 * KT플라자 석바위직영점 - Apple-Inspired UI
 * JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // Mobile Menu
    // =========================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // 메뉴 링크 클릭 시 닫기
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // =========================
    // Smooth Scroll
    // =========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = 48;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================
    // Scroll Reveal Animations
    // =========================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // =========================
    // Header Scroll Effect
    // =========================
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 헤더 배경 강화
        if (currentScroll > 50) {
            header.style.background = 'rgba(251, 251, 253, 0.95)';
        } else {
            header.style.background = 'rgba(251, 251, 253, 0.8)';
        }
        
        lastScroll = currentScroll;
    });
    
    // =========================
    // Scroll to Top Button
    // =========================
    const scrollTopBtn = document.getElementById('scrollTop');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // =========================
    // Reviews Slider
    // =========================
    const reviewsTrack = document.getElementById('reviewsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const sliderDots = document.getElementById('sliderDots');
    
    if (reviewsTrack && prevBtn && nextBtn && sliderDots) {
        const cards = reviewsTrack.querySelectorAll('.review-card');
        let currentIndex = 0;
        let cardsPerView = 3;
        
        // 반응형: 화면 크기에 따라 보이는 카드 수 조정
        const updateCardsPerView = () => {
            if (window.innerWidth <= 768) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
            updateSlider();
            createDots();
        };
        
        // 슬라이더 dots 생성
        const createDots = () => {
            sliderDots.innerHTML = '';
            const totalDots = Math.ceil(cards.length / cardsPerView);
            
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === Math.floor(currentIndex / cardsPerView)) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    currentIndex = i * cardsPerView;
                    updateSlider();
                    updateDots();
                });
                sliderDots.appendChild(dot);
            }
        };
        
        // dots 업데이트
        const updateDots = () => {
            const dots = sliderDots.querySelectorAll('.dot');
            const activeDotIndex = Math.floor(currentIndex / cardsPerView);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });
        };
        
        // 슬라이더 위치 업데이트
        const updateSlider = () => {
            const gap = 20;
            const cardWidth = reviewsTrack.querySelector('.review-card').offsetWidth;
            const offset = currentIndex * (cardWidth + gap);
            reviewsTrack.style.transform = `translateX(-${offset}px)`;
        };
        
        // 이전/다음 버튼
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
                updateDots();
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const maxIndex = cards.length - cardsPerView;
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
                updateDots();
            }
        });
        
        // 터치/드래그 슬라이드
        let startX = 0;
        let isDragging = false;
        
        reviewsTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        reviewsTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        });
        
        reviewsTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < cards.length - cardsPerView) {
                    currentIndex++;
                } else if (diff < 0 && currentIndex > 0) {
                    currentIndex--;
                }
                updateSlider();
                updateDots();
            }
        });
        
        // 초기화 및 리사이즈 대응
        updateCardsPerView();
        window.addEventListener('resize', () => {
            updateCardsPerView();
        });
    }
    
    // =========================
    // Image Lazy Loading
    // =========================
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => img.classList.add('loaded'));
            img.addEventListener('error', () => img.classList.add('loaded'));
        }
    });
    
    // =========================
    // Parallax Effect (Optional - Hero Section)
    // =========================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.3;
                const heroImage = hero.querySelector('.hero-image-wrapper');
                if (heroImage) {
                    heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(${1 - scrolled * 0.0002})`;
                }
            }
        });
    }
});
