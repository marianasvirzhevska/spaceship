import useSound from 'use-sound';

import celebration from '../assets/audio/mixkit-girls-audience-applause-510.wav';
import alerting from '../assets/audio/mixkit-waiting-ringtone-1354.wav';
import help from '../assets/audio/mixkit-scanning-sci-fi-alarm-905.wav';
import airAllert from '../assets/audio/mixkit-street-public-alarm-997.wav';

export const useAudio = (type, volume = 1) => {
    const audioPrisets = {
        celebration,
        alerting,
        help,
        airAllert,
    }

    const [playSound, { stop }] = useSound(audioPrisets[type], { volume })
    return [stop, playSound];
};
