import Hls from 'hls.js'

// 解码 hls
export class DecoderHls {
  public container: HTMLVideoElement | undefined = undefined
  public room: string | undefined = undefined
  public url: string | undefined = undefined
  public player: Hls | null = null

  public static isSupported() {
    return Hls.isSupported()
  }

  constructor(room: string, container: HTMLVideoElement | undefined = undefined) {
    this.initPlayer(room, container)
    console.log('Decode url', this.url)
  }

  public initPlayer(room: string, container: HTMLVideoElement | undefined = undefined) {
    if (room) {
      this.room = room
      this.url = `http://localhost:8080/live/${room}.m3u8`
      this.player = new Hls()
    }
    if (container) {
      this.setContainer(container)
    }
  }

  public setContainer(container: HTMLVideoElement): void {
    this.container = container
  }

  public attachMediaElement() {
    if (this.container && this.player) {
      this.player.attachMedia(this.container)
    }
  }

  public loadAndPlay() {
    if (this.player && this.url && this.container) {
      this.attachMediaElement()
      this.player?.loadSource(this.url)
    } else {
      console.error('loadAndPlay error')
    }
  }

  public detachMediaElement() {
    this.player?.detachMedia()
  }

  public destroy() {
    this.detachMediaElement()
    this.player?.destroy()
  }
}
