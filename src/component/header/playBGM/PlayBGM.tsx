'use client';

import React from 'react';

import { Button } from '@nextui-org/react';
import { Volume2, VolumeX } from 'lucide-react';

import { bgm } from '@/assets/bgm';

const PlayBGM = () => {
  const [music, setMusic] = React.useState<HTMLAudioElement | null>();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleBGM = () => {
    if (music == null) return;
    music;
    if (music.paused) {
      music.play();
      setIsPlaying(true);
    } else {
      music.pause();
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    const audio = new Audio(bgm);
    audio.volume = 0.2;
    audio.onended = () => {
      audio.currentTime = 0;
      audio.play();
    };
    setMusic(audio);
  }, []);

  return (
    <Button isIconOnly variant="faded" onClick={handleBGM}>
      {isPlaying ? <Volume2 /> : <VolumeX />}
    </Button>
  );
};

export default PlayBGM;
