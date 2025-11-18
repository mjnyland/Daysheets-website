<template>
  <video
    ref="videoRef"
    :class="className"
    autoplay
    loop
    muted
    playsinline
    :preload="preload"
    v-bind="attrs"
  >
    <template v-if="hasAlpha">
      <!-- Prefer HEVC first so Safari selects it -->
      <source
        :src="hevcSrc"
        :type="hevcExtension === 'mov'
          ? 'video/quicktime; codecs=\"hvc1\"'
          : 'video/mp4; codecs=\"hvc1\"'"
      />
      <source
        v-if="hevcExtension === 'mov'"
        :src="hevcSrc"
        type='video/mp4; codecs="hvc1"'
      />
      <source :src="webmSrc" type='video/webm; codecs="vp9"' />
    </template>
    <source :src="src" type="video/mp4" />
    <slot />
  </video>
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from "vue";

interface TransparentVideoProps {
  src: string;
  hasAlpha?: boolean;
  hevcExtension?: "mov" | "mp4";
  preload?: "auto" | "metadata" | "none";
  className?: string;
}

const props = withDefaults(defineProps<TransparentVideoProps>(), {
  hasAlpha: false,
  hevcExtension: "mov",
  preload: "metadata",
  className: "",
});

const attrs = useAttrs();
const videoRef = ref<HTMLVideoElement | null>(null);

const computeWebmSrc = (originalSrc: string) => {
  if (originalSrc.endsWith(".mp4")) return originalSrc.replace(/\.mp4$/, ".webm");
  if (originalSrc.endsWith(".mov")) return originalSrc.replace(/\.mov$/, ".webm");
  return `${originalSrc}.webm`;
};

const computeHevcSrc = (originalSrc: string) => {
  const alphaSuffix = `-alpha.${props.hevcExtension}`;
  if (originalSrc.endsWith(".mp4")) return originalSrc.replace(/\.mp4$/, alphaSuffix);
  if (originalSrc.endsWith(".mov")) return originalSrc.replace(/\.mov$/, alphaSuffix);
  return `${originalSrc}${alphaSuffix}`;
};

const webmSrc = computed(() => computeWebmSrc(props.src));
const hevcSrc = computed(() => computeHevcSrc(props.src));

const hasAlpha = props.hasAlpha;
const hevcExtension = props.hevcExtension;
const src = props.src;
const className = props.className;
const preload = props.preload;
</script>

<style scoped>
video {
  display: block;
}
</style>
