import React, { useRef } from 'react';
import { Group, Rect, Ellipse, Text } from 'react-konva';

function DataBase(props) {

    const databaseRef = useRef();

    return (
        <>
            <Group
                draggable
                ref={databaseRef}
                key={props.myKey}
                x={props.x}
                y={props.y}
                onDragEnd={event => {
                    let e = event;
                    let send = {
                        x: e.target.x(),
                        y: e.target.y(),
                    }
                    props.actualizarDataBase(send)
                }}
            >
                <Rect
                    x={0}
                    y={50}
                    width={props.width}
                    height={props.height}
                    fill='#00a8ff'
                    cornerRadius={16}
                />
                <Ellipse
                    x={120 / 2}
                    y={58}
                    radiusX={59}
                    radiusY={10}
                    fill='#00a8ff'
                    stroke='white'
                    strokeWidth={3}
                />
                <Text
                    x={5}
                    y={74}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={15}
                    width={120 - 10}
                    text={props.nombre}
                    verticalAlign="middle"
                    align='center'
                />
                <Text
                    x={5}
                    y={92}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={10}
                    width={120 - 10}
                    text={props.tipo}
                    verticalAlign="middle"
                    align='center'
                />
                <Text
                    x={5}
                    y={108}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={24 - 15}
                    width={120 - 10}
                    text={props.descripcion}
                    verticalAlign="middle"
                    align='center'
                />
            </Group>
        </>
    );
}

export default DataBase;