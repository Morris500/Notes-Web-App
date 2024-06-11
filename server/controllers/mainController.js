// GET
// Homepage
exports.homepage = async (req, res) => { 
        const locals = {
            title: "NodeJs Notes",
            description: "Free NodeJs Note App"
        }
    
    res.render("index", locals)
    

}
//get
//about
exports.about= async(req, res) =>{
    const locals = {
        title: "About-NodeJs Notes",
        description: "Free NodeJs Note App"
    }
    res.render("about", locals)
}
