import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";

export default function MyOrdinalsItems({ data }) {
    const stakeItem = async () => {

        try {
            const response = await fetch("http://192.168.15.75:3000/unstack", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id: data.id}),
            });
            const res = await response.json();
            console.log(res);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (
        <div className="justify-center items-center p-4">
            <div className="divide-y divide-dashed">
                {
                    !data.id ?
                        <div className="flex items-center justify-center w-full h-[200px] border border-dashed border-gray-300 rounded-lg border-gray-300 dark:border-gray-700">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <ImageIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                                <div className="font-medium text-sm text-gray-500 dark:text-gray-400">No Image Found</div>
                            </div>
                        </div> :
                        <iframe
                            className="flex items-center justify-center w-full h-[200px] border border-dashed border-gray-300 rounded-lg border-gray-300 dark:border-gray-700"
                            src={`https://ordinals.com/preview/${data.id}`}
                            width="32"
                            height="32"
                            title={`${data.id}`}
                        ></iframe>

                }
                <div className="truncate">
                    <span className="font-bold">ID:</span> {data.id}
                </div>
                <div className="truncate">
                    <span className="font-bold">Address:</span> {data.address}
                </div>
                <div className="truncate">
                    <span className="font-bold">Reveal Transaction:</span> {data.tx_id}
                </div>
                <div className="truncate">
                    <span className="font-bold">Location:</span> {data.location}
                </div>

            </div>
            <div className="justify-end items-end">
                <Button className="" onClick={stakeItem}>UnStack</Button>
            </div>
        </div>
    );
}
