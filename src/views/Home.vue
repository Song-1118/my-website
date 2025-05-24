<template>
  <div class="page-wrapper">
    <div class="home-container">
      <div class="content animated fadeInUp">
        <h1 class="title">极光栈</h1>
        <p class="subtitle">AuroraHub</p>
        <h1 class="title2">
          极光栈的主站，这里有【下载功能】【网站导航】【音乐板块】和自研的【音乐播放器】
        </h1>
      </div>
    </div>

    <!-- 将简介和卡牌顺序调整 -->
    <div class="home-card">
      <el-card class="card" style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span>下载</span>
          </div>
        </template>
        <p> 下载板块导航 </p>
        <el-button @click="download">进入</el-button>
      </el-card>
      <el-card class="card" style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span>网页导航</span>
          </div>
        </template>
        <p> 前往网页导航板块 </p>
        <el-button @click="web">进入</el-button>
      </el-card>
      <el-card class="card" style="max-width: 480px">
        <template #header>
          <div class="card-header">
            <span>音乐</span>
          </div>
        </template>
        <p> 前往古风音乐区 </p>
        <el-button @click="music">进入</el-button>
      </el-card>
    </div>

    <el-dialog v-model="dialogVisible" title="历史版本" :width="isMobile ? '95%' : '800px'">
      <el-table height="400" :data="updatesT" style="width: 100%">
        <el-table-column property="version" label="版本号" min-width="150" />
        <el-table-column property="text" label="更新内容" min-width="300" />
      </el-table>
    </el-dialog>

    <el-link class="version-link" type="primary" @click="showAllVersion">历史版本</el-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import router from '../router';
import { ElMessage, ElNotification } from 'element-plus';

const download = () => {
  router.push('/download')
}
const web = () => {
  router.push('/web')
}
const music = () => {
  router.push('/music/antiquities')
}
const dialogVisible = ref(false)
const isMobile = computed(() => window.innerWidth < 768);
const updates = [
  { "version": "V1.0.0", "text": "网站初次上线, 域名:https://songweb.dpdns.org" },
  { "version": "V1.0.1", "text": "完善下载界面" },
  { "version": "V1.1.0", "text": "修复一些已知问题" },
  { "version": "V1.1.1", "text": "首页样式更新" },
  { "version": "V1.2.0", "text": "修复一些已知问题" },
  { "version": "V1.2.2", "text": "首页样式更新" },
  { "version": "V1.2.3", "text": "网站网址更新" },
  { "version": "V1.2.3", "text": "下载界面图标更新" },
  { "version": "V1.2.4", "text": "下载界面图标更新" },
  { "version": "V1.3.0", "text": "取消下载界面动画" },
  { "version": "V1.3.1", "text": "修复一些已知问题" },
  { "version": "V1.3.2", "text": "修复一些已知问题" },
  { "version": "V1.3.3", "text": "创建网站图标" },
  { "version": "V1.3.4", "text": "新增404界面" },
  { "version": "V1.4.0", "text": "音乐板块创建" },
  { "version": "V1.4.1", "text": "音乐播放器1.0初次创建" },
  { "version": "V1.4.2", "text": "音乐播放器1.0更新" },
  { "version": "V1.4.3", "text": "增加【音乐征集系统】，添加音乐【苟活】【苟活之重生】" },
  { "version": "V1.4.4", "text": "移动端适配" },
  { "version": "V1.4.5", "text": "移动端适配" },
  { "version": "V1.4.6", "text": "移动端适配" },
  { "version": "V1.4.7", "text": "移动端适配" },
  { "version": "V1.4.8", "text": "音乐播放器2.0上线" },
  { "version": "V1.4.9", "text": "新增【歌词滚动】，添加了17个歌词" },
  { "version": "V1.4.10", "text": "将下载界面的【项目模版包】替换为【QQ安装包】" },
  { "version": "V1.5.0", "text": "更新了歌曲【琵琶行(0.75抒情版)】的歌词，新增下载按钮" },
  { "version": "V1.5.1", "text": "添加了【古风音乐区】，新增【关山酒】【辞九门回忆】等8首音乐" },
  { "version": "V1.5.2", "text": "删除歌曲名称中的【.mp3】" },
  { "version": "V1.5.3", "text": "隐藏了苹果系统上的音量条" },
  { "version": "V1.5.4", "text": "修复一些已知问题" },
  { "version": "V1.5.5", "text": "新增首页横幅，并在苹果手机上显示下载按钮" },
  { "version": "V1.5.6", "text": "修复了【音乐征集系统】的手机端显示问题,增加音乐播放器的导航" },
  { "version": "V1.5.6-A", "text": "调整字号" },
  { "version": "V1.5.6-B", "text": "修复歌词偏移问题" },
  { "version": "V1.5.7", "text": "使用通知取代首页横幅" },
  { "version": "V1.5.8", "text": "全面取消旧版播放器" },
  { "version": "V1.5.9", "text": "下载界面新增【前端开发包】【后端开发包】和【谷歌浏览器】" },
  { "version": "V1.5.10", "text": "修复一些已知问题" },
  { "version": "V1.5.11", "text": "修复更新提示问题" },
  { "version": "V1.5.12", "text": "更换了【青丝(DJ)】的歌曲及其歌词" },
  { "version": "#20250521", "text": "添加歌曲【虞兮叹(DJ)】" },
  { "version": "#20250522", "text": "添加歌曲【忘川彼岸(DJ)】" },
  { "version": "#20250523", "text": "添加【历史版本】功能" },
  { "version": "V1.5.13", "text": "修改了播放器中【下载】按钮的位置，时期在手机中也能够正常显示" },
  { "version": "V1.6.0", "text": "【网页】板块新增电子书网站，【音乐】板块新增专区【六一专场(暂未开放）】" },
  { "version": "V1.6.1", "text": "修改首页样式" },
  { "version": "V1.6.2", "text": "【古风】音乐区新增【隔岸(DJ)】，【默认】音乐区新增【半壶纱(DJ)】等7首音乐" },
]
const version = updates[updates.length - 1].version;
const update = updates[updates.length - 1].text;

const updatesT = updates.reverse();

const showNotification = () => {

  const currentVersion = localStorage.getItem('lastShownVersion');
  // 如果没有记录过版本 或者 当前版本比上次记录的新
  if (!currentVersion || currentVersion !== version) {
    ElNotification({
      title: version + `更新通知(${updates.length - 1})`,
      message: update,
      type: 'success',
      duration: 10000,
      position: 'bottom-right',
    });

    // 更新本地存储中的版本号
    localStorage.setItem('lastShownVersion', version);
  }
};

const showAllVersion = () => {
  ElMessage.info('历史版本加载中...')
  dialogVisible.value = true
  ElMessage.success('历史版本加载成功')
}
onMounted(() => {
  showNotification();
  console.log(`当前版本：${version}\n更新内容：${update}`);
  console.log(`当前版本数极光栈第${updates.length - 1}个版本`);
  

});
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
  transform: translateY(-20px);
  /* 标题整体上移 20px */
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

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
}

.version-link {
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .version-table {
    min-width: 100%;
  }
}

@media (min-width: 769px) {
  .version-table {
    min-width: 500px;
  }
}

.title2 {
  font-size: 20px;
}

/* 新增样式：使卡牌横向排列 */
.home-card {
  display: flex;
  justify-content: center;
  gap: 20px;
  /* 卡牌之间的间距 */
  margin-top: 20px;
  /* 卡牌与简介之间的间距 */
}

.card {
  margin-bottom: 0;
  /* 移除卡片底部的默认间距 */
}
</style>