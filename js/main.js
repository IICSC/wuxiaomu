/**
 * 雾削木个人主页 - JavaScript
 * 功能：交互逻辑、动态效果、QQ号复制、头像加载
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

// 头像加载失败时使用备用方案
function handleAvatarError(imgElement) {
    imgElement.style.display = 'none';
    // 创建文字头像
    const parent = imgElement.parentElement;
    parent.innerHTML = '<span class="avatar-text">木</span>';
    parent.style.background = 'linear-gradient(135deg, #4499d5, #2d7fb0, #f25d8e)';
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 头像错误处理
    const avatars = document.querySelectorAll('.avatar, .logo-icon');
    avatars.forEach(avatar => {
        const img = avatar.querySelector('img');
        if (img) {
            img.onerror = function() {
                handleAvatarError(this);
            };
        }
    });
    
    // 添加动画类样式
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // 滚动动画
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

    document.querySelectorAll('.skill-card, .video-card, .blog-card, .platform-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // 平滑滚动
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
});
