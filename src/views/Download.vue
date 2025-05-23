<template>
    <div class="card-container">
        <el-card v-for="(item, index) in downloads" :key="item.title" class="card"
            :style="{ 'animation-delay': (index + 1) * 0.2 + 's' }">
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
                    <el-button icon="Download" type="primary" @click="openVersionDialog(item)" round>
                        下载
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>

    <!-- 版本选择弹窗 -->
    <el-dialog v-model="dialogVisible" title="选择版本" :width="isMobile ? '30%' : '30%'">
        <el-radio-group v-model="selectedVersion">
            <el-radio v-for="(url, version) in currentVersions" :key="version" :label="version">{{ formatVersionName(version) }}</el-radio>
        </el-radio-group>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmDownload">确认并下载</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';

// 判断是否为移动端
const isMobile = computed(() => {
  return window.innerWidth <= 768; // 根据需要调整断点值
});

// 控制 Dialog 显示
const dialogVisible = ref(false);
const selectedVersion = ref(null);
const currentVersions = ref({});
const currentItem = ref(null); // 这个是正确的变量名

// 平台映射名称
const versionNames = {
    win32: 'Windows',
    android: 'Android'
};

// 打开版本选择弹窗
const openVersionDialog = (item) => {
    currentVersions.value = item.versions || {};
    currentItem.value = item; // 原来是 selectedItem，已更正为 currentItem

    const platform = getPlatform();
    if (platform && Object.keys(item.versions || {}).includes(platform)) {
        selectedVersion.value = platform;
    } else {
        selectedVersion.value = null;
    }

    dialogVisible.value = true;
};

// 格式化显示版本名
const formatVersionName = (version) => {
    return versionNames[version] || version;
};

// 确认下载
const confirmDownload = () => {
    if (!selectedVersion.value) return;

    const url = currentVersions.value[selectedVersion.value];
    window.open(url, '_blank');
    dialogVisible.value = false;
};

const downloads = ref([
    {
        title: '微信',
        description: '是一个生活方式',
        buttonText: '下载',
        versions: {
            win32: 'https://github.com/Song-1118/my-website/releases/download/V1.0.0/WeChatWin_W.exe',
            android: 'https://github.com/Song-1118/my-website/releases/download/V1.0.0/Wechatwin_a.apk'
        },
        icon: '/icons/wechat.png' // 修改为绝对路径
    },
    {
        title: 'QQ',
        description: '轻松做自己',
        buttonText: '下载',
        versions: {
            win32: 'https://github.com/Song-1118/my-website/releases/download/V1.4.9/QQ_winx86.exe',
            Macos: 'https://github.com/Song-1118/my-website/releases/download/V1.4.9/QQ_macOS.dmg'
        },
        icon: '/icons/qq.png'
    },
    {
        title: '前端开发包',
        description: 'NodeJs+Vscode软件安装包，安装包适用于Windows',
        buttonText: '下载',
        versions: {
            win32: 'https://github.com/Song-1118/my-website/releases/download/V1.5.8/package_A.zip'
        },
        icon: '/AuroraHub.svg'
    },
    {
        title: '后端开发包',
        description: 'Python3.11+Vsocde+Jre8+Jdk17软件安装包，安装包适用于Windows',
        buttonText: '下载',
        versions: {
            win32: 'https://github.com/Song-1118/my-website/releases/download/V1.5.8/package_B.zip'
        },
        icon: '/AuroraHub.svg'
    },
    {
        title: 'Chrome浏览器',
        description: '又名谷歌浏览器，前端调试必备浏览器',
        buttonText: '下载',
        versions: {
            win32: '/downloads/ChromeSetup.exe'
        },
        icon: '/icons/chrome.svg'
    }
]);

const getPlatform = () => {
    const ua = navigator.userAgent;
    if (/Windows/.test(ua)) return 'win32';
    if (/Android/.test(ua)) return 'android';
    return null;
};

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
    min-height: 300px; /* 设置最小高度 */
    margin-top: 20px;
    animation: fadeInUp 0.5s ease forwards;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 确保内容在卡片内均匀分布 */
}

.card-description {
    word-break: break-word;
    white-space: normal;
    margin: 10px 0;
    flex-grow: 1; /* 让描述部分占据剩余空间 */
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
</style>