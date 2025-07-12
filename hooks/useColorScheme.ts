// Powered by OnSpace.AI
import { useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme() {
  return _useColorScheme() ?? 'light';
}