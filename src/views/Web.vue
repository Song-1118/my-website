<template>
    <div class="card-container">
        <!-- 使用 v-for 遍历 cards 数组 -->
        <el-card v-for="card in cards" :key="card.title" class="card">
            <!-- 标题 -->
            <template #header>
                <div class="card-header">
                    <h2>{{ card.title }}</h2>
                </div>
            </template>

            <!-- 简介 -->
            <p class="card-description">{{ card.description }}</p>

            <!-- 页脚：连接 -->
            <template #footer>
                <div class="card-footer">
                    <el-link icon="Link" type="primary" :href="card.link" target="_blank" class="custom-link">
                        {{ card.linkText || '访问' }}
                    </el-link>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义卡片数据（标题、简介、链接）
const cards = [
    {
        title: '极光栈主站',
        description: '极光栈工作室主站',
        link: 'http://songziming.dpdns.org',
        linkText: '主站',
        isVisible: false
    },
    {
        title: '博客',
        description: '极光栈博客。',
        link: 'https://blog.songziming.com',
        linkText: '博客',
        isVisible: false
    },
    {
        title: 'GitHub',
        description: '项目源码托管在 GitHub 上。',
        link: 'https://github.com/song-1118',
        linkText: 'GitHub',
        isVisible: false
    },
];
onMounted(() => {
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.isVisible = true;
    }, (index + 1) * 100); // 每张卡片延迟出现
  });
});
</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 4%;
    padding: 0 2%;
}

/* 当屏幕宽度大于 992px 时，最多显示 3 列 */
@media (min-width: 992px) {
    .card-container {
        grid-template-columns: repeat(3, 1fr);
        gap: 4%;
    }
}

.card {
    box-sizing: border-box;
    min-width: 250px; /* 防止卡片过小 */
    height: auto; /* 自适应高度 */
    margin-top: 20px;
}

.card-description {
    word-break: break-word;
    white-space: normal;
    margin: 10px 0;
}

.card-header {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 30px;
    align-items: center;
}

.card-footer {
    display: flex;
    justify-content: flex-end;
    word-break: break-all;
    white-space: normal;
    padding: 10px;
}

.custom-link {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
@media (min-width: 1200px) {
    .card-container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 768px) and (max-width: 991px) {
    .card-container {
        grid-template-columns: repeat(2, 1fr);
    }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px); /* 原始位置：下方 */
  }
  to {
    opacity: 1;
    transform: translateY(0); /* 最终位置：原位 */
  }
}

.card {
  box-sizing: border-box;
  min-width: 250px;
  height: auto;
  margin-top: 20px;
  animation: fadeInUp 0.5s ease forwards; /* 修改此处的动画时间 */
}

/* 为每张卡片添加不同的延迟时间，形成渐显效果 */
.card:nth-child(1) {
  animation-delay: 0.1s;
}
.card:nth-child(2) {
  animation-delay: 0.3s;
}
.card:nth-child(3) {
  animation-delay: 0.6s;
}
.card:nth-child(4) {
  animation-delay: 0.7s;
}
</style>