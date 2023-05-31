export type TProgressState = {
  current: string;
  end: string;
  value: number;
};

export interface IVideoProps {
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  playing: boolean;
  progress: TProgressState;
  setProgress: React.Dispatch<React.SetStateAction<TProgressState>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IVideoViewProps {
  id: string;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  playing: boolean;
  loading: boolean;
  showIcon: boolean;
  toggleShowIcon: () => void;
  handleOnTimeUpdate: () => void;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IHeaderProps {
  query?: string;
  hideButtons?: boolean;
  setQuery?: React.Dispatch<React.SetStateAction<string>>;
}

export interface IVideoUploadProps {
  files: FileList | undefined;
  inputFile: React.MutableRefObject<any>;
  dragActive: boolean;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  setFiles: (value: React.SetStateAction<FileList | undefined>) => void;
  setThumbNail: React.Dispatch<any>;
}

export interface IVideoSearchResults {
  title: string;
  thumbnailId: string;
  videoId: string;
}

export interface IVideoHomeItem {
  video: IVideoSearchResults;
}
