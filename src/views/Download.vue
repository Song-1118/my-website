<template>
  <div class="card-container">
    <!-- 使用 v-for 遍历 downloads 数组 -->
    <el-card v-for="(item, index) in downloads" :key="item.title" class="card" :style="{ 'animation-delay': (index + 1) * 0.2 + 's' }">
      <!-- 图标与标题 -->
      <template #header>
        <div class="card-header">
          <img v-if="item.icon" :src="item.icon" alt="icon" class="card-icon" />
          <h2>{{ item.title }}</h2>
        </div>
      </template>

      <!-- 描述 -->
      <p class="card-description">{{ item.description }}</p>

      <!-- 页脚：下载按钮 -->
      <template #footer>
        <div class="card-footer">
          <el-button icon="Download" type="primary" @click="handleDownload(item.link)" round>
            {{ item.buttonText || '下载' }}
          </el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 下载项数据（支持未来通过接口获取）
const downloads = ref([
  {
    title: '极光栈桌面工具',
    description: '用于快速部署本地开发环境的桌面工具。',
    link: 'https://example.com/download/desktop-tool',
    buttonText: '下载',
    icon: '/icons/desktop-tool.png' // 可选图标路径
  },
  {
    title: 'API 调试助手',
    description: '调试后端接口的轻量级工具，支持 RESTful 接口调用。',
    link: 'https://example.com/download/api-debugger',
    icon: '/icons/api-debugger.png'
  },
  {
    title: '项目模板包',
    description: '前端项目初始化模板，含 Vue3 + TypeScript 环境配置。',
    link: 'https://example.com/download/project-template',
    icon: '/icons/template.png'
  }
]);

// 下载处理函数
const handleDownload = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 4%;
  padding: 0 2%;
}

.card {
  box-sizing: border-box;
  min-width: 250px;
  height: auto;
  margin-top: 20px;
  animation: fadeInUp 0.5s ease forwards;
}

.card-description {
  word-break: break-word;
  white-space: normal;
  margin: 10px 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>