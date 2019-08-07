import { INIT_BREADCRUMB } from "store/actions/action-type/action-types";
import { ADD_BREADCRUMB } from "store/actions/action-type/action-types";
import { REMOVE_BREADCRUMB } from "store/actions/action-type/action-types";
import { SET_USERNAME } from "store/actions/action-type/action-types";
import { SET_ROLENAME } from "store/actions/action-type/action-types";
import { SET_MENUS } from "store/actions/action-type/action-types";

let initState = {
    menus: [],
    breadcrumb: [],
    userName: '未登录',
    roleName: ''
}

let update = function(obj, newObj) {
    return Object.assign({}, obj, newObj);
}

function reducers(state = initState, action){
    let newState;
    switch (action.type) {
        case INIT_BREADCRUMB:
            newState = update(state, {
                breadcrumb: [action.payload]
            });
            break;
        case ADD_BREADCRUMB:
            newState = update(state, {
                breadcrumb: [
                    ...state.breadcrumb,
                    action.payload
                ]
            });
            break;
        case REMOVE_BREADCRUMB:
            let currentIndex = Infinity;
            newState = update(state, {
                breadcrumb: state.breadcrumb.filter((item,index)=>{
                    if (item.path === action.payload) {
                        currentIndex = index;
                    }
                    if (index > currentIndex) {
                        return false;
                    } else {
                        return true;
                    }
                })
            });
            break;
        case SET_USERNAME:
            newState = update(state, {
                userName: action.payload
            })
            break;
        case SET_ROLENAME:
            newState = update(state, {
                roleName: action.payload
            });
            break;
        case SET_MENUS:
            newState = update(state, {
                menus: action.payload
            });
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}

export default reducers;