"use client";

import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Loader2Icon, MicIcon, PhoneOffIcon, RotateCcwIcon, UserIcon, Volume2Icon } from "lucide-react";

function VapiWidget() {
  const [callActive, setCallActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState(false);

  const { user, isLoaded } = useUser();
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // auto-scroll for messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // setup event listeners for VAPI
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEnd = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started Speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped Speaking");
      setIsSpeaking(false);
    };

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      const errorMsg = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      alert("Vapi Connection Error: " + errorMsg);
      setConnecting(false);
      setCallActive(false);
    };

    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEnd)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // cleanup event listeners on unmount
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEnd)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
      
      // Stop the call when the user navigates away from the page
      vapi.stop();
    };
  }, []);

  const toggleCall = async () => {
    if (callActive) {
      vapi.stop();
    } else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);
        
        const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
        const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
        
        if (!assistantId || !apiKey) {
           throw new Error("Vapi API Keys are missing! Please make sure your .env file is properly loaded.");
        }

        await vapi.start(assistantId);
      } catch (error: any) {
        console.log("Failed to start call", error);
        const errorMsg = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
        alert("Failed to connect: " + errorMsg);
        setConnecting(false);
      }
    }
  };

  const restartCall = async () => {
    setCallEnded(false);
    await toggleCall();
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-4xl mx-auto flex flex-col pb-16 space-y-6">
      {/* SESSION STATUS HEADER */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <Volume2Icon className="size-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Clinical Voice Channel</h2>
            <p className="text-xs text-muted-foreground">Riley • AI Dental Triage Assistant</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
              isSpeaking
                ? "bg-primary/10 text-primary border-primary/20"
                : callActive
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                : connecting
                ? "bg-primary/10 text-primary border-primary/20"
                : callEnded
                ? "bg-muted text-muted-foreground border-border"
                : "bg-muted text-muted-foreground border-border"
            }`}
          >
            <span
              className={`size-1.5 rounded-full ${
                isSpeaking
                  ? "bg-primary animate-pulse"
                  : callActive
                  ? "bg-emerald-500"
                  : connecting
                  ? "bg-primary animate-pulse"
                  : "bg-muted-foreground"
              }`}
            />
            {isSpeaking
              ? "Riley is speaking..."
              : callActive
              ? "Listening to your voice..."
              : connecting
              ? "Connecting audio..."
              : callEnded
              ? "Consultation completed"
              : "Standby"}
          </span>
        </div>
      </div>

      {/* CALL PARTICIPANTS TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ASSISTANT TILE */}
        <Card className="border border-border bg-card shadow-xs rounded-xl overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="Riley Assistant"
                width={56}
                height={56}
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-base text-foreground">Riley</h3>
              <p className="text-xs text-muted-foreground">Dental Triage Specialist</p>
            </div>
            <span className="text-[11px] text-muted-foreground/80 bg-muted px-2.5 py-0.5 rounded-md">
              Available 24/7
            </span>
          </CardContent>
        </Card>

        {/* PATIENT TILE */}
        <Card className="border border-border bg-card shadow-xs rounded-xl overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="size-20 rounded-full bg-muted border border-border flex items-center justify-center overflow-hidden">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={user.firstName || "Patient"}
                  width={80}
                  height={80}
                  className="size-full object-cover"
                />
              ) : (
                <UserIcon className="size-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-base text-foreground">
                {user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Patient" : "Patient"}
              </h3>
              <p className="text-xs text-muted-foreground">{user?.emailAddresses?.[0]?.emailAddress || "Verified Patient"}</p>
            </div>
            <span className="text-[11px] text-muted-foreground/80 bg-muted px-2.5 py-0.5 rounded-md">
              Audio Input Ready
            </span>
          </CardContent>
        </Card>
      </div>

      {/* CALL CONTROLS */}
      <div className="flex justify-center items-center py-2">
        {callActive ? (
          <Button
            size="lg"
            variant="destructive"
            className="font-medium px-8 h-11 rounded-lg shadow-xs"
            onClick={toggleCall}
          >
            <PhoneOffIcon className="mr-2 size-4" />
            End Consultation
          </Button>
        ) : connecting ? (
          <Button
            size="lg"
            disabled
            className="bg-primary/80 text-primary-foreground font-medium px-8 h-11 rounded-lg shadow-xs"
          >
            <Loader2Icon className="mr-2 size-4 animate-spin" />
            Connecting to Riley...
          </Button>
        ) : callEnded ? (
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 h-11 rounded-lg shadow-xs"
              onClick={restartCall}
            >
              <RotateCcwIcon className="mr-2 size-4" />
              Start New Consultation
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-8 h-11 rounded-lg shadow-xs"
            onClick={toggleCall}
          >
            <MicIcon className="mr-2 size-4" />
            Connect Microphone & Start
          </Button>
        )}
      </div>

      {/* TRANSCRIPT CONTAINER */}
      {messages.length > 0 && (
        <Card className="border border-border bg-card shadow-xs rounded-xl overflow-hidden">
          <div className="p-3.5 border-b border-border flex items-center justify-between bg-muted/20">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Consultation Transcript
            </span>
            <span className="text-[11px] text-muted-foreground font-medium">
              {messages.length} message{messages.length > 1 ? "s" : ""}
            </span>
          </div>

          <div
            ref={messageContainerRef}
            className="p-4 space-y-3.5 max-h-72 overflow-y-auto text-xs leading-relaxed"
          >
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    isAssistant
                      ? "bg-primary/5 border-primary/15 text-foreground"
                      : "bg-muted/40 border-border/70 text-foreground"
                  }`}
                >
                  <span
                    className={`font-semibold block mb-1 ${
                      isAssistant ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {isAssistant ? "Riley (Assistant):" : "You (Patient):"}
                  </span>
                  <p className="text-muted-foreground">{msg.content}</p>
                </div>
              );
            })}

            {callEnded && (
              <div className="p-3 rounded-lg bg-muted/60 border border-border text-center text-xs text-muted-foreground">
                Consultation session concluded. You can review your discussion above or book a follow-up appointment with a dentist.
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default VapiWidget;
