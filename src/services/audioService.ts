const AudioContext =
  window.AudioContext ||
  (window as any).webkitAudioContext ||
  (window as any).mozAudioContext ||
  (window as any).oAudioContext ||
  (window as any).msAudioContext;

const AUDIO_PATH = new URL('../assets/sound.mp3', import.meta.url).href;

export class AudioService {
  private static audioCtx: AudioContext;
  private static buffer: AudioBuffer;

  static start(shouldPlay: boolean) {
    this.playSound(shouldPlay, 0, 3.7202, 3.6224);
  }

  static clear(shouldPlay: boolean) {
    this.playSound(shouldPlay, 0, 0, 0.7675);
  }

  static fall(shouldPlay: boolean) {
    this.playSound(shouldPlay, 0, 1.2558, 0.3546);
  }

  static gameOver(shouldPlay: boolean) {
    this.playSound(shouldPlay, 0, 8.1276, 1.1437);
  }

  static rotate(shouldPlay: boolean) {
    this.playSound(shouldPlay, 0, 2.2471, 0.0807);
  }

  static move(shouldPlay: boolean) {
    this.playSound(shouldPlay, 0, 2.9088, 0.1437);
  }

  private static playSound(
    shouldPlay: boolean,
    when: number,
    offset: number,
    duration: number,
  ) {
    if (!shouldPlay) {
      return;
    }
    this.loadSound().then((source) => source?.start(when, offset, duration));
  }

  private static loadSound(): Promise<AudioBufferSourceNode> {
    return new Promise((resolve, reject) => {
      if (this.buffer && this.audioCtx) {
        resolve(this.getSource(this.audioCtx, this.buffer));
        return;
      }
      const audioContext = new AudioContext();
      fetch(AUDIO_PATH)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => {
          audioContext.decodeAudioData(
            arrayBuffer,
            (buf) => {
              this.audioCtx = audioContext;
              this.buffer = buf;
              resolve(this.getSource(audioContext, buf));
            },
            (err) => {
              console.log(err);
              alert('Playing audio is not supported in this browser :(');
              reject(err);
            },
          );
        });
    });
  }

  private static getSource(
    ctx: AudioContext,
    buffer: AudioBuffer,
  ): AudioBufferSourceNode {
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    return source;
  }
}
