import { INIT_BREADCRUMB, ADD_BREADCRUMB, REMOVE_BREADCRUMB, SET_ROLENAME, SET_USERNAME, SET_MENUS } from "./action-type/action-types";

let action = {
    initBreadcrumb: function(payload){
        return {
            type: INIT_BREADCRUMB,
            payload
        }
    },
    addBreadcrumb: function (payload) {
        return {
            type: ADD_BREADCRUMB,
            payload
        }
    },
    removeBreadcrumb: function(payload) {
        return {
            type: REMOVE_BREADCRUMB,
            payload
        }
    },
    setUsername: function(payload) {
        return {
            type: SET_USERNAME,
            payload
        }
    },
    setRolename: function(payload) {
        return {
            type: SET_ROLENAME,
            payload
        }
    },
    setMenus: function(payload) {
        return {
            type: SET_MENUS,
            payload
        }
    }
}

export default action;