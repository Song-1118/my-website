<template>
  <div class="music-list-container">
    <el-row :gutter="20" justify="start">
      <el-col
        v-for="(music, index) in antiquitiesList"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="8"
        :xl="8"
        style="margin-bottom: 20px;"
      >
        <el-card
          shadow="hover"
          class="music-card"
          @click="goToPlayer(music)"
        >
          <div class="card-content">
            <h3>{{ music.name }}</h3>
            <p>点击播放</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Music61List'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import router from '../../router'

interface MusicItem {
  id: string
  name: string
  src: string
}

const antiquitiesList = ref<MusicItem[]>([
  { id: '201', name: '关山酒(DJ)', src: './musics/关山酒(DJ).mp3' },
  { id: '202', name: '难却(DJ)', src: './musics/难却(DJ).mp3' },
  { id: '203', name: '辞九门回忆(DJ)', src: './musics/辞九门回忆(DJ).mp3' },
  { id: '204', name: '琵琶行(DJ)', src: './musics/琵琶行(DJ).mp3' },
  { id: '205', name: '鸳鸯戏(DJ)', src: './musics/鸳鸯戏(DJ).mp3' },
  { id: '206', name: '弱水三千(DJ)', src: './musics/弱水三千(DJ).mp3' },
  { id: '207', name: '探故知(DJ)', src: './musics/探故知(DJ).mp3' },
  { id: '208', name: '青丝(DJ)', src: './musics/青丝(DJ).mp3' },
  { id: '209', name: '虞兮叹(DJ)', src: './musics/虞兮叹(DJ).mp3' },
  { id: '210', name: '忘川彼岸(DJ)', src: './musics/忘川彼岸(DJ).mp3' },
])

const goToPlayer = (music: MusicItem) => {
  // router.push({
    // path: '/player',
    // query: { src: music.src, name: music.name }
  // })
  
  // 暂时展示古风
  let music_id = '101'
  try {
    const music_idt = parseInt(music.id)
    music_id = (music_idt-100).toString()
  }
  catch (e) {
    console.error(`转化类型时发生错误：${e}`);
    
  }

  router.push(`/player2?track=${music_id}`)
}
</script>

<style scoped>
.music-list-container {
  padding: 20px;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.music-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.music-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>