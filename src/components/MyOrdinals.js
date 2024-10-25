import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import StakingItem from "./StakingItem";
import { useState, useEffect, useCallback } from "react";
import MyOrdinalsItems from "./MyOrdinalsItem";

export default function MyOrdinals() {
    const [selectedItem, setSelectedItem] = useState([]);
    const [data, setData] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    const getStakingItemDetail = useCallback(async () => {
        setIsLoading(true);
        if (data.length > 0) return;

        try {
            const response = await fetch("http://192.168.15.75:3000/ordinals", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const fetchedData = await response.json();
            setData(fetchedData.ordinals);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    }, [data]);

    useEffect(() => {
        getStakingItemDetail();
    }, [getStakingItemDetail]);

    const changeSelectedItem = (value) => {
        setSelectedItem(value);
    };

    return (
        <div className="px-4">
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={60}>
                    <div className="h-full">
                        {data.length === 0 ? (
                            isloading ?
                                <div className="text-2xl justify-center items-center flex h-[80%]">loading...</div> :
                                <div className="text-2xl justify-center items-center flex h-[80%]">No data Sets</div>
                        ) : (
                            <div className=" items-center justify-center px-6 mt-2 grid grid-cols-4 gap-5">
                                {data.map((item, index) => (
                                    <div
                                        onClick={() => changeSelectedItem(item)}
                                        key={index}
                                        className={`p-2 border rounded-lg text-center cursor-pointer truncate ${selectedItem === item ? "bg-blue-200" : ""}`}
                                    >
                                        <StakingItem data={item} />
                                    </div>
                                ))
                                }
                            </div>
                        )}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                    <MyOrdinalsItems data={selectedItem} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
