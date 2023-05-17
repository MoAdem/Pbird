import React, { useState, useEffect } from "react";

import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertFromHTML,
  ContentState,
  convertToRaw,
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TextEditor(props) {
  const { onChange, data = "", height = "300px" } = props;

  const [editor, setEditor] = useState(EditorState.createEmpty());
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!typing) {
      setEditor(
        EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(data).contentBlocks,
            convertFromHTML(data).entityMap
          )
        )
      );
    }
  }, [data]);

  const onEditorStateChange = (newData) => {
    //let html = stateToHTML(newData.getCurrentContent());
    let html = draftToHtml(convertToRaw(newData.getCurrentContent()));
    onChange(html);
    setEditor(newData);
  };

  return (
    <div
      onClick={() => {
        setTyping(true);
      }}
      style={{ height: height, overflow: "scroll", border: "solid 1px black" }}
    >
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
        editorState={editor}
      />
    </div>
  );
}

export default TextEditor;
