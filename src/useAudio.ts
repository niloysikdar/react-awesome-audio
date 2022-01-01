import { useMemo, useEffect, useState } from 'react';

interface optionsType {
  src: string;
  loop?: boolean;
  volume?: number;
  muted?: boolean;
  onLoadedData?: (e: Event) => void;
  onError?: (e: Event) => void;
  onEnded?: (e: Event) => void;
}

export const useAudio = (options: optionsType) => {
  const audio = useMemo(() => new Audio(options.src), [options.src]);

  const [isPlaying, setIsplaying] = useState(false);

  const play = () => {
    audio
      .play()
      .then(() => setIsplaying(true))
      .catch((error) => {
        setIsplaying(false);
        console.log(error);
        options.onError?.(error);
      });
  };

  const pause = () => {
    setIsplaying(false);
    audio.pause();
  };

  const toggle = () => (isPlaying ? pause() : play());

  useEffect(() => {
    audio.loop = options.loop || false;

    audio.volume = options.volume || 1;

    audio.muted = options.muted || false;

    audio.onloadeddata = (e: Event) => options.onLoadedData?.(e);

    audio.addEventListener('ended', (e: Event) => {
      options.onEnded?.(e);
      options.loop ? audio.play() : setIsplaying(false);
    });

    return () => {
      !options.loop && audio.removeEventListener('ended', () => setIsplaying(false));
    };
  }, [audio, options]);

  return { isPlaying, play, pause, toggle };
};
