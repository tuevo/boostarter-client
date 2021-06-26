import JoditEditor from "jodit-react";
import React, { useRef } from 'react';

export default function Editor({ content, onChange }) {
    const editor = useRef(null)

    const config = {
        readonly: false // all options from https://xdsoft.net/jodit/doc/
    }

    return (
        <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={newContent => onChange(newContent)}
        />
    )
}
