<template>
  <div class="music-list-container">
    <el-row :gutter="20" justify="start">
      <el-col
        v-for="(music, index) in musicList"
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
  name: 'MusicList'
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

const musicList = ref<MusicItem[]>([
  { id: '001', name: '苟活.mp3', src: './musics/苟活.mp3' },
  { id: '002', name: '苟活之重生.mp3', src: './musics/苟活之重生.mp3' },
  { id: '003', name: '八方来财(DJ版).mp3', src: './musics/八方来财(DJ版).mp3' },
  { id: '004', name: '此去半生.mp3', src: './musics/此去半生.mp3' },
  { id: '005', name: '琵琶行(0.75X抒情版).mp3', src: './musics/琵琶行(0.75X抒情版).mp3' },
  { id: '006', name: '青花瓷.mp3', src: './musics/青花瓷.mp3' },
  { id: '007', name: '耍把戏.mp3', src: './musics/耍把戏.mp3' },
  { id: '008', name: '踏山河.mp3', src: './musics/踏山河.mp3' },
  { id: '009', name: '跳楼机.mp3', src: './musics/跳楼机.mp3' },
  { id: '010', name: '循迹.mp3', src: './musics/循迹.mp3' },
  { id: '011', name: 'Lose Control.mp3', src: './musics/Lose Control.mp3' },
  { id: '012', name: 'Teeth.mp3', src: './musics/Teeth.mp3' },
  { id: '013', name: 'Wake(58秒Studio片段).mp3', src: './musics/Wake(58秒Studio片段).mp3' }
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