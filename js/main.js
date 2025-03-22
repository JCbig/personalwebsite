// AIPay Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('AIPay website loaded successfully!');
    
    // 初始化全屏滚动
    let currentSection = 0;
    let isScrolling = false;
    const sections = document.querySelectorAll('.section');
    const totalSections = sections.length;
    
    console.log("找到的部分总数:", totalSections);
    
    // 确保所有部分初始状态是隐藏的，只有第一个可见
    sections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('active');
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        } else {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.visibility = 'hidden';
        }
    });
    
    // 初始激活第一部分中的元素
    const firstSectionFadeElements = sections[0].querySelectorAll('.fade-in');
    firstSectionFadeElements.forEach(el => {
        el.classList.add('active');
    });
    
    // 创建部分指示器
    createSectionIndicators();
    
    // 滚动到指定部分
    function scrollToSection(index) {
        if (index < 0) index = 0;
        if (index >= totalSections) index = totalSections - 1;
        
        if (index === currentSection) return;
        
        console.log("滚动到部分:", index);
        
        const prevSection = sections[currentSection];
        const nextSection = sections[index];
        
        // 隐藏当前部分
        prevSection.classList.remove('active');
        prevSection.style.opacity = '0';
        prevSection.style.visibility = 'hidden';
        
        const prevFadeElements = prevSection.querySelectorAll('.fade-in');
        prevFadeElements.forEach(el => {
            el.classList.remove('active');
        });
        
        // 显示新部分
        nextSection.classList.add('active');
        nextSection.style.opacity = '1';
        nextSection.style.visibility = 'visible';
        
        const nextFadeElements = nextSection.querySelectorAll('.fade-in');
        nextFadeElements.forEach(el => {
            el.classList.add('active');
        });
        
        // 激活计数器
        const counters = nextSection.querySelectorAll('.counter');
        startCounters(counters);
        
        // 更新当前部分
        currentSection = index;
        
        // 更新部分指示器
        updateSectionIndicators();
    }
    
    // 更新部分指示器
    function updateSectionIndicators() {
        const dots = document.querySelectorAll('.section-dot');
        dots.forEach((dot, index) => {
            if (index === currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // 更新滚动指示器
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const scrollPercent = (currentSection / (totalSections - 1)) * 100;
            scrollIndicator.style.width = `${scrollPercent}%`;
        }
    }
    
    // 处理滚轮事件
    function handleWheel(e) {
        e.preventDefault();
        
        if (isScrolling) return;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const targetSection = currentSection + direction;
        
        if (targetSection >= 0 && targetSection < totalSections) {
            isScrolling = true;
            scrollToSection(targetSection);
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }
    
    // 处理触摸事件
    let touchStartY = 0;
    let touchEndY = 0;
    
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchMove(e) {
        if (isScrolling) return;
        touchEndY = e.touches[0].clientY;
    }
    
    function handleTouchEnd() {
        if (isScrolling) return;
        
        const direction = touchStartY - touchEndY > 50 ? 1 : touchStartY - touchEndY < -50 ? -1 : 0;
        
        if (direction !== 0) {
            const targetSection = currentSection + direction;
            
            if (targetSection >= 0 && targetSection < totalSections) {
                isScrolling = true;
                scrollToSection(targetSection);
                
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        }
    }
    
    // 处理键盘事件
    function handleKeyDown(e) {
        if (isScrolling) return;
        
        let direction = 0;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                direction = 1;
                break;
            case 'ArrowUp':
            case 'PageUp':
                direction = -1;
                break;
        }
        
        if (direction !== 0) {
            e.preventDefault();
            const targetSection = currentSection + direction;
            
            if (targetSection >= 0 && targetSection < totalSections) {
                isScrolling = true;
                scrollToSection(targetSection);
                
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        }
    }
    
    // 创建部分指示器
    function createSectionIndicators() {
        const sectionIndicator = document.querySelector('.section-indicator');
        if (!sectionIndicator) return;
        
        sectionIndicator.innerHTML = '';
        
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.classList.add('section-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                if (isScrolling) return;
                isScrolling = true;
                scrollToSection(index);
                
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            });
            
            sectionIndicator.appendChild(dot);
        });
    }
    
    // 创建背景形状
    function createBackgroundShapes() {
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            for (let i = 1; i <= 3; i++) {
                const shape = document.createElement('div');
                shape.classList.add('shape', `shape-${i}`);
                heroBg.appendChild(shape);
            }
        }
    }
    
    // 创建粒子
    function createParticles() {
        sections.forEach(section => {
            if (section.id === 'stats' || section.id === 'hero') {
                const colors = ['#4F46E5', '#10B981', '#6366F1', '#EC4899'];
                
                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    const size = Math.random() * 10 + 5;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.bottom = `${Math.random() * 20 - 10}%`;
                    
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
                    particle.style.animationDelay = `${Math.random() * 5}s`;
                    
                    section.appendChild(particle);
                }
            }
        });
    }
    
    // 数字计数器动画
    function startCounters(counters) {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            const duration = +counter.dataset.duration || 2000;
            const start = 0;
            const increment = target / (duration / 16);
            
            // 避免重复动画
            if (counter.textContent === '0' || counter.dataset.animated !== 'true') {
                counter.dataset.animated = 'true';
                let current = start;
                const timer = setInterval(() => {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
            }
        });
    }
    
    // 鼠标跟随效果
    function setupCursorGlow() {
        const cursorGlow = document.querySelector('.cursor-glow');
        if (!cursorGlow) return;
        
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
        
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }
    
    // 3D卡片效果
    function setup3DCardEffect() {
        const cards = document.querySelectorAll('.hover-3d');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // 处理导航链接
    function handleNavLinks() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').replace('#', '');
                
                const targetIndex = Array.from(sections).findIndex(section => section.id === target);
                if (targetIndex !== -1) {
                    if (isScrolling) return;
                    isScrolling = true;
                    scrollToSection(targetIndex);
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 1000);
                }
            });
        });
    }
    
    // 处理按钮点击
    function handleButtonClicks() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = href.replace('#', '');
                    
                    const targetIndex = Array.from(sections).findIndex(section => section.id === target);
                    if (targetIndex !== -1) {
                        if (isScrolling) return;
                        isScrolling = true;
                        scrollToSection(targetIndex);
                        
                        setTimeout(() => {
                            isScrolling = false;
                        }, 1000);
                    }
                }
            });
        });
    }
    
    // 更新版权年份
    function updateCopyright() {
        const copyright = document.querySelector('.footer-copyright');
        if (copyright) {
            const year = new Date().getFullYear();
            copyright.innerHTML = copyright.innerHTML.replace('2024', year);
        }
    }
    
    // 初始化功能
    createBackgroundShapes();
    createParticles();
    setupCursorGlow();
    setup3DCardEffect();
    handleNavLinks();
    handleButtonClicks();
    updateCopyright();
    
    // 添加事件监听器
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
}); 