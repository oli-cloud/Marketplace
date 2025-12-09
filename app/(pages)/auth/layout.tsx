// import NavBar from "@/app/Compononts/navBar";

export default function Layout({children}:{children: React.ReactNode}){
return (
    <div>
          {/* <NavBar/> */}

        <h1 className="justify-center text-center m-4 font-bold">Auth</h1>
        <>{children}</>
    </div>
);}