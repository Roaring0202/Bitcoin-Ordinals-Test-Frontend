import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import StakingItem from "./StakingItem";
import { useState, useEffect, useCallback } from "react";
import StakingDetailItem from "./StakingDetailItem";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

//bc1pc0se4vnckrqcwkyfaakawa7cyaqxrme9xe7zle4pkjr4004jqpfstvlk4x

export default function Staking() {
    const [selectedItem, setSelectedItem] = useState([]);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [offset, setOffSet] = useState(20);

    const getStakingItemDetail = useCallback(async () => {
        setIsLoading(true);
        //if (data.length > 0) return; // Prevent fetching if data already exists
        console.log('getStakingItemDetail', address, offset)
        try {
            const response = await fetch(`https://api.hiro.so/ordinals/v1/inscriptions?address=${address}&offset=${offset}&limit=20`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const fetchedData = await response.json();
            setData([...data, ...fetchedData.results]);
            setTotal(fetchedData.total)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    }, [data, address]);


    const changeSelectedItem = (value) => {
        setSelectedItem(value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value); // Update the address state
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            getStakingItemDetail(); // Call fetch function only on Enter key press
        }
    };

    const onClickMore = () => {
        setOffSet(offset + 20);
    }

    useEffect(() => {
        if(address) {
            getStakingItemDetail(offset);
        }
    }, [offset, address]);

    return (
        <div className="px-4 h-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full rounded-lg"
            >
                <ResizablePanel defaultSize={60}>
                    <div className="px-6 pt-6">
                        <Input
                            value={address}
                            onChange={handleAddressChange}
                            onKeyDown={handleKeyDown} // Separate key down handler
                            className="w-full"
                            placeholder="Type a Bitcoin address"
                        />
                    </div>
                    <div className="h-[90%]">
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
                        {data.length > 0 && data.length < total && <Button onClick={onClickMore} className="mt-4 w-[140px]">More</Button>}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                    <StakingDetailItem data={selectedItem} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
