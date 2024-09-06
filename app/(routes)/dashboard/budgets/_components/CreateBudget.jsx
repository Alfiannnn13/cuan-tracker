"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

function CreateBudget({refreshData}) {
  const [emojiIcon, setEmojiIcon] = useState("☕");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false); // Inisialisasi dengan boolean false
  const [name,setName]=useState();
  const [amount, setAmount]=useState();

  const {user}=useUser();

  const onCreateBudget = async()=>{
    const result = await db.insert(Budgets)
    .values({
      name: name,
      amount:amount,
      createdBy:user?.primaryEmailAddress?.emailAddress,
      icon:emojiIcon
    }).returning({inserted:Budgets.id})

    if (result) 
    {
      refreshData();
      toast('Rencana Pengeluaran Terbuat')
    }
  }

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-xl items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-lg">
            <h2 className="text-3xl">+</h2>
            <h2>Buat Rencana Pengeluaran</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat Rencana Pengeluaran</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  className="text-lg"
                  variant="outline"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                {openEmojiPicker && ( // Hanya tampilkan EmojiPicker jika openEmojiPicker true
                  <div className="absolute z-10">
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenEmojiPicker(false);
                      }}
                    />
                  </div>
                )}
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Jenis Pengeluaran</h2>
                  <Input placeholder="cth. Kopi"
                  onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Jumlah Pengeluaran</h2>
                  <Input type="number" placeholder="cth. 50000"
                  onChange={(e)=>setAmount(e.target.value)}/>
                </div>

                
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
            <Button 
                  disabled={!(name&&amount)}
                  onClick={()=> onCreateBudget()}
                  className="mt-5 w-full rounded-xl">
                  Buat Rencana
                </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
