/**
 * 雾削木个人主页 - JavaScript
 * 功能：交互逻辑、动态效果、QQ号复制
 */

// 复制QQ号功能
function copyQQ(qq) {
    navigator.clipboard.writeText(qq).then(() => {
        alert('QQ号 ' + qq + ' 已复制到剪贴板');
    }).catch(() => {
        // 兼容旧浏览器
        const input = document.createElement('input');
        input.value = qq;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        alert('QQ号 ' + qq + ' 已复制到剪贴板');
    });
}

// 移动端菜单切换
function toggleMenu() {
    const navItems = document.querySelector('.nav-items');
    if (navItems.style.display === 'flex') {
        navItems.style.display = 'none';
    } else {
        navItems.style.display = 'flex';
        navItems.style.flexDirection = 'column';
        navItems.style.position = 'absolute';
        navItems.style.top = '70px';
        navItems.style.left = '0';
        navItems.style.right = '0';
        navItems.style.background = 'rgba(10, 10, 15, 0.95)';
        navItems.style.padding = '20px';
        navItems.style.borderBottom = '1px solid var(--border-color)';
    }
}

// 数字格式化（添加千位分隔符）
function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + 'w';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 滚动动画：元素进入视口时显示
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察所有卡片
    document.querySelectorAll('.skill-card, .video-card, .blog-card, .platform-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 添加动画类样式
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// 平滑滚动到锚点
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    initScrollAnimation();
    initSmoothScroll();
});

// 点击播放按钮打开B站视频
document.addEventListener('DOMContentLoaded', function() {
    const videoLinks = {
        '51单片机入门教程 Keil uVision5': 'https://www.bilibili.com/video/BV1kw4m1K7uA/',
    };
    
    // 可以在这里添加更多视频链接
});
