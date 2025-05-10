<template>
  <div class="home-container">
    <div class="content animated fadeInUp">
      <h1 class="title">极光栈 <p class="subtitle">AuroraHub</p></h1>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 改为顶部对齐（原生 top 对齐） */
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  padding-top: 10px; /* 可选：增加一点上边距，防止贴顶 */
}

.title {
  font-size: 3rem;
  font-weight: 700;
  color: #333;
  display: inline-block;
}

.subtitle {
  font-size: 1.2rem;
  font-weight: 400;
  color: #666;
  vertical-align: middle;
  margin-left: 0.5rem;
  animation: fadeIn 0.6s ease forwards;
}

.content {
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

.card {
  margin-top: 30px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

/* 动画定义 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>