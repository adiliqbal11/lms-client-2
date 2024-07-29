import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { downloadHtmlAsPdf } from '../../common';

interface CKEditorProps {
    content:string
}


const CkEditor: React.FC<CKEditorProps> = (props) => {
    const [editorState, setEditorState] = useState<string>(props?.content);
    useEffect(()=>{
        setEditorState(props?.content);
    }, [props?.content])
    return (
       <>
        <Button label='Save' className='my-2' onClick={() => downloadHtmlAsPdf(editorState as unknown as HTMLElement, "demo")} />
        <CKEditor
            editor={ClassicEditor}
            data={editorState}
            onChange={(event, editor) => {
                const data = editor.getData();
                setEditorState(data);
            }}
        />
       </>
    );
};

export default CkEditor;