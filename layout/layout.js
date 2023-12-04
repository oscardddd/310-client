import Link from "next/link";
import { useRouter} from "next/router";
import Image from "next/image";
import logo from "./logo2.jpg"
import styles from "./layout.module.css"

export default function Header({title,subtitle,links}){

    const router = useRouter()
    return(
        <header className={styles.header} >
            <Image className={styles.img} src={logo} alt="CISA logo" width={150} height = {150}/>
            <div>
                <Link className={styles.link1} href="/signup">Discover</Link>
                <Link className={styles.link2} href="/signup">Signup</Link>
            </div>
           
        </header>
    )
}