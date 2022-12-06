import React, { useRef } from 'react';
import { Group, Circle, Rect, Text } from 'react-konva';

function ContainerDynamic(props) {
    const { ref, key, x, y, containerName } = props
    const draggableContainerRef = useRef();
    return (
        <>
            <Group
                draggable={true}
                ref={draggableContainerRef}
                x={25}
                y={205}
                onDragEnd={event => {
                    let name = 'container' + containerName
                    let toSend = {
                        x: event.target.x(),
                        y: event.target.y(),
                        width: 120,
                        height: 72,
                        radius: 24,
                        fill: '#00a8ff',
                        name: name,
                        key: name,
                        /* ref: draggableContainerRef.current, */
                        nombre: 'Container Name',
                        tipo: '[Container]',
                        descripcion: 'Descripcion del container',
                    }
                    props.appendToContainer(toSend)
                    var container = draggableContainerRef.current

                    container.position({
                        x: 25,
                        y: 205
                    })
                }}
            >
                <Rect
                    x={0}
                    y={50}
                    width={120}
                    height={72}
                    fill='#00a8ff'
                    cornerRadius={8}
                />
                <Text
                    x={5}
                    y={62}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={15}
                    width={120 - 10}
                    text='Container Name'
                    verticalAlign="middle"
                    align='center'
                />

                <Text
                    x={5}
                    y={82}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={10}
                    width={120 - 10}
                    text='[Container]'
                    verticalAlign="middle"
                    align='center'
                />
                <Text
                    x={5}
                    y={100}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={24 - 15}
                    width={120 - 10}
                    text='Descripcion del Container'
                    verticalAlign="middle"
                    align='center'
                />
            </Group>
        </>
    );
}

export default ContainerDynamic;