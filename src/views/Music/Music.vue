<template>
    <el-card class="card" @click="Default_music">
        <template #header>
            <h2>音乐</h2>
        </template>
            <p>点击进入默认音乐区</p>
        <template #footer>
        </template>
    </el-card>

    <router-view />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../../router';

const Default_music = () => {
    ElMessage.success('进入默认音乐区');
    router.push('/music/default')
};

</script>

<style scoped>
    .card {
        width: 30%;
        margin: 20px;
        cursor: pointer;
    }
</style>