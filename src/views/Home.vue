<template>
  <div class="home-container">
    <div class="content animated fadeInUp">
      <h1 class="title">极光栈</h1>
      <p class="subtitle">AuroraHub</p>
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';

const version = 'V1.5.7';
const update = '全面取消旧版播放器';

const showNotification = () => {
  // 检查是否已经显示过通知
  const hasShownNotification = localStorage.getItem('hasShownNotification');
  if (!hasShownNotification) {
    ElNotification({
      title: version,
      message: update,
      type: 'success',
      duration: 5000,
      position: 'bottom-right',
    });
    // 设置标志位，表示通知已经显示过
    localStorage.setItem('hasShownNotification', 'true');
  }
};

showNotification();
</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.content {
  text-align: center;
  transform: translateY(-20px); /* 标题整体上移 20px */
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease forwards;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease 0.5s forwards;
}

/* 动画定义 */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.version {
  margin: 0 auto;
  max-width: 95%;
}
</style>