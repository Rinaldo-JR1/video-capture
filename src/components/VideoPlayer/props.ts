export interface VideoPlayerProps {
  video: { uri: string };
  onShare: () => void;
  onSave: () => void;
  onDiscard: () => void;
}
