export async function fetchLogin({ email, password }: any) {
    if (email !== 'admin' && password !== 'admin') {
        throw new Error('Invalid email or password');
    }
    const res: UserState = {
        id: '1',
        name: 'admin',
        email: 'admin',
        token: 'abcxyz',
        isLoggedIn: true,
        loading: 'succeeded'
    }
    return res
}

export async function fetchSignup({ email, password, name }: any) {
    const res: UserState = {
        id: '1',
        name: 'admin',
        email: 'admin',
        token: 'abcxyz',
        isLoggedIn: true,
        loading: 'succeeded'
    }
    return res
}

export async function fetchUser({ action, email, password, name, confirmPassword }: any) {
    if (email !== 'admin@dino.coffee.com' && password !== 'admin123') {
        throw new Error('Invalid email or password');
    }
    const res: UserState = {
        id: '1',
        name: 'admin',
        email: 'admin',
        token: 'abcxyz',
        isLoggedIn: true,
        loading: 'succeeded'
    }
    return res
}