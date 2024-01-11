import { View, Image } from "react-native";
import Animated from 'react-native-reanimated';
import { TapGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'


const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View)

export default function EmojiSticker({ imageSize, stickerSource }) {

  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      }
    }
  })

  const imageStyle = useAnimatedStyle(() => {

    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    }
  })

  const containerStyle = useAnimatedStyle(() => {

    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  })

  const onDrag = useAnimatedGestureHandler({

    onStart: (_, content) => {
      content.translateX = translateX.value
      content.translateY = translateY.value
    },
    onActive: (event, content) => {
      translateX.value = event.translationX + content.translateX
      translateY.value = event.translationY + content.translateY
    }
  })

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
}

