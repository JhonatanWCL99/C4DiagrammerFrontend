import React, { useState, useRef, useEffect } from 'react'
import { Stage, Layer } from 'react-konva'
import Container from './c4/Containers/Container';
import DataBase from './c4/Databases/DataBase';
import Person from './c4/Persons/Person'
import System from './c4/Systems/System';
import ToolBar from './toolbars/ToolBar'
import roomService from '../../../services/RoomService';
import { useLocation } from 'react-router-dom';

export default function MainStage() {
    const scenarioStageRef = useRef();
    const layerRef1 = useRef();
    const layerRef2 = useRef();
    const [selectedShapeName, setSelectedShapeName] = useState("")
    const [persons, setPersons] = useState([])
    const [personDeleteCount, setPersonDeleteCount] = useState(0)
    const [systems, setSystems] = useState([])
    const [systemDeleteCount, setSystemDeleteCount] = useState(0)
    const [containers, setContainers] = useState([])
    const [containerDeleteCount, setContainerDeleteCount] = useState(0)
    const [databases, setDatabases] = useState([])
    const [databaseDeleteCount, setDataBaseDeleteCount] = useState(0)
    const location = useLocation();
    const room_id = location.pathname.split("/")[2];

    useEffect(() => {
        loadShapes();
    }, [])

    async function loadShapes() {
        const resp = await roomService.loadShapes(room_id);
        setPersons(resp.persons)
        setContainers(resp.containers)
        setDatabases(resp.databases)
        setSystems(resp.systems)
        console.log(resp);
    }

    async function handleSave() {
        const data = {
            persons: persons,
            systems: systems,
            containers: containers,
            databases: databases,
        }
        const resp = await roomService.saveRoom(room_id, data);
    }

    function handleExportImg() {
        alert("export")
    }

    function handleBack() {
        alert("back")

    }

    return (
        <>
            <Stage
                width={window.innerWidth * 0.95}
                height={window.innerHeight * 0.85}
                ref={scenarioStageRef}
            >
                <Layer
                    width={window.innerWidth * 0.95}
                    height={window.innerHeight * 0.85}
                    ref={layerRef1}
                >
                    <ToolBar
                        personName={
                            persons.length + 1 + personDeleteCount
                        }
                        appendToPerson={stuff => {
                            var toPush = stuff;
                            setPersons([...persons, toPush])
                            setSelectedShapeName(toPush.name)
                        }}
                        systemName={
                            systems.length + 1 + systemDeleteCount
                        }
                        appendToSystem={stuff => {
                            var toPush = stuff;
                            setSystems([...systems, toPush])
                            setSelectedShapeName(toPush.name)
                        }}
                        containerName={
                            containers.length + 1 + containerDeleteCount
                        }
                        appendToContainer={stuff => {
                            var toPush = stuff;
                            setContainers([...containers, toPush])
                            setSelectedShapeName(toPush.name)
                        }}
                        databaseName={
                            databases.length + 1 + databaseDeleteCount
                        }
                        appendToDataBase={stuff => {
                            var toPush = stuff;
                            setDatabases([...databases, toPush])
                            setSelectedShapeName(toPush.name)
                        }}
                    />
                </Layer>
                <Layer
                    width={window.innerWidth * 0.95}
                    height={window.innerHeight * 0.85}
                    ref={layerRef2}
                >
                    {persons.map((person, index) => (
                        <Person
                            x={person.x}
                            y={person.y}
                            width={person.width}
                            height={person.height}
                            radius={person.radius}
                            fill={person.fill}
                            name={person.name}
                            key={person.key}
                            myKey={person.key}
                            descripcion={person.descripcion}
                            nombre={person.nombre}
                            tipo={person.tipo}
                            actualizarPerson={stuff => {
                                setPersons(persons.map(
                                    person => person.name === stuff.name ? {
                                        ...person,
                                        x: stuff.x,
                                        y: stuff.y,
                                    } : person
                                ))
                                scenarioStageRef.current.draw();
                            }}
                        />
                    ))}
                    {systems.map(system => (
                        <System
                            x={system.x}
                            y={system.y}
                            width={system.width}
                            height={system.height}
                            radius={system.radius}
                            fill={system.fill}
                            name={system.name}
                            key={system.key}
                            myKey={system.key}
                            descripcion={system.descripcion}
                            nombre={system.nombre}
                            tipo={system.tipo}
                            actualizarSystem={stuff => {
                                setSystems(systems.map(
                                    system => system.name === stuff.name ? {
                                        ...system,
                                        x: stuff.x,
                                        y: stuff.y,
                                    } : system
                                ))
                                scenarioStageRef.current.draw();
                            }}
                        />
                    ))}
                    {containers.map(container => (
                        <Container
                            x={container.x}
                            y={container.y}
                            width={container.width}
                            height={container.height}
                            radius={container.radius}
                            fill={container.fill}
                            name={container.name}
                            key={container.key}
                            myKey={container.key}
                            descripcion={container.descripcion}
                            nombre={container.nombre}
                            tipo={container.tipo}
                            actualizarContainer={stuff => {
                                setContainers(containers.map(
                                    container => container.name === stuff.name ? {
                                        ...system,
                                        x: stuff.x,
                                        y: stuff.y,
                                    } : container
                                ))
                                scenarioStageRef.current.draw();
                            }}
                        />
                    ))}
                    {databases.map(database => (
                        <DataBase
                            x={database.x}
                            y={database.y}
                            width={database.width}
                            height={database.height}
                            radius={database.radius}
                            fill={database.fill}
                            name={database.name}
                            key={database.key}
                            myKey={database.key}
                            descripcion={database.descripcion}
                            nombre={database.nombre}
                            tipo={database.tipo}
                            actualizarDataBase={stuff => {
                                setDatabases(databases.map(
                                    database => database.name === stuff.name ? {
                                        ...system,
                                        x: stuff.x,
                                        y: stuff.y,
                                    } : database
                                ))
                                scenarioStageRef.current.draw();
                            }}
                        />
                    ))}
                </Layer>
            </Stage>
            <div className="flex bottom-1 right-1 absolute">
                <div>
                    <button onClick={handleSave} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar</button>
                </div>
                <div>
                    <button onClick={handleExportImg} type="button" className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800">Exportar a Imagen</button>
                </div>
                <div>
                    <button onClick={handleBack} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Salir</button>
                </div>

            </div>
        </>

    )
}
