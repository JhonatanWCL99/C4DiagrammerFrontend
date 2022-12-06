import React, { useRef } from 'react';
import { Group, Ellipse, Rect, Text } from 'react-konva';

function DataBaseDynamic(props) {
    const { databaseName } = props

    const draggableDataBaseRef = useRef();

    return (
        <>
            <Group
                draggable={true}
                ref={draggableDataBaseRef}
                x={25}
                y={305}
                onDragEnd={event => {
                    let name = 'database' + databaseName
                    let toSend = {
                        x: event.target.x(),
                        y: event.target.y(),
                        width: 120,
                        height: 78,
                        radius: 24,
                        fill: '#00a8ff',
                        name: name,
                        key: name,
                       /*  ref: draggableDataBaseRef, */
                        nombre: 'Stogare Name',
                        tipo: '[Stogare]',
                        descripcion: 'Descripcion del stogare',
                    }
                    props.appendToDataBase(toSend)
                    var database = draggableDataBaseRef.current

                    database.position({
                        x: 25,
                        y: 305
                    })
                }}
            >
                <Rect
                    x={0}
                    y={50}
                    width={120}
                    height={78}
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
                    text='Storage Name'
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
                    text='[Storage]'
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
                    text='Descripcion del Storage'
                    verticalAlign="middle"
                    align='center'
                />
            </Group>
        </>
    );
}

export default DataBaseDynamic;