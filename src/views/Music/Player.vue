<template>
  <div class="player-container">
    <el-card class="audio-player">
      <!-- 使用 header 插槽放置标题 -->
      <template #header>
        <h2>正在播放：{{ currentTrack?.name }}</h2>
      </template>

      <!-- 音频控件 -->
      <audio controls ref="audioRef" :src="currentTrack?.src" />

      <!-- 控制按钮 -->
      <div class="controls">
        <el-button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</el-button>
        <el-button @click="prevTrack">上一首</el-button>
        <el-button @click="nextTrack">下一首</el-button>
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
import { ElMessage } from 'element-plus'

interface Track {
  name: string
  src: string
}

const route = useRoute()

const tracks: Track[] = [
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

const currentTrack = ref<Track | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

onMounted(() => {
  const src = route.query.src as string | undefined
  if (!src) {
    ElMessage.warning('缺少音源地址')
    currentTrack.value = tracks[0]
  } else {
    const match = tracks.find(track => track.src === src)
    if (match) {
      currentTrack.value = match
    } else {
      ElMessage.warning('未找到对应歌曲，已播放默认曲目')
      currentTrack.value = tracks[0]
    }
  }
})

const togglePlay = () => {
  if (!audioRef.value) return

  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    const playPromise = audioRef.value.play()
    if (playPromise !== undefined) {
      playPromise.catch(e => {
        console.error('播放失败:', e)
        ElMessage.error('请先与页面交互后再播放')
      })
    }
  }

  isPlaying.value = !isPlaying.value
}
const reloadPage = () => {
  window.location.reload()
}

const nextTrack = () => {
  const currentIndex = tracks.findIndex(
    track => track.src === currentTrack.value?.src
  )
  const nextIndex = (currentIndex + 1) % tracks.length
  currentTrack.value = tracks[nextIndex]
  isPlaying.value = false
  audioRef.value?.play()
}

const prevTrack = () => {
  const currentIndex = tracks.findIndex(
    track => track.src === currentTrack.value?.src
  )
  const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
  currentTrack.value = tracks[prevIndex]
  isPlaying.value = false
  audioRef.value?.play()
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
</style>