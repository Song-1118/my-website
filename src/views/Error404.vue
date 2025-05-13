<template>
    <div class="error-container">
        <!-- 404标题 -->
        <h1>404</h1>
        
        <!-- 显示错误的网址 -->
        <div class="error-path">
            <span>访问的网址：</span>
            <el-tag type="danger" effect="light">{{ currentPath }}</el-tag>
            <span>不存在</span>
        </div>
        <!-- 返回主页的按钮 -->
        <el-button type="primary" @click="goToHome">返回主页</el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from "element-plus";

// 获取当前路径
const router = useRouter();
const currentPath = ref('');

onMounted(() => {
    ElMessage.error('您访问的页面不存在！');
    currentPath.value = router.currentRoute.value.path;
});

// 返回主页的方法
const goToHome = () => {
    ElMessage.success('返回主页成功！');
    router.push('/');
};
</script>

<style scoped>
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    font-family: Arial, sans-serif;
}

.error-path {
    display: flex;
    align-items: center;
    gap: 8px;
}

h1 {
    font-size: 4rem;
    color: #ff4d4f;
}

.el-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
}
</style>