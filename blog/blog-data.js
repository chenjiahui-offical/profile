// 博客文章数据配置
// 添加新文章时，请在这里添加文章信息，主页会自动更新
const blogData = [
    {
        id: 'post1',
        title: '深度学习在电极微环境识别中的应用',
        date: '2024年1月15日',
        category: '科研心得',
        categoryClass: 'research',
        excerpt: '本文介绍了如何使用CNN卷积神经网络来识别电极环境中的PTFE纤维和活性颗粒，分享了在毕业论文设计过程中的技术实现和经验总结。',
        image: 'blog/images/post1.jpg', // 可选，如果没有图片可以不设置
        tags: ['深度学习', '计算机视觉', '电极材料'],
        featured: true // 是否在主页显示
    },
    {
        id: 'post2',
        title: 'Hell let loose的地图战术分析网站',
        date: '2025年8月3日',
        category: '技术分享',
        categoryClass: 'tech',
        excerpt: '分享人间地狱的赛前地图部署工具',
        image: 'blog/images/post2.png',
        tags: ['Hell let loose', '地图分析', '部署工具'],
        featured: true
    },
    {
        id: 'post3',
        title: 'Hell let loose的音效库网站',
        date: '2025年8月3日',
        category: '技术分享',
        categoryClass: 'tech',
        excerpt: '本文介绍了人间地狱的音效库，并为用户熟悉音效提供了测试训练',
        image: 'blog/images/post3.png',
        tags: ['Hell let loose', '音效库'],
        featured: true
    }
];

// 获取特色文章（在主页显示的文章）
function getFeaturedPosts() {
    return blogData.filter(post => post.featured).slice(0, 3);
}

// 获取所有文章
function getAllPosts() {
    return blogData;
}

// 根据分类获取文章
function getPostsByCategory(category) {
    return blogData.filter(post => post.categoryClass === category);
}

// 获取最新文章
function getLatestPosts(count = 3) {
    return blogData.slice(0, count);
}

// 导出数据（如果在Node.js环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        blogData,
        getFeaturedPosts,
        getAllPosts,
        getPostsByCategory,
        getLatestPosts
    };
}