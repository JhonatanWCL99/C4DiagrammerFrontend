import React from 'react';
import { Group, Circle, Rect, Text } from 'react-konva';

function PersonStatic(props) {
    const { ref, key, x, y } = props
    return (
        <>
            <Group
                x={25}
                y={13}
            >
                <Circle
                    x={120 / 2}
                    y={30}
                    radius={24}
                    fill='#083f75'
                />
                <Rect
                    x={0}
                    y={50}
                    width={120}
                    height={70}
                    fill='#083f75'
                    cornerRadius={15}
                    text="sdfd"
                />
                <Text
                    x={5}
                    y={62}
                    fill='white'
                    fontFamily='Calibri'
                    fontSize={15}
                    width={120 - 10}
                    text='Person Name'
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
                    text='[Person]'
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
                    text='Descripcion de Person'
                    verticalAlign="middle"
                    align='center'
                />
            </Group>
        </>
    );
}

export default PersonStatic;