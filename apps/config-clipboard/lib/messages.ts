import type { ConfigKey, FieldSource } from './config-types';

export interface ValuesDetectedMessage {
  type: 'VALUES_DETECTED';
  values: Partial<Record<ConfigKey, string>>;
  source: FieldSource;
}

export interface CaptureSelectionRequest {
  type: 'CAPTURE_SELECTION_REQUEST';
}

export interface CaptureSelectionResponse {
  type: 'CAPTURE_SELECTION_RESPONSE';
  text: string;
}

export interface StateUpdatedMessage {
  type: 'STATE_UPDATED';
}

export interface ClearStateMessage {
  type: 'CLEAR_STATE';
}

export type ExtensionMessage =
  | ValuesDetectedMessage
  | CaptureSelectionRequest
  | CaptureSelectionResponse
  | StateUpdatedMessage
  | ClearStateMessage;
