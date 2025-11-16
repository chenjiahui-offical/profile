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

// 博客文章导航自动检测
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在博客文章页面
    const articleNav = document.querySelector('.article-navigation');
    if (!articleNav) return;
    
    // 获取当前页面的文章ID
    const currentPath = window.location.pathname;
    const currentPostMatch = currentPath.match(/post(\d+)\.html/);
    if (!currentPostMatch) return;
    
    const currentPostNum = parseInt(currentPostMatch[1]);
    
    // 从blog-data.js获取所有文章（如果可用）
    if (typeof blogData !== 'undefined') {
        // 按日期排序
        const sortedPosts = blogData.sort((a, b) => 
            new Date(b.dateSort) - new Date(a.dateSort)
        );
        
        // 找到当前文章的索引
        const currentIndex = sortedPosts.findIndex(post => 
            post.id === `post${currentPostNum}`
        );
        
        if (currentIndex !== -1) {
            // 更新导航链接
            const allLinks = articleNav.querySelectorAll('a, span');
            const prevLink = allLinks[0]; // 第三个链接是"上一篇"
            const nextLink = allLinks[2]; // 第一个链接是"下一篇"
            
            // 上一篇（更旧的文章，索引+1）
            if (currentIndex < sortedPosts.length - 1) {
                const prevPost = sortedPosts[currentIndex + 1];
                const prevPostNum = prevPost.id.replace('post', '');
                if (prevLink && prevLink.tagName === 'A') {
                    prevLink.href = `post${prevPostNum}.html`;
                    prevLink.style.opacity = '1';
                    prevLink.style.cursor = 'pointer';
                    prevLink.style.borderColor = '';
                    prevLink.style.color = '';
                    prevLink.onclick = null;
                }
            } else {
                // 没有上一篇（已经是最旧的文章）
                if (prevLink) {
                    prevLink.style.opacity = '0.5';
                    prevLink.style.cursor = 'not-allowed';
                    prevLink.style.borderColor = '#ccc';
                    prevLink.style.color = '#999';
                    prevLink.onclick = (e) => e.preventDefault();
                }
            }
            
            // 下一篇（更新的文章，索引-1）
            if (currentIndex > 0) {
                const nextPost = sortedPosts[currentIndex - 1];
                const nextPostNum = nextPost.id.replace('post', '');
                
                // 如果是span，转换为a标签
                if (nextLink && nextLink.tagName === 'SPAN') {
                    const newNextLink = document.createElement('a');
                    newNextLink.href = `post${nextPostNum}.html`;
                    newNextLink.className = 'nav-link';
                    newNextLink.textContent = '下一篇 →';
                    nextLink.parentNode.replaceChild(newNextLink, nextLink);
                } else if (nextLink && nextLink.tagName === 'A') {
                    nextLink.href = `post${nextPostNum}.html`;
                    nextLink.style.opacity = '1';
                    nextLink.style.cursor = 'pointer';
                    nextLink.style.borderColor = '';
                    nextLink.style.color = '';
                }
            } else {
                // 没有下一篇（已经是最新的文章）
                if (nextLink && nextLink.tagName === 'A') {
                    const disabledSpan = document.createElement('span');
                    disabledSpan.className = 'nav-link';
                    disabledSpan.textContent = '下一篇 →';
                    disabledSpan.style.opacity = '0.5';
                    disabledSpan.style.cursor = 'not-allowed';
                    disabledSpan.style.borderColor = '#ccc';
                    disabledSpan.style.color = '#999';
                    nextLink.parentNode.replaceChild(disabledSpan, nextLink);
                } else if (nextLink && nextLink.tagName === 'SPAN') {
                    // 已经是span，只需要设置样式
                    nextLink.style.opacity = '0.5';
                    nextLink.style.cursor = 'not-allowed';
                    nextLink.style.borderColor = '#ccc';
                    nextLink.style.color = '#999';
                }
            }
        }
    } else {
        // 如果没有blogData，使用简单的数字判断
        const prevLink = articleNav.querySelector('a[href*="post"]:first-child');
        const nextLink = articleNav.querySelector('a[href*="post"]:last-child, span:last-child');
        
        // 简单判断：假设post7是最新的
        const maxPostNum = 7; // 可以根据实际情况调整
        
        if (currentPostNum > 1) {
            if (prevLink) {
                prevLink.href = `post${currentPostNum - 1}.html`;
            }
        }
        
        if (currentPostNum < maxPostNum) {
            if (nextLink && nextLink.tagName === 'SPAN') {
                const newNextLink = document.createElement('a');
                newNextLink.href = `post${currentPostNum + 1}.html`;
                newNextLink.className = 'nav-link';
                newNextLink.textContent = '下一篇 →';
                nextLink.parentNode.replaceChild(newNextLink, nextLink);
            }
        }
    }
});


// 自动加载博客文章的标签
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在博客文章页面（支持新旧class名称）
    const postTags = document.querySelector('.post-tags');
    const articleTags = document.querySelector('.article-tags');
    const tagsContainer = postTags || articleTags;
    
    if (!tagsContainer || typeof blogData === 'undefined') return;
    
    // 获取当前页面的文章ID
    const currentPath = window.location.pathname;
    const currentPostMatch = currentPath.match(/post(\d+)\.html/);
    if (!currentPostMatch) return;
    
    const currentPostNum = parseInt(currentPostMatch[1]);
    
    // 查找当前文章的数据
    const currentPost = blogData.find(post => post.id === `post${currentPostNum}`);
    
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

// 自动加载博客文章的元数据（日期、分类）
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在博客文章页面（支持新旧class名称）
    const postMetaInfo = document.querySelector('.post-meta-info');
    const articleMeta = document.querySelector('.article-meta');
    const metaContainer = postMetaInfo || articleMeta;
    
    if (!metaContainer || typeof blogData === 'undefined') return;
    
    // 获取当前页面的文章ID
    const currentPath = window.location.pathname;
    const currentPostMatch = currentPath.match(/post(\d+)\.html/);
    if (!currentPostMatch) return;
    
    const currentPostNum = parseInt(currentPostMatch[1]);
    
    // 查找当前文章的数据
    const currentPost = blogData.find(post => post.id === `post${currentPostNum}`);
    
    if (currentPost) {
        // 更新日期
        if (currentPost.dateSort) {
            const dateElement = metaContainer.querySelector('span:first-child');
            if (dateElement) {
                dateElement.innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(currentPost.dateSort)}`;
            }
        }
        
        // 更新分类
        if (currentPost.category) {
            const categoryElement = metaContainer.querySelector('span:nth-child(3)');
            if (categoryElement) {
                categoryElement.innerHTML = `<i class="fas fa-folder"></i> ${currentPost.category}`;
            }
        }
    }
});
