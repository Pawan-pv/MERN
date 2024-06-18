import { Header } from "../componenets/Header"
import { Hero } from "../componenets/Hero"



const Layout = () =>{
    return(
      <div className=" flex flex-col min-h-screen">
        <Header/>
        <Hero/>
      </div>
    )
}
export default Layout