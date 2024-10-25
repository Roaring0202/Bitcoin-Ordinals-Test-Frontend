import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Staking from "./Staking";
import MyOrdinals from "./MyOrdinals";
import { useState } from "react";


export default function MainPage() {

    return (
        <div className="flex-1 h-full w-full">
            <Tabs defaultValue="staking" className="items-center text-center h-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="staking">Staking</TabsTrigger>
                    <TabsTrigger value="ordinals">My Ordinals</TabsTrigger>
                </TabsList>
                <TabsContent className="h-full" value="staking">
                    <Staking  />
                </TabsContent>
                <TabsContent value="ordinals">
                    <MyOrdinals />
                </TabsContent>
            </Tabs>

        </div>
    );
}