/**
 *
 * useAudio hook
 * ----
 * Optimized and Supercharged React hook to play audio without any DOM element 💪🎧
 * Created with love by Niloy Sikdar
 *
 */

import { useMemo, useEffect, useState } from 'react';

// TypeScript interface
interface optionsType {
  src: string;
  loop?: boolean;
  volume?: number;
  muted?: boolean;
  onLoadedData?: (e: Event) => void;
  onError?: (e: Event) => void;
  onEnded?: (e: Event) => void;
}

/**
 * useAudio hook to play and control the audio
 *
 * @param {*} options
 */
export const useAudio = (options: optionsType) => {
  const audio = useMemo(() => new Audio(options.src), [options.src]);

  // Managing the playing state
  const [isPlaying, setIsplaying] = useState(false);

  // play function to play the audio
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

  // pause the audio
  const pause = () => {
    setIsplaying(false);
    audio.pause();
  };

  // Toggle between play and pause
  const toggle = () => (isPlaying ? pause() : play());

  useEffect(() => {
    // Loop the audio if loop is true, default is false
    audio.loop = options.loop || false;

    // Adjust the volume of the audio, default is 1(max)
    audio.volume = options.volume || 1;

    // Mute the audio if muted is true, default is false
    audio.muted = options.muted || false;

    // Execute the onLoadedData function after finishing the loading of audio
    audio.onloadeddata = (e: Event) => options.onLoadedData?.(e);

    // Execute after the ending of the audio
    audio.addEventListener('ended', (e: Event) => {
      // Execute the onEnded function
      options.onEnded?.(e);

      // Play again the audio after the end if loop is true
      options.loop ? audio.play() : setIsplaying(false);
    });

    // Cleanup
    return () => {
      !options.loop &&
        audio.removeEventListener('ended', () => setIsplaying(false));
    };
  }, [audio, options]);

  // Returning isPlaying, play, pause, toogle
  return { isPlaying, play, pause, toggle };
};
