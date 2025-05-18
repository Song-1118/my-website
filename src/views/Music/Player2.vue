<template>
    <div class="audio-player">
        <!-- 歌曲信息 -->
        <div class="song-info">
            <h3 class="title">{{ currentSong.title }}</h3>
            <p class="artist">{{ currentSong.artist }}</p>
        </div>

        <!-- 自定义进度条 -->
        <div class="progress-bar" @mousedown="startDrag">
            <div class="progress" :style="{ width: progress + '%' }"></div>
            <div class="drag-point" :style="{ left: progress + '%' }" @mousedown="startDrag"></div>
        </div>

        <!-- 时间显示 -->
        <div class="time-display">
            <span>{{ formattedCurrentTime }}</span>
            <span>{{ formattedDuration }}</span>
        </div>
        <!-- 歌词显示 -->
        <div class="lyric-display" v-if="!noLyric">
            <div v-for="(line, index) in lyrics" :key="index" class="lyric-line"
                :class="{ active: index === currentLyricIndex }">
                {{ line.text }}
            </div>
        </div>

        <div class="no-lyric" v-if="noLyric">
            {{ currentTrack?.pure_music ? '纯音乐，请欣赏' : '此歌暂无歌词' }}
        </div>

        <!-- 控制按钮 -->
        <!-- 控制按钮 -->
        <div class="controls">
            <el-icon :size="24" @click="prevTrack">
                <CaretLeft />
            </el-icon>

            <el-icon :size="32" @click="togglePlay">
                <component :is="isPlaying ? 'VideoPause' : 'VideoPlay'" />
            </el-icon>

            <el-icon :size="24" @click="nextTrack">
                <CaretRight />
            </el-icon>

            <!-- 音量控制 -->
            <div class="volume-control">
                <el-icon @click="toggleMute">
                    <component :is="volumeIcon" />
                </el-icon>
                <el-slider v-if="!isIOS" v-model="volume" :min="0" :max="1" :step="0.05" :format-tooltip="formatVolume"
                    @input="updateVolume" />
            </div>

            <!-- 下载按钮 -->
            <el-icon :size="24" @click="downloadTrack" style="margin-left: 20px;">
                <Download />
            </el-icon>
        </div>

        <!-- 隐藏的音频元素 -->
        <audio ref="audioElement" :src="currentSong.audioUrl" @timeupdate="updateTime"
            @loadedmetadata="updateDuration"></audio>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'

// 补充响应式状态
const currentSong = ref({
    title: '',
    artist: '未知艺术家',
    audioUrl: '',
})

const isPlaying = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.8)
const isMuted = ref(false)
const lastVolume = ref(0.8)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
// 歌词相关状态
const lyrics = ref<{ time: number; text: string }[]>([])
const currentLyricIndex = ref<number>(0)
const noLyric = ref<boolean>(false)
const audioElement = ref<HTMLAudioElement | null>(null)
let lastScrollIndex = -1
// 解析 LRC 歌词
function parseLRC(text: string): { time: number; text: string }[] {
    const lines = text.split('\n');
    const parsed = lines
        .map(line => {
            const result = line.match(/\[(\d+:\d+\.\d+)\](.*)/);
            if (result) {
                const [_, timeStr, text] = result;
                const [min, sec] = timeStr.split(/[:.]/).map(parseFloat);
                const time = min * 60 + sec;
                return { time, text: text.trim() || '...' }; // 处理空行
            }
            return null;
        })
        .filter((item): item is { time: number; text: string } => item !== null); // 过滤无效行

    return parsed;
}

// 下载当前曲目
function downloadTrack() {
    if (!currentTrack.value) {
        ElMessage.warning('当前没有可下载的曲目');
        return;
    }

    const trackUrl = currentTrack.value.src;
    const trackName = currentTrack.value.title;

    // 创建一个隐藏的 <a> 标签用于下载
    const link = document.createElement('a');
    link.href = trackUrl;
    link.download = `${trackName}.mp3`; // 设置下载文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    ElMessage.success('下载成功');
}

// 加载歌词文件
async function loadLyric(track: AudioTrack) {
    try {
        const lyricPath = track.src.replace('.mp3', '.lrc').replace('/musics/', '/lyrics/');
        const response = await fetch(lyricPath);
        if (!response.ok) throw new Error('歌词加载失败');

        const text = await response.text();
        const parsedLyrics = parseLRC(text);
        lyrics.value = parsedLyrics;
        noLyric.value = false; // 有歌词时设置为 false
    } catch (error) {
        console.warn('未找到歌词:', error);
        lyrics.value = [];
        noLyric.value = true; // 无歌词时设置为 true
        ElMessage.warning(track.pure_music ? '纯音乐，请欣赏' : '歌词加载失败，请检查歌词文件路径');
    }
}
updateLyricHighlight() // 首次加载歌词后立即定位到第一句

if (isIOS) {
    ElMessage.info('iOS 上请使用物理音量键调节音量')
}

// 计算属性：音量图标
const volumeIcon = computed(() => {
    if (isMuted.value || volume.value === 0) return 'MuteNotification'
    return volume.value > 0.5 ? 'Microphone' : 'TurnOffMicrophone'
})

// 曲目切换方法
const prevTrack = () => changeTrack(-1)
const nextTrack = () => changeTrack(1)

const changeTrack = (direction: number) => {
    if (!currentTrack.value) return

    const currentIndex = audioLibrary.findIndex(t => t.id === currentTrack.value?.id)
    let newIndex = currentIndex + direction

    // 循环处理
    if (newIndex < 0) newIndex = audioLibrary.length - 1
    if (newIndex >= audioLibrary.length) newIndex = 0

    setupCurrentTrack(audioLibrary[newIndex])

    // 自动播放
    if (isPlaying.value) {
        audioElement.value?.play()
    }
}

// 音量控制方法
const updateVolume = (value: number) => {
    if (audioElement.value) {
        audioElement.value.volume = value
        isMuted.value = value === 0
        if (value > 0) lastVolume.value = value
    }
}

const toggleMute = () => {
    isMuted.value = !isMuted.value
    if (audioElement.value) {
        audioElement.value.volume = isMuted.value ? 0 : lastVolume.value
        volume.value = isMuted.value ? 0 : lastVolume.value
    }
}

const formatVolume = (value: number) => `${Math.round(value * 100)}%`

// 在初始化时设置默认音量
onMounted(() => {
    if (audioElement.value) {
        audioElement.value.volume = volume.value
    }
})
// 格式化时间显示（秒 -> mm:ss）
function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

// 计算属性：格式化显示
const formattedCurrentTime = computed(() => formatTime(currentTime.value))
const formattedDuration = computed(() => formatTime(duration.value))

// 更新当前播放时间
function updateTime() {
    if (audioElement.value) {
        currentTime.value = audioElement.value.currentTime
        progress.value = (currentTime.value / audioElement.value.duration) * 100 || 0

        // 更新歌词高亮
        updateLyricHighlight()
    }
}

function updateLyricHighlight() {
    const current = currentTime.value;
    let index = 0;
    for (let i = 0; i < lyrics.value.length; i++) {
        if (current >= lyrics.value[i].time) {
            index = i;
        } else {
            break;
        }
    }

    // 只有当前索引变化时才更新和滚动
    if (index === currentLyricIndex.value && index === lastScrollIndex) {
        return;
    }

    currentLyricIndex.value = index;
    lastScrollIndex = index;

    // 使用 nextTick 确保 DOM 更新后再滚动
    setTimeout(() => {
        const lyricLines = document.querySelectorAll('.lyric-line');
        const container = lyricLines[0]?.parentElement as HTMLElement | null;

        if (container && lyricLines[index]) {
            const line = lyricLines[index] as HTMLElement;

            // 获取容器和行的实际高度
            const containerHeight = container.clientHeight;
            const lineHeight = line.offsetHeight;

            // 计算当前行相对于容器的偏移量
            const offsetTopInsideContainer = line.offsetTop;

            // 调整公式：scrollTop = offsetTop - (containerHeight / 2) + (lineHeight / 2) - 容器内边距
            const containerPaddingTop = parseFloat(getComputedStyle(container).paddingTop);
            container.scrollTop = offsetTopInsideContainer - (containerHeight / 2) + (lineHeight / 2) - containerPaddingTop - containerHeight * 1.2;
        }
    }, 0);
}

// 获取音频总时长
function updateDuration() {
    if (audioElement.value) {
        duration.value = audioElement.value.duration
    }
}

// 切换播放/暂停
function togglePlay() {
    if (!audioElement.value) return
    if (isPlaying.value) {
        audioElement.value.pause()
    } else {
        audioElement.value.play().catch(e => {
            console.error('播放失败:', e)
            ElMessage.error('播放失败，请点击“播放”重试')
        })
    }
    isPlaying.value = !isPlaying.value
}

// 拖动进度条逻辑
function startDrag(event: MouseEvent) {
    if (!audioElement.value) return
    const progressBar = event.currentTarget as HTMLElement
    const rect = progressBar.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const newTime = (offsetX / rect.width) * audioElement.value.duration
    audioElement.value.currentTime = newTime
}

// 类型定义 -----------------------------------------------
interface AudioTrack {
    id: string
    title: string
    src: string
    singer: string
    duration?: number
    pure_music?: boolean
}

// 响应式状态 ---------------------------------------------
const currentTrack = ref<AudioTrack>()
const audioQueue = ref<AudioTrack[]>([])

// 初始化音频库 -------------------------------------------
const audioLibrary: AudioTrack[] = [
    { id: '001', singer: '周文凯', title: '苟活', src: '/musics/苟活.mp3' },
    { id: '002', singer: '周文凯', title: '苟活之重生', src: '/musics/苟活之重生.mp3' },
    { id: '003', singer: '揽佬SKAI ISYOURGOD', title: '八方来财(DJ版)', src: './musics/八方来财(DJ版).mp3' },
    { id: '004', singer: 'L（桃籽）', title: '此去半生', src: '/musics/此去半生.mp3' },
    { id: '005', singer: '奇然/沈谧仁', title: '琵琶行(0.75X抒情版)', src: '/musics/琵琶行(0.75X抒情版).mp3' },
    { id: '006', singer: '周杰伦', title: '青花瓷', src: '/musics/青花瓷.mp3' },
    { id: '007', singer: '阿禹ayy', title: '耍把戏', src: '/musics/耍把戏.mp3' },
    { id: '008', singer: '七叔（叶泽浩）', title: '踏山河', src: '/musics/踏山河.mp3' },
    { id: '009', singer: 'LBI利比（时柏尘）', title: '跳楼机', src: '/musics/跳楼机.mp3' },
    { id: '010', singer: '王子健', title: '循迹', src: '/musics/循迹.mp3' },
    { id: '011', singer: 'Teddy Swims', title: 'Lose Control', src: '/musics/Lose Control.mp3' },
    { id: '012', singer: '5 Seconds of Summer', title: 'Teeth', src: '/musics/Teeth.mp3' },
    { id: '013', singer: 'Hillsong Young And Free', title: 'Wake(58秒Studio片段)', src: '/musics/Wake(58秒Studio片段).mp3', pure_music: false }
]

// 路由参数处理 -------------------------------------------
const route = useRoute()

// 生命周期钩子 -------------------------------------------
onMounted(() => {
    initializeAudioPlayer()
})

// 核心逻辑实现 -------------------------------------------
const initializeAudioPlayer = () => {
    const trackParam = parseRouteParam()
    const targetTrack = trackParam ? findTrack(trackParam) : audioLibrary[0]

    if (targetTrack) {
        setupCurrentTrack(targetTrack)
    } else {
        handleTrackNotFound(trackParam)
    }
}

// 路由参数解析 -------------------------------------------
const parseRouteParam = (): string | null => {
    const param = route.query.track
    return typeof param === 'string' ? param : null
}

// 音频资源查找 -------------------------------------------
const findTrack = (identifier: string): AudioTrack | undefined => {
    // 支持通过ID或src查找
    return audioLibrary.find(track =>
        track.id === identifier || track.src === identifier
    )
}

// 播放器设置 ---------------------------------------------
const setupCurrentTrack = async (track: AudioTrack) => {
    try {
        // 先释放之前的音频资源
        if (audioElement.value) {
            audioElement.value.pause()
            audioElement.value.src = ''
        }

        currentTrack.value = track; // 确保 currentTrack 被正确赋值
        currentSong.value = {
            title: track.title,
            artist: track.singer,
            audioUrl: track.src
        }

        // 设置音频源并加载
        if (audioElement.value) {
            audioElement.value.src = track.src
            audioElement.value.load()
        }

        // 加载歌词
        await loadLyric(track)

        // 如果原本正在播放，则自动开始播放
        if (isPlaying.value) {
            await audioElement.value?.play()
        }

        // 根据 pure_music 字段设置无歌词显示内容
        if (track.pure_music) {
            noLyric.value = true
            ElMessage.info('纯音乐，请欣赏')
        } else {
            noLyric.value = false
        }
    } catch (error) {
        console.error('音频初始化失败:', error)
        ElMessage.error('音频加载失败，请检查文件路径')
    }
}

// 音频预加载机制 -----------------------------------------
const preloadAudio = async (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const audio = new Audio(src)
        audio.addEventListener('loadedmetadata', () => {
            if (currentTrack.value) {
                currentTrack.value.duration = audio.duration
            }
            resolve()
        })
        audio.addEventListener('error', () => {
            reject(new Error(`无法加载音频资源: ${src}`))
        })
        audio.preload = 'auto'
    })
}

// 错误处理 -----------------------------------------------
const handleTrackNotFound = (identifier?: string | null) => {
    const warningMessage = identifier ?
        `未找到指定音频: ${identifier}` :
        '未提供有效音频参数'

    ElMessage.warning(`${warningMessage}，已加载默认音频`)
    setupCurrentTrack(audioLibrary[0])
}

// 队列管理函数（示例）------------------------------------
const addToQueue = (track: AudioTrack) => {
    audioQueue.value.push(track)
}

const clearQueue = () => {
    audioQueue.value = []
}
</script>

<style scoped>
.audio-player {
    max-width: 400px;
    margin: 20px;
    padding: 20px;
    background: #f5f5f5;
    border-radius: 8px;
}

.song-info {
    margin-bottom: 15px;
}

.title {
    margin: 0;
    color: #333;
}

.artist {
    margin: 5px 0 0;
    color: #666;
}

.progress-bar {
    position: relative;
    height: 4px;
    background: #ddd;
    border-radius: 2px;
    margin: 15px 0;
    cursor: pointer;
}

.progress {
    position: absolute;
    height: 100%;
    background: #409eff;
    border-radius: 2px;
    transition: width 0.3s linear;
}

.drag-point {
    position: absolute;
    width: 12px;
    height: 12px;
    background: #409eff;
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
}

.time-display {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #666;
}

.controls {
    display: flex;
    justify-content: center;
    margin-top: 15px;
}

.el-icon {
    cursor: pointer;
    color: #409eff;
    transition: color 0.3s;
}

.el-icon:hover {
    color: #66b1ff;
}

.controls {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
}

.el-slider {
    width: 100px;
}

.el-icon {
    transition: color 0.3s ease;
    cursor: pointer;
}

.el-icon:hover {
    color: var(--el-color-primary);
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 16px;
    /* 加大间距 */
    margin-left: 20px;
}

.volume-control .el-slider {
    width: 100px;
    height: 24px;
    display: flex;
    align-items: center;
}

.volume-control .el-icon {
    line-height: 1;
    transition: color 0.3s ease;
    cursor: pointer;
}

.lyric-line.active {
    color: #409eff;
    opacity: 1;
    font-weight: bold;
    transform: scale(1.05);
}

.no-lyric {
    margin-top: 20px;
    padding: 15px;
    text-align: center;
    font-size: 14px;
    color: #aaa;
    background: #f5f5f5;
    /* 增加背景色 */
    border-radius: 8px;
    /* 增加圆角 */
}

.lyric-display {
    margin-top: 20px;
    height: 150px;
    overflow-y: auto;
    padding: 10px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    color: #666;
    transition: all 0.3s ease;
    scroll-behavior: smooth;
    /* 增加平滑滚动效果 */
}

.lyric-line {
    padding: 8px 0;
    /* 增加行间距 */
    text-align: center;
    opacity: 0.6;
    transition: all 0.3s ease;
}

.controls .el-icon {
    cursor: pointer;
    color: #409eff;
    transition: color 0.3s;
}

.controls .el-icon:hover {
    color: #66b1ff;
}
</style>