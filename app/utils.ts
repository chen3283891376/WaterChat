export function getAccessToken() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        location.href = '/login';
        return '';
    }
    return token;
}
