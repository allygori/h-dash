"use client";

// import { WebSocketStatus } from "@hocuspocus/provider";
import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useMemo, useRef } from "react";

import { LinkMenu } from "@/components/text-editor/components/menus";

import { useBlockEditor } from "@/components/text-editor/hooks/useBlockEditor";

import "@/components/text-editor/styles/index.css";

import { Sidebar } from "@/components/text-editor/components/sidebar";
// import { Loader } from "@/components/text-editor/ui/Loader";
import { EditorContext } from "@/components/text-editor/context/editor-context";
import ImageBlockMenu from "@/components/text-editor/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/components/text-editor/extensions/MultiColumn/menus";
import {
  TableColumnMenu,
  TableRowMenu,
} from "@/components/text-editor/extensions/Table/menus";
import { useAIState } from "@/components/text-editor/hooks/useAIState";
import { createPortal } from "react-dom";
import { TiptapProps } from "./types";
import { EditorHeader } from "./EditorHeader";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";

export const BlockEditor = ({ provider }: TiptapProps) => {
  // const aiState = useAIState()
  const menuContainerRef = useRef(null);

  const { editor, users, characterCount, collabState, leftSidebar } =
    useBlockEditor({ provider });

  const displayedUsers = users.slice(0, 3);

  // const providerValue = useMemo(() => {
  //   return {
  //     isAiLoading: aiState.isAiLoading,
  //     aiError: aiState.aiError,
  //     setIsAiLoading: aiState.setIsAiLoading,
  //     setAiError: aiState.setAiError,
  //   }
  // }, [aiState])

  if (!editor) {
    return null;
  }

  // const aiLoaderPortal = createPortal(<Loader label="AI is now doing its job." />, document.body)

  return (
    // <EditorContext.Provider value={providerValue}>
    <EditorContext.Provider value={null}>
      <div
        className="flex h-full overflow-hidden rounded-md border border-input"
        ref={menuContainerRef}
      >
        <Sidebar
          isOpen={leftSidebar.isOpen}
          onClose={leftSidebar.close}
          editor={editor}
        />
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <EditorContent
            editor={editor}
            className="flex-1 overflow-y-auto bg-white"
          />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
      {/* {aiState.isAiLoading && aiLoaderPortal} */}
    </EditorContext.Provider>
  );
};

export default BlockEditor;
