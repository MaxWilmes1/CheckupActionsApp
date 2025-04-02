import ButtonAppBar from "./ButtonAppBar.tsx";
import TemporaryDrawer from "./TemporaryDrawer.tsx";
import {useState} from "react";

export default function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div>
            <ButtonAppBar setDrawerOpen={setDrawerOpen}/>
            <TemporaryDrawer open={drawerOpen} setDrawerOpen={setDrawerOpen}/>
        </div>
    );
}