<template>
    <div class="card-container">
        <el-card v-for="card in cards" :key="card.title" class="card">
            <template #header>
                <div class="card-header">
                    <h2>{{ card.title }}</h2>
                </div>
            </template>

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
        link: 'http://songweb.dpdns.org',
        linkText: '主站',
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

.card {
  box-sizing: border-box;
  min-width: 250px;
  height: auto;
  margin-top: 20px;
  animation: fadeInUp 0.5s ease forwards; /* 修改此处的动画时间 */
}
</style>