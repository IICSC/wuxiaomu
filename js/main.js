/**
 * 雾削木个人主页 - JavaScript
 * 科技连线背景 | 3D卡片倾斜 | 滚动动画 | 打字机效果 | 鼠标跟随光效
 */

// ========== 科技连线背景系统 ==========
class TechNetworkBg {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'tech-network-canvas';
        this.canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.dataPackets = [];
        this.hexagons = [];
        this.mouse = { x: null, y: null, radius: 200 };
        this.time = 0;
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.init();
    }

    init() {
        const w = this.canvas.width;
        const h = this.canvas.height;
        
        // 节点
        const nodeCount = Math.min(Math.floor((w * h) / 18000), 60);
        this.nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2.5 + 1,
                baseOpacity: Math.random() * 0.4 + 0.2,
                type: Math.random() > 0.7 ? 'hub' : 'node',
                pulsePhase: Math.random() * Math.PI * 2,
                color: Math.random() > 0.6 ? '242, 93, 142' : '68, 153, 213'
            });
        }

        // 数据包（沿连线流动的光点）
        this.dataPackets = [];
        for (let i = 0; i < 15; i++) {
            this.dataPackets.push(this.createPacket());
        }

        // 六边形装饰
        this.hexagons = [];
        const hexCount = Math.min(Math.floor((w * h) / 80000), 12);
        for (let i = 0; i < hexCount; i++) {
            this.hexagons.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 30 + 20,
                opacity: Math.random() * 0.06 + 0.02,
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.002
            });
        }
    }

    createPacket() {
        if (this.nodes.length < 2) return { active: false };
        const idx1 = Math.floor(Math.random() * this.nodes.length);
        let idx2 = Math.floor(Math.random() * this.nodes.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * this.nodes.length);
        
        return {
            active: true,
            from: this.nodes[idx1],
            to: this.nodes[idx2],
            progress: 0,
            speed: Math.random() * 0.008 + 0.003,
            size: Math.random() * 2 + 1.5,
            color: Math.random() > 0.5 ? '68, 153, 213' : '242, 93, 142'
        };
    }

    drawHexagon(hex) {
        const { ctx } = this;
        const { x, y, size, opacity, rotation } = hex;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = size * Math.cos(angle);
            const hy = size * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(68, 153, 213, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }

    drawCircuitLine(x1, y1, x2, y2, opacity) {
        const { ctx } = this;
        const midX = (x1 + x2) / 2;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        
        if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
            ctx.lineTo(midX, y1);
            ctx.lineTo(midX, y2);
        } else {
            ctx.lineTo(x1, y2);
            ctx.lineTo(x2, y2);
        }
        
        ctx.strokeStyle = `rgba(68, 153, 213, ${opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }

    animate() {
        this.time += 0.016;
        const { ctx, canvas } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制六边形
        this.hexagons.forEach(hex => {
            hex.rotation += hex.rotSpeed;
            this.drawHexagon(hex);
        });

        // 更新节点位置
        this.nodes.forEach(node => {
            // 鼠标交互
            if (this.mouse.x !== null) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const force = (this.mouse.radius - dist) / this.mouse.radius;
                    node.vx -= dx * force * 0.0003;
                    node.vy -= dy * force * 0.0003;
                }
            }

            node.x += node.vx;
            node.y += node.vy;

            // 边界反弹
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // 速度衰减
            node.vx *= 0.999;
            node.vy *= 0.999;
        });

        // 绘制连线
        const connectionDist = 180;
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i];
                const b = this.nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < connectionDist) {
                    const opacity = (1 - dist / connectionDist) * 0.2;
                    
                    // 科技风格折线
                    if (Math.random() > 0.3) {
                        this.drawCircuitLine(a.x, a.y, b.x, b.y, opacity);
                    } else {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(68, 153, 213, ${opacity})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        }

        // 绘制数据包
        this.dataPackets.forEach((packet, idx) => {
            if (!packet.active || !packet.from || !packet.to) {
                this.dataPackets[idx] = this.createPacket();
                return;
            }

            packet.progress += packet.speed;
            
            if (packet.progress >= 1) {
                this.dataPackets[idx] = this.createPacket();
                return;
            }

            const px = packet.from.x + (packet.to.x - packet.from.x) * packet.progress;
            const py = packet.from.y + (packet.to.y - packet.from.y) * packet.progress;

            // 光点
            ctx.beginPath();
            ctx.arc(px, py, packet.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${packet.color}, 0.9)`;
            ctx.fill();

            // 光晕
            ctx.beginPath();
            ctx.arc(px, py, packet.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${packet.color}, 0.15)`;
            ctx.fill();

            // 尾迹
            const trailLen = 8;
            for (let t = 1; t <= trailLen; t++) {
                const tp = packet.progress - t * 0.015;
                if (tp < 0) break;
                const tx = packet.from.x + (packet.to.x - packet.from.x) * tp;
                const ty = packet.from.y + (packet.to.y - packet.from.y) * tp;
                ctx.beginPath();
                ctx.arc(tx, ty, packet.size * (1 - t / trailLen), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${packet.color}, ${0.3 * (1 - t / trailLen)})`;
                ctx.fill();
            }
        });

        // 绘制节点
        this.nodes.forEach(node => {
            const pulse = Math.sin(this.time * 2 + node.pulsePhase) * 0.5 + 0.5;
            const opacity = node.baseOpacity + pulse * 0.2;

            // 节点光晕
            if (node.type === 'hub') {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size * 6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${node.color}, ${0.05 + pulse * 0.05})`;
                ctx.fill();
            }

            // 节点本体
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size + pulse * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${node.color}, ${opacity})`;
            ctx.fill();

            // 中心亮点
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.6})`;
            ctx.fill();
        });

        // 鼠标周围特殊连线
        if (this.mouse.x !== null) {
            this.nodes.forEach(node => {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const opacity = (1 - dist / this.mouse.radius) * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(this.mouse.x, this.mouse.y);
                    ctx.lineTo(node.x, node.y);
                    ctx.strokeStyle = `rgba(68, 153, 213, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            // 鼠标光标十字
            ctx.strokeStyle = 'rgba(68, 153, 213, 0.3)';
            ctx.lineWidth = 1;
            const cs = 12;
            ctx.beginPath();
            ctx.moveTo(this.mouse.x - cs, this.mouse.y);
            ctx.lineTo(this.mouse.x + cs, this.mouse.y);
            ctx.moveTo(this.mouse.x, this.mouse.y - cs);
            ctx.lineTo(this.mouse.x, this.mouse.y + cs);
            ctx.stroke();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// ========== 3D 卡片倾斜效果 ==========
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.skill-card, .video-card, .blog-card, .platform-card, .note-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMove(e, card));
            card.addEventListener('mouseleave', () => this.handleLeave(card));
        });
    }

    handleMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease-out';

        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(68, 153, 213, 0.12), var(--bg-card) 60%)`;
    }

    handleLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease, background 0.5s ease';
        card.style.background = '';
    }
}

// ========== 鼠标跟随光效 ==========
class MouseGlow {
    constructor() {
        this.glow = document.createElement('div');
        this.glow.className = 'mouse-glow';
        this.glow.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(68, 153, 213, 0.06) 0%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s;
        `;
        document.body.appendChild(this.glow);
        document.addEventListener('mousemove', (e) => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
        });
    }
}

// ========== 滚动入场动画 ==========
class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        const style = document.createElement('style');
        style.textContent = `
            .reveal {
                opacity: 0;
                transform: translateY(40px);
                transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                            transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            .reveal-left {
                opacity: 0;
                transform: translateX(-60px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .reveal-right {
                opacity: 0;
                transform: translateX(60px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .reveal-scale {
                opacity: 0;
                transform: scale(0.8);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            .reveal.active, .reveal-left.active, .reveal-right.active, .reveal-scale.active {
                opacity: 1;
                transform: translateY(0) translateX(0) scale(1);
            }
            .stagger-1 { transition-delay: 0.05s; }
            .stagger-2 { transition-delay: 0.1s; }
            .stagger-3 { transition-delay: 0.15s; }
            .stagger-4 { transition-delay: 0.2s; }
            .stagger-5 { transition-delay: 0.25s; }
            .stagger-6 { transition-delay: 0.3s; }
            .stagger-7 { transition-delay: 0.35s; }
            .stagger-8 { transition-delay: 0.4s; }
        `;
        document.head.appendChild(style);

        const elements = document.querySelectorAll('.skill-card, .video-card, .blog-card, .platform-card, .note-card, .section-header, .qq-group, .stat-item');
        
        elements.forEach((el, i) => {
            el.classList.add('reveal');
            el.classList.add(`stagger-${(i % 8) + 1}`);
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        elements.forEach(el => observer.observe(el));
    }
}

// ========== 打字机效果 ==========
class TypewriterEffect {
    constructor() {
        this.element = document.querySelector('.hero-tagline');
        if (!this.element) return;
        
        this.text = this.element.innerHTML;
        this.element.innerHTML = '';
        this.element.style.opacity = '1';
        this.element.style.minHeight = '2em';
        this.cursor = document.createElement('span');
        this.cursor.className = 'typewriter-cursor';
        this.cursor.style.cssText = `
            display: inline-block;
            width: 3px;
            height: 1.2em;
            background: var(--main-blue);
            margin-left: 4px;
            vertical-align: text-bottom;
            animation: cursorBlink 1s infinite;
        `;
        
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `@keyframes cursorBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`;
        document.head.appendChild(cursorStyle);
        
        this.element.appendChild(this.cursor);
        setTimeout(() => this.type(), 800);
    }

    async type() {
        let htmlBuffer = '';
        let inTag = false;
        
        for (let i = 0; i < this.text.length; i++) {
            htmlBuffer += this.text[i];
            
            if (this.text[i] === '<') {
                inTag = true;
            } else if (this.text[i] === '>') {
                inTag = false;
            }
            
            if (!inTag && this.text[i] !== '<' && this.text[i] !== '>') {
                this.element.innerHTML = htmlBuffer;
                this.element.appendChild(this.cursor);
                await this.sleep(50);
            }
        }
        
        this.element.innerHTML = this.text;
        this.element.appendChild(this.cursor);
        
        setTimeout(() => {
            if (this.cursor.parentNode) {
                this.cursor.style.animation = 'none';
                this.cursor.style.opacity = '0';
            }
        }, 3000);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========== 数字滚动动画 ==========
class NumberCounter {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(el => {
            observer.observe(el);
        });
    }

    animate(el) {
        const text = el.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;
        
        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current) + suffix;
        }, 20);
    }
}

// ========== 导航栏滚动效果 ==========
class NavbarScroll {
    constructor() {
        this.nav = document.querySelector('nav');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.nav.style.background = 'rgba(10, 10, 15, 0.95)';
                this.nav.style.backdropFilter = 'blur(30px)';
                this.nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            } else {
                this.nav.style.background = 'rgba(10, 10, 15, 0.8)';
                this.nav.style.backdropFilter = 'blur(20px)';
                this.nav.style.boxShadow = 'none';
            }

            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const top = section.offsetTop - 100;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');
                const link = document.querySelector(`.nav-item[href="#${id}"]`);
                if (link) {
                    if (currentScroll >= top && currentScroll < bottom) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });

            this.lastScroll = currentScroll;
        });
    }
}

// ========== 复制QQ号功能 ==========
function copyQQ(qq) {
    navigator.clipboard.writeText(qq).then(() => {
        showToast(`QQ号 ${qq} 已复制到剪贴板`);
    }).catch(() => {
        const input = document.createElement('input');
        input.value = qq;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast(`QQ号 ${qq} 已复制到剪贴板`);
    });
}

// ========== Toast 提示 ==========
function showToast(message) {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: linear-gradient(135deg, rgba(68, 153, 213, 0.95), rgba(242, 93, 142, 0.95));
            color: white;
            padding: 14px 28px;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 10000;
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 40px rgba(68, 153, 213, 0.4);
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2500);
}

// ========== 移动端菜单切换 ==========
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

// ========== 数字格式化 ==========
function formatNumber(num) {
    if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ========== 头像错误处理 ==========
function handleAvatarError(imgElement) {
    imgElement.style.display = 'none';
    const parent = imgElement.parentElement;
    parent.innerHTML = '<span class="avatar-text">木</span>';
    parent.style.background = 'linear-gradient(135deg, #4499d5, #2d7fb0, #f25d8e)';
}

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    new TechNetworkBg();
    setTimeout(() => new TiltEffect(), 100);
    new MouseGlow();
    new ScrollAnimations();
    new TypewriterEffect();
    new NumberCounter();
    new NavbarScroll();
    
    // 网格坐标追踪
    const gridCoords = document.getElementById('gridCoords');
    if (gridCoords) {
        document.addEventListener('mousemove', (e) => {
            const x = String(e.clientX).padStart(4, '0');
            const y = String(e.clientY).padStart(4, '0');
            gridCoords.textContent = `X:${x} Y:${y}`;
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-items').style.display = 'none';
            }
        });
    });

    // 页面加载完成隐藏 loader
    window.addEventListener('load', function() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 600);
        }
    });

    // 如果 load 已经触发
    if (document.readyState === 'complete') {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }
});
