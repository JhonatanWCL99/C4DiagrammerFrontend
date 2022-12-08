import axios from "axios";

const API_URL = "https://c4diagrammerbackend.up.railway.app/api/room";
//const API_URL = "http://localhost:4000/api/room";

class RoomService {
    allRoomsAnfitrion(idAnfitrion) {
        return axios
            .get(API_URL + `/${idAnfitrion}`)
            .then(response => {
                if (response.status) {
                    return response.data;
                }
            }).catch(err => {
                return err;
            });
    }

    allRooms(idAnfitrion) {
        return axios
            .post(API_URL + "/allActive",
                { anfitrion_id: idAnfitrion }
            )
            .then(response => {
                return response.data;

            }).catch(err => {
                return err;
            });
    }

    createRoom(dataRoom) {
        return axios
            .post(API_URL,
                dataRoom
            )
            .then(response => {
                console.log(response)
                return response;

            }).catch(err => {
                return err;
            });
    }

    updateRoom(idRoom, dataRoom) {
        return axios
            .put(API_URL + `/${idRoom}`,
                dataRoom)
            .then(response => {
                console.log(response)
                return response;
            }).catch(err => {
                return err;
            });
    }

    deleteRoom(idRoom, dataRoom) {
        console.log(dataRoom)
        return axios
            .delete(API_URL + `/${idRoom}`,
                { data: dataRoom })
            .then(response => {
                return response;
            }).catch(err => {
                return err;
            });
    }

    saveRoom(idRoom, data) {
        return axios.post(API_URL + `/saveShapes/${idRoom}`,
            { data: data })
            .then(response => {
                return response
            }).catch(err => {
                return err
            });
    }

    loadShapes(idRoom) {
        return axios.get(API_URL + `/loadShapes/${idRoom}`)
            .then(response => {
                if (response.status) {
                    return response.data;
                }
            }).catch(err => {
                return err;
            });
    }

}

export default new RoomService();