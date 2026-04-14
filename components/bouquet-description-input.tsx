"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  useState,
} from "react";
import { Eraser, Mic, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { cn } from "@/lib/utils";

// Keep ref in sync with latest value for use in async callbacks (e.g. speech result)
function useValueRef<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
}

export interface BouquetDescriptionInputProps {
  /** Controlled value. */
  value: string;
  /** Called when the user types or when speech recognition commits final text. */
  onChange: (value: string) => void;
  /** Placeholder for the textarea. */
  placeholder?: string;
  /** Optional label above the input. */
  label?: string;
  /** Optional id for the textarea (for label association). */
  id?: string;
  /** Additional class names for the wrapper. */
  className?: string;
  /**
   * When true, the textarea grows to fill remaining height in a flex parent
   * (use with a parent that has a bounded height, e.g. matching a sibling card).
   */
  expandToFillHeight?: boolean;
  /** Disabled state. */
  disabled?: boolean;
}

export function BouquetDescriptionInput({
  value,
  onChange,
  placeholder = "Describe the bouquet (e.g. roses, budget €30, with a bow)...",
  label = "Bouquet description",
  id: providedId,
  className,
  expandToFillHeight = false,
  disabled = false,
}: BouquetDescriptionInputProps) {
  const [interimTranscript, setInterimTranscript] = useState("");
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const valueRef = useValueRef(value);
  const generatedId = useId();
  const id = providedId ?? `bouquet-desc-${generatedId.replace(/:/g, "")}`;

  const VOICE_CLEAR_PHRASE = "borrar todo".toLocaleLowerCase();

  const handleResult = (transcript: string, isFinal: boolean) => {
    if (isFinal && transcript.trim()) {
      const current = valueRef.current;
      const separator = current.trim() ? " " : "";
      onChange(current + separator + transcript.trim());
      setInterimTranscript("");
    } else {
      setInterimTranscript(transcript);
    }
  };

  const { isSupported, isListening, error, start, stop } = useSpeechRecognition(
    {
      continuous: true,
      interimResults: true,
      lang: typeof navigator !== "undefined" ? navigator.language : "es-ES",
      onResult: handleResult,
    }
  );

  const handleMicClick = () => {
    if (isListening) {
      stop();
      setInterimTranscript("");
    } else {
      start();
    }
  };

  const handleClear = useCallback(() => {
    setInterimTranscript("");
    onChange("");
  }, [onChange]);

  const displayValue =
    value + (interimTranscript ? " " + interimTranscript : "");

  useEffect(() => {
    if (!value.toLocaleLowerCase().includes(VOICE_CLEAR_PHRASE)) return;
    queueMicrotask(() => {
      handleClear();
    });
  }, [value, handleClear]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        expandToFillHeight && "min-h-0 flex-1",
        className
      )}
    >
      {label && (
        <Label htmlFor={id} className="text-muted-foreground shrink-0">
          {label}
        </Label>
      )}
      <div
        className={cn(
          "flex flex-col gap-2",
          expandToFillHeight && "min-h-0 flex-1"
        )}
      >
        <div
          className={cn(
            "relative",
            expandToFillHeight && "flex min-h-0 flex-1 flex-col"
          )}
        >
          <Textarea
            id={id}
            value={displayValue}
            onChange={(e) => {
              setInterimTranscript("");
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "min-h-36 pr-12 text-base md:text-lg",
              expandToFillHeight ? "flex-1 resize-none" : "resize-y"
            )}
            aria-describedby={hasMounted && error ? `${id}-error` : undefined}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground absolute right-2 bottom-2 shrink-0 disabled:opacity-40"
            onClick={handleClear}
            disabled={
              disabled ||
              (!displayValue.trim() && interimTranscript.length === 0)
            }
            title="Clear all"
            aria-label="Clear all"
          >
            <Eraser aria-hidden className="size-4" />
          </Button>
          {hasMounted && isSupported && (
            <Button
              type="button"
              variant={isListening ? "destructive" : "outline"}
              size="icon"
              className="absolute top-2 right-2 shrink-0"
              onClick={handleMicClick}
              disabled={disabled}
              title={
                isListening
                  ? "Stop listening"
                  : "Dictate description (voice to text)"
              }
              aria-label={
                isListening ? "Stop voice input" : "Start voice input"
              }
            >
              {isListening ? <Square aria-hidden /> : <Mic aria-hidden />}
            </Button>
          )}
        </div>
      </div>
      {hasMounted && error && (
        <p
          id={`${id}-error`}
          className="text-destructive shrink-0 text-sm"
          role="alert"
        >
          {error}
        </p>
      )}
      {hasMounted && !isSupported && (
        <p className="text-muted-foreground shrink-0 text-sm">
          Voice input is not supported in this browser. Use Chrome for
          voice-to-text.
        </p>
      )}
    </div>
  );
}
