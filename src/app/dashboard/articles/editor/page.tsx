"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/components/text-editor/components/block-editor";
import { createPortal } from "react-dom";
import { Surface } from "@/components/text-editor/ui/Surface";
import { Toolbar } from "@/components/text-editor/ui/Toolbar";
import { Icon } from "@/components/text-editor/ui/Icon";

export interface AiState {
  isAiLoading: boolean;
  aiError?: string | null;
}

const useDarkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(
    () => setIsDarkMode((isDark) => !isDark),
    [],
  );
  const lightMode = useCallback(() => setIsDarkMode(false), []);
  const darkMode = useCallback(() => setIsDarkMode(true), []);

  return {
    isDarkMode,
    toggleDarkMode,
    lightMode,
    darkMode,
  };
};

export default function Document({ params }: { params: { room: string } }) {
  const { isDarkMode, darkMode, lightMode } = useDarkmode();
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [aiToken, setAiToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;

  const { room } = params;

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      // const data = await (
      //   await fetch('/api/collaboration', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   })
      // ).json()

      const postData = async () => {
        try {
          const res = await fetch("/api/collaboration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (res.ok) {
            return res.json();
          }

          return null;
        } catch (e) {
          console.error(e);
        }
      };

      const data = await postData();

      const { token } = data || {};

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  // useEffect(() => {
  //   // fetch data
  //   const dataFetch = async () => {
  //     const data = await (
  //       await fetch('/api/ai', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //     ).json()

  //     const { token } = data

  //     // set state when the data received
  //     setAiToken(token)
  //   }

  //   dataFetch()
  // }, [])

  const ydoc = useMemo(() => new YDoc(), []);

  // useLayoutEffect(() => {
  //   if (hasCollab && collabToken) {
  //     setProvider(
  //       new TiptapCollabProvider({
  //         name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
  //         appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
  //         token: collabToken,
  //         document: ydoc,
  //       }),
  //     )
  //   }
  // }, [setProvider, collabToken, ydoc, room, hasCollab])

  // if ((hasCollab && (!collabToken || !provider)) || !aiToken) return

  // const DarkModeSwitcher = createPortal(
  //   <Surface className="fixed bottom-6 right-6 z-[99999] flex items-center gap-1 p-1">
  //     <Toolbar.Button onClick={lightMode} active={!isDarkMode}>
  //       <Icon name="Sun" />
  //     </Toolbar.Button>
  //     <Toolbar.Button onClick={darkMode} active={isDarkMode}>
  //       <Icon name="Moon" />
  //     </Toolbar.Button>
  //   </Surface>,
  //   document.body,
  // );

  return (
    <>
      {/* {DarkModeSwitcher} */}
      {/* <BlockEditor aiToken={aiToken} hasCollab={hasCollab} ydoc={ydoc} provider={provider} /> */}
      <BlockEditor provider={provider} />
    </>
  );
}
