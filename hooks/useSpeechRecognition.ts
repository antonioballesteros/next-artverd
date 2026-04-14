"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Minimal types for Web Speech API (SpeechRecognition).
 * Chrome supports both SpeechRecognition and webkitSpeechRecognition.
 */
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event & { error: string }) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export interface UseSpeechRecognitionOptions {
  /** Language for recognition (e.g. "es-ES", "en-US"). Defaults to browser locale. */
  lang?: string;
  /** Whether to keep previous results and append (continuous). Default true. */
  continuous?: boolean;
  /** Whether to return interim results. Default true for responsive UX. */
  interimResults?: boolean;
  /** Callback when new transcript is available (interim or final). */
  onResult?: (transcript: string, isFinal: boolean) => void;
  /** Callback when recognition ends (e.g. user stopped, or error). */
  onEnd?: () => void;
}

export interface UseSpeechRecognitionReturn {
  /** Whether the browser supports SpeechRecognition (e.g. Chrome). */
  isSupported: boolean;
  /** Whether recognition is currently active (listening). */
  isListening: boolean;
  /** Last error message, if any. */
  error: string | null;
  /** Start listening. No-op if not supported or already listening. */
  start: () => void;
  /** Stop listening. */
  stop: () => void;
}

function getSpeechRecognitionConstructor():
  | (new () => SpeechRecognitionInstance)
  | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn {
  const {
    lang = typeof navigator !== "undefined" ? navigator.language : "es-ES",
    continuous = true,
    interimResults = true,
    onResult,
    onEnd,
  } = options;

  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const onResultRef = useRef(onResult);
  const onEndRef = useRef(onEnd);

  onResultRef.current = onResult;
  onEndRef.current = onEnd;

  const isSupported = Boolean(getSpeechRecognitionConstructor());

  const stop = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        // ignore if already stopped
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    onEndRef.current?.();
  }, []);

  const start = useCallback(() => {
    if (!isSupported) {
      setError(
        "Speech recognition is not supported in this browser. Use Chrome for best support."
      );
      return;
    }

    const Ctor = getSpeechRecognitionConstructor();
    if (!Ctor) return;

    setError(null);

    if (recognitionRef.current) return;

    const recognition = new Ctor();
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = lang;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[event.resultIndex];
      const transcript = result[0]?.transcript ?? "";
      const isFinal = result.isFinal;
      onResultRef.current?.(transcript, isFinal);
    };

    recognition.onerror = (event: Event & { error: string }) => {
      if (event.error === "aborted" || event.error === "no-speech") {
        setError(null);
      } else {
        setError(event.error ?? "Speech recognition error");
      }
      setIsListening(false);
      recognitionRef.current = null;
      onEndRef.current?.();
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setIsListening(false);
      onEndRef.current?.();
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setIsListening(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start recognition"
      );
      onEndRef.current?.();
    }
  }, [isSupported, continuous, interimResults, lang, stop]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return { isSupported, isListening, error, start, stop };
}
