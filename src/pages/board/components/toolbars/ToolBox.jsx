import React from 'react';
import { Rect} from 'react-konva';

function ToolBox() {
    return (
        <>
            <Rect
                x={10}
                y={10}
                width={150}
                height={640}
                fill="white"
                shadowBlur={5}
                shadowColor="black"
            />
        </>
    )
}

export default ToolBox