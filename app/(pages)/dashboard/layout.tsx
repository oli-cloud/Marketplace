// import NavBar from "@/app/Compononts/navBar";

export default function Layout({children}:{children: React.ReactNode}){
return (
    <div>
          {/* <NavBar/> */}

        <h1>Dashboard</h1>
        <>{children}</>
    </div>
);}