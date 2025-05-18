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
  name: 'AntiquitiesList'
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
  { id: '101', name: '关山酒(DJ)', src: './musics/关山酒(DJ).mp3' },
  { id: '102', name: '难却(DJ)', src: './musics/难却(DJ).mp3' },
  { id: '103', name: '辞九门回忆(DJ)', src: './musics/辞九门回忆(DJ).mp3' },
  { id: '104', name: '琵琶行(DJ)', src: './musics/琵琶行(DJ).mp3' },
  { id: '105', name: '鸳鸯戏(DJ)', src: './musics/鸳鸯戏(DJ).mp3' },
  { id: '106', name: '弱水三千(DJ)', src: './musics/弱水三千(DJ).mp3' },
  { id: '107', name: '探故知(DJ)', src: './musics/探故知(DJ).mp3' },
  { id: '108', name: '青丝(DJ)', src: './musics/青丝(DJ).mp3' },
])

const goToPlayer = (music: MusicItem) => {
  // router.push({
  //   path: '/player',
  //   query: { src: music.src, name: music.name }
  // })
  router.push(`/player2?track=${music.id}`)
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