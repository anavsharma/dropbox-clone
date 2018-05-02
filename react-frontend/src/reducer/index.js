const initialState = {
    Name: '',
    password: '',
    email: '',
    username:'',
    files :[],
    userLog:[],
    folder:[],
    groups:[]

};

const userdata = (state = initialState, action) => {

    switch (action.type){
    
        case 'LOGIN' :
            console.log("inside userdata");

            state = {
                ...state,
                files: action.payload.file,
                Name : action.payload.name,
                username: action.payload.username,
                folder:action.payload.folder
            };
            break;

        case 'DELETEFILE' :
            console.log("inside clicked ");

            console.log(state.files);
            state = {
                ...state,
                files:[
                    ...state.files.slice(0, action.payload),
                    ...state.files.slice(action.payload + 1)
                ]
            };
            console.log(state.files);
            break;

        case 'FOLDER' :
            console.log("Inside folder reducer");
            state = {

                ...state,
                folder:[...state.folder ,action.payload.folder]
            }
            break;

        case 'DELETEFOLDER' :
            console.log("inside delete folder");
            state = {
                ...state,
                folder:[
                    ...state.folder.slice(0, action.payload),
                    ...state.folder.slice(action.payload + 1)
                ]
            };

            break;

        case 'GETGROUPS' :
            console.log("Inside the get groups thingy");
            state = {
                ...state,
                groups:action.payload
            };
            break;

        case 'ADDGROUP':
            console.log("Inside creation of a new group");
            state = {
                ...state,
                groups:[...state.groups , action.payload]
            }

        case 'DELETEGROUP' :
            console.log("inside delete group clicked ");

            state = {
                ...state,
                groups:[
                    ...state.groups.slice(0, action.payload),
                    ...state.groups.slice(action.payload + 1)
                ]
            };
            break;

        case 'STAR' :
            console.log("inside the star clicked function ");
            var temp = state.files;
            var flag = temp[action.payload].starred ;
            console.log(flag);
            temp[action.payload].starred = !flag ;
            files:temp;
            break;
    default :
    return state;
   }
 return state;
}

export default userdata ;