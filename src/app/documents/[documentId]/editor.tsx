"use client";

import { useEditorStore } from '@/store/use-editor-store';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import ImageResize from "tiptap-extension-resize-image"
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { Ruler } from './ruler';
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { Threads } from './threads';
import { useStorage } from '@liveblocks/react';
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';
import { SidebarBox } from '@/components/sidebar-box';

export const Editor = () => {

  const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;  

  const liveblocks = useLiveblocksExtension({
      offlineSupport_experimental: true,
  });

  const { setEditor }= useEditorStore(); 

  const editor = useEditor({
      immediatelyRender: false,
      onCreate({ editor }){
          setEditor(editor);
      },
      onDestroy(){
          setEditor(null);
      },
      onUpdate({ editor }){
          setEditor(editor);
      },
      onSelectionUpdate({ editor }){
          setEditor(editor);
      },
      onTransaction({ editor }){
          setEditor(editor);
      },
      onFocus({ editor }){
          setEditor(editor);
      },
      onBlur({ editor }){
          setEditor(editor);
      },
      onContentError({ editor }){
          setEditor(editor);
      },
      editorProps: {
          attributes: {
              style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px`,
              class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text "
          },
      },
      extensions: [
          liveblocks,
          TextStyle,
          Color,
          Highlight.configure({
              multicolor: true,
          }),
          Underline,
          StarterKit.configure({
              history: false,
          }),
          FontSizeExtension,
          LineHeightExtension,
          TextAlign.configure({
              types: ["heading", "paragraph"]
          }),
          Link.configure({
              openOnClick: false,
              autolink: true,
              defaultProtocol: "https"
          }),
          FontFamily,
          Image,
          ImageResize,
          Table,
          TableCell,
          TableHeader,
          TableRow,
          TaskItem.configure({
              nested: true,
          }),
          TaskList,
      ],
  });

  return (
    <div className="relative size-full text-black overflow-x-auto px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />

      {/* SidebarBox - independent from editor */}
      <div className="hidden lg:block fixed top-[112px] left-4 z-40">
        <SidebarBox />
      </div>

      {/* Centered Editor and Threads */}
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );

};
