// 移动端导航菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // 点击菜单项后关闭移动端菜单
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(13, 27, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.6)';
    } else {
        navbar.style.background = 'rgba(13, 27, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
});

// 页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动时元素淡入效果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为需要动画的元素添加观察
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.research-item, .blog-post, .publication-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 统计数字动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// 当统计区域进入视口时开始动画
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                stat.textContent = '0';
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// 博客文章导航自动检测（基于文件名数字顺序）
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在博客文章页面
    const postNavigation = document.querySelector('.post-navigation');
    if (!postNavigation || typeof blogData === 'undefined') return;
    
    // 从URL获取当前文章ID
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const currentPostId = filename.replace('.html', '');
    
    // 提取当前文章的数字（如 post1 -> 1）
    const currentPostMatch = currentPostId.match(/post(\d+)/);
    if (!currentPostMatch) return;
    
    const currentPostNum = parseInt(currentPostMatch[1]);
    
    // 查找上一篇（post数字-1）和下一篇（post数字+1）
    const prevPostId = `post${currentPostNum - 1}`;
    const nextPostId = `post${currentPostNum + 1}`;
    
    // 在blogData中查找这些文章是否存在
    const prevPost = blogData.find(post => post.id === prevPostId);
    const nextPost = blogData.find(post => post.id === nextPostId);
    
    // 更新上一篇链接（post数字-1）
    const prevLink = postNavigation.querySelector('.prev-post');
    if (prevLink) {
        if (prevPost) {
            prevLink.href = `${prevPost.id}.html`;
            prevLink.classList.remove('disabled');
            prevLink.title = prevPost.title;
            prevLink.style.opacity = '';
            prevLink.style.cursor = '';
            prevLink.onclick = null;
        } else {
            prevLink.href = '#';
            prevLink.classList.add('disabled');
            prevLink.style.opacity = '0.5';
            prevLink.style.cursor = 'not-allowed';
            prevLink.onclick = (e) => e.preventDefault();
        }
    }
    
    // 更新下一篇链接（post数字+1）
    const nextLink = postNavigation.querySelector('.next-post');
    if (nextLink) {
        if (nextPost) {
            nextLink.href = `${nextPost.id}.html`;
            nextLink.classList.remove('disabled');
            nextLink.title = nextPost.title;
            nextLink.style.opacity = '';
            nextLink.style.cursor = '';
            nextLink.onclick = null;
        } else {
            nextLink.href = '#';
            nextLink.classList.add('disabled');
            nextLink.style.opacity = '0.5';
            nextLink.style.cursor = 'not-allowed';
            nextLink.onclick = (e) => e.preventDefault();
        }
    }
});


// 自动加载博客文章的标签（统一版本）
document.addEventListener('DOMContentLoaded', function() {
    const tagsContainer = document.querySelector('.post-tags');
    
    if (!tagsContainer || typeof blogData === 'undefined') return;
    
    // 从URL获取当前文章ID
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const currentPostId = filename.replace('.html', '');
    
    // 查找当前文章的数据
    const currentPost = blogData.find(post => post.id === currentPostId);
    
    if (currentPost && currentPost.tags) {
        // 清空现有标签
        tagsContainer.innerHTML = '';
        
        // 添加新标签
        currentPost.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }
});


// 日期格式化函数
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

// 自动加载博客文章的元数据（日期、分类）（统一版本）
document.addEventListener('DOMContentLoaded', function() {
    const metaContainer = document.querySelector('.post-meta-info');
    
    if (!metaContainer || typeof blogData === 'undefined') return;
    
    // 从URL获取当前文章ID
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    const currentPostId = filename.replace('.html', '');
    
    // 查找当前文章的数据
    const currentPost = blogData.find(post => post.id === currentPostId);
    
    if (currentPost) {
        // 更新日期
        if (currentPost.dateSort) {
            const dateElement = metaContainer.querySelector('span:first-child');
            if (dateElement) {
                dateElement.innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(currentPost.dateSort)}`;
            }
        }
        
        // 获取分类中文名称
        const categoryMap = {
            'research': '科研心得',
            'tech': '技术分享',
            'life': '生活感悟'
        };
        const categoryName = categoryMap[currentPost.categoryClass] || currentPost.category;
        
        // 更新分类
        if (categoryName) {
            const categoryElement = metaContainer.querySelector('span:nth-child(3)');
            if (categoryElement) {
                categoryElement.innerHTML = `<i class="fas fa-folder"></i> ${categoryName}`;
            }
        }
        
        // 更新页面标题
        if (currentPost.title) {
            document.title = `${currentPost.title} - 陈家辉`;
        }
        
        // 更新meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && currentPost.excerpt) {
            metaDesc.setAttribute('content', currentPost.excerpt);
        }
    }
});

// 图片点击放大功能
document.addEventListener('DOMContentLoaded', function() {
    // 创建图片查看器模态框
    const imageModal = document.createElement('div');
    imageModal.className = 'image-modal';
    imageModal.innerHTML = `
        <div class="image-modal-overlay"></div>
        <div class="image-modal-content">
            <img class="image-modal-img" src="" alt="">
            <div class="image-modal-caption"></div>
        </div>
    `;
    document.body.appendChild(imageModal);
    
    // 获取模态框元素
    const modalOverlay = imageModal.querySelector('.image-modal-overlay');
    const modalContent = imageModal.querySelector('.image-modal-content');
    const modalImg = imageModal.querySelector('.image-modal-img');
    const modalCaption = imageModal.querySelector('.image-modal-caption');
    
    // 为所有博客文章中的图片添加点击事件
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const images = postContent.querySelectorAll('img');
        
        images.forEach(img => {
            // 添加可点击样式
            img.style.cursor = 'pointer';
            img.title = '点击查看大图';
            
            // 点击图片打开模态框
            img.addEventListener('click', function() {
                modalImg.src = this.src;
                modalImg.alt = this.alt;
                modalCaption.textContent = this.alt || '';
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 禁止背景滚动
            });
        });
    }
    
    // 关闭模态框的函数
    function closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复滚动
    }

    // 点击遮罩层关闭
    modalOverlay.addEventListener('click', closeModal);
    
    // 按ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // 点击放大的图片关闭模态框
    modalImg.addEventListener('click', function(e) {
        e.stopPropagation();
        closeModal();
    });
});
