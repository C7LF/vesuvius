export interface WatchTogetherRoomModel {
  id: number;
  streamkey: string;
  created_at: string;
  persistent: boolean;
  persistent_name: any;
  deleted: boolean;
  moderated: boolean;
  location: string;
  stream_created: boolean;
  background: any;
  moderated_background: boolean;
  moderated_playlist: boolean;
  bg_color: string;
  bg_opacity: number;
  moderated_item: boolean;
  theme_bg: any;
  playlist_id: number;
  members_only: boolean;
  moderated_suggestions: boolean;
}
