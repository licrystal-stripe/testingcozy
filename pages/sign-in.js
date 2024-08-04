import NavigationBar from "@/components/NavigationBar"
import SignInPage from "@/components/NavigationBarComponents/SignInPage"
import FooterComponent from "@/components/FooterComponent"
export default function SignIn() {
    return (
        <div>
            <NavigationBar 
            numItems={0} 
            productsInCart={[]} 
            setProductsInCart = {[]}
            setNumItems = {() =>  {}
            }
            ></NavigationBar>
            <SignInPage></SignInPage>
            <FooterComponent></FooterComponent>
        </div>
        
    )
}