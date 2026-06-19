// assets/content-map.js
// Content sections, keyword tags, and search filter functions for site navigation

const siteConfig = {
  baseUrl: "https://sitecn-hth.com.cn",
  defaultTag: "华体会",
  version: "1.0.1"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    keywords: ["华体会", "首页", "概览"],
    tags: ["主页", "推荐"]
  },
  {
    id: "about",
    title: "关于我们",
    keywords: ["华体会", "公司介绍", "团队"],
    tags: ["介绍", "文化"]
  },
  {
    id: "services",
    title: "服务项目",
    keywords: ["华体会", "服务", "方案"],
    tags: ["业务", "支持"]
  },
  {
    id: "blog",
    title: "博客文章",
    keywords: ["华体会", "文章", "资讯"],
    tags: ["新闻", "动态"]
  },
  {
    id: "contact",
    title: "联系我们",
    keywords: ["华体会", "联系", "地址"],
    tags: ["沟通", "反馈"]
  }
];

function searchSections(query) {
  if (!query || query.trim() === "") {
    return [];
  }

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of contentSections) {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const keywordMatch = section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery));
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

    if (titleMatch || keywordMatch || tagMatch) {
      results.push({
        sectionId: section.id,
        title: section.title,
        matchedBy: titleMatch ? "title" : keywordMatch ? "keyword" : "tag",
        relevance: calculateRelevance(section, lowerQuery)
      });
    }
  }

  results.sort((a, b) => b.relevance - a.relevance);
  return results;
}

function calculateRelevance(section, query) {
  let score = 0;
  const q = query.toLowerCase();

  if (section.title.toLowerCase() === q) {
    score += 10;
  }
  if (section.keywords.some(kw => kw.toLowerCase() === q)) {
    score += 8;
  }
  if (section.tags.some(tag => tag.toLowerCase() === q)) {
    score += 5;
  }
  if (section.title.toLowerCase().includes(q)) {
    score += 3;
  }
  return score;
}

function filterByTag(tag) {
  if (!tag || tag.trim() === "") {
    return [];
  }

  const lowerTag = tag.toLowerCase().trim();
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase() === lowerTag)
  ).map(section => ({
    sectionId: section.id,
    title: section.title,
    tags: section.tags
  }));
}

function getDefaultSections() {
  return contentSections.map(section => ({
    sectionId: section.id,
    title: section.title,
    url: siteConfig.baseUrl + "/" + section.id,
    tags: section.tags
  }));
}

// Example usage (uncomment to test):
// console.log(searchSections("华体会"));
// console.log(filterByTag("推荐"));
// console.log(getDefaultSections());

export { siteConfig, contentSections, searchSections, filterByTag, getDefaultSections };