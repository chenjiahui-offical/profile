// 博客文章数据配置
// 添加新文章时，请在这里添加文章信息，主页会自动更新
// 文章按时间从新到旧排列
const blogData = [
    {
        id: 'post6',
        title: '2024-2025学年研究生课程时间表',
        date: '2025年8月11日',
        dateSort: '2025-08-11',
        category: '生活感悟',
        categoryClass: 'life',
        excerpt: '详细记录了2024-2025学年研究生课程的时间安排，包括公共课程、学科基础课程、专业选修课程等各类课程的具体时间表，以及学分统计和课程状态分析。',
        image: 'blog/images/post6.png',
        tags: ['课程安排', '研究生', '时间管理'],
        featured: true
    },
    {
        id: 'post5',
        title: '自注意力机制：理解现代AI大模型的核心',
        date: '2025年8月9日',
        dateSort: '2025-08-09',
        category: '科研心得',
        categoryClass: 'research',
        excerpt: '本文深入浅出地介绍自注意力机制的核心概念与工作原理，以通俗易懂的方式帮助读者理解现代AI大模型的关键技术。从人类阅读策略的类比出发，详细阐述了自注意力机制和多头注意力机制的设计原理与实现方式。',
        image: 'blog/images/post5.png',
        tags: ['深度学习', '自注意力机制', 'QKV', 'Transformer'],
        featured: true
    },
    {
        id: 'post4',
        title: 'Hell let loose的智能驾驶路线规划',
        date: '2025年8月5日',
        dateSort: '2025-08-05',
        category: '技术分享',
        categoryClass: 'tech',
        excerpt: '本文介绍了人间地狱的地图交互式驾驶路线只能规划网站，为用户提供了方便的赛前驾驶路线规划',
        image: 'blog/images/post4.png',
        tags: ['Hell let loose', '智能交互', '路线规划'],
        featured: true
    },
    {
        id: 'post2',
        title: 'Hell let loose的地图战术分析网站',
        date: '2025年8月3日',
        dateSort: '2025-08-03',
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
        dateSort: '2025-08-03',
        category: '技术分享',
        categoryClass: 'tech',
        excerpt: '本文介绍了人间地狱的音效库，并为用户熟悉音效提供了测试训练',
        image: 'blog/images/post3.png',
        tags: ['Hell let loose', '音效库'],
        featured: true
    },
    {
        id: 'post1',
        title: '深度学习在电极微环境识别中的应用',
        date: '2024年1月15日',
        dateSort: '2024-01-15',
        category: '科研心得',
        categoryClass: 'research',
        excerpt: '本文介绍了如何使用CNN卷积神经网络来识别电极环境中的PTFE纤维和活性颗粒，分享了在毕业论文设计过程中的技术实现和经验总结。',
        image: 'blog/images/post1.jpg', // 可选，如果没有图片可以不设置
        tags: ['深度学习', '计算机视觉', '电极材料'],
        featured: true // 是否在主页显示
    }
];

// 获取特色文章（在主页显示的文章）
function getFeaturedPosts() {
    return blogData
        .filter(post => post.featured)
        .sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort))
        .slice(0, 9);
}

// 获取所有文章
function getAllPosts() {
    return blogData.sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));
}

// 根据分类获取文章
function getPostsByCategory(category) {
    return blogData
        .filter(post => post.categoryClass === category)
        .sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));
}

// 获取最新文章
function getLatestPosts(count = 3) {
    return blogData
        .sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort))
        .slice(0, count);
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