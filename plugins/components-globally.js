import Vue from 'vue'
import Card from '../components/Card'
import Child from '../components/Child'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import { HasError, AlertError, AlertSuccess } from 'vform/src/components/bootstrap4'

import AdminPosition from '../components/content-widgets/AdminPosition'
import AdminWidget from '../components/content-widgets/AdminWidget'
import BsSidebarMenuNestedDropSubItem from '../components/bs-sidebar-menu-nested-drop/SubItem'
import TableMenuSubItem from '../components/table-menu/TableMenuSubItem'

import Notifications from '../components/Notifications'

// Components that are registered globaly.
[
    Card,
    Child,
    Button,
    Checkbox,
    HasError,
    AlertError,
    AlertSuccess,
    AdminPosition,
    AdminWidget,
    BsSidebarMenuNestedDropSubItem,
    TableMenuSubItem,
    Notifications
].forEach(Component => {
    Vue.component(Component.name, Component)
})
