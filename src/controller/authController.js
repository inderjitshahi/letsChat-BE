export const register = async (req, res) => {
    try{
        res.send("Hello From register api!")
    }catch(error){
        next(error)
    }
}


export const login = async (req, res) => {
    try{
        res.send(req.body)
    }catch(error){
        next(error)
    }
}
export const logout = async (req, res) => {
    try{
        res.send("Hello From logout api!")
    }catch(error){
        next(error)
    }
}
export const refreshToken = async (req, res) => {
    try{
        res.send("Hello From refresh token api!")
    }catch(error){
        next(error)
    }
}
