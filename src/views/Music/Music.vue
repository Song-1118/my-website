<template>
    <el-card class="card" @click="Default_music">
        <template #header>
            <h2>音乐</h2>
        </template>
        <p>默认音乐区</p>
        <template #footer>
            <el-link @click.stop="dialogVisible = true" type="primary">没有你想听的歌？点击反馈</el-link>
        </template>
    </el-card>

    <router-view />
    <el-dialog v-model="dialogVisible" title="极光栈音乐反馈" width="500" :before-close="handleClose">
        <p>姓名：</p>
        <el-input v-model="name" placeholder="你的姓名/可填学号"></el-input>
        <p>歌名：</p>
        <el-input v-model="songName" placeholder="你希望添加的歌名"></el-input>
        <p>歌单：</p>
        <el-cascader v-model="value" :options="options" @change="handleChange" placeholder="请选择歌单" />
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirm">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '../../router';

const Default_music = () => {
    ElMessage.success('进入默认音乐区');
    router.push('/music/default')
};
const dialogVisible = ref(false)

const name = ref('')
const songName = ref('')

const handleClose = (done: () => void) => {
    done();
}

const value = ref([])

const handleChange = (value: string[] | number[]) => {
    console.log(value)
}

const options = [
    {
        value: '默认',
        label: '默认',
    },
]

const confirm = () => {
    if (!name.value || !songName.value || !value.value) {
        ElMessage.error('请填写完整信息');
        return;
    }

    // 判断是否是数字输入（即是否为学号）
    const isStudentId = /^\d+$/.test(name.value); // 只包含数字的字符串才是学号

    if (isStudentId) {
        const studentId = Number(name.value);
        if (studentId < 51201 || studentId > 51247) {
            ElMessage.error('学号错误，请重新输入');
            return;
        }
    }
    // else: 视为姓名输入，不做额外处理

    try {
        // 提交成功逻辑
        dialogVisible.value = false;
        ElMessage.success('提交成功,正在处理...');
    } catch (e) {
        ElMessage.error('提交失败，请重试');
    }
};

</script>

<style scoped>
.card {
    width: 30%;
    margin: 20px;
    cursor: pointer;
}
</style>