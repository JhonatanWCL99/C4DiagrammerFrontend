import React, { useState } from 'react';
import ToolBox from './ToolBox';
import PersonStatic from '../c4/Persons/PersonStatic';
import PersonDynamic from '../c4/Persons/PersonDynamic';
import SystemStatic from '../c4/Systems/SystemStatic';
import ContainerStatic from '../c4/Containers/ContainerStatic';
import DataBaseStatic from '../c4/DataBases/DataBaseStatic';
import { Arrow } from 'react-konva';
import SystemDynamic from '../c4/Systems/SystemDynamic';
import ContainerDynamic from '../c4/Containers/ContainerDynamic';
import DataBaseDynamic from '../c4/Databases/DataBaseDynamic';
function ToolBar(props) {
    const { personName, systemName, containerName, databaseName } = props

    const [previousShape, setPreviousShape] = useState(undefined);

    return (
        <>
            <ToolBox />
            {/*  <PersonStatic /> */}
            <PersonDynamic
                personName={personName}
                appendToPerson={stuff => {
                    var val = stuff
                    props.appendToPerson(val)
                }}
            />
            {/*  <SystemStatic /> */}
            <SystemDynamic
                systemName={systemName}
                appendToSystem={stuff => {
                    var val = stuff
                    props.appendToSystem(val)
                }}
            />
            {/*  <ContainerStatic /> */}
            <ContainerDynamic
                containerName={containerName}
                appendToContainer={stuff => {
                    var val = stuff
                    props.appendToContainer(val)
                }}
            />
            {/*  <DataBaseStatic /> */}
            <DataBaseDynamic
                databaseName={databaseName}
                appendToDataBase={stuff => {
                    var val = stuff
                    props.appendToDataBase(val)
                }}
            />
            {/* <Arrow
                points={[25, 480, 140, 480]}
                fill="black"
                stroke="black"
            /> */}
        </>
    )

}

export default ToolBar;