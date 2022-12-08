import React, { useRef } from 'react';
import { Arrow } from 'react-konva';

function ArrowDynamic(props) {

    const draggableArrow = useRef();

    return (
        <Arrow
            points={[50, 480, 120, 480]}
            fill="black"
            stroke="black"
            name="draggableArrow"
            ref={draggableArrow}
            draggable
            onDragStart={() => {
                draggableArrow.current.setAttr('fill', 'grey')
                draggableArrow.current.setAttr('stroke', 'grey')
            }}
            onDragMove={props.onDragMove(draggableArrow.current, props.layer)}

        />

    );
}

export default ArrowDynamic;