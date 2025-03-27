"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Loader from "./pages/home/InnerComponents/Loading/loading";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
      window.location.href = 'pages/home';
  })
  return (
    <div className={styles.page}>
     <Loader></Loader>
    </div>
  );
}
