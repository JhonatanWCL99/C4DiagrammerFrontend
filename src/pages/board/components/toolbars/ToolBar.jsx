import React, { useState, useRef } from 'react';
import ToolBox from './ToolBox';
import PersonStatic from '../c4/Persons/PersonStatic';
import PersonDynamic from '../c4/Persons/PersonDynamic';
import SystemStatic from '../c4/Systems/SystemStatic';
import ContainerStatic from '../c4/Containers/ContainerStatic';
import DataBaseStatic from '../c4/Databases/DataBaseStatic';
import { Arrow, Image, Text } from 'react-konva';
import SystemDynamic from '../c4/Systems/SystemDynamic';
import ContainerDynamic from '../c4/Containers/ContainerDynamic';
import DataBaseDynamic from '../c4/Databases/DataBaseDynamic';
import ArrowDynamic from '../c4/Arrows/ArrowDynamic';

function ToolBar(props) {
    const { personName, systemName, containerName, databaseName, layer } = props
    const [previousShape, setPreviousShape] = useState(undefined);
    const draggableArrow = useRef();


    return (
        <>
            <ToolBox />
            <PersonStatic />
            <PersonDynamic
                personName={personName}
                appendToPerson={stuff => {
                    var val = stuff
                    props.appendToPerson(val)
                }}
            />
            <SystemStatic />
            <SystemDynamic
                systemName={systemName}
                appendToSystem={stuff => {
                    var val = stuff
                    props.appendToSystem(val)
                }}
            />
            <ContainerStatic />
            <ContainerDynamic
                containerName={containerName}
                appendToContainer={stuff => {
                    var val = stuff
                    props.appendToContainer(val)
                }}
            />
            <DataBaseStatic />
            <DataBaseDynamic
                databaseName={databaseName}
                appendToDataBase={stuff => {
                    var val = stuff
                    props.appendToDataBase(val)
                }}
            />
            {/*  <Arrow
                points={[50, 480, 120, 480]}
                fill="black"
                stroke="black"
            /> */}
            <Arrow
                points={[75, 480, 100, 480]}
                fill="black"
                stroke="black"
                name="draggableArrow"
                ref={draggableArrow}
                draggable
                onDragStart={() => {
                    draggableArrow.current.setAttr('fill', 'grey')
                    draggableArrow.current.setAttr('stroke', 'grey')
                }}
                onDragMove={() => {
                    let pos = layer.parent.getPointerPosition();
                    /*  console.log(pos) */
                    var shape = layer.getIntersection(
                        pos
                    )
                  /*   console.log(shape.attrs) */
                    if (props.previousShape !== undefined && props.previousShape !== null)
                        /*  console.log(shape.attrs.name); */
                        if (props.previousShape !== shape) {
                            //arrow entered a new shape
                            if (props.previousShape.attrs.name != undefined) {
                                //the shape we left gets its original color back
                                if (
                                    props.previousShape.attrs
                                        .id !== 'ContainerRect' &&
                                    !props.previousShape.attrs.name.includes(
                                        'arrow'
                                    )
                                ) {
                                    draggableArrow.current.setAttr(
                                        'fill',
                                        'black'
                                    )
                                    draggableArrow.current.setAttr(
                                        'stroke',
                                        'black'
                                    )
                                }
                            }
                        }
                        //if arrow is moving in a single shape

                        else if (props.previousShape.attrs.id !== 'ContainerRect' && !shape.attrs.name.includes('arrow')) {
                            //if it the first time the shapes are same, set shape to blue, store the original color
                            draggableArrow.current.setAttr(
                                'fill',
                                '#ccf5ff'
                            )
                            draggableArrow.current.setAttr(
                                'stroke',
                                '#ccf5ff'
                            )
                        }

                    layer.draw()
                    props.setPreviousShape(shape)
                }}
                onDragEnd={event => {
                    var pos = layer
                        .parent
                        .getPointerPosition()
                    var shape = layer.getIntersection(
                        pos
                    )
                    /* console.log(shape) */
                    //shape is not containerRect, which means we are on a shape
                    if (
                        shape &&
                        shape.attrs.id === undefined &&
                        !shape.attrs.name.includes('arrow')
                    ) {
                        let toSend = {
                            x: pos.x,
                            y: pos.y,
                            points: [20, 475, 60, 475],
                            from: shape,
                            stroke: 'black',
                            strokeWidth: '1.5',
                            fill: 'black',
                            ref: draggableArrow.current,
                        }
                        console.log('from shape', shape)
                        props.newArrowOnDragEnd(toSend)
                    } else {
                        let toSend = {
                            x: pos.x,
                            y: pos.y,
                            points: [20, 475, 60, 475],
                            stroke: 'black',
                            strokeWidth: '1.5',
                            fill: 'black',
                            ref: draggableArrow.current,
                        }

                        props.newArrowOnDragEnd(toSend)
                    }

                    //if shape is not arrow nor the containerRect then we make a connector instead

                    //onDragEnd = dropping arrow down, create a new arrow with 2 same points at the dropped location
                    //create new arrow in Graphics.js
                    //from there, fire onMouseMove over the entire stage
                    //the arrow's points should be the first point onDragEnd and the second should be the current
                    //mouse position determined by onMouseMove event in stage
                    var arrow = draggableArrow.current
                    arrow.position({ x: 0, y: 0 })
                    arrow.setAttr('fill', 'black')
                    arrow.setAttr('stroke', 'black')

                    arrow.draw()
                }}
            />
            {/* <Text
                text='Flecha'
                fontSize={20}
                x={50}
                y={455}
                onClick={props.handleenableArrow}
            /> */}
            {/*  <Image image={arrowsvg} width={130} /> */}

        </>
    )

}

export default ToolBar;