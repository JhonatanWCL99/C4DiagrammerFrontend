import React from 'react';
import { Group, Rect, Text } from 'react-konva';

function ContainerStatic() {
    return (
        <>
            <Group
                x={25}
                y={205}
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

export default ContainerStatic;