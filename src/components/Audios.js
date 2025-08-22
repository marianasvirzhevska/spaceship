import useSound from 'use-sound';

import beeper from '../assets/audio/beeper_mergency_call.mp3';
import celebration from '../assets/audio/female_crowd_celebration.mp3';

export const useAudio = (type, volume = 1) => {
    const audioPrisets = {
        beeper,
        celebration,
    }

    const [playSound, { stop }] = useSound(audioPrisets[type], { volume })
    return [stop, playSound];
};
