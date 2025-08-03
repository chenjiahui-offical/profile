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
        title: 'Python在科研中的实用技巧',
        date: '2024年1月10日',
        category: '技术分享',
        categoryClass: 'tech',
        excerpt: '分享一些在科研工作中常用的Python技巧和工具，包括数据处理、可视化和自动化脚本编写，希望能够帮助同行提高工作效率。',
        image: 'blog/images/post2.jpg',
        tags: ['Python', '数据分析', '科研工具'],
        featured: true
    },
    {
        id: 'post3',
        title: '从本科到研究生的学习心得',
        date: '2024年1月5日',
        category: '生活感悟',
        categoryClass: 'life',
        excerpt: '回顾从四川大学到中科院长春应化所的求学经历，分享一些学习方法和心得体会，希望能够对正在求学路上的同学们有所帮助。',
        image: 'blog/images/post3.jpg',
        tags: ['学习心得', '研究生生活', '个人成长'],
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