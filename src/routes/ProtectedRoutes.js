import { Navigate } from "react-router-dom";
import { b64DecodeUnicode } from "../utils/ultils";

const ProtectedRoutes = ({ children, roles }) => {
    let user = false
    if (localStorage.getItem('user')) {
        user = JSON.parse(b64DecodeUnicode(localStorage.getItem('user')))
    }

    // Kiểm tra roles của đường dẫn có khớp với roles của tài khoản không
    const checkRoles = (roles1, roles2) => {
        if (roles1 === 'admin') {
            return true
        }
        else {
            if (JSON.stringify(roles1) === JSON.stringify(roles2[0])) {
                return true
            } else {
                return false
            }
        }
    }

    if (!user) {
        return <Navigate to="/home" replace />
    } else {
        if (!checkRoles(user.role, roles)) {
            return <Navigate to="/home" replace />
        }
    }
    return children
}

export default ProtectedRoutes