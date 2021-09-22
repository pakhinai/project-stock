import Login from "../components/pages/Login";
import Nike from "../components/pages/Nike/Nike";
import NikeCreate from "../components/pages/Nike/NikeCreate";
import NikeEdit from "../components/pages/Nike/NikeEdit";
import Adidas from "../components/pages/Adidas/Adidas";
import AdidasCreate from "../components/pages/Adidas/AdidasCreate";
import AdidasEdit from "../components/pages/Adidas/AdidasEdit";
import Puma from "../components/pages/Puma/Puma";
import PumaCreate from "../components/pages/Puma/PumaCreate";
import PumaEdit from "../components/pages/Puma/PumaEdit";
import Reebox from "../components/pages/Reebox/Reebok";
import ReeboxCreate from "../components/pages/Reebox/ReeboxCreate";
import ReeboxEdit from "../components/pages/Reebox/ReeboxEdit";
import UnderArmour from "../components/pages/UnderArmour/UnderArmour";
import UnderArmourCreate from "../components/pages/UnderArmour/UnderArmourCreate";
import UnderArmourEdit from "../components/pages/UnderArmour/UnderArmourEdit";
import Register from "../components/pages/Register";
import Admin from "../components/pages/Admin"
import User from "../components/pages/User"

const components = {
    login: {
        url: '/',
        component: Login
    },
    admin: {
        url: '/admin',
        component: Admin
    },
    user: {
        url: '/user',
        component: User
    },
    register: {
        url: '/register',
        component: Register
    },
    nike: {
        url: '/nike',
        component: Nike
    },
    nikeCreate: {
        url: '/nike-create',
        component: NikeCreate
    },
    nikeEdit: {
        url: '/nike-edit',
        component: NikeEdit
    },
    adidas: {
        url: '/adidas',
        component: Adidas
    },
    adidasCreate: {
        url: '/adidas-create',
        component: AdidasCreate
    },
    adidasEdit: {
        url: '/adidas-edit',
        component: AdidasEdit
    },
    puma: {
        url: '/puma',
        component: Puma
    },
    pumaCreate: {
        url: '/puma-create',
        component: PumaCreate
    },
    pumaEdit: {
        url: '/puma-edit',
        component: PumaEdit
    },
    reebox: {
        url: '/reebox',
        component: Reebox
    },
    reeboxCreate: {
        url: '/reebox-create',
        component: ReeboxCreate
    },
    reeboxEdit: {
        url: '/reebox-edit',
        component: ReeboxEdit
    },
    underArmour: {
        url: '/underarmour',
        component: UnderArmour
    },
    underArmourCreate: {
        url: '/underarmour-create',
        component: UnderArmourCreate
    },
    underArmourEdit: {
        url: '/underarmour-edit',
        component: UnderArmourEdit
    }
}

export default  {
    admin: {
        allowedRoutes: [
            components.login,
            components.admin,
            components.register,
            components.user,
            components.nike,
            components.nikeCreate,
            components.nikeEdit,
            components.adidas,
            components.adidasCreate,
            components.adidasEdit,
            components.puma,
            components.pumaCreate,
            components.pumaEdit,
            components.reebox,
            components.reeboxCreate,
            components.reeboxEdit,
            components.underArmour,
            components.underArmourCreate,
            components.underArmourEdit
        ],
        redirectRoutes: '/nike'
    },
    user: {
        allowedRoutes: [
            components.login,
            components.admin,
            components.register,
            components.user,
            components.nike,
            components.adidas,
            components.puma,
            components.reebox,
            components.underArmour,
        ],
        redirectRoutes: '/nike'
    },
    guest: {
        allowedRoutes:[
            components.login,
            components.admin,
            components.register,
            components.user,
        ],
        redirectRoutes: '/nike'
    }
}