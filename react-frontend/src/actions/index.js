export function getData(userdata) {

    return {
        type : 'LOGIN',
        payload : userdata 
    }
};



export function fileDelete(index) {
     //console.log(userdata);
    return {

        type : 'DELETEFILE',
        payload : index
    }
};


export function handleFolder(folderpath) {
    console.log("inside folder creation");
    return{
        type: 'FOLDER',
        payload : folderpath
    }

}

export function folderDelete(index) {
    //console.log(userdata);
    return {

        type : 'DELETEFOLDER',
        payload : index
    }
};

export function getGroups(data) {
    return {
        type: 'GETGROUPS',
        payload: data
    }
}

export function addGroup(data){
        return {
            type : 'ADDGROUP',
            payload : data
        }
}

export function deleteGroup(data){
    return {
        type : 'DELETEGROUP',
        payload : data
    }
}

export function star(data){
    console.log("inside the star thing");
    return {
        type : 'STAR',
        payload : data
    }
}