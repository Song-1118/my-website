<template>
  <div class="player-container">
    <el-card class="audio-player">
      <!-- 使用 header 插槽放置标题 -->
      <template #header>
        <h2>正在播放：{{ currentTrack?.name }}</h2>
      </template>

      <!-- 音频控件 -->
      <audio class="audio" controls ref="audioRef" :src="currentTrack?.src" />

      <!-- 控制按钮 -->
      <div class="controls">
        <el-button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</el-button>
        <el-button @click="prevTrack">上一首</el-button>
        <el-button @click="nextTrack">下一首</el-button>
        <el-button @click="cacheAndPlay">一键缓存并播放</el-button>
        <el-button @click="reloadPage">🔄 重新加载</el-button>
      </div>

      <!-- 版本信息，固定在右下角 -->
      <div class="version-info">
        <h2>极光栈播放器V1.0</h2>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElNotification } from 'element-plus'

// 类型定义 -----------------------------------------------
interface Track {
  name: string
  src: string
}

// 路由相关 -----------------------------------------------
const route = useRoute()

// 响应式状态 ---------------------------------------------
const audioRef = ref<HTMLAudioElement | null>(null)
const currentTrack = ref<Track | null>(null)
const isPlaying = ref(false)
const isBuffering = ref(false)

// 静态数据 -----------------------------------------------
const tracks: Track[] = [
  { name: '苟活.mp3', src: './musics/苟活.mp3' },
  { name: '苟活之重生.mp3', src: './musics/苟活之重生.mp3' },
  { name: '八方来财(DJ版).mp3', src: './musics/八方来财(DJ版).mp3' },
  { name: '此去半生.mp3', src: './musics/此去半生.mp3' },
  { name: '琵琶行(0.75X抒情版).mp3', src: './musics/琵琶行(0.75X抒情版).mp3' },
  { name: '青花瓷.mp3', src: './musics/青花瓷.mp3' },
  { name: '耍把戏.mp3', src: './musics/耍把戏.mp3' },
  { name: '踏山河.mp3', src: './musics/踏山河.mp3' },
  { name: '跳楼机.mp3', src: './musics/跳楼机.mp3' },
  { name: '循迹.mp3', src: './musics/循迹.mp3' },
  { name: 'Lose Control.mp3', src: './musics/Lose Control.mp3' },
  { name: 'Teeth.mp3', src: './musics/Teeth.mp3' },
  { name: 'Wake(58秒Studio片段).mp3', src: './musics/Wake(58秒Studio片段).mp3' }
]

// 生命周期钩子 -------------------------------------------
onMounted(() => {
  showStartupPrompt()
  initializeTrack()
})

// 初始化逻辑 ---------------------------------------------
const initializeTrack = () => {
  const src = route.query.src as string | undefined
  currentTrack.value = src ? findTrack(src) : tracks[0]
  handleTrackNotFoundWarning(src)
}

const findTrack = (src: string) => {
  const match = tracks.find(track => track.src === src)
  if (!match) ElMessage.warning('未找到对应歌曲，已播放默认曲目')
  return match || tracks[0]
}

const handleTrackNotFoundWarning = (src?: string) => {
  if (!src) ElMessage.warning('缺少音源地址')
}

// 播放控制 -----------------------------------------------
const togglePlay = () => {
  if (!audioRef.value) return

  isPlaying.value ? audioRef.value.pause() : attemptPlay()
  isPlaying.value = !isPlaying.value
}

const attemptPlay = () => {
  audioRef.value?.play().catch(e => {
    console.error('播放失败:', e)
    ElMessage.error('请先与页面交互后再播放')
    showCacheRecommendation()
  })
}

// 曲目导航 -----------------------------------------------
const nextTrack = () => changeTrack(1)
const prevTrack = () => changeTrack(-1)

const changeTrack = (direction: number) => {
  const currentIndex = tracks.findIndex(t => t.src === currentTrack.value?.src)
  const newIndex = (currentIndex + direction + tracks.length) % tracks.length
  currentTrack.value = tracks[newIndex]
  restartPlayback()
}

const restartPlayback = () => {
  isPlaying.value = false
  audioRef.value?.play()
}

// 缓存处理 -----------------------------------------------
const cacheAndPlay = () => {
  if (!audioRef.value || !currentTrack.value) return

  // 定义处理函数
  const handleCacheSuccess = () => {
    cleanupCacheListeners(audioRef.value!, handleCacheSuccess, handleCacheError)
    isBuffering.value = false
    ElMessage.success('缓存完成，即将播放')
    restartPlayback()
  }

  const handleCacheError = () => {
    cleanupCacheListeners(audioRef.value!, handleCacheSuccess, handleCacheError)
    isBuffering.value = false
    ElMessage.error('缓存失败，请重试')
  }

  setupCacheListeners(handleCacheSuccess, handleCacheError)
  startCachingProcess()
}

const setupCacheListeners = (successHandler: () => void, errorHandler: () => void) => {
  const audio = audioRef.value!
  audio.addEventListener('canplaythrough', successHandler)
  audio.addEventListener('error', errorHandler)
}

const cleanupCacheListeners = (
  audio: HTMLAudioElement,
  successHandler: () => void,
  errorHandler: () => void
) => {
  audio.removeEventListener('canplaythrough', successHandler)
  audio.removeEventListener('error', errorHandler)
}

const startCachingProcess = () => {
  isBuffering.value = true
  ElMessage.info('开始缓存歌曲...')
  audioRef.value?.load()
}
// 辅助功能 -----------------------------------------------
const showCacheRecommendation = () => {
  ElNotification({
    title: '播放提示',
    message: '建议点击【一键缓存并播放】以获得更好体验',
    type: 'warning',
    duration: 4000
  })
}

const reloadPage = () => window.location.reload()

const showStartupPrompt = () => {
  ElNotification({
    title: '极光栈播放器V1.0',
    message: '网络不佳时建议使用一键缓存功能',
    type: 'success',
    position: 'bottom-right',
  })
}
</script>

<style scoped>
.player-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.audio-player {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  text-align: center;
  position: relative; /* 关键：为绝对定位提供参考点 */
}

.controls {
  margin-top: 20px;
}

/* 版本信息定位到右下角 */
.version-info {
  position: absolute;
  bottom: 1px;
  right: 15px;
  font-size: 0.9em;
  color: #888;
  pointer-events: none; /* 可选：防止干扰点击事件 */
}

@media (max-width: 600px) {
  .audio {
    max-width: 100%;
  }
}

</style>