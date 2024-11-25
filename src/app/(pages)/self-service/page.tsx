// show all th e self services available to the user

import React from "react";
import Link from "next/link";

export default function SelfServicePage(){
    return(
        <section>
            <ul className="flex flex-col">
                <Link href={"/self-service/loan"}>Loan</Link>
                <Link href={"/self-service/money-transfer"}>Money Transfer</Link>
                <Link href={"/self-service/withdrawal"}>Withdrawal</Link>
            </ul>
            
        </section>
    )
}

