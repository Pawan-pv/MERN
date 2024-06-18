import { Header } from "../componenets/Header"
import { Hero } from "../componenets/Hero"
import { Footer } from "../componenets/Footer"

 interface Props{
  children: React.ReactNode;
 }

const Layout = ({children}: Props) =>{
    return(
      <div className=" flex flex-col min-h-screen">
        <Header/>
        <Hero/>
        <div className="container mx-auto py-10 flex-1 ">{children}</div>
        <Footer />
      </div>
    )
}
export default Layout