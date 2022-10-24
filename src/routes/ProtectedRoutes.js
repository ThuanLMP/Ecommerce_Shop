import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, roles }) => {
    const user = JSON.parse(localStorage.getItem('user'))

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