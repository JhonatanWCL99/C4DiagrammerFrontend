import React, { useRef } from 'react';
import { Group, Rect, Circle, Text } from 'react-konva';



export default function Person(props) {

    const personRef = useRef();

    return (
        <React.Fragment>
            <Group
                draggable
                ref={personRef}
                key={props.myKey}
                x={props.x}
                y={props.y}
                onDragEnd={event => {
                    let e = event;

                    let send = {
                        x: e.target.x(),
                        y: e.target.y(),
                        name: props.name,
                        ref: personRef.current,
                    }
                    props.actualizarPerson(send)

                }}

            >
                <Circle
                    x={props.width / 2}
                    y={30}
                    radius={props.radius}
                    fill={props.fill}
                />
                <Rect
                    x={0}
                    y={50}
                    width={props.width}
                    height={props.height}
                    fill={props.fill}
                    cornerRadius={15}
                />
                <Text
                    x={5}
                    y={62}
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
                    y={82}
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
                    y={100}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={24 - 15}
                    width={120 - 10}
                    text={props.descripcion}
                    verticalAlign="middle"
                    align='center'
                />
            </Group>
        </React.Fragment>
    );
}