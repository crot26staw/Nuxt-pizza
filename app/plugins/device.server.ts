// @ts-nocheck
import { useHead } from '#app';
import type { DefineNuxtPluginCallback } from '#app/composables/plugin';

interface Device {
  [key: string]: boolean;
}

export default defineNuxtPlugin((nuxtApp) => {
  const { $device } = nuxtApp as { $device: Device };
  const classes: string[] = [];

  const deviceMap = new Map(Object.entries($device));
  deviceMap.forEach((value, key) => {
    if (key.startsWith('is') && value) {
      classes.push(key);
    }
  });

  useHead({
    htmlAttrs: {
      class: classes.join(' '),
    },
  });
}) as DefineNuxtPluginCallback;
