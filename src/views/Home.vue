<template>
  <el-alert title="极光栈V1.5.5版本" type="success" />
  <div class="home-container">
    <div class="content animated fadeInUp">
      <h1 class="title">极光栈</h1>
      <p class="subtitle">AuroraHub</p>
    </div>
  </div>
</template>

<script setup>

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

</style>