// 文章页面自动加载脚本
// 从blog-data.js自动加载文章的日期、分类、标签等元数据

(function() {
    // 从URL或文件名获取当前文章ID
    function getCurrentPostId() {
        const path = window.location.pathname;
        const filename = path.substring(path.lastIndexOf('/') + 1);
        return filename.replace('.html', '');
    }

    // 格式化日期
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}年${month}月${day}日`;
    }

    // 获取分类中文名称
    function getCategoryName(categoryClass) {
        const categoryMap = {
            'research': '科研心得',
            'tech': '技术分享',
            'life': '生活感悟'
        };
        return categoryMap[categoryClass] || categoryClass;
    }

    // 加载文章元数据
    function loadPostMetadata() {
        const postId = getCurrentPostId();
        
        // 从blogData中查找当前文章
        const postData = blogData.find(post => post.id === postId);
        
        if (!postData) {
            console.warn(`未找到文章数据: ${postId}`);
            return;
        }

        // 更新日期
        const dateElement = document.querySelector('.post-meta-info span:first-child');
        if (dateElement) {
            dateElement.innerHTML = `<i class="fas fa-calendar"></i> ${formatDate(postData.dateSort)}`;
        }

        // 更新分类
        const categoryElement = document.querySelector('.post-meta-info span:nth-child(3)');
        if (categoryElement) {
            categoryElement.innerHTML = `<i class="fas fa-folder"></i> ${getCategoryName(postData.categoryClass)}`;
        }

        // 更新标签
        const tagsContainer = document.querySelector('.post-tags');
        if (tagsContainer && postData.tags) {
            tagsContainer.innerHTML = postData.tags
                .map(tag => `<span class="tag">${tag}</span>`)
                .join('');
        }

        // 更新页面标题
        if (postData.title) {
            document.title = `${postData.title} - 陈家辉`;
        }

        // 更新meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && postData.excerpt) {
            metaDesc.setAttribute('content', postData.excerpt);
        }
    }

    // 加载文章导航（上一篇/下一篇）
    function loadPostNavigation() {
        const postId = getCurrentPostId();
        
        // 找到当前文章在数组中的索引
        const currentIndex = blogData.findIndex(post => post.id === postId);
        
        if (currentIndex === -1) {
            console.warn(`未找到文章索引: ${postId}`);
            return;
        }

        // 获取上一篇和下一篇（注意：blogData是按时间从新到旧排列的）
        const prevPost = currentIndex > 0 ? blogData[currentIndex - 1] : null;
        const nextPost = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;

        // 更新上一篇链接
        const prevLink = document.querySelector('.post-navigation .prev-post');
        if (prevLink) {
            if (prevPost) {
                prevLink.href = `${prevPost.id}.html`;
                prevLink.classList.remove('disabled');
                prevLink.title = prevPost.title;
            } else {
                prevLink.href = '#';
                prevLink.classList.add('disabled');
                prevLink.style.opacity = '0.5';
                prevLink.style.cursor = 'not-allowed';
            }
        }

        // 更新下一篇链接
        const nextLink = document.querySelector('.post-navigation .next-post');
        if (nextLink) {
            if (nextPost) {
                nextLink.href = `${nextPost.id}.html`;
                nextLink.classList.remove('disabled');
                nextLink.title = nextPost.title;
            } else {
                nextLink.href = '#';
                nextLink.classList.add('disabled');
                nextLink.style.opacity = '0.5';
                nextLink.style.cursor = 'not-allowed';
            }
        }
    }

    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadPostMetadata();
            loadPostNavigation();
        });
    } else {
        loadPostMetadata();
        loadPostNavigation();
    }
})();
