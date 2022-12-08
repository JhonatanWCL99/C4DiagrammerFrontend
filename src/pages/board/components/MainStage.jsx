import React, { useState, useRef, useEffect, useContext } from 'react'
import { Stage, Layer, Rect, Arrow } from 'react-konva'
import Container from './c4/Containers/Container';
import DataBase from './c4/Databases/DataBase';
import Person from './c4/Persons/Person'
import System from './c4/Systems/System';
import ToolBar from './toolbars/ToolBar'
import roomService from '../../../services/RoomService';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Connector from './c4/Arrows/Connector';
import { AuthContext } from '../../../context/AuthContext';

export default function MainStage(props) {
    const scenarioStageRef = useRef();
    const layerRef1 = useRef();
    const layerRef2 = useRef();
    /* const [selectedShapeName, setSelectedShapeName] = useState("") */
    const [persons, setPersons] = useState([])
    const [personDeleteCount, setPersonDeleteCount] = useState(0)
    const [systems, setSystems] = useState([])
    const [systemDeleteCount, setSystemDeleteCount] = useState(0)
    const [containers, setContainers] = useState([])
    const [containerDeleteCount, setContainerDeleteCount] = useState(0)
    const [databases, setDatabases] = useState([])
    const [databaseDeleteCount, setDataBaseDeleteCount] = useState(0)
    const [arrows, setArrows] = useState([])
    const [arrowDeleteCount, setArrowDeleteCount] = useState(0)
    const [newArrowDropped, setNewArrowDropped] = useState(false)
    const [newArrowRef, setNewArrowRef] = useState(undefined)
    const [arrowEndX, setArrowEndX] = useState(0)
    const [arrowEndY, setArrowEndY] = useState(0)
    const location = useLocation();
    const { room } = location.state;
    const { auth } = useContext(AuthContext)
    const room_id = location.pathname.split("/")[2];
    const [previousShape, setPreviousShape] = useState(undefined);
    const [arrowDraggable, setArrowDraggable] = useState(false);
    const Navigate = useNavigate();

    useEffect(() => {
        console.log(room)
        loadShapes();
    }, [])

    async function loadShapes() {
        const resp = await roomService.loadShapes(room_id);
        setPersons(resp.persons)
        setContainers(resp.containers)
        setDatabases(resp.databases)
        setSystems(resp.systems)
        /* console.log(resp); */
    }

    async function handleSave() {
        const data = {
            persons: persons,
            systems: systems,
            containers: containers,
            databases: databases,
        }
        const resp = await roomService.saveRoom(room_id, data);
        if (resp.data.ok) {
            Swal.fire({
                title: 'Registro Satisfactorio!',
                text: 'Formas Guardadas Correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'No se pudo Registrar las Formas',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        }
        console.log(resp.data.ok)
    }

    function handleExportImg() {
        alert("export")
    }

    async function handleBack() {
        Swal.fire({
            title: '¿Estas Seguro?',
            text: "Estas Intentando Salir de la Sala",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                if (auth.id !== room.anfitrion_id) {
                    Navigate('/room')
                } else {
                    Navigate('/myRoom')
                }
            }
        })

    }

    /* function handleStageClick() {
        var pos = layerRef2.current.parent.getPointerPosition();
        var shape = layerRef2.current.getIntersection(pos);
        if (shape !== null && shape.name() !== undefined && shape !== undefined && shape.name() !== undefined) {
            scenarioStageRef.current.draw();
        }

        if (newArrowRef.attrs.name !== "" && newArrowRef !== undefined) {
            if (previousShape) {
                if (previousShape.attrs.id !== "ContainerRect") {
                    arrows.map(eachArrow => {
                        if (eachArrow.name === newArrowRef.attrs.name) {
                            eachArrow.to = previousShape;
                        }
                    });
                }
            }

            arrows.map(eachArrow => {
                if (eachArrow.name === newArrowRef.attrs.name) {
                    eachArrow.fill = "black";
                    eachArrow.stroke = "black";
                }
            });
            setArrowDraggable(false)
            setNewArrowRef(undefined)
        }
    }; */

    return (
        <>
            <Stage
                /* onClick={handleStageClick} */
                width={window.innerWidth}
                height={window.innerHeight}
                ref={scenarioStageRef}
            >
                <Layer
                    width={window.innerWidth}
                    height={window.innerHeight}
                    ref={layerRef2}
                    draggable

                >
                    <Rect
                        x={-5 * window.innerWidth}
                        y={-5 * window.innerHeight}
                        height={window.innerHeight * 10}
                        width={window.innerWidth * 10}
                        name=""
                        id="ContainerRect"
                    />
                    {persons.map((person) => (
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
                                        ...container,
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
                                        ...database,
                                        x: stuff.x,
                                        y: stuff.y,
                                    } : database
                                ))
                                scenarioStageRef.current.draw();
                            }}
                        />
                    ))}
                    {/*  {arrows.map(eachArrow => {
                        if (!eachArrow.from && !eachArrow.to) {
                            return (
                                <Arrow
                                    ref={eachArrow.ref}
                                    key={eachArrow.ref}
                                    name={eachArrow.name}
                                    points={[
                                        eachArrow.points[0],
                                        eachArrow.points[1],
                                        eachArrow.points[2],
                                        eachArrow.points[3]
                                    ]}
                                    stroke={eachArrow.stroke}
                                    fill={eachArrow.fill}
                                    draggable
                                    onDragEnd={event => {
                                        //set new points to current position

                                        //usually: state => star => x & y
                                        //now: state => arrow => attr => x & y

                                        let oldPoints = [
                                            eachArrow.points[0],
                                            eachArrow.points[1],
                                            eachArrow.points[2],
                                            eachArrow.points[3]
                                        ];

                                        let shiftX = this.refs[eachArrow.ref].attrs.x;
                                        let shiftY = this.refs[eachArrow.ref].attrs.y;

                                        let newPoints = [
                                            oldPoints[0] + shiftX,
                                            oldPoints[1] + shiftY,
                                            oldPoints[2] + shiftX,
                                            oldPoints[3] + shiftY
                                        ];

                                        this.refs[eachArrow.ref].position({ x: 0, y: 0 });
                                        this.refs.layer2.draw();

                                        this.setState(prevState => ({
                                            arrows: prevState.arrows.map(eachArr =>
                                                eachArr.name === eachArrow.name
                                                    ? {
                                                        ...eachArr,
                                                        points: newPoints
                                                    }
                                                    : eachArr
                                            )
                                        }));
                                    }}
                                />
                            );
                        } else if (newArrowRef !== undefined) {
                            if (eachArrow.name === newArrowRef.attrs.name && (eachArrow.from || eachArrow.to)) {
                                return (
                                    <Connector
                                        name={eachArrow.name}
                                        key={eachArrow.name}
                                        from={eachArrow.from}
                                        to={eachArrow.to}
                                        arrowEndX={arrowEndX}
                                        arrowEndY={arrowEndY}
                                        current={true}
                                        stroke={eachArrow.stroke}
                                        fill={eachArrow.fill}
                                    />
                                );
                            }
                        } else if (eachArrow.from || eachArrow.to) {
                            return (
                                <Connector
                                    name={eachArrow.name}
                                    key={eachArrow.name}
                                    from={eachArrow.from}
                                    to={eachArrow.to}
                                    points={eachArrow.points}
                                    current={false}
                                    stroke={eachArrow.stroke}
                                    fill={eachArrow.fill}
                                />
                            );
                        }
                    })} */}
                </Layer>
                <Layer
                    width={window.innerWidth * 0.95}
                    height={window.innerHeight * 0.85}
                    ref={layerRef1}
                >
                    <ToolBar
                        previousShape={previousShape}
                        setPreviousShape={setPreviousShape}
                        layer={layerRef2.current}
                        personName={
                            persons.length + 1 + personDeleteCount
                        }
                        appendToPerson={stuff => {
                            var toPush = stuff;
                            setPersons([...persons, toPush])
                            /*    setSelectedShapeName(toPush.name) */
                        }}
                        systemName={
                            systems.length + 1 + systemDeleteCount
                        }
                        appendToSystem={stuff => {
                            var toPush = stuff;
                            setSystems([...systems, toPush])
                            /*  setSelectedShapeName(toPush.name) */
                        }}
                        containerName={
                            containers.length + 1 + containerDeleteCount
                        }
                        appendToContainer={stuff => {
                            var toPush = stuff;
                            setContainers([...containers, toPush])
                            /*  setSelectedShapeName(toPush.name) */
                        }}
                        databaseName={
                            databases.length + 1 + databaseDeleteCount
                        }
                        appendToDataBase={stuff => {
                            var toPush = stuff;
                            setDatabases([...databases, toPush])
                            /*  setSelectedShapeName(toPush.name) */
                        }}
                    /*  newArrowOnDragEnd={toPush => {
                         if (toPush.from !== undefined) {
                             var transform = layerRef2.current
                                 .getAbsoluteTransform()
                                 .copy();
                             transform.invert();
                             let uh = transform.point({
                                 x: toPush.x,
                                 y: toPush.y
                             });
                             toPush.x = uh.x;
                             toPush.y = uh.y;

                             var newArrow = {
                                 points: toPush.points,
                                 ref:
                                     toPush.ref,
                                 name:
                                     "arrow" +
                                     (arrows.length +
                                         1 +
                                         arrowDeleteCount),
                                 from: toPush.from,
                                 stroke: toPush.stroke,
                                 strokeWidth: toPush.strokeWidth,
                                 fill: toPush.fill
                             };
                             setArrows([...arrows, newArrow])
                             setNewArrowDropped(true)
                             setNewArrowRef(newArrow.ref)
                             setArrowEndX(toPush.x)
                             setArrowEndY(toPush.y)
                         } else {
                             var transform = layerRef2.current
                                 .getAbsoluteTransform()
                                 .copy();
                             transform.invert();
                             let uh = transform.point({
                                 x: toPush.x,
                                 y: toPush.y
                             });
                             toPush.x = uh.x;
                             toPush.y = uh.y;
                             var newArrow = {
                                 points: [toPush.x, toPush.y, toPush.x, toPush.y],
                                 ref:
                                     toPush.ref,
                                 name:
                                     "arrow" +
                                     (arrows.length +
                                         1 +
                                         arrowDeleteCount),
                                 from: toPush.from,
                                 stroke: toPush.stroke,
                                 strokeWidth: toPush.strokeWidth,
                                 fill: toPush.fill
                             };

                             setArrows([...arrows, newArrow])
                             setNewArrowDropped(true)
                             setNewArrowRef(newArrow.ref)
                             setArrowEndX(toPush.x)
                             setArrowEndY(toPush.y)
                         }
                     }} */
                    />

                </Layer>

            </Stage>
            <div className="flex bottom-1 right-1 absolute">
                <div>
                    {auth.id === room.anfitrion_id && <button onClick={handleSave} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Guardar</button>}
                </div>
                <div>
                    <button onClick={handleBack} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Salir</button>
                </div>

            </div>
        </>

    )
}
