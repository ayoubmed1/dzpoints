// Powered by OnSpace.AI
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';
import { PlatformPressable } from '@react-navigation/elements';

export function HapticTab(props: any) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        impactAsync(ImpactFeedbackStyle.Light);
        props.onPressIn?.(ev);
      }}
    />
  );
}