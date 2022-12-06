import React from 'react'
import { Group, Rect, Ellipse, Text } from 'react-konva';


function DataBaseStatic() {
    return (
        <>
            <Group
                x={25}
                y={305}
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

export default DataBaseStatic;